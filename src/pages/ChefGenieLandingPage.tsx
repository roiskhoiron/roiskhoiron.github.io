import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowDown,
  BrainCircuit,
  ChefHat,
  Coins,
  CookingPot,
  HeartPulse,
  Store,
  Users,
  Sparkles,
  Menu,
  X,
  Globe,
  Flame,
  Star,
  Download,
  Play,
  Apple,
} from "lucide-react";
import { useEffect, useState, useId } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// ─── Assets ──────────────────────────────────────────────────────────────────
import imgMeet from "../assets/chefgenie/img_meet_chefgenie_your_ai_assistant.png";
import imgDashboard from "../assets/chefgenie/img_dashboard_utama_chefgenie.png";
import imgVision from "../assets/chefgenie/img_panduan_memasak_ai_vision.png";
import imgFinance from "../assets/chefgenie/img_keuangan_dapur_bisnis_chefgenie.png";
import imgWorld from "../assets/chefgenie/img_realistic_cartoon_food_world.png";
import imgVendorPeek from "../assets/chefgenie/img_vendor_peek_light_mode.png";
import imgCreator from "../assets/chefgenie/img_tampilan_konten_memasak_chefgenie.png";
import imgExplore from "../assets/chefgenie/img_jelajahi_chefgenie.png";
import imgNutrition from "../assets/chefgenie/img_saran_menu_untuk_ibu_rumah_tangga.png";
import imgBusiness from "../assets/chefgenie/img_dasbor_toko_online_bisnis.png";
import imgWelcome1 from "../assets/chefgenie/img_welcome_to_chefgenie_1.png";
import imgChat from "../assets/chefgenie/img_panduan_memasak_ai_chat.png";
import imgIdeMenu from "../assets/chefgenie/img_ide_menu_bisnis_chefgenie.png";

// ─── PhoneMockup Component ───────────────────────────────────────────────────

interface PhoneMockupProps {
  src: string;
  alt: string;
  rotate?: number;
  scale?: number;
  className?: string;
  glow?: boolean;
  glowColor?: string;
}

function PhoneMockup({
  src,
  alt,
  rotate = 0,
  scale = 1,
  className = "",
  glow = true,
  glowColor = "#ff5c28",
}: PhoneMockupProps) {
  const uid = useId().replace(/:/g, "-");
  const clipId = `clip-${uid}`;

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        transform: `rotate(${rotate}deg) scale(${scale})`,
        filter: glow
          ? `drop-shadow(0 30px 90px ${glowColor}55) drop-shadow(0 0 40px ${glowColor}25)`
          : undefined,
      }}
    >
      <svg
        viewBox="0 0 280 572"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label={alt}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="13" y="16" width="254" height="540" rx="37" ry="37" />
          </clipPath>
          <linearGradient id={`glare-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.06" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer shell */}
        <rect x="0" y="0" width="280" height="572" rx="52" ry="52" fill="#1c1c1e" />
        {/* Inner bezel */}
        <rect
          x="3"
          y="3"
          width="274"
          height="566"
          rx="49"
          ry="49"
          fill="#111111"
          stroke="#2c2c2e"
          strokeWidth="1"
        />
        {/* Screen background */}
        <rect x="13" y="16" width="254" height="540" rx="37" ry="37" fill="#000" />

        {/* App screenshot */}
        <image
          href={src}
          x="13"
          y="16"
          width="254"
          height="540"
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYTop slice"
        />

        {/* Dynamic Island */}
        <rect x="102" y="25" width="76" height="26" rx="13" ry="13" fill="#000000" />

        {/* Volume up/down (left) */}
        <rect x="-1" y="148" width="4" height="44" rx="2" ry="2" fill="#2c2c2e" />
        <rect x="-1" y="210" width="4" height="72" rx="2" ry="2" fill="#2c2c2e" />
        {/* Silent switch (left) */}
        <rect x="-1" y="100" width="4" height="30" rx="2" ry="2" fill="#2c2c2e" />
        {/* Power button (right) */}
        <rect x="277" y="188" width="4" height="72" rx="2" ry="2" fill="#2c2c2e" />

        {/* Glare overlay */}
        <rect
          x="13"
          y="16"
          width="254"
          height="540"
          rx="37"
          ry="37"
          fill={`url(#glare-${uid})`}
        />

        {/* Home indicator */}
        <rect x="110" y="548" width="60" height="5" rx="2.5" ry="2.5" fill="#2c2c2e" />
      </svg>
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
      <Icon className="w-3.5 h-3.5 text-orange-400" />
      <span className="text-xs font-medium tracking-widest uppercase text-orange-400">{label}</span>
    </div>
  );
}

