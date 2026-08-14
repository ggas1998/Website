const translations = {
  en: {
    nav_home: "Home", nav_research: "Research", nav_projects: "Projects", nav_publications: "Publications", nav_about: "About", nav_contact: "Contact",
    hero_eyebrow: "Forest ecologist & remote sensing researcher",
    hero_title_1: "Understanding forests", hero_title_2: "from field to space.",
    hero_text: "I study Mediterranean forest health and climate-driven ecosystem change by integrating Earth observation, field ecology, GIS and spatial modelling.",
    hero_cta_1: "Explore research", hero_cta_2: "View publications",
    current_focus: "Current focus",
    focus_1_title: "Forest health", focus_1_text: "Drought-induced dieback and tree mortality in Mediterranean ecosystems.",
    focus_2_title: "Earth observation", focus_2_text: "Sentinel-2 time series, high-resolution imagery and spatial indicators.",
    focus_3_title: "Spatial modelling", focus_3_text: "Machine learning, GIS and predictive mapping for forest monitoring.",
    research_eyebrow: "Research", research_title: "Forest ecosystems under environmental change",
    research_lead: "My research combines ecological understanding with geospatial technologies to detect, quantify and explain changes in Mediterranean forests.",
    research_1_title: "Forest health & dieback", research_1_text: "Detection and modelling of drought-related crown dieback, tree mortality and forest decline.",
    research_2_title: "Remote sensing", research_2_text: "Satellite and aerial Earth observation for monitoring canopy condition, disturbances and ecosystem dynamics.",
    research_3_title: "GIS & spatial modelling", research_3_text: "Geospatial analysis and machine-learning workflows designed to produce interpretable, map-based research outputs.",
    projects_eyebrow: "Projects & themes", projects_title: "Selected research directions",
    project_1_title: "Monitoring Mediterranean oak health through remote sensing",
    project_1_text: "Research on Mediterranean oak health integrating remote sensing, field observations and forest-health indicators.",
    project_2_title: "Drought-induced forest dieback",
    project_2_text: "Detection, mapping and modelling of drought-induced holm oak dieback with Sentinel-2 and machine-learning methods.",
    project_3_title: "Forest grazing & fire severity",
    project_3_text: "Assessment of prescribed forest grazing as a mitigation strategy for wildfire severity in Mediterranean landscapes.",
    pub_eyebrow: "Publications", pub_title: "Selected scientific outputs", pub_all: "All publications on ORCID",
    about_eyebrow: "About", about_title: "Ecology, Earth observation and maps.",
    about_text_1: "I am a forest ecologist and remote sensing researcher with a PhD in Agricultural Sciences. My work focuses on Mediterranean forest health and on the impacts of drought, climate change and other stressors on forest ecosystems.",
    about_text_2: "I combine field observations with satellite imagery, GIS, spatial analysis and machine learning, with particular attention to robust cartographic outputs that support ecological interpretation and forest monitoring.",
    affiliation_label: "Current affiliation", location_label: "Based in",
    footer_role: "Forest ecologist · Remote sensing researcher", footer_note: "Research portfolio · EN / IT"
  },
  it: {
    nav_home: "Home", nav_research: "Ricerca", nav_projects: "Progetti", nav_publications: "Pubblicazioni", nav_about: "Profilo", nav_contact: "Contatti",
    hero_eyebrow: "Ecologo forestale & ricercatore in telerilevamento",
    hero_title_1: "Comprendere le foreste", hero_title_2: "dal campo allo spazio.",
    hero_text: "Studio la salute delle foreste mediterranee e le trasformazioni degli ecosistemi indotte dal clima integrando osservazioni della Terra, ecologia di campo, GIS e modellistica spaziale.",
    hero_cta_1: "Esplora la ricerca", hero_cta_2: "Vedi pubblicazioni",
    current_focus: "Temi attuali",
    focus_1_title: "Salute forestale", focus_1_text: "Deperimento indotto dalla siccità e mortalità arborea negli ecosistemi mediterranei.",
    focus_2_title: "Osservazione della Terra", focus_2_text: "Serie temporali Sentinel-2, immagini ad alta risoluzione e indicatori spaziali.",
    focus_3_title: "Modellistica spaziale", focus_3_text: "Machine learning, GIS e cartografia predittiva per il monitoraggio forestale.",
    research_eyebrow: "Ricerca", research_title: "Ecosistemi forestali nel cambiamento ambientale",
    research_lead: "La mia ricerca unisce interpretazione ecologica e tecnologie geospaziali per rilevare, quantificare e spiegare i cambiamenti nelle foreste mediterranee.",
    research_1_title: "Salute forestale & deperimento", research_1_text: "Rilevamento e modellizzazione del deperimento delle chiome associato alla siccità, della mortalità arborea e del declino forestale.",
    research_2_title: "Telerilevamento", research_2_text: "Osservazioni satellitari e aeree per monitorare condizioni delle chiome, disturbi e dinamiche degli ecosistemi.",
    research_3_title: "GIS & modellistica spaziale", research_3_text: "Analisi geospaziali e workflow di machine learning orientati a risultati cartografici interpretabili.",
    projects_eyebrow: "Progetti & temi", projects_title: "Linee di ricerca selezionate",
    project_1_title: "Monitoraggio della salute delle querce mediterranee tramite telerilevamento",
    project_1_text: "Ricerca sulla salute delle querce mediterranee integrando telerilevamento, osservazioni di campo e indicatori di salute forestale.",
    project_2_title: "Deperimento forestale indotto dalla siccità",
    project_2_text: "Rilevamento, mappatura e modellizzazione del deperimento del leccio tramite Sentinel-2 e metodi di machine learning.",
    project_3_title: "Pascolamento forestale & severità degli incendi",
    project_3_text: "Valutazione del pascolamento forestale controllato come strategia di mitigazione della severità degli incendi nei paesaggi mediterranei.",
    pub_eyebrow: "Pubblicazioni", pub_title: "Produzione scientifica selezionata", pub_all: "Tutte le pubblicazioni su ORCID",
    about_eyebrow: "Profilo", about_title: "Ecologia, osservazione della Terra e mappe.",
    about_text_1: "Sono un ecologo forestale e ricercatore in telerilevamento con un PhD in Scienze Agrarie. La mia attività si concentra sulla salute delle foreste mediterranee e sugli effetti di siccità, cambiamento climatico e altri stressori sugli ecosistemi forestali.",
    about_text_2: "Integro osservazioni di campo, immagini satellitari, GIS, analisi spaziale e machine learning, con particolare attenzione a prodotti cartografici robusti a supporto dell'interpretazione ecologica e del monitoraggio forestale.",
    affiliation_label: "Affiliazione attuale", location_label: "Sede",
    footer_role: "Ecologo forestale · Ricercatore in telerilevamento", footer_note: "Portfolio di ricerca · EN / IT"
  }
};

const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const langToggle = document.querySelector("#lang-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") document.body.classList.add("dark");
themeToggle.textContent = document.body.classList.contains("dark") ? "☾" : "☼";

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  themeToggle.textContent = dark ? "☾" : "☼";
  localStorage.setItem("theme", dark ? "dark" : "light");
});

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key]) el.textContent = translations[lang][key];
  });
  langToggle.textContent = lang === "en" ? "IT" : "EN";
  localStorage.setItem("language", lang);
}

let language = localStorage.getItem("language") || "en";
setLanguage(language);

langToggle?.addEventListener("click", () => {
  language = document.documentElement.lang === "en" ? "it" : "en";
  setLanguage(language);
});

const sections = [...document.querySelectorAll("main section[id]")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
sections.forEach(section => observer.observe(section));

document.querySelector("#year").textContent = new Date().getFullYear();
