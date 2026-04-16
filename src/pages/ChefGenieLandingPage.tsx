import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  ChefHat,
  Coins,
  CookingPot,
  HeartPulse,
  MapPinned,
  Store,
  Users,
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
import { useEffect } from "react";

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
  },
  {
    title: "Nutrition Seeker",
    desc: "Bangun pola makan seimbang dengan meal plan adaptif sesuai target gizi keluarga.",
    icon: HeartPulse,
    image: imgHero,
  },
  {
    title: "Business Owner",
    desc: "Kelola biaya, stok, dan peluang cuan kuliner melalui dashboard bisnis yang actionable.",
    icon: Store,
    image: imgBusiness,
  },
];

const flowSteps = [
  "Exploration: user bergerak di world map via joystick",
  "Proximity Trigger: stall terdekat otomatis di-highlight",
  "Peek & Order: mini-card muncul, one tap quick combo ke cart",
  "Checkout: cart tetap di HUD tanpa keluar dari world",
];

export function ChefGenieLandingPage() {
  useEffect(() => {
    document.title = "ChefGenie | Dapur Masa Depan Anda";
    const description = "ChefGenie adalah AI-powered kitchen ecosystem untuk cooking guidance, smart finance, creator tools, dan proximity digital marketplace.";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, []);

  return (
    <main className="min-h-screen text-[#161616] bg-[#fff7f2]">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(255, 88, 43, 0.20), transparent 35%), radial-gradient(circle at 80% 15%, rgba(255, 183, 94, 0.35), transparent 40%), linear-gradient(180deg, #fff7f2 0%, #fff0e8 100%)",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-[#ffdad1] bg-white/70 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="/#chefgenie" className="inline-flex items-center gap-2 font-semibold tracking-tight text-[#cb2e12]">
            <span className="w-8 h-8 rounded-lg bg-[#ff4e27] text-white inline-flex items-center justify-center">
              <ChefHat className="w-4 h-4" />
            </span>
            ChefGenie
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#842812]">
            <a href="#fitur" className="hover:text-[#ff4e27] transition-colors">Fitur</a>
            <a href="#path" className="hover:text-[#ff4e27] transition-colors">Choose Path</a>
            <a href="#marketplace" className="hover:text-[#ff4e27] transition-colors">Marketplace</a>
            <a href="#contact" className="hover:text-[#ff4e27] transition-colors">Kontak</a>
          </nav>
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff4e27] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,94,41,0.38)] hover:bg-[#f53b12] transition-all"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ffc6b7] bg-white/70 px-3 py-1 text-xs uppercase tracking-wider text-[#ba3418]">
              <span className="w-2 h-2 rounded-full bg-[#ff4e27]" />
              AI-Powered Kitchen Ecosystem
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1f120d]">
              ChefGenie: <span className="text-[#ff4e27]">Dapur Masa Depan Anda</span>
            </h1>
            <p className="mt-4 text-[#6a3123] max-w-xl">
              Platform modern untuk bantu keputusan masak harian, nutrisi, keuangan dapur, hingga peluang bisnis kuliner
              dengan pengalaman interaktif yang cepat dan menyenangkan.
            </p>
            <div id="get-started" className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-xl bg-[#ff4e27] px-5 py-3 font-medium text-white shadow-[0_0_32px_rgba(255,78,39,0.34)] hover:-translate-y-0.5 transition-all"
              >
                Get Started
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[#ffb69f] bg-white px-5 py-3 font-medium text-[#a5351f] hover:bg-[#fff4ef] transition-colors"
              >
                Google Play
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[#ffb69f] bg-white px-5 py-3 font-medium text-[#a5351f] hover:bg-[#fff4ef] transition-colors"
              >
                App Store
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-[#ff4e27]/35 via-[#ffc273]/35 to-transparent blur-xl" />
            <ImageWithFallback
              src={imgHero}
              alt="Dashboard utama ChefGenie"
              className="relative w-full rounded-[1.75rem] border border-[#ffd3c7] bg-white shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      <section id="fitur" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#23120d]">Feature Showcase</h2>
        <p className="mt-3 max-w-2xl text-[#6d392c]">
          Bento-grid modern untuk menyorot tiga pilar utama ChefGenie: AI Vision, Smart Finance, dan Creator Hub.
        </p>

        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {featureItems.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group rounded-2xl border border-[#ffd3c7] bg-white/90 p-4 shadow-[0_10px_35px_rgba(255,120,87,0.12)]"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <ImageWithFallback src={feature.image} alt={feature.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-4 flex items-center gap-2 text-[#dd461f]">
                  <Icon className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-[#23120d]">{feature.title}</h3>
                </div>
                <p className="mt-2 text-sm text-[#6a3123]">{feature.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="path" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#23120d]">Choose Your Path</h2>
        <div className="mt-8 grid lg:grid-cols-3 gap-5">
          {userPaths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-2xl border border-[#ffd8cb] bg-white/95"
              >
                <ImageWithFallback src={path.image} alt={path.title} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#fff0ea] px-3 py-1 text-[#c53616] text-sm">
                    <Icon className="w-4 h-4" />
                    {path.title}
                  </div>
                  <p className="mt-3 text-sm text-[#643123]">{path.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="marketplace" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-3xl border border-[#ffd2c5] bg-white/90 p-6"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-[#23120d]">ChefGenie Proximity Digital Marketplace</h2>
            <p className="mt-3 text-[#6d382b]">
              UX berbasis spatial UI untuk mengubah scrolling jadi eksplorasi dunia kuliner secara real-time.
            </p>
            <div className="mt-6 space-y-3">
              {flowSteps.map((step) => (
                <div key={step} className="flex items-start gap-3 rounded-xl border border-[#ffe2d8] bg-[#fff8f5] p-3">
                  <MapPinned className="w-4 h-4 mt-0.5 text-[#ff4e27]" />
                  <p className="text-sm text-[#5e2e21]">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#ffd8ca] bg-white p-3">
                <p className="text-xs uppercase tracking-wide text-[#a3412c]">Mitigation</p>
                <p className="mt-1 text-sm text-[#5c2d20]">Quick teleport zone + List Mode untuk pengguna yang ingin lebih cepat checkout.</p>
              </div>
              <div className="rounded-xl border border-[#ffd8ca] bg-white p-3">
                <p className="text-xs uppercase tracking-wide text-[#a3412c]">Tech Mapping</p>
                <p className="mt-1 text-sm text-[#5c2d20]">Matrix 2D (X,Y), sinkronisasi GPS merchant, dan state avatar broadcast untuk community presence.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            <ImageWithFallback src={imgMarket} alt="Marketplace afiliasi ChefGenie" className="w-full rounded-2xl border border-[#ffd5c8] bg-white shadow-xl" />
            <ImageWithFallback src={imgWorld} alt="Virtual food world ChefGenie" className="w-full rounded-2xl border border-[#ffd5c8] bg-white shadow-xl" />
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="rounded-3xl border border-[#ffd4c8] bg-white/95 p-6 sm:p-8">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#ffe2d9] bg-[#fff8f4] p-5">
              <p className="text-xs uppercase tracking-wider text-[#a13d29]">About</p>
              <p className="mt-2 text-sm text-[#5d2c20]">
                ChefGenie dibangun untuk menggabungkan AI decision engine, kitchen operations, dan creator economy dalam satu produk.
              </p>
            </div>
            <div className="rounded-2xl border border-[#ffe2d9] bg-[#fff8f4] p-5">
              <p className="text-xs uppercase tracking-wider text-[#a13d29]">Performance</p>
              <p className="mt-2 text-sm text-[#5d2c20]">Optimized assets, layout responsif, dan animasi halus agar tetap ringan di berbagai ukuran layar.</p>
            </div>
            <div className="rounded-2xl border border-[#ffe2d9] bg-[#fff8f4] p-5">
              <p className="text-xs uppercase tracking-wider text-[#a13d29]">Accessibility</p>
              <p className="mt-2 text-sm text-[#5d2c20]">Kontras warna dijaga, fokus interaktif jelas, dan fallback konten tetap terbaca saat animasi dibatasi.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#ffd5c8] bg-white p-6">
            <h3 className="text-2xl font-semibold text-[#24120d]">Hubungi Tim ChefGenie</h3>
            <p className="mt-2 text-sm text-[#6b3527]">Kirim feedback atau kebutuhan kolaborasi Anda.</p>
            <form className="mt-5 space-y-3">
              <input className="w-full rounded-xl border border-[#ffc9b7] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#ff6a46]" placeholder="Nama" />
              <input type="email" className="w-full rounded-xl border border-[#ffc9b7] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#ff6a46]" placeholder="Email" />
              <textarea className="w-full min-h-28 rounded-xl border border-[#ffc9b7] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#ff6a46]" placeholder="Pesan Anda" />
              <button type="button" className="rounded-xl bg-[#ff4e27] px-4 py-2.5 font-medium text-white hover:bg-[#ef3f18] transition-colors">
                Kirim Pesan
              </button>
            </form>
          </div>
          <div className="rounded-2xl border border-[#ffd5c8] bg-white p-6">
            <h3 className="text-2xl font-semibold text-[#24120d]">Newsletter</h3>
            <p className="mt-2 text-sm text-[#6b3527]">Dapatkan update fitur AI terbaru dari ChefGenie.</p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <input type="email" className="flex-1 rounded-xl border border-[#ffc9b7] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#ff6a46]" placeholder="Masukkan email" />
              <button type="button" className="rounded-xl bg-[#23120d] px-5 py-2.5 font-medium text-white hover:bg-black transition-colors">
                Subscribe
              </button>
            </div>
            <div className="mt-6 rounded-xl border border-[#ffe1d7] bg-[#fff8f5] p-4">
              <p className="text-sm text-[#5f2f21]">
                Phase 2 preview: <strong>Coba Simulasi AI</strong> untuk mencoba rekomendasi menu dan guidance langsung di halaman ini.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-[#7a3a2b]">
              <Users className="w-4 h-4 text-[#f24d26]" />
              Community presence akan menampilkan pengguna lain di virtual market secara real-time.
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#ffd8ca] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm text-[#7d3e2f]">
          <p>© {new Date().getFullYear()} ChefGenie. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#ff4e27] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#ff4e27] transition-colors">Terms</a>
            <a href="/#chefgenie" className="hover:text-[#ff4e27] transition-colors">Back to Portfolio</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
