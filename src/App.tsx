import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { BrandingSection } from "./components/BrandingSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <ExperienceSection />
      <BrandingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
