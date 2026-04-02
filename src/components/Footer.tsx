import { motion } from "motion/react";
import { Github, Linkedin, Youtube, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/roiskhoiron",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/rois-khoiron",
    label: "LinkedIn",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@codingskuy",
    label: "YouTube",
  },
  {
    icon: Mail,
    href: "mailto:rois.khoiron@gmail.com",
    label: "Email",
  },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#timeline", label: "Timeline" },
  { href: "#chefgenie", label: "ChefGenie" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-violet-600 rounded-md flex items-center justify-center">
                <span className="text-white text-[10px] tracking-tight">RK</span>
              </div>
              <span className="text-slate-800 dark:text-white text-sm tracking-tight">
                Rois Khoiron
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-600 max-w-[200px]">
              Mobile Product Engineer building AI-native experiences.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-xs text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] flex items-center justify-center text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/[0.15] transition-all"
              >
                <social.icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} Rois Khoiron · All rights reserved
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600 italic">
            "Shipping real intelligence, not just demo AI."
          </p>
        </div>
      </div>
    </footer>
  );
}
