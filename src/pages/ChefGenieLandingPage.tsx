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
import { useEffect, useState, useId, useRef } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

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

// ─── Translations ────────────────────────────────────────────────────────────

const translations: Record<Language, any> = {
  id: {
    hero: {
      badge: "Kawan Dapur Bertenaga AI",
      titleMain: "Dapur Cerdas",
      titleSub: "di Genggamanmu",
      desc: "ChefGenie menggabungkan AI decision engine, kitchen operations, dan creator economy — semuanya dalam satu aplikasi mobile.",
      ctaStart: "Lihat Cara Kerjanya",
      ctaExplore: "Explore Fitur",
    },
    features: {
      companion: {
        label: "AI Companion",
        title: "Asisten Dapur<br/>yang Selalu Siap",
        desc: "ChefGenie hadir di setiap sesi masak — dari saran menu pagi hari, manajemen stok kulkas, hingga panduan langkah-demi-langkah secara real-time.",
        bullets: [
          "Genie's Pick — rekomendasi menu berdasarkan bahan yang hampir expired",
          "Fridge Alert — notifikasi cerdas bahan mendekati kedaluwarsa",
          "Quick Actions: Scan Fridge, Generate Recipe, Plan Meals",
        ],
      },
      vision: {
        label: "AI Vision Cooking",
        title: "Masak dengan<br/>Mata AI",
        desc: "Kamera smartphone kamu menjadi sous-chef. ChefGenie melihat kondisi masakan secara real-time dan memberi instruksi presisi.",
        bullets: [
          "Deteksi bahan secara visual — cukup arahkan kamera ke dapur",
          "Monitoring suhu pan dan progres browning secara live",
          "Voice guidance dan step-by-step overlay langsung di layar",
        ],
      },
      finance: {
        label: "Smart Finance",
        title: "Dapur yang<br/>Menghasilkan",
        desc: "Bukan hanya masak — ChefGenie membantu kamu memahami cost per meal, margin bisnis kuliner, dan insight keuangan dapur secara real-time.",
        bullets: [
          "Total saldo & arus kas dapur dalam satu tampilan",
          "Genie Insight: saran hemat berbasis pola belanja kamu",
          "Lacak pengeluaran: bahan baku, gas, peralatan — semua tercatat",
        ],
      },
      creator: {
        label: "Creator Hub",
        title: "Dari Dapur<br/>ke Konten",
        desc: "Ubah resep terbaik kamu jadi konten viral. ChefGenie menyediakan tools untuk produksi, distribusi, dan monetisasi konten kuliner.",
        bullets: [
          "Studio konten terintegrasi — rekam, edit, publish langsung dari app",
          "Ide menu bisnis berbasis tren kuliner terkini",
          "Rekrut tenaga ahli masak dan bangun tim kuliner profesional",
        ],
      },
    },
    marketplace: {
      label: "Proximity Marketplace",
      title: "Jelajahi Dunia<br /><span className='accent'>Kuliner Terdekatmu</span>",
      desc: "ChefGenie World menghadirkan pengalaman berbelanja kuliner seperti menjelajahi game — temukan stall terdekat dan checkout tanpa keluar dari dunia virtual.",
      steps: [
        { title: "Exploration", desc: "Gerakkan avatar di world map via joystick" },
        { title: "Proximity Trigger", desc: "Stall terdekat otomatis di-highlight" },
        { title: "Peek & Order", desc: "Mini-card muncul, satu tap ke keranjang" },
        { title: "Checkout", desc: "Keranjang di HUD, tidak perlu keluar dari world" },
      ],
    },
    paths: {
      label: "Choose Your Path",
      title: "ChefGenie untuk <br /><span className='accent'>Semua Orang</span>",
      desc: "Dari pecinta masak santai hingga pebisnis kuliner — ChefGenie menyesuaikan diri dengan kebutuhanmu.",
      options: [
        { title: "Hobbyist", subtitle: "Masak Lebih Fun", desc: "Jelajahi menu kreatif dan nikmati pengalaman dapur yang lebih menyenangkan." },
        { title: "Nutrition Seeker", subtitle: "Makan Lebih Sehat", desc: "Bangun pola makan seimbang dengan meal plan adaptif sesuai target gizi." },
        { title: "Business Owner", subtitle: "Cuan dari Dapur", desc: "Kelola biaya, stok, dan peluang bisnis kuliner melalui dashboard yang actionable." },
      ],
    },
    stats: [
      { value: "3", label: "Pilar AI Utama" },
      { value: "35+", label: "Screen Flows Dirancang" },
      { value: "360°", label: "Proximity Marketplace" },
      { value: "∞", label: "Kemungkinan Resep" },
    ],
    cta: {
      label: "Coming Soon",
      title: "Siap Mengubah<br /><span className='accent'>Cara Kamu Memasak?</span>",
      desc: "Daftarkan email untuk mendapat akses awal dan notifikasi saat ChefGenie resmi diluncurkan.",
      button: "Notify Me",
      socialProof: "Bergabung bersama 1,200+ early adopter",
    },
    nav: {
      fitur: "Fitur",
      journey: "User Journey",
      marketplace: "Marketplace",
      download: "Download",
      back: "Portfolio",
    },
  },
  en: {
    hero: {
      badge: "AI-Powered Kitchen Companion",
      titleMain: "Smart Kitchen",
      titleSub: "In Your Hands",
      desc: "ChefGenie combines AI decision engine, kitchen operations, and creator economy — all in one mobile app.",
      ctaStart: "See How It Works",
      ctaExplore: "Explore Features",
    },
    features: {
      companion: {
        label: "AI Companion",
        title: "A Kitchen Assistant<br/>That's Always Ready",
        desc: "ChefGenie is there for every cooking session — from morning meal suggestions, fridge stock management, to real-time step-by-step guidance.",
        bullets: [
          "Genie's Pick — menu recommendations based on expiring ingredients",
          "Fridge Alert — smart notifications for ingredients nearing expiry",
          "Quick Actions: Scan Fridge, Generate Recipe, Plan Meals",
        ],
      },
      vision: {
        label: "AI Vision Cooking",
        title: "Cook with<br/>AI Eyes",
        desc: "Your smartphone camera becomes a sous-chef. ChefGenie sees the cooking condition in real-time and provides precise instructions.",
        bullets: [
          "Visual ingredient detection — just point the camera at your kitchen",
          "Live pan temperature monitoring and browning progress",
          "Voice guidance and step-by-step overlay directly on screen",
        ],
      },
      finance: {
        label: "Smart Finance",
        title: "A Kitchen<br/>That Profits",
        desc: "Not just cooking — ChefGenie helps you understand cost per meal, culinary business margins, and real-time kitchen financial insights.",
        bullets: [
          "Total balance & kitchen cash flow in one view",
          "Genie Insight: saving tips based on your spending patterns",
          "Track expenses: raw materials, gas, equipment — all recorded",
        ],
      },
      creator: {
        label: "Creator Hub",
        title: "From Kitchen<br/>to Content",
        desc: "Turn your best recipes into viral content. ChefGenie provides tools for culinary content production, distribution, and monetization.",
        bullets: [
          "Integrated content studio — record, edit, publish directly from the app",
          "Business menu ideas based on latest culinary trends",
          "Recruit culinary experts and build a professional team",
        ],
      },
    },
    marketplace: {
      label: "Proximity Marketplace",
      title: "Explore the<br /><span className='accent'>Culinary World Nearby</span>",
      desc: "ChefGenie World brings a culinary shopping experience like exploring a game — find nearby stalls and checkout without leaving the virtual world.",
      steps: [
        { title: "Exploration", desc: "Move your avatar on the world map via joystick" },
        { title: "Proximity Trigger", desc: "Nearby stalls are automatically highlighted" },
        { title: "Peek & Order", desc: "Mini-card appears, one tap to cart" },
        { title: "Checkout", desc: "Cart in HUD, no need to exit the world" },
      ],
    },
    paths: {
      label: "Choose Your Path",
      title: "ChefGenie for <br /><span className='accent'>Everyone</span>",
      desc: "From casual home cooks to culinary business owners — ChefGenie adapts to your needs.",
      options: [
        { title: "Hobbyist", subtitle: "Funner Cooking", desc: "Explore creative menus and enjoy a more enjoyable kitchen experience." },
        { title: "Nutrition Seeker", subtitle: "Healthier Eating", desc: "Build a balanced diet with adaptive meal plans matching nutritional goals." },
        { title: "Business Owner", subtitle: "Profit from Kitchen", desc: "Manage costs, stock, and business opportunities via actionable dashboards." },
      ],
    },
    stats: [
      { value: "3", label: "Main AI Pillars" },
      { value: "35+", label: "Designed Screen Flows" },
      { value: "360°", label: "Proximity Marketplace" },
      { value: "∞", label: "Recipe Possibilities" },
    ],
    cta: {
      label: "Coming Soon",
      title: "Ready to Transform<br /><span className='accent'>How You Cook?</span>",
      desc: "Register your email for early access and notifications when ChefGenie officially launches.",
      button: "Notify Me",
      socialProof: "Join over 1,200+ early adopters",
    },
    nav: {
      fitur: "Features",
      journey: "User Journey",
      marketplace: "Marketplace",
      download: "Download",
      back: "Portfolio",
    },
  },
  zh: {
    hero: {
      badge: "AI 驱动的厨房伙伴",
      titleMain: "智能厨房",
      titleSub: "尽在掌控",
      desc: "ChefGenie 结合了 AI 决策引擎、厨房运营和创作者经济——一切都在一个移动应用中。",
      ctaStart: "了解其工作原理",
      ctaExplore: "探索功能",
    },
    features: {
      companion: {
        label: "AI 伴侣",
        title: "始终待命的<br/>厨房助手",
        desc: "ChefGenie 陪伴您进行每一次烹饪——从清晨的菜单建议、冰箱库存管理，到实时的步骤指导。",
        bullets: [
          "Genie 精选——基于即将过期食材的菜单推荐",
          "冰箱警报——食材临近过期的智能通知",
          "快捷操作：扫描冰箱、生成食谱、计划用餐",
        ],
      },
      vision: {
        label: "AI 视觉烹饪",
        title: "用 AI 的<br/>眼睛烹饪",
        desc: "您的智能手机摄像头变成了副厨。ChefGenie 实时观察烹饪情况并提供精确指令。",
        bullets: [
          "视觉食材检测——只需将镜头对准您的厨房",
          "实时监测锅具温度和褐变进度",
          "直接在屏幕上显示语音指导和步骤叠加",
        ],
      },
      finance: {
        label: "智能财务",
        title: "盈利的<br/>厨房",
        desc: "不仅是烹饪——ChefGenie 帮助您了解每餐成本、餐饮业务利润以及实时的厨房财务见解。",
        bullets: [
          "一目了然的总余额和厨房现金流",
          "Genie 洞察：基于您的支出模式的节省建议",
          "追踪支出：原材料、燃气、设备——尽在记录",
        ],
      },
      creator: {
        label: "创作者中心",
        title: "从厨房<br/>到内容",
        desc: "将您的最佳食谱变为热门内容。ChefGenie 提供烹饪内容制作、分发和变现工具。",
        bullets: [
          "集成的创作工作室——直接从应用录制、编辑、发布",
          "基于最新餐饮趋势的业务菜单创意",
          "招募烹饪专家并组建专业团队",
        ],
      },
    },
    marketplace: {
      label: "近场市场",
      title: "探索附近的<br /><span className='accent'>美食世界</span>",
      desc: "ChefGenie World 带来像探索游戏一样的餐饮购物体验——发现附近的摊位并无缝结账。",
      steps: [
        { title: "探索", desc: "通过摇杆在世界地图上移动您的头像" },
        { title: "近场触发", desc: "附近的摊位会自动高亮显示" },
        { title: "预览与订购", desc: "出现迷型卡，一键加入购物车" },
        { title: "结账", desc: "HUD 中的购物车，无需退出世界" },
      ],
    },
    paths: {
      label: "选择您的路径",
      title: "ChefGenie 适合 <br /><span className='accent'>每个人</span>",
      desc: "从休闲家庭主厨到餐饮业务所有者——ChefGenie 适应您的需求。",
      options: [
        { title: "爱好者", subtitle: "更有趣的烹饪", desc: "探索创意菜单，享受更愉快的厨房体验。" },
        { title: "营养追求者", subtitle: "更健康的饮食", desc: "根据营养目标建立平衡的饮食计划。" },
        { title: "企业主", subtitle: "厨房变现", desc: "通过可操作的仪表板管理成本、库存和业务机会。" },
      ],
    },
    stats: [
      { value: "3", label: "核心 AI 支柱" },
      { value: "35+", label: "设计的屏幕流程" },
      { value: "360°", label: "近场市场" },
      { value: "∞", label: "无限食谱可能" },
    ],
    cta: {
      label: "即将推出",
      title: "准备好改变<br /><span className='accent'>您的烹饪方式吗？</span>",
      desc: "注册您的电子邮件以获得早期访问并在 ChefGenie 正式发布时收到通知。",
      button: "通知我",
      socialProof: "加入超过 1,200+ 早期采用者行列",
    },
    nav: {
      fitur: "功能",
      journey: "用户旅程",
      marketplace: "市场",
      download: "下载",
      back: "作品集",
    },
  },
  ja: {
    hero: {
      badge: "AI搭載キッチンコンパニオン",
      titleMain: "スマートキッチンを",
      titleSub: "あなたの手に",
      desc: "ChefGenieは、AI意思決定エンジン、キッチンオペレーション、クリエイターエコノミーを1つのモバイルアプリで統合します。",
      ctaStart: "仕組みを見る",
      ctaExplore: "機能を見る",
    },
    features: {
      companion: {
        label: "AIコンパニオン",
        title: "いつでも準備万端な<br/>キッチンアシスタント",
        desc: "ChefGenieは、朝の献立提案、冷蔵庫の在庫管理からリアルタイムのステップバイステップ指導まで、あらゆる調理をサポートします。",
        bullets: [
          "Genieの選択 — 賞味期限が近い食材に基づいたメニューの提案",
          "冷蔵庫アラート — 食材の期限が近づいた際のスマートな通知",
          "クイック操作：冷蔵庫スキャン、レシピ生成、ミールプラン",
        ],
      },
      vision: {
        label: "AIビジョン・クッキング",
        title: "AIの目で<br/>料理する",
        desc: "スマートフォンのカメラが副シェフになります。ChefGenieが調理状況をリアルタイムで観察し、的確な指示を出します。",
        bullets: [
          "視覚的な食材検出 — カメラをキッチンに向けるだけ",
          "フライパンの温度と焼き具合のライブモニタリング",
          "音声ガイダンスとステップオーバーレイを画面に直接表示",
        ],
      },
      finance: {
        label: "スマート・ファイナンス",
        title: "利益を生む<br/>キッチン",
        desc: "単なる料理ではありません。1食あたりのコスト、ビジネス利益率、リアルタイムの財務インサイトを把握できます。",
        bullets: [
          "総残高とキッチンのキャッシュフローを1つの画面で確認",
          "Genieインサイト：支出パターンに基づいた節約のコツ",
          "支出管理：原材料、ガス、設備などすべてを記録",
        ],
      },
      creator: {
        label: "クリエイター・ハブ",
        title: "キッチンから<br/>コンテンツへ",
        desc: "最高のレシピをバイラルコンテンツに変えましょう。制作、配信、収益化のためのツールを提供します。",
        bullets: [
          "統合コンテンツスタジオ — アプリから直接録画、編集、公開",
          "最新のトレンドに基づいたビジネスメニューのアイデア",
          "料理の専門家を採用し、プロフェッショナルなチームを構築",
        ],
      },
    },
    marketplace: {
      label: "近接マーケットプレイス",
      title: "近所の<br /><span className='accent'>美食の世界を探索</span>",
      desc: "ChefGenie Worldは、ゲームのような体験を提供します。アバターを動かして近くの屋台を見つけ、世界から出ることなく決済できます。",
      steps: [
        { title: "探索", desc: "ジョイスティックでワールドマップ上のアバターを動かす" },
        { title: "近接トリガー", desc: "近くの屋台が自動的に強調表示される" },
        { title: "プレビューと注文", desc: "ミニカードが表示され、ワンタップでカートへ" },
        { title: "チェックアウト", desc: "HUD内のカートで決済、ワールドを出る必要なし" },
      ],
    },
    paths: {
      label: "パスを選択",
      title: "<br /><span className='accent'>すべての人</span>のためのChefGenie",
      desc: "カジュアルな家庭料理から料理ビジネスのオーナーまで、ChefGenieはニーズに合わせて適応します。",
      options: [
        { title: "ホビーユーザー", subtitle: "もっと楽しい料理を", desc: "クリエイティブなメニューを探索し、より楽しいキッチン体験を。" },
        { title: "健康志向", subtitle: "より健康的な食事", desc: "栄養目標に合わせた適応型ミールプランでバランスの取れた食事を。" },
        { title: "ビジネスオーナー", subtitle: "キッチンから利益を", desc: "コスト、在庫、ビジネスチャンスを実用的なダッシュボードで管理。" },
      ],
    },
    stats: [
      { value: "3", label: "主要AIの柱" },
      { value: "35+", label: "設計済み画面フロー" },
      { value: "360°", label: "近接マーケットプレイス" },
      { value: "∞", label: "レシピの可能性" },
    ],
    cta: {
      label: "近日公開",
      title: "料理の<br /><span className='accent'>常識を変えませんか？</span>",
      desc: "メールアドレスを登録して、早期アクセスと正式リリースの通知を受け取りましょう。",
      button: "通知を受け取る",
      socialProof: "1,200人以上の早期導入者に加わりましょう",
    },
    nav: {
      fitur: "機能",
      journey: "ユーザージャーニー",
      marketplace: "マーケット",
      download: "ダウンロード",
      back: "ポートフォリオ",
    },
  },
};