// ─── Feature Section Row ──────────────────────────────────────────────────────

interface FeatureRowProps {
  label: string;
  labelIcon: React.ElementType;
  headline: string;
  desc: string;
  bullets: string[];
  phoneSrc: string;
  phoneAlt: string;
  phoneRight?: boolean;
  phoneRotate?: number;
  accent?: string;
  secondPhone?: { src: string; alt: string; rotate?: number };
}

function FeatureRow({
  label,
  labelIcon,
  headline,
  desc,
  bullets,
  phoneSrc,
  phoneAlt,
  phoneRight = false,
  phoneRotate = -4,
  accent = "#ff5c28",
  secondPhone,
}: FeatureRowProps) {
  const phoneBlock = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-center gap-4 lg:gap-6"
    >
      {secondPhone && (
        <div className="w-[180px] lg:w-[200px] mt-10 opacity-70">
          <PhoneMockup
            src={secondPhone.src}
            alt={secondPhone.alt}
            rotate={secondPhone.rotate ?? 4}
            glow={false}
          />
        </div>
      )}
      <div className="w-[240px] lg:w-[270px]">
        <PhoneMockup src={phoneSrc} alt={phoneAlt} rotate={phoneRotate} glowColor={accent} />
      </div>
    </motion.div>
  );

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className="space-y-6"
    >
      <SectionLabel icon={labelIcon} label={label} />
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
        dangerouslySetInnerHTML={{ __html: headline }}
      />
      <p className="text-base text-white/50 leading-relaxed max-w-md">{desc}</p>
      <ul className="space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: accent }}
            />
            <span className="text-sm text-white/60">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      {phoneRight ? (
        <>
          {textBlock}
          {phoneBlock}
        </>
      ) : (
        <>
          {phoneBlock}
          {textBlock}
        </>
      )}
    </div>
  );
}

