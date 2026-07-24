import { useState, useEffect } from "react";
import AIAssistant from "./components/AIAssistant";
import AmbientSound from "./components/AmbientSound";
import IntroSequence from "./components/IntroSequence";
import SEOHead from "./components/SEOHead";


import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Biodiversity from "./components/Biodiversity";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import CommandCenter from "./components/dashboard/CommandCenter";
import {
  PollutionPage,
  MarineLifePage,
  CoralPage,
  WastePage,
  ChemicalPage,
  WaterQualityPage,
  RecoveryPage,
  MapPage,
  ReportsPage,
  SettingsPage,
  AIPage,
} from "./components/dashboard/FeaturePages";
import IndustrySourcePage from "./components/dashboard/IndustrySourcePage";

export default function SubmergeApp() {
  const [route, setRoute] = useState<string>("home");
  const [selectedOceanId, setSelectedOceanId] = useState<string>("pacific");
  const [showIntro, setShowIntro] = useState<boolean>(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) {
        setRoute("home");
        return;
      }
      const cleanPath = hash.replace("#/", "");
      if (cleanPath.startsWith("ocean/")) {
        const id = cleanPath.split("/")[1];
        setSelectedOceanId(id || "pacific");
        setRoute("dashboard");
      } else {
        setRoute(cleanPath || "home");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleEnter = () => {
    setShowIntro(false);
    window.scrollTo({ top: 0 });
  };

  const isLanding = route === "home";

  const renderRouted = () => {
    switch (route) {
      case "dashboard":
        return <CommandCenter oceanId={selectedOceanId} />;
      case "overview":
        return <Dashboard oceanId={selectedOceanId} />;
      case "pollution":
        return <PollutionPage oceanId={selectedOceanId} />;
      case "marine":
        return <MarineLifePage oceanId={selectedOceanId} />;
      case "coral":
        return <CoralPage oceanId={selectedOceanId} />;
      case "waste":
        return <WastePage oceanId={selectedOceanId} />;
      case "chemical":
        return <ChemicalPage oceanId={selectedOceanId} />;
      case "industry":
        return <IndustrySourcePage oceanId={selectedOceanId} />;
      case "water":
        return <WaterQualityPage oceanId={selectedOceanId} />;
      case "recovery":
        return <RecoveryPage oceanId={selectedOceanId} />;
      case "map":
        return <MapPage oceanId={selectedOceanId} setOceanId={setSelectedOceanId} />;
      case "reports":
        return <ReportsPage oceanId={selectedOceanId} />;
      case "ai":
        return <AIPage />;
      case "settings":
        return <SettingsPage />;
      case "biodiversity":
        return <Biodiversity />;
      default:
        return <CommandCenter oceanId={selectedOceanId} />;
    }
  };

  return (
    <div className="relative min-h-screen text-soft-white font-sans selection:bg-neon-aqua/30 selection:text-neon-aqua">
      <SEOHead currentRoute={route} oceanId={selectedOceanId} />
      {showIntro ? (
        <IntroSequence onComplete={handleEnter} />
      ) : (
        <div className="app-shell">
          {isLanding ? (
            <Home setRoute={setRoute} setSelectedOceanId={setSelectedOceanId} />
          ) : (
            <DashboardLayout
              route={route}
              setRoute={setRoute}
              oceanId={selectedOceanId}
              setOceanId={setSelectedOceanId}
            >
              {renderRouted()}
            </DashboardLayout>
          )}
          <AIAssistant />
          <AmbientSound />
        </div>
      )}
    </div>
  );
}
