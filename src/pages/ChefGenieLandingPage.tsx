import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowDown,
  BrainCircuit,
  ChefHat,
  Coins,
  CookingPot,
  HeartPulse,
  MapPinned,
  Store,
  Users,
  Sparkles,
  Menu,
  X,
  Flame,
  Zap,
  Globe,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import imgHero from "../assets/chefgenie/img_dashboard_utama_chefgenie.png";
import imgVision from "../assets/chefgenie/img_panduan_memasak_ai_vision.png";
import imgFinance from "../assets/chefgenie/img_keuangan_dapur_bisnis_chefgenie.png";
import imgCreator from "../assets/chefgenie/img_pusat_kreasi_konten_memasak.png";
import imgMarket from "../assets/chefgenie/img_marketplace_afiliasi_chefgenie.png";
import imgWorld from "../assets/chefgenie/img_realistic_cartoon_food_world.png";
import imgExplore from "../assets/chefgenie/img_jelajahi_chefgenie.png";
import imgBusiness from "../assets/chefgenie/img_dasbor_toko_online_bisnis.png";
import { useEffect, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const featureItems = [
  {
    title: "AI Vision for Cooking",
    desc: "Kenali bahan, ikuti panduan langkah demi langkah, dan eksekusi resep lebih presisi dengan bantuan AI visual.",
    icon: BrainCircuit,
    image: imgVision,
  },
  {
    title: "Smart Finance",
    desc: "Pantau biaya meal, margin bisnis kuliner, dan rekomendasi optimasi belanja dengan insight real-time.",
    icon: Coins,
    image: imgFinance,
  },
  {
    title: "Creator Hub",
    desc: "Produksi konten resep, kelola komunitas, dan monetisasi ide masak di satu ekosistem.",
    icon: CookingPot,
    image: imgCreator,
  },
];

const userPaths = [
  {
    title: "Hobbyist",
    desc: "Jelajahi menu kreatif, kurangi bingung masak harian, dan nikmati pengalaman dapur yang lebih fun.",
    icon: ChefHat,
    image: imgExplore,
    color: "from-orange-500 to-amber-400",
  },
  {
    title: "Nutrition Seeker",
    desc: "Bangun pola makan seimbang dengan meal plan adaptif sesuai target gizi keluarga.",
    icon: HeartPulse,
    image: imgHero,
    color: "from-rose-500 to-pink-400",
  },
  {
    title: "Business Owner",
    desc: "Kelola biaya, stok, dan peluang cuan kuliner melalui dashboard bisnis yang actionable.",
    icon: Store,
    image: imgBusiness,
    color: "from-amber-600 to-orange-500",
  },
];

const flowSteps = [
  { label: "Exploration", desc: "User bergerak di world map via joystick" },
  { label: "Proximity Trigger", desc: "Stall terdekat otomatis di-highlight" },
  { label: "Peek & Order", desc: "Mini-card muncul, one tap quick combo ke cart" },
  { label: "Checkout", desc: "Cart tetap di HUD tanpa keluar dari world" },
];

const stats = [
  { value: "3", label: "Pilar AI Utama" },
  { value: "∞", label: "Resep Kreatif" },
  { value: "360°", label: "Proximity Market" },
];

const navLinks = [
  { href: "#fitur", label: "Fitur" },
  { href: "#path", label: "Choose Path" },
  { href: "#marketplace", label: "Marketplace" },
  { href: "#contact", label: "Kontak" },
];

// ─── FoodOrb Component ───────────────────────────────────────────────────────

function FoodOrb() {
  const floatingLabels = [
    { label: "AI Recipe", x: "6%", y: "18%", delay: 0 },
    { label: "Smart Finance", x: "64%", y: "6%", delay: 0.5 },
    { label: "Proximity Map", x: "72%", y: "70%", delay: 1.1 },
    { label: "Meal Plan", x: "0%", y: "66%", delay: 1.7 },
    { label: "Creator Hub", x: "38%", y: "86%", delay: 0.8 },
  ];

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square select-none">
      {/* Glow layers */}
      <div className="absolute inset-[20%] bg-orange-500/20 dark:bg-orange-500/25 rounded-full blur-[60px]" />
      <div className="absolute inset-[10%] bg-amber-400/10 dark:bg-amber-400/15 rounded-full blur-[80px]" />

      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-orange-300/20 dark:border-orange-400/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_12px_rgba(251,146,60,0.8)]" />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-amber-300/70 rounded-full" />
        <div className="absolute -bottom-1 left-1/3 w-2 h-2 bg-orange-400/50 rounded-full" />
      </motion.div>

      {/* Second ring */}
      <motion.div
        className="absolute inset-[10%] rounded-full border border-amber-400/20 dark:border-amber-500/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-300/60 rounded-full" />
        <div className="absolute top-1/4 -left-1 w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
      </motion.div>

      {/* Inner ring */}
      <motion.div
        className="absolute inset-[22%] rounded-full border border-orange-500/25 dark:border-orange-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
        <div className="absolute -right-1 top-1/3 w-1.5 h-1.5 bg-orange-300/60 rounded-full" />
      </motion.div>

      {/* Center core */}
      <div className="absolute inset-[38%] flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-gradient-to-br from-orange-500/50 to-amber-500/50 backdrop-blur-sm border border-orange-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.35)]"
        >
          <ChefHat className="w-7 h-7 text-orange-200" />
        </motion.div>
      </div>

      {/* Floating labels */}
      {floatingLabels.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0.95, 0.5] }}
          transition={{ duration: 4, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute text-[11px] text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-white/[0.04] border border-orange-100 dark:border-white/[0.08] rounded-full px-2.5 py-1 whitespace-nowrap shadow-sm"
          style={{ left: item.x, top: item.y }}
        >
          {item.label}
        </motion.div>
      ))}

      {/* Scanning pulse */}
      <motion.div
        className="absolute inset-0 rounded-full border border-orange-400/10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function ChefGenieLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "ChefGenie | Dapur Masa Depan Anda";
    const description =
      "ChefGenie adalah AI-powered kitchen ecosystem untuk cooking guidance, smart finance, creator tools, dan proximity digital marketplace.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0d0a06] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.10] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(249,115,22,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-60 w-[700px] h-[700px] bg-orange-500/6 dark:bg-orange-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-600/8 rounded-full blur-[110px]" />
        <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-rose-500/4 dark:bg-rose-600/6 rounded-full blur-[90px]" />
      </div>

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-[#0d0a06]/90 backdrop-blur-xl border-b border-orange-100/60 dark:border-white/[0.06] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="/#chefgenie"
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-800 dark:text-white hidden sm:block text-sm tracking-tight font-semibold">
                ChefGenie
              </span>
            </motion.a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all duration-150"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + burger */}
            <div className="flex items-center gap-2">
              <a
                href="/#chefgenie"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                ← Portfolio
              </a>
              <a
                href="#contact"
                onClick={() => { scrollTo("#contact"); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-xl text-sm font-medium shadow-lg shadow-orange-500/20 transition-colors"
              >
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden border-t border-orange-100/60 dark:border-white/[0.06]"
              >
                <div className="py-3 space-y-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
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

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20"
              >
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-sm text-orange-600 dark:text-orange-400 tracking-tight">
                  AI-Powered Kitchen Ecosystem
                </span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-1">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] text-slate-900 dark:text-white">
                  ChefGenie:
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                  Dapur Masa
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] text-slate-900 dark:text-white">
                  Depan Anda
                </h1>
              </div>

              {/* Sub */}
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                Platform modern untuk bantu keputusan masak harian, nutrisi, keuangan dapur, hingga peluang bisnis kuliner dengan pengalaman interaktif yang cepat dan menyenangkan.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                <motion.a
                  href="#contact"
                  onClick={() => scrollTo("#contact")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white rounded-xl text-sm font-medium shadow-lg shadow-orange-500/20 transition-colors"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Google Play
                </motion.a>
                <motion.a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-white rounded-xl text-sm font-medium transition-colors"
                >
                  App Store
                </motion.a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <p className="text-2xl text-slate-900 dark:text-white tracking-tight font-semibold">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — FoodOrb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <FoodOrb />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-slate-400 dark:text-slate-600" />
        </motion.div>
      </section>

      {/* ── Feature Showcase ── */}
      <section id="fitur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-xs text-orange-600 dark:text-orange-400 tracking-wide uppercase">Feature Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight font-semibold text-slate-900 dark:text-white">
            Tiga Pilar Utama ChefGenie
          </h2>
          <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
            AI Vision, Smart Finance, dan Creator Hub — dirancang untuk mengubah cara Anda memasak, berbisnis, dan berkreasi.
          </p>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {featureItems.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-4 shadow-sm dark:shadow-none hover:shadow-lg hover:shadow-orange-500/5 dark:hover:border-white/[0.14] transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 dark:bg-orange-500/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Choose Your Path ── */}
      <section id="path" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
            <Users className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-xs text-orange-600 dark:text-orange-400 tracking-wide uppercase">User Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight font-semibold text-slate-900 dark:text-white">
            Choose Your Path
          </h2>
          <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
            ChefGenie dirancang untuk semua—dari pecinta masak santai hingga pebisnis kuliner serius.
          </p>
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          {userPaths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none hover:shadow-lg hover:shadow-orange-500/5 dark:hover:border-white/[0.14] transition-all duration-300"
              >
                {/* Image with gradient overlay */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={path.image}
                    alt={path.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${path.color} opacity-30`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
                      <Icon className="w-3.5 h-3.5" />
                      {path.title}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{path.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Proximity Marketplace ── */}
      <section id="marketplace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
              <Globe className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs text-orange-600 dark:text-orange-400 tracking-wide uppercase">Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-semibold text-slate-900 dark:text-white">
              Proximity Digital Marketplace
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 leading-relaxed">
              UX berbasis spatial UI untuk mengubah scrolling jadi eksplorasi dunia kuliner secara real-time.
            </p>

            {/* Flow steps */}
            <div className="mt-8 space-y-3">
              {flowSteps.map((step, idx) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-3.5 hover:border-orange-200 dark:hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/10 dark:bg-orange-500/15 flex items-center justify-center text-xs font-semibold text-orange-600 dark:text-orange-400">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{step.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech details */}
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">Mitigation</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Quick teleport zone + List Mode untuk pengguna yang ingin lebih cepat checkout.</p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">Tech Mapping</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Matrix 2D (X,Y), sinkronisasi GPS merchant, dan state avatar broadcast untuk community presence.</p>
              </div>
            </div>
          </motion.div>

          {/* Right images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
              <ImageWithFallback
                src={imgMarket}
                alt="Marketplace afiliasi ChefGenie"
                className="w-full object-cover hover:scale-[1.02] transition duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
              <ImageWithFallback
                src={imgWorld}
                alt="Virtual food world ChefGenie"
                className="w-full object-cover hover:scale-[1.02] transition duration-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── About / Performance / Accessibility ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 sm:p-8"
        >
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: "About",
                body: "ChefGenie dibangun untuk menggabungkan AI decision engine, kitchen operations, dan creator economy dalam satu produk.",
              },
              {
                title: "Performance",
                body: "Optimized assets, layout responsif, dan animasi halus agar tetap ringan di berbagai ukuran layar.",
              },
              {
                title: "Accessibility",
                body: "Kontras warna dijaga, fokus interaktif jelas, dan fallback konten tetap terbaca saat animasi dibatasi.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-wider text-orange-600 dark:text-orange-400 font-medium">{item.title}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl tracking-tight font-semibold text-slate-900 dark:text-white">
            Let's Connect
          </h2>
          <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">
            Kirim feedback, kebutuhan kolaborasi, atau bergabung sebagai early adopter ChefGenie.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Hubungi Tim ChefGenie</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">Kirim feedback atau kebutuhan kolaborasi Anda.</p>
            <form className="mt-5 space-y-3">
              <input
                className="w-full rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.04] px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition"
                placeholder="Nama"
              />
              <input
                type="email"
                className="w-full rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.04] px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition"
                placeholder="Email"
              />
              <textarea
                className="w-full min-h-28 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.04] px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition resize-none"
                placeholder="Pesan Anda"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-orange-500 hover:bg-orange-400 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition-colors"
              >
                Kirim Pesan
              </motion.button>
            </form>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Newsletter</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">Dapatkan update fitur AI terbaru dari ChefGenie.</p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  className="flex-1 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.04] px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition"
                  placeholder="Masukkan email"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl bg-slate-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>

            <div className="rounded-2xl border border-orange-200/60 dark:border-orange-500/20 bg-orange-50/50 dark:bg-orange-500/[0.05] p-5">
              <p className="text-xs uppercase tracking-wider text-orange-600 dark:text-orange-400 font-medium mb-2">Phase 2 Preview</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong className="text-slate-800 dark:text-white">Coba Simulasi AI</strong> untuk mencoba rekomendasi menu dan guidance langsung di halaman ini.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Community presence akan menampilkan pengguna lain di virtual market secara real-time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Brand */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-amber-500 rounded-md flex items-center justify-center">
                  <ChefHat className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-slate-800 dark:text-white text-sm tracking-tight font-semibold">ChefGenie</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-600 max-w-[200px]">
                AI-powered kitchen ecosystem untuk semua.
              </p>
            </div>

            {/* Quick links */}
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

            {/* Back to portfolio */}
            <a
              href="/#chefgenie"
              className="text-xs text-slate-400 dark:text-slate-600 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              ← Kembali ke Portfolio
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-400 dark:text-slate-600">
              © {new Date().getFullYear()} ChefGenie · All rights reserved.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-600 italic">
              "Bringing intelligence to every kitchen."
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
