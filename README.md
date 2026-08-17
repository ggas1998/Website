# Gabriele Giuseppe Antonio Satta, PhD — Academic Website
Static bilingual website deployed with Vercel.

## Publications
`data/publications.json` is generated from public ORCID record `0009-0001-7762-0676`. The workflow `.github/workflows/update-orcid.yml` runs daily and supports manual dispatch.

Local run:
```bash
python -m pip install -r requirements.txt
python scripts/update_orcid.py
```

## LinkedIn updates
The website renders `data/updates.json`. `.github/workflows/update-linkedin.yml` checks public search results every six hours and keeps the two newest analytical LinkedIn posts. It reads only publicly indexed results, uses no account credentials, and preserves the last valid feed when discovery is unavailable. Posts containing `#GGASResearch` are always considered analytical; a research-keyword filter also supports existing posts without the hashtag.

The workflow runs once when its script or configuration changes on `site-refresh-bilingual`. Its six-hour schedule becomes active from GitHub's default branch after merge; manual dispatch remains available.

## Profiles
- ORCID: https://orcid.org/0009-0001-7762-0676
- Google Scholar: https://scholar.google.it/citations?user=EMTdLEsAAAAJ&hl=it
- LinkedIn: https://www.linkedin.com/in/gabriele-giuseppe-antonio-satta/

## Current information
- Affiliation: Free University of Bozen-Bolzano
- Based in: Bolzano, Italy
- Email: gsatta@unibz.it