// ─── PhoneMockup Component ───────────────────────────────────────────────────

interface PhoneMockupProps {
  src: string;
  alt: string;
  rotate?: number;
  scale?: number;
  className?: string;
  glow?: boolean;
  glowColor?: string;
  autoswipe?: boolean;
}

function PhoneMockup({
  src,
  alt,
  rotate = 0,
  scale = 1,
  className = "",
  glow = true,
  glowColor = "#ff5c28",
  autoswipe = true,
}: PhoneMockupProps) {
  const uid = useId().replace(/:/g, "-");
  const clipId = `clip-${uid}`;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [overflowY, setOverflowY] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  // Measure the image to decide if we need to swipe
  useEffect(() => {
    if (imgLoaded && imgRef.current) {
      const containerWidth = 254;
      const containerHeight = 540;
      const imgWidth = imgRef.current.naturalWidth;
      const imgHeight = imgRef.current.naturalHeight;

      if (imgWidth > 0) {
        // We scale image to fit width (254px)
        const scaleFactor = containerWidth / imgWidth;
        const renderedHeight = imgHeight * scaleFactor;
        const diff = renderedHeight - containerHeight;
        if (diff > 10) {
          setOverflowY(diff);
        } else {
          setOverflowY(0);
        }
      }
    }
  }, [imgLoaded, src]);

  // Compute animation duration based on height
  const duration = Math.max(5, overflowY / 40); // 40px per second

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
        className="w-full h-auto drop-shadow-2xl"
        aria-label={alt}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="13" y="16" width="254" height="540" rx="37" ry="37" />
          </clipPath>
          <linearGradient id={`glare-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.08" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Bezel structure */}
        <rect x="0" y="0" width="280" height="572" rx="52" ry="52" fill="#1c1c1e" />
        <rect
          x="3"
          y="3"
          width="274"
          height="566"
          rx="49"
          ry="49"
          fill="#000"
          stroke="#3a3a3c"
          strokeWidth="1.5"
        />
        
        {/* The "Screen" Content via foreignObject for better control */}
        <foreignObject x="13" y="16" width="254" height="540" clipPath={`url(#${clipId})`}>
          <div className="w-full h-full bg-black relative">
            <motion.img
              ref={imgRef}
              src={src}
              alt={alt}
              onLoad={() => setImgLoaded(true)}
              className="w-full h-auto block absolute top-0 left-0"
              animate={
                autoswipe && overflowY > 0
                  ? { y: [0, -overflowY - 5, 0] } // added 5px buffer to see footer
                  : { y: 0 }
              }
              transition={
                autoswipe && overflowY > 0
                  ? {
                      duration: duration,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      repeatDelay: 2,
                    }
                  : {}
              }
            />
          </div>
        </foreignObject>

        {/* Dynamic Island */}
        <rect x="100" y="26" width="80" height="24" rx="12" ry="12" fill="#000000" />

        {/* Glare overlay */}
        <rect
          x="13"
          y="16"
          width="254"
          height="540"
          rx="37"
          ry="37"
          fill={`url(#glare-${uid})`}
          style={{ pointerEvents: "none" }}
        />

        {/* Mechanical buttons */}
        <rect x="-1" y="148" width="3" height="42" rx="1.5" ry="1.5" fill="#2c2c2e" />
        <rect x="-1" y="208" width="3" height="70" rx="1.5" ry="1.5" fill="#2c2c2e" />
        <rect x="278" y="188" width="3" height="70" rx="1.5" ry="1.5" fill="#2c2c2e" />
        
        {/* Home indicator */}
        <rect x="105" y="546" width="70" height="5" rx="2.5" ry="2.5" fill="#3a3a3c" />
      </svg>
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
      <Icon className="w-3.5 h-3.5 text-orange-400" />
      <span className="text-xs font-medium tracking-widest uppercase text-orange-400 shrink-0">{label}</span>
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
      className="flex items-center justify-center gap-4 lg:gap-8"
    >
      {secondPhone && (
        <div className="w-[170px] lg:w-[190px] mt-12 opacity-60">
          <PhoneMockup
            src={secondPhone.src}
            alt={secondPhone.alt}
            rotate={secondPhone.rotate ?? 4}
            glow={false}
          />
        </div>
      )}
      <div className="w-[230px] lg:w-[260px]">
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
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
        dangerouslySetInnerHTML={{ __html: headline }}
      />
      <p className="text-base text-slate-600 dark:text-white/40 leading-relaxed max-w-md">{desc}</p>
      <ul className="space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: accent }}
            />
            <span className="text-sm text-slate-700 dark:text-white/60">{b}</span>
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export function ChefGenieLandingPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "ChefGenie | Your AI Kitchen Companion";
    const description = "ChefGenie adalah AI-powered kitchen app untuk cooking guidance, smart finance, creator tools, dan proximity digital marketplace.";
    const descriptionEl = document.querySelector('meta[name="description"]');
    if (descriptionEl) descriptionEl.setAttribute("content", description);
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
    <main className="min-h-screen bg-white dark:bg-[#080808] text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-300">
      {/* Global noise texture overlay */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-[#080808]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.06] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="/#chefgenie"
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white">ChefGenie</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => scrollTo("#fitur")} className="px-3 py-1.5 text-sm text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all">{t.nav.fitur}</button>
              <button onClick={() => scrollTo("#path")} className="px-3 py-1.5 text-sm text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all">{t.nav.journey}</button>
              <button onClick={() => scrollTo("#marketplace")} className="px-3 py-1.5 text-sm text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all">{t.nav.marketplace}</button>
              <button onClick={() => scrollTo("#download")} className="px-3 py-1.5 text-sm text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all">{t.nav.download}</button>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-3 pr-2 border-r border-slate-200 dark:border-white/10">
                <ThemeToggle />
              </div>
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); scrollTo("#download"); }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rounded-xl shadow-lg shadow-orange-500/25 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> <span className="hidden xs:inline">{t.nav.download}</span>
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all"
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
                className="md:hidden overflow-hidden border-t border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#080808]"
              >
                <div className="py-3 space-y-1">
                  <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] mb-2">
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Settings</span>
                    <ThemeToggle />
                  </div>
                  <button onClick={() => scrollTo("#fitur")} className="block w-full text-left px-3 py-2.5 text-sm text-slate-600 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/[0.05] rounded-lg">{t.nav.fitur}</button>
                  <button onClick={() => scrollTo("#path")} className="block w-full text-left px-3 py-2.5 text-sm text-slate-600 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/[0.05] rounded-lg">{t.nav.journey}</button>
                  <button onClick={() => scrollTo("#marketplace")} className="block w-full text-left px-3 py-2.5 text-sm text-slate-600 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/[0.05] rounded-lg">{t.nav.marketplace}</button>
                  <button onClick={() => scrollTo("#download")} className="block w-full text-left px-3 py-2.5 text-sm text-slate-600 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/[0.05] rounded-lg">{t.nav.download}</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-orange-600/10 dark:bg-orange-600/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,92,40,0.6) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 dark:bg-orange-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs text-orange-500 dark:text-orange-400 tracking-widest uppercase font-semibold">{t.hero.badge}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-center space-y-3 mb-12">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              {t.hero.titleMain}
            </h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
              {t.hero.titleSub}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-white/40 max-w-lg mx-auto leading-relaxed mt-6">
              {t.hero.desc}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <button onClick={() => scrollTo("#download")} className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-2xl shadow-xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95">
              <Play className="w-4 h-4 fill-white" /> {t.hero.ctaStart}
            </button>
            <button onClick={() => scrollTo("#fitur")} className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-white text-sm font-bold rounded-2xl transition-all hover:scale-105">
              {t.hero.ctaExplore} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Hero Phones */}
          <div className="flex items-end justify-center gap-4 sm:gap-10 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 60, rotate: -10 }} animate={{ opacity: 1, y: 0, rotate: -10 }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} className="w-[140px] sm:w-[190px] lg:w-[230px] opacity-60">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                <PhoneMockup src={imgMeet} alt="ChefGenie onboarding" rotate={0} glow={false} autoswipe={false} />
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: "easeOut" }} className="w-[180px] sm:w-[240px] lg:w-[280px] z-10">
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                <PhoneMockup src={imgDashboard} alt="ChefGenie dashboard" rotate={0} glowColor="#ff5c28" autoswipe={true} />
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 60, rotate: 10 }} animate={{ opacity: 1, y: 0, rotate: 10 }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} className="w-[140px] sm:w-[190px] lg:w-[230px] opacity-60">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <PhoneMockup src={imgWelcome1} alt="ChefGenie welcome" rotate={0} glow={false} autoswipe={false} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <div id="fitur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 py-32">
        <FeatureRow
          label={t.features.companion.label}
          labelIcon={Sparkles}
          headline={t.features.companion.title}
          desc={t.features.companion.desc}
          bullets={t.features.companion.bullets}
          phoneSrc={imgDashboard}
          phoneAlt="Companion feature"
          phoneRight={true}
          phoneRotate={-4}
          accent="#ff5c28"
        />
        <FeatureRow
          label={t.features.vision.label}
          labelIcon={BrainCircuit}
          headline={t.features.vision.title}
          desc={t.features.vision.desc}
          bullets={t.features.vision.bullets}
          phoneSrc={imgVision}
          phoneAlt="AI Vision feature"
          phoneRight={false}
          phoneRotate={4}
          accent="#ef4444"
          secondPhone={{ src: imgChat, alt: "AI chat assistant", rotate: -8 }}
        />
        <FeatureRow
          label={t.features.finance.label}
          labelIcon={Coins}
          headline={t.features.finance.title}
          desc={t.features.finance.desc}
          bullets={t.features.finance.bullets}
          phoneSrc={imgFinance}
          phoneAlt="Finance feature"
          phoneRight={true}
          phoneRotate={-5}
          accent="#f59e0b"
        />
        <FeatureRow
          label={t.features.creator.label}
          labelIcon={CookingPot}
          headline={t.features.creator.title}
          desc={t.features.creator.desc}
          bullets={t.features.creator.bullets}
          phoneSrc={imgCreator}
          phoneAlt="Creator Hub feature"
          phoneRight={false}
          phoneRotate={5}
          accent="#8b5cf6"
          secondPhone={{ src: imgIdeMenu, alt: "Menu business ideas", rotate: -6 }}
        />
      </div>

      {/* ── MARKETPLACE ── */}
      <section id="marketplace" className="py-32 relative overflow-hidden bg-slate-50/50 dark:bg-transparent transition-colors">
        <div className="absolute inset-0 dark:bg-gradient-to-b from-transparent via-orange-950/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <SectionLabel icon={Globe} label={t.marketplace.label} />
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white" dangerouslySetInnerHTML={{ __html: t.marketplace.title.replace("className='accent'", "class='text-orange-500'") }} />
            <p className="mt-6 text-slate-600 dark:text-white/40 max-w-2xl mx-auto leading-relaxed">{t.marketplace.desc}</p>
          </motion.div>

          <div className="flex items-end justify-center gap-6 lg:gap-14 mb-20">
            <motion.div initial={{ opacity: 0, x: -40, rotate: -12 }} whileInView={{ opacity: 1, x: 0, rotate: -12 }} viewport={{ once: true }} className="w-[150px] lg:w-[210px] opacity-50 shrink-0">
              <PhoneMockup src={imgVendorPeek} alt="Vendor UI" glow={false} autoswipe={false} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[200px] lg:w-[280px] z-10 shrink-0">
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <PhoneMockup src={imgWorld} alt="Virtual food world" glowColor="#f59e0b" autoswipe={true} />
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40, rotate: 12 }} whileInView={{ opacity: 1, x: 0, rotate: 12 }} viewport={{ once: true }} className="w-[150px] lg:w-[210px] opacity-50 shrink-0">
              <PhoneMockup src={imgExplore} alt="Explore UI" glow={false} autoswipe={false} />
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.marketplace.steps.map((step: any, idx: number) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="p-6 rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] shadow-sm hover:border-orange-500/30 transition-all group">
                <span className="text-xs font-mono font-bold text-orange-500/60 mb-4 block">STEP 0{idx + 1}</span>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">{step.title}</h4>
                <p className="text-sm text-slate-500 dark:text-white/40 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PATHS ── */}
      <section id="path" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
            <SectionLabel icon={Users} label={t.paths.label} />
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white" dangerouslySetInnerHTML={{ __html: t.paths.title.replace("className='accent'", "class='text-orange-500'") }} />
            <p className="mt-6 text-slate-600 dark:text-white/40 max-w-xl mx-auto">{t.paths.desc}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-0 items-end">
            {t.paths.options.map((opt: any, idx: number) => {
              const assets = [imgExplore, imgNutrition, imgBusiness];
              const colors = ["#f97316", "#ec4899", "#f59e0b"];
              const icons = [ChefHat, HeartPulse, Store];
              const Icon = icons[idx];
              return (
                <motion.div key={opt.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="flex flex-col items-center">
                   <div className="w-[190px] lg:w-[240px] mb-10">
                    <PhoneMockup src={assets[idx]} alt={opt.title} rotate={(idx - 1) * 4} glowColor={colors[idx]} autoswipe={true} />
                  </div>
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase border" style={{ color: colors[idx], borderColor: colors[idx] + "40", background: colors[idx] + "10" }}>
                      <Icon className="w-3 h-3" /> {opt.title}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{opt.subtitle}</h3>
                    <p className="text-sm text-slate-500 dark:text-white/40 max-w-xs leading-relaxed">{opt.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 border-y border-slate-100 dark:border-white/[0.06] bg-slate-50/30 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          {t.stats.map((stat: any, idx: number) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="text-center">
              <span className="text-4xl sm:text-5xl font-black text-orange-500 dark:text-orange-400 tracking-tighter">{stat.value}</span>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DOWNLOAD CTA ── */}
      <section id="download" className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-orange-500/10 dark:bg-orange-600/15 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs text-amber-600 dark:text-amber-500 font-black uppercase tracking-widest">{t.cta.label}</span>
            </div>
            <h2 className="text-4xl sm:text-7xl font-black tracking-tight leading-tight text-slate-900 dark:text-white" dangerouslySetInnerHTML={{ __html: t.cta.title.replace("class='accent'", "class='text-orange-500'") }} />
            <p className="text-lg text-slate-600 dark:text-white/40 max-w-md mx-auto leading-relaxed">{t.cta.desc}</p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="email@chefgenie.io" className="flex-1 rounded-2xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] px-5 py-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition shadow-sm" />
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="rounded-2xl bg-orange-500 hover:bg-orange-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/30 transition-colors">
                {t.cta.button}
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <a href="#" className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-900 dark:bg-white/[0.06] border border-slate-800 dark:border-white/[0.1] hover:bg-slate-800 dark:hover:bg-white/[0.1] transition-all group scale-95 opacity-80 pointer-events-none">
                <Play className="w-5 h-5 text-white/60 group-hover:text-white transition-colors fill-current" />
                <div className="text-left"><p className="text-[10px] text-white/40 font-bold leading-none">GET IT ON</p><p className="text-sm font-bold text-white leading-tight">Google Play</p></div>
              </a>
              <a href="#" className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-900 dark:bg-white/[0.06] border border-slate-800 dark:border-white/[0.1] hover:bg-slate-800 dark:hover:bg-white/[0.1] transition-all group scale-95 opacity-80 pointer-events-none">
                <Apple className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                <div className="text-left"><p className="text-[10px] text-white/40 font-bold leading-none">DOWNLOAD ON THE</p><p className="text-sm font-bold text-white leading-tight">App Store</p></div>
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-1.5 pt-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />)}
              <span className="text-xs font-bold text-slate-400 dark:text-white/30 ml-2">{t.cta.socialProof}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-100 dark:border-white/[0.06] py-12 bg-white dark:bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center"><ChefHat className="w-4 h-4 text-white" /></div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">ChefGenie</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-white/20 font-medium">© {new Date().getFullYear()} ChefGenie · Developed by Rois Khoiron</p>
          <a href="/#chefgenie" className="text-xs font-bold text-slate-400 dark:text-white/20 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-wider">{t.nav.back}</a>
        </div>
      </footer>
    </main>
  );
}
