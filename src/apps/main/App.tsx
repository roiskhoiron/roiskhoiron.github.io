import { useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { BrandingSection } from "@/components/BrandingSection";
import { CreatorSection } from "@/components/CreatorSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NavBar } from "@/components/NavBar";
import { ActivityTransparencySection } from "@/components/ActivityTransparencySection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MediumArticlesSection } from "@/components/MediumArticlesSection";
import { ScrollSmoother } from "@/components/ScrollSmoother";
import logo from "@/assets/ic_logo.jpeg";

export default function App() {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = logo;
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-[#080811] text-slate-900 dark:text-white transition-colors duration-300">
          <ScrollSmoother />
          <NavBar />
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ActivityTransparencySection />
          <SkillsSection />
          <BrandingSection />
          <PortfolioSection />
          <MediumArticlesSection />
          <CreatorSection />
          <ContactSection />
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
