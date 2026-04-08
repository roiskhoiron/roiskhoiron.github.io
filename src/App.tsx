import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { BrandingSection } from "./components/BrandingSection";
import { CreatorSection } from "./components/CreatorSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NavBar } from "./components/NavBar";
import { ActivityTransparencySection } from "./components/ActivityTransparencySection";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-[#080811] text-slate-900 dark:text-white transition-colors duration-300">
          <NavBar />
          <HeroSection />
          <AboutSection />
          <PortfolioSection />
          <ActivityTransparencySection />
          <SkillsSection />
          <ExperienceSection />
          <BrandingSection />
          <CreatorSection />
          <ContactSection />
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
