import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ScrollSmoother } from "../components/ScrollSmoother";
import { HeroSection } from "./components/HeroSection";
import { ShowcaseSection } from "./components/ShowcaseSection";
import { AboutSection } from "./components/AboutSection";
import { MetricsSection } from "./components/MetricsSection";
import { ExpertiseSection } from "./components/ExpertiseSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { MediaHubSection } from "./components/MediaHubSection";
import { LearningPathsSection } from "./components/LearningPathsSection";
import { AILabSection } from "./components/AILabSection";
import { OpenSourceSection } from "./components/OpenSourceSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContentLibrarySection } from "./components/ContentLibrarySection";
import { CommunitySection } from "./components/CommunitySection";
import { NewsletterSection } from "./components/NewsletterSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDark = () => setDarkMode((prev) => !prev);

  return (
    <div
      className="min-h-screen"
      style={{
        background: darkMode ? "#060b18" : "#f0f4ff",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      <ScrollSmoother />
      <Navbar darkMode={darkMode} toggleDark={toggleDark} />

<main>
          <HeroSection darkMode={darkMode} />
          <ShowcaseSection darkMode={darkMode} />
          <AboutSection darkMode={darkMode} />
        <MetricsSection darkMode={darkMode} />
        <ExpertiseSection darkMode={darkMode} />
        <PortfolioSection darkMode={darkMode} />
        <MediaHubSection darkMode={darkMode} />
        <LearningPathsSection darkMode={darkMode} />
        <ContentLibrarySection darkMode={darkMode} />
        <AILabSection darkMode={darkMode} />
        <OpenSourceSection darkMode={darkMode} />
        <ExperienceSection darkMode={darkMode} />
        <CommunitySection darkMode={darkMode} />
        <NewsletterSection darkMode={darkMode} />
        <ContactSection darkMode={darkMode} />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
