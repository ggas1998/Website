from __future__ import annotations
import json, os
from datetime import date
from pathlib import Path
import requests

ORCID_ID=os.getenv("ORCID_ID","0009-0001-7762-0676")
OUT=Path(__file__).resolve().parents[1]/"data"/"publications.json"
HEADERS={"Accept":"application/vnd.orcid+json"}

def get_json(url):
    r=requests.get(url,headers=HEADERS,timeout=30)
    r.raise_for_status()
    return r.json()

def ext_id(summary, kind):
    for item in summary.get("external-ids",{}).get("external-id",[]):
        if (item.get("external-id-type") or "").lower()==kind.lower():
            return item.get("external-id-value")

def main():
    works=get_json(f"https://pub.orcid.org/v3.0/{ORCID_ID}/works")
    pubs=[]
    for group in works.get("group",[]):
        summaries=group.get("work-summary",[])
        if not summaries: continue
        s=summaries[0]
        put=s.get("put-code")
        year=s.get("publication-date",{}).get("year",{}).get("value")
        title=s.get("title",{}).get("title",{}).get("value")
        full=get_json(f"https://pub.orcid.org/v3.0/{ORCID_ID}/work/{put}")
        authors=[]
        for c in full.get("contributors",{}).get("contributor",[]):
            credit=c.get("credit-name")
            if isinstance(credit,dict) and credit.get("value"): authors.append(credit["value"])
        url=(full.get("url") or {}).get("value") if isinstance(full.get("url"),dict) else None
        journal=(s.get("journal-title") or {}).get("value") if isinstance(s.get("journal-title"),dict) else None
        pubs.append({"title":title,"year":int(year) if str(year).isdigit() else year,"type":s.get("type"),"journal":journal,"doi":ext_id(s,"doi"),"url":url,"authors":authors,"orcid_put_code":put})
    pubs.sort(key=lambda p:(p.get("year") or 0,p.get("title") or ""),reverse=True)
    OUT.write_text(json.dumps({"orcid":ORCID_ID,"last_updated":date.today().isoformat(),"publications":pubs},indent=2,ensure_ascii=False),encoding="utf-8")
if __name__=="__main__": main()