// ─── Nav links ────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "#fitur", label: "Fitur" },
  { href: "#path", label: "User Journey" },
  { href: "#marketplace", label: "Marketplace" },
  { href: "#download", label: "Download" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export function ChefGenieLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "ChefGenie | Your AI Kitchen Companion";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "ChefGenie adalah AI-powered kitchen app untuk cooking guidance, smart finance, creator tools, dan proximity digital marketplace."
    );
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      {/* Global noise texture overlay */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="/#chefgenie"
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm tracking-tight">ChefGenie</span>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="px-3 py-1.5 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all"
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/#chefgenie"
                className="hidden sm:inline-flex text-xs text-white/30 hover:text-white/70 transition-colors"
              >
                ← Portfolio
              </a>
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); scrollTo("#download"); }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rounded-xl shadow-lg shadow-orange-500/25 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
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
                className="md:hidden overflow-hidden border-t border-white/[0.06]"
              >
                <div className="py-3 space-y-1">
                  {navLinks.map((l) => (
                    <button
                      key={l.href}
                      onClick={() => scrollTo(l.href)}
                      className="block w-full text-left px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ══════════════════════════════════════════ */}
      {/* ── HERO ── */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-12 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-orange-600/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,92,40,0.6) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-xs text-orange-400 tracking-widest uppercase font-medium">
                AI-Powered Kitchen Companion
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center space-y-3 mb-10"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
              Dapur Cerdas
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              di Genggamanmu
            </h1>
            <p className="text-lg text-white/40 max-w-lg mx-auto leading-relaxed mt-4">
              ChefGenie menggabungkan AI decision engine, kitchen operations, dan creator economy — semuanya dalam satu aplikasi mobile.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); scrollTo("#download"); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-2xl shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" /> Lihat Cara Kerjanya
            </a>
            <a
              href="#fitur"
              onClick={(e) => { e.preventDefault(); scrollTo("#fitur"); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white text-sm font-medium rounded-2xl transition-all hover:scale-105"
            >
              Explore Fitur <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Phone duo */}
          <div className="flex items-end justify-center gap-4 sm:gap-8 lg:gap-12">
            {/* Left phone — tilted, slightly behind */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="w-[160px] sm:w-[200px] lg:w-[240px] mb-0 opacity-80"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <PhoneMockup src={imgMeet} alt="ChefGenie onboarding screen" rotate={0} glow={false} />
              </motion.div>
            </motion.div>

            {/* Center phone — main, upright */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
              className="w-[200px] sm:w-[250px] lg:w-[290px] z-10"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneMockup src={imgDashboard} alt="ChefGenie dashboard utama" rotate={0} glowColor="#ff5c28" />
              </motion.div>
            </motion.div>

            {/* Right phone — tilted other direction */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: 8 }}
              animate={{ opacity: 1, y: 0, rotate: 8 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="w-[160px] sm:w-[200px] lg:w-[240px] mb-0 opacity-80"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <PhoneMockup src={imgWelcome1} alt="ChefGenie welcome screen" rotate={0} glow={false} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* ── FEATURE SECTIONS ── */}
      {/* ══════════════════════════════════════════ */}
      <div id="fitur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-24">

        {/* Section 1 — AI Kitchen Companion */}
        <FeatureRow
          label="AI Companion"
          labelIcon={Sparkles}
          headline="Asisten Dapur<br/>yang Selalu Siap"
          desc="ChefGenie hadir di setiap sesi masak — dari saran menu pagi hari, manajemen stok kulkas, hingga panduan langkah-demi-langkah secara real-time."
          bullets={[
            "Genie's Pick — rekomendasi menu berdasarkan bahan yang hampir expired",
            "Fridge Alert — notifikasi cerdas bahan mendekati kedaluwarsa",
            "Quick Actions: Scan Fridge, Generate Recipe, Plan Meals",
          ]}
          phoneSrc={imgDashboard}
          phoneAlt="Dashboard utama ChefGenie"
          phoneRight={true}
          phoneRotate={-5}
          accent="#ff5c28"
        />

        {/* Section 2 — AI Vision */}
        <FeatureRow
          label="AI Vision Cooking"
          labelIcon={BrainCircuit}
          headline="Masak dengan<br/>Mata AI"
          desc="Kamera smartphone kamu menjadi sous-chef. ChefGenie melihat kondisi masakan secara real-time dan memberi instruksi presisi."
          bullets={[
            "Deteksi bahan secara visual — cukup arahkan kamera ke dapur",
            "Monitoring suhu pan dan progres browning secara live",
            "Voice guidance dan step-by-step overlay langsung di layar",
          ]}
          phoneSrc={imgVision}
          phoneAlt="AI Vision cooking guidance"
          phoneRight={false}
          phoneRotate={5}
          accent="#ef4444"
          secondPhone={{ src: imgChat, alt: "AI chat masak", rotate: -6 }}
        />

        {/* Section 3 — Smart Finance */}
        <FeatureRow
          label="Smart Finance"
          labelIcon={Coins}
          headline="Dapur yang<br/>Menghasilkan"
          desc="Bukan hanya masak — ChefGenie membantu kamu memahami cost per meal, margin bisnis kuliner, dan insight keuangan dapur secara real-time."
          bullets={[
            "Total saldo & arus kas dapur dalam satu tampilan",
            "Genie Insight: saran hemat berbasis pola belanja kamu",
            "Lacak pengeluaran: bahan baku, gas, peralatan — semua tercatat",
          ]}
          phoneSrc={imgFinance}
          phoneAlt="Smart Finance ChefGenie"
          phoneRight={true}
          phoneRotate={-6}
          accent="#f59e0b"
        />

        {/* Section 4 — Creator Hub */}
        <FeatureRow
          label="Creator Hub"
          labelIcon={CookingPot}
          headline="Dari Dapur<br/>ke Konten"
          desc="Ubah resep terbaik kamu jadi konten viral. ChefGenie menyediakan tools untuk produksi, distribusi, dan monetisasi konten kuliner."
          bullets={[
            "Studio konten terintegrasi — rekam, edit, publish langsung dari app",
            "Ide menu bisnis berbasis tren kuliner terkini",
            "Rekrut tenaga ahli masak dan bangun tim kuliner profesional",
          ]}
          phoneSrc={imgCreator}
          phoneAlt="Creator Hub ChefGenie"
          phoneRight={false}
          phoneRotate={4}
          accent="#8b5cf6"
          secondPhone={{ src: imgIdeMenu, alt: "Ide menu bisnis", rotate: -5 }}
        />
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* ── MARKETPLACE WORLD ── */}
      {/* ══════════════════════════════════════════ */}
      <section id="marketplace" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <SectionLabel icon={Globe} label="Proximity Marketplace" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Jelajahi Dunia<br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Kuliner Terdekatmu
              </span>
            </h2>
            <p className="mt-5 text-white/40 max-w-xl mx-auto leading-relaxed">
              ChefGenie World menghadirkan pengalaman berbelanja kuliner seperti menjelajahi game — gerakkan avatar, temukan stall terdekat, dan checkout tanpa keluar dari dunia virtual.
            </p>
          </motion.div>

          {/* Phones in perspective arrangement */}
          <div className="flex items-end justify-center gap-6 lg:gap-10 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: -10 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-[180px] lg:w-[220px] opacity-70"
            >
              <PhoneMockup src={imgVendorPeek} alt="Vendor peek" rotate={0} glow={false} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
              className="w-[230px] lg:w-[280px] z-10"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneMockup src={imgWorld} alt="ChefGenie World proximity marketplace" rotate={0} glowColor="#f59e0b" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 10 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-[180px] lg:w-[220px] opacity-70"
            >
              <PhoneMockup src={imgExplore} alt="Jelajahi ChefGenie" rotate={0} glow={false} />
            </motion.div>
          </div>

          {/* Flow steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Exploration", desc: "Gerakkan avatar di world map via joystick" },
              { num: "02", title: "Proximity Trigger", desc: "Stall terdekat otomatis di-highlight" },
              { num: "03", title: "Peek & Order", desc: "Mini-card muncul, one tap ke cart" },
              { num: "04", title: "Checkout", desc: "Cart di HUD, tidak perlu keluar dari world" },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 hover:border-orange-500/30 hover:bg-white/[0.05] transition-all"
              >
                <p className="text-xs font-mono text-orange-500 mb-2">{step.num}</p>
                <p className="font-semibold text-white text-sm mb-1">{step.title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* ── CHOOSE YOUR PATH ── */}
      {/* ══════════════════════════════════════════ */}
      <section id="path" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <SectionLabel icon={Users} label="Choose Your Path" />
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              ChefGenie untuk <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Semua Orang
              </span>
            </h2>
            <p className="mt-5 text-white/40 max-w-md mx-auto">
              Dari pecinta masak santai hingga pebisnis kuliner — ChefGenie menyesuaikan diri dengan kebutuhanmu.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 items-end">
            {[
              {
                icon: ChefHat,
                title: "Hobbyist",
                subtitle: "Masak Lebih Fun",
                desc: "Jelajahi menu kreatif, kurangi bingung masak harian, dan nikmati pengalaman dapur yang lebih menyenangkan.",
                src: imgExplore,
                alt: "Hobbyist path",
                accent: "#f97316",
                size: "lg:w-[220px]",
                rotate: -4,
              },
              {
                icon: HeartPulse,
                title: "Nutrition Seeker",
                subtitle: "Makan Lebih Sehat",
                desc: "Bangun pola makan seimbang dengan meal plan adaptif sesuai dengan target gizi keluargamu.",
                src: imgNutrition,
                alt: "Nutrition seeker path",
                accent: "#ec4899",
                size: "lg:w-[240px]",
                rotate: 0,
              },
              {
                icon: Store,
                title: "Business Owner",
                subtitle: "Cuan dari Dapur",
                desc: "Kelola biaya, stok, dan peluang bisnis kuliner melalui dashboard yang actionable dan mudah dipahami.",
                src: imgBusiness,
                alt: "Business owner path",
                accent: "#f59e0b",
                size: "lg:w-[220px]",
                rotate: 4,
              },
            ].map((path, idx) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.12, duration: 0.7 }}
                  className="flex flex-col items-center text-center gap-6"
                >
                  {/* Phone */}
                  <div className={`w-[200px] ${path.size} mx-auto`}>
                    <PhoneMockup
                      src={path.src}
                      alt={path.alt}
                      rotate={path.rotate}
                      glowColor={path.accent}
                      glow={true}
                    />
                  </div>

                  {/* Text */}
                  <div className="space-y-2">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        color: path.accent,
                        borderColor: `${path.accent}40`,
                        background: `${path.accent}15`,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {path.title}
                    </div>
                    <h3 className="text-xl font-bold text-white">{path.subtitle}</h3>
                    <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
                      {path.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* ── STATS BAR ── */}
      {/* ══════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "3", label: "Pilar AI Utama" },
            { value: "35+", label: "Screen Flows Dirancang" },
            { value: "360°", label: "Proximity Marketplace" },
            { value: "∞", label: "Kemungkinan Resep" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-white/30 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* ── DOWNLOAD CTA ── */}
      {/* ══════════════════════════════════════════ */}
      <section id="download" className="py-32 relative overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-orange-600/12 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs text-orange-400 uppercase tracking-widest font-medium">
                Coming Soon
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Siap Mengubah<br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Cara Kamu Memasak?
              </span>
            </h2>
            <p className="text-lg text-white/40 max-w-md mx-auto leading-relaxed">
              Daftarkan email untuk mendapat akses awal dan notifikasi saat ChefGenie resmi diluncurkan.
            </p>

            {/* Email input */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="emailkamu@gmail.com"
                className="flex-1 rounded-2xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl bg-orange-500 hover:bg-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-500/25 transition-colors"
              >
                Notify Me
              </motion.button>
            </div>

            {/* Store badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] transition-all hover:scale-105 group"
              >
                <Play className="w-5 h-5 text-white/60 group-hover:text-white transition-colors fill-current" />
                <div className="text-left">
                  <p className="text-[10px] text-white/40 leading-none">GET IT ON</p>
                  <p className="text-sm font-semibold text-white leading-tight">Google Play</p>
                </div>
              </a>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] transition-all hover:scale-105 group"
              >
                <Apple className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                <div className="text-left">
                  <p className="text-[10px] text-white/40 leading-none">DOWNLOAD ON THE</p>
                  <p className="text-sm font-semibold text-white leading-tight">App Store</p>
                </div>
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-1 pt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
              ))}
              <span className="text-xs text-white/30 ml-2">
                Bergabung bersama 1,200+ early adopter
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-amber-500 rounded-md flex items-center justify-center">
              <ChefHat className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm text-white/60 font-medium">ChefGenie</span>
          </div>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} ChefGenie · All rights reserved.
          </p>
          <a
            href="/#chefgenie"
            className="text-xs text-white/20 hover:text-white/60 transition-colors"
          >
            ← Kembali ke Portfolio
          </a>
        </div>
      </footer>
    </main>
  );
}
