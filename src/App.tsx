import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { BrandingSection } from "./components/BrandingSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">
        <ThemeToggle />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <ExperienceSection />
        <BrandingSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}