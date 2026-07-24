import { useEffect } from "react";

interface SEOHeadProps {
  currentRoute: string;
  oceanId?: string;
}

const ROUTE_SEO: Record<
  string,
  { title: string; description: string; keywords: string }
> = {
  home: {
    title: "SUBMERGE – AI-Powered Ocean Intelligence Platform & Marine Analytics",
    description:
      "SUBMERGE is a research-grade ocean intelligence platform using AI environmental analytics, oceanographic telemetry, marine pollution tracking, and coral conservation data.",
    keywords:
      "ocean intelligence platform, marine pollution monitoring, AI environmental analytics, ocean data visualization, ocean health index",
  },
  dashboard: {
    title: "Real-Time Telemetry Dashboard | SUBMERGE Ocean Intel",
    description:
      "Live oceanographic dashboard monitoring toxic chemical spills, plastic waste accumulation, composite ocean health scores, and AI environmental recovery models.",
    keywords:
      "ocean telemetry dashboard, real-time ocean health index, marine waste tracker, toxic spill telemetry, ocean sensor data",
  },
  overview: {
    title: "Global Ocean Overview & Ecosystem Analysis | SUBMERGE",
    description:
      "Comprehensive ocean basin telemetry, temperature profile, salinity indices, water reusability metrics, and chemical compound analytics across global oceans.",
    keywords:
      "global ocean overview, ocean salinity data, marine temperature monitoring, water reusability index, oceanic basin statistics",
  },
  pollution: {
    title: "Marine Pollution & Microplastics Analysis | SUBMERGE",
    description:
      "Advanced AI tracking of marine plastic density, toxic effluent discharge, coastal waste accumulation, and environmental risk mitigation.",
    keywords:
      "marine pollution monitoring, microplastics tracker, coastal waste density, ocean plastics analytics, toxic discharge detection",
  },
  chemical: {
    title: "Chemical Compound & Water Signature Detection | SUBMERGE",
    description:
      "Real-time spectral analysis of oceanic chemical compounds, heavy metal contamination, pH levels, dissolved oxygen, and industrial discharge fingerprints.",
    keywords:
      "ocean chemical analytics, dissolved oxygen telemetry, ocean pH tracking, marine heavy metal detection, chemical spill signature",
  },
  water: {
    title: "Ocean Water Quality & Salinity Telemetry | SUBMERGE",
    description:
      "Scientific water quality monitoring, salinity profiling, turbidity assessment, and marine environmental safety classification.",
    keywords:
      "ocean water quality index, salinity telemetry, ocean turbidity analysis, marine water safety, oceanographic sensor network",
  },
  waste: {
    title: "Ocean Waste & Debris Accumulation Detection | SUBMERGE",
    description:
      "Autonomous AI detection and mapping of floating plastic debris, submerged waste piles, and riverine pollution sources.",
    keywords:
      "ocean waste detection, floating debris mapping, marine trash tracker, riverine pollution monitoring, microplastic concentration",
  },
  industry: {
    title: "Industrial Pollution Source Identification | SUBMERGE",
    description:
      "AI fingerprint matching correlation matrix identifying industrial facilities responsible for toxic maritime chemical signatures and illegal dumping.",
    keywords:
      "industrial pollution detection, ocean discharge fingerprinting, environmental crime tracking, chemical pollution attribution, industrial maritime risk",
  },
  marine: {
    title: "Marine Life & Species Biodiversity Monitoring | SUBMERGE",
    description:
      "Taxonomic tracking, population density telemetry, endangered marine species conservation, and acoustic telemetry analysis.",
    keywords:
      "marine life monitoring, marine species taxonomy, biodiversity index, whale migration telemetry, endangered sea life protection",
  },
  coral: {
    title: "Coral Reef Bleaching & Ecosystem Health | SUBMERGE",
    description:
      "Satellite and underwater sensor monitoring of coral thermal stress, bleaching alerts, reef calcification rates, and restoration progress.",
    keywords:
      "coral health index, coral bleaching detection, reef calcification telemetry, marine thermal stress alert, coral reef restoration",
  },
  recovery: {
    title: "AI Ocean Recovery & Ecosystem Restoration Solutions | SUBMERGE",
    description:
      "Predictive AI-generated environmental intervention plans, ocean cleanup schedules, coral nursery deployment, and biodiversity restoration timelines.",
    keywords:
      "ocean recovery plan, marine ecosystem restoration, AI cleanup scheduling, coral nursery deployment, marine conservation software",
  },
  map: {
    title: "Interactive Global Ocean Basin Map | SUBMERGE",
    description:
      "Interactive 3D ocean globe and basin map showing live sensor stations, telemetry hotspots, plastic gyres, and marine sanctuary boundaries.",
    keywords:
      "global ocean map, interactive marine map, ocean hotspot visualization, plastic gyre locator, oceanographic GIS data",
  },
  reports: {
    title: "Oceanographic Research Reports & Environmental Data | SUBMERGE",
    description:
      "Download scientific ocean health research reports, multi-basin comparison matrices, telemetry datasets, and peer-reviewed environmental studies.",
    keywords:
      "ocean research reports, oceanographic data export, marine health comparison, environmental dataset download, ocean intelligence whitepaper",
  },
  ai: {
    title: "ABYSS AI Assistant – Maritime Intelligence | SUBMERGE",
    description:
      "Converse with ABYSS, our fine-tuned ocean intelligence AI, to query telemetry logs, model pollution trajectories, and diagnose ecosystem threats.",
    keywords:
      "ocean AI assistant, ABYSS maritime AI, environmental query engine, ocean data chatbot, marine science AI assistant",
  },
  biodiversity: {
    title: "Marine Species Catalog & Ecological Taxonomy | SUBMERGE",
    description:
      "Explore detailed taxonomy, habitat depth, IUCN red list conservation status, and population statistics for global marine species.",
    keywords:
      "marine species catalog, fish taxonomy database, marine biodiversity encyclopedia, IUCN marine red list, ocean habitat guide",
  },
  about: {
    title: "About SUBMERGE – Ocean Intelligence Manifesto & Mission",
    description:
      "Learn about our mission to combine artificial intelligence, satellite telemetry, and autonomous sensor networks to safeguard Earth's oceans.",
    keywords:
      "about SUBMERGE, ocean intelligence mission, marine conservation technology, ocean science organization, ocean AI platform",
  },
  contact: {
    title: "Contact SUBMERGE Operations & Dispatch Station",
    description:
      "Connect with SUBMERGE research team, report environmental ocean anomalies, or request enterprise telemetry data feeds.",
    keywords:
      "contact SUBMERGE, ocean telemetry support, report marine pollution, ocean intelligence dispatch, environmental data inquiry",
  },
};

export default function SEOHead({ currentRoute }: SEOHeadProps) {
  useEffect(() => {
    const seo = ROUTE_SEO[currentRoute] || ROUTE_SEO.home;

    // Update title
    document.title = seo.title;

    // Helper function to set/create meta element
    const setMetaTag = (attr: "name" | "property", key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update canonical link
    const setCanonical = (url: string) => {
      let canonical = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
    };

    // Core Meta
    setMetaTag("name", "description", seo.description);
    setMetaTag("name", "keywords", seo.keywords);

    // Open Graph Meta
    setMetaTag("property", "og:title", seo.title);
    setMetaTag("property", "og:description", seo.description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:url", `https://submerge-ocean.intel/#/${currentRoute}`);

    // Twitter Meta
    setMetaTag("name", "twitter:title", seo.title);
    setMetaTag("name", "twitter:description", seo.description);

    // Canonical link update
    setCanonical(`https://submerge-ocean.intel/#/${currentRoute}`);
  }, [currentRoute]);

  return null;
}
