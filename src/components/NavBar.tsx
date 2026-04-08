import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage, type Language } from "../contexts/LanguageContext";

const navLinksByLanguage: Record<Language, Array<{ href: string; label: string }>> = {
  id: [
    { href: "#about", label: "Tentang" },
    { href: "#timeline", label: "Perjalanan" },
    { href: "#projects", label: "Proyek" },
    { href: "#chefgenie", label: "ChefGenie" },
    { href: "#philosophy", label: "Filosofi" },
    { href: "#activity", label: "Aktivitas" },
    { href: "#writing", label: "Tulisan" },
    { href: "#content", label: "Konten" },
    { href: "#contact", label: "Kontak" },
  ],
  en: [
    { href: "#about", label: "About" },
    { href: "#timeline", label: "Timeline" },
    { href: "#projects", label: "Projects" },
    { href: "#chefgenie", label: "ChefGenie" },
    { href: "#philosophy", label: "Philosophy" },
    { href: "#activity", label: "Activity" },
    { href: "#writing", label: "Writing" },
    { href: "#content", label: "Content" },
    { href: "#contact", label: "Contact" },
  ],
  zh: [
    { href: "#about", label: "关于" },
    { href: "#timeline", label: "历程" },
    { href: "#projects", label: "项目" },
    { href: "#chefgenie", label: "ChefGenie" },
    { href: "#activity", label: "动态" },
    { href: "#philosophy", label: "理念" },
    { href: "#writing", label: "写作" },
    { href: "#content", label: "内容" },
    { href: "#contact", label: "联系" },
  ],
  ja: [
    { href: "#about", label: "概要" },
    { href: "#timeline", label: "歩み" },
    { href: "#projects", label: "プロジェクト" },
    { href: "#chefgenie", label: "ChefGenie" },
    { href: "#philosophy", label: "哲学" },
    { href: "#activity", label: "アクティビティ" },
    { href: "#writing", label: "執筆" },
    { href: "#content", label: "コンテンツ" },
    { href: "#contact", label: "連絡先" },
  ],
};

export function NavBar() {
  const { language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = navLinksByLanguage[language];

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#080811]/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/[0.06] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white text-xs tracking-tight">RK</span>
            </div>
            <span className="text-slate-800 dark:text-white hidden sm:block text-sm tracking-tight">
              Rois Khoiron
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all duration-150"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:block" />
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-slate-200/60 dark:border-white/[0.06]"
            >
              <div className="py-3 space-y-1">
                <div className="px-3 pb-2">
                  <LanguageSwitcher className="w-full" />
                </div>
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] rounded-lg transition-all"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
