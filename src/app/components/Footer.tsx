import { motion } from "motion/react";
import { Github, Youtube, Linkedin, Twitter, Code2, Heart } from "lucide-react";
import { CodingSkuyMascot } from "./CodingSkuyMascot";
import logoBg from "@/assets/simple_landsacape_logo.jpeg";

interface FooterProps {
  darkMode: boolean;
}

const footerLinks = {
  Personal: [
    { label: "About Me", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  CodingSkuy: [
    { label: "Articles", href: "#media" },
    { label: "Tutorials", href: "#media" },
    { label: "Learning Paths", href: "#learning" },
    { label: "Community", href: "#community" },
  ],
  "Research & OS": [
    { label: "AI Lab", href: "#ailab" },
    { label: "Open Source", href: "#opensource" },
    { label: "GitHub Projects", href: "#" },
    { label: "Newsletter", href: "#newsletter" },
  ],
};

const socials = [
  { icon: Github, href: "#", label: "GitHub", color: "#e8f0ff" },
  { icon: Youtube, href: "#", label: "YouTube", color: "#FF0000" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0077B5" },
  { icon: Twitter, href: "#", label: "Twitter", color: "#1DA1F2" },
];

export function Footer({ darkMode }: FooterProps) {
  const borderColor = darkMode ? "rgba(61,139,255,0.12)" : "rgba(0,85,255,0.08)";
  const textMuted = darkMode ? "#4a5f8a" : "#94a3b8";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";

  return (
    <footer
      className="relative pt-20 pb-8 overflow-hidden"
      style={{
        background: darkMode
          ? "linear-gradient(to top, #030712 0%, #060b18 100%)"
          : "linear-gradient(to top, #e8edff 0%, #f0f4ff 100%)",
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      {/* Logo watermark — blind filter */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={logoBg}
          alt=""
          className="w-96 h-96 object-contain"
          style={{
            filter: "grayscale(100%) blur(4px)",
            opacity: darkMode ? 0.04 : 0.06,
            transform: "rotate(-8deg)",
          }}
        />
      </div>

      {/* BG grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${darkMode ? "#3d8bff" : "#0055ff"} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? "#3d8bff" : "#0055ff"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0055ff] to-[#00d4ff] flex items-center justify-center shadow-lg shadow-[#0055ff]/30">
                <Code2 size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight" style={{ color: "#3d8bff" }}>CodingSkuy!</p>
                <p className="text-xs font-semibold leading-tight" style={{ color: textMain }}>by Rois Khoiron</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: textMuted }}>
              Platform belajar, media teknologi, AI lab, dan komunitas untuk developer Indonesia. Learning Technology Should Be Fun.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: darkMode ? "rgba(61,139,255,0.08)" : "rgba(0,85,255,0.05)",
                    border: `1px solid ${borderColor}`,
                    color: textMuted,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = color; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = textMuted; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-bold mb-4" style={{ color: textMain }}>{group}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm transition-all hover:translate-x-1 inline-block"
                      style={{ color: textMuted }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#3d8bff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = textMuted; }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom — mascot + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
          <p className="text-xs text-center sm:text-left" style={{ color: textMuted }}>
            © 2024 CodingSkuy! by Rois Khoiron — Made with{" "}
            <Heart size={11} className="inline text-[#ff6b35]" fill="currentColor" /> for Indonesian Developers
          </p>

          {/* Mini mascot waving */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <CodingSkuyMascot variant="wave" size={60} />
          </motion.div>

          <div className="flex gap-4 text-xs" style={{ color: textMuted }}>
            <a href="#" className="hover:text-[#3d8bff] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#3d8bff] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#3d8bff] transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
