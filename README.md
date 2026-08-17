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
The website renders `data/updates.json`. Add an item with `source`, `date`, `title`, `text`, and the canonical LinkedIn `url`. Automatic member-post sync requires an approved LinkedIn application and OAuth permissions; credentials must remain server-side. HTML scraping is not used.

## Profiles
- ORCID: https://orcid.org/0009-0001-7762-0676
- Google Scholar: https://scholar.google.it/citations?user=EMTdLEsAAAAJ&hl=it
- LinkedIn: https://www.linkedin.com/in/gabriele-giuseppe-antonio-satta/

## Current information
- Affiliation: Free University of Bozen-Bolzano
- Based in: Bolzano, Italy
- Email: gsatta@unibz.it

## Scientific imagery

The homepage uses two scientific visuals from Sharma et al. (2026), *deadtrees.earth-aerial: A Multi-Resolution Aerial Image Dataset for Tree Cover and Mortality Detection*. The paper and figures are distributed under CC BY 4.0 and are credited on the page. LinkedIn update cards also support optional `image` and `image_alt` fields in `data/updates.json`.
