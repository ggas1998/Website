from __future__ import annotations
import json, os
from datetime import date
from pathlib import Path
from typing import Any
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
ORCID_ID=os.getenv("ORCID_ID","0009-0001-7762-0676")
OUT=Path(__file__).resolve().parents[1]/"data"/"publications.json"
MANUAL=Path(__file__).resolve().parents[1]/"data"/"manual_publications.json"
BASE="https://pub.orcid.org/v3.0"
def session():
    s=requests.Session();s.headers.update({"Accept":"application/vnd.orcid+json","User-Agent":"academic-website-orcid-sync/1.0"})
    s.mount("https://",HTTPAdapter(max_retries=Retry(total=4,backoff_factor=1,status_forcelist=(429,500,502,503,504),allowed_methods=("GET",))));return s
def get(s,url):
    r=s.get(url,timeout=30);r.raise_for_status();return r.json()
def val(x): return x.get("value") if isinstance(x,dict) else x
def ext(summary,kind):
    for item in (summary.get("external-ids") or {}).get("external-id") or []:
        if str(item.get("external-id-type") or "").lower()==kind:return item.get("external-id-value")
def main():
    s=session();works=get(s,f"{BASE}/{ORCID_ID}/works");pubs=[]
    for group in works.get("group") or []:
        summaries=group.get("work-summary") or []
        if not summaries:continue
        summary=next((x for x in summaries if x.get("source",{}).get("source-orcid")),summaries[0]);put=summary.get("put-code")
        if put is None:continue
        full=get(s,f"{BASE}/{ORCID_ID}/work/{put}");year=val((summary.get("publication-date") or {}).get("year"))
        authors=[name for c in (full.get("contributors") or {}).get("contributor") or [] if (name:=val(c.get("credit-name")))]
        pubs.append({"title":val((summary.get("title") or {}).get("title")) or "Untitled work","year":int(year) if str(year).isdigit() else year,"type":summary.get("type"),"journal":val(summary.get("journal-title")),"doi":ext(summary,"doi"),"url":val(full.get("url")),"authors":authors,"orcid_put_code":put})
    manual=(json.loads(MANUAL.read_text(encoding="utf-8")).get("publications") or []) if MANUAL.exists() else []
    known_dois={str(p.get("doi") or "").lower() for p in pubs if p.get("doi")}
    known_titles={str(p.get("title") or "").casefold() for p in pubs}
    for item in manual:
        doi=str(item.get("doi") or "").lower();title=str(item.get("title") or "").casefold()
        if (doi and doi in known_dois) or title in known_titles:continue
        pubs.append(item);known_dois.add(doi);known_titles.add(title)
    pubs.sort(key=lambda p:(p.get("year") or 0,p.get("title") or ""),reverse=True);OUT.parent.mkdir(parents=True,exist_ok=True)
    OUT.write_text(json.dumps({"orcid":ORCID_ID,"last_updated":date.today().isoformat(),"publications":pubs},indent=2,ensure_ascii=False)+"\n",encoding="utf-8");print(f"Wrote {len(pubs)} works")
if __name__=="__main__":main()
