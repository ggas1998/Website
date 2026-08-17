"""Build the website update feed from publicly indexed LinkedIn posts."""

from __future__ import annotations

import email.utils
import html
import json
import os
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date
from pathlib import Path


OUTPUT_PATH = Path("data/updates.json")
PROFILE_URL = "https://www.linkedin.com/in/gabriele-giuseppe-antonio-satta/"
DEFAULT_QUERY = 'site:linkedin.com/posts "Gabriele Giuseppe Antonio Satta"'
ANALYSIS_TERMS = {
    "analysis", "analisi", "forest", "foresta", "foreste", "tree", "alberi",
    "drought", "siccità", "dieback", "mortality", "mortalità", "remote sensing",
    "telerilevamento", "sentinel", "climate", "clima", "wildfire", "incendi",
    "ecology", "ecologia", "dataset", "mapping", "mappatura", "gis",
}


def clean(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", html.unescape(value or ""))
    return re.sub(r"\s+", " ", value).strip()


def is_analysis(title: str, description: str) -> bool:
    content = f"{title} {description}".casefold()
    marker = os.getenv("LINKEDIN_ANALYSIS_HASHTAG", "#GGASResearch").casefold()
    return marker in content or any(term.casefold() in content for term in ANALYSIS_TERMS)


def item_date(value: str) -> str:
    try:
        parsed = email.utils.parsedate_to_datetime(value)
        return parsed.date().isoformat()
    except (TypeError, ValueError):
        return ""


def fetch_items() -> list[dict[str, str]]:
    query = os.getenv("LINKEDIN_SEARCH_QUERY", DEFAULT_QUERY)
    url = "https://www.bing.com/search?format=rss&q=" + urllib.parse.quote(query)
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        root = ET.fromstring(response.read())

    items: list[dict[str, str]] = []
    for node in root.findall("./channel/item"):
        link = clean(node.findtext("link", ""))
        title = clean(node.findtext("title", ""))
        description = clean(node.findtext("description", ""))
        if "linkedin.com/posts" not in link.casefold() or not is_analysis(title, description):
            continue
        items.append({
            "source": "LinkedIn",
            "date": item_date(node.findtext("pubDate", "")),
            "title": title.removesuffix(" | LinkedIn").strip(),
            "text": description[:420],
            "url": link,
        })
    return items


def main() -> None:
    previous = json.loads(OUTPUT_PATH.read_text(encoding="utf-8")) if OUTPUT_PATH.exists() else {}
    try:
        discovered = fetch_items()
    except Exception as exc:
        print(f"Public LinkedIn discovery failed; keeping the existing feed: {exc}")
        return

    known = {item.get("url"): item for item in previous.get("updates", []) if item.get("url")}
    for item in discovered:
        known[item["url"]] = item
    updates = sorted(known.values(), key=lambda item: item.get("date", ""), reverse=True)[:2]
    if not updates:
        print("No indexed analytical posts found; keeping the existing feed.")
        return

    payload = {"last_updated": date.today().isoformat(), "profile_url": PROFILE_URL, "updates": updates}
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {len(updates)} LinkedIn update(s).")


if __name__ == "__main__":
    main()
