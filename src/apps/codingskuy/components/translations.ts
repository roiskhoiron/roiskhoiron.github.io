import type { Language } from "../../contexts/LanguageContext";

export type Translations = {
  nav: {
    about: string; learning: string; projects: string; media: string;
    ailab: string; community: string; activity: string; philosophy: string; hireMe: string;
  };
  hero: {
    badge: string; titleMain: string; titleSub: string;
    desc: string; ctaStart: string; ctaExplore: string;
    joinCommunity: string; follow: string; scroll: string;
  };
  about: {
    title: string; subtitle: string; role: string; location: string;
    email: string; status: string; story1: string; story2: string;
    founder: string;
    highlights: {
      mobileDev: { label: string; desc: string };
      backend: { label: string; desc: string };
      aiExploration: { label: string; desc: string };
      techWriting: { label: string; desc: string };
      community: { label: string; desc: string };
    };
    quote: string; quoteAuthor: string;
  };
  metrics: { title: string; heading: string; items: { value: string; label: string }[] };
  learning: { title: string; heading: string; desc: string; items: { title: string; desc: string }[] };
  showcase: { title: string; heading: string; desc: string; items: { title: string; desc: string; tech: string[] }[] };
  portfolio: { title: string; heading: string; projects: { name: string; desc: string }[] };
  mediaHub: { title: string; heading: string; desc: string };
  contentLibrary: { title: string; heading: string; desc: string };
  aiLab: { title: string; heading: string; desc: string; items: { title: string; desc: string }[] };
  community: { title: string; heading: string; desc: string; join: string };
  openSource: { title: string; heading: string; desc: string; items: { name: string; desc: string }[] };
  newsletter: { title: string; heading: string; desc: string; placeholder: string; button: string };
  footer: {
    brand: string; tagline: string; personal: string; codingskuy: string;
    research: string; aboutMe: string; portfolio: string; experience: string;
    contact: string; articles: string; tutorials: string; learningPaths: string;
    community_: string; aiLab_: string; openSource: string; githubProjects: string;
    newsletter_: string; copyright: string; madeWith: string; privacy: string;
    terms: string; sitemap: string;
  };
};

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      about: "Tentang", learning: "Pembelajaran", projects: "Proyek",
      media: "Media", ailab: "AI Lab", community: "Komunitas", activity: "Aktivitas", philosophy: "Filosofi", hireMe: "Hubungi Saya",
    },
    hero: {
      badge: "CodingSkuy!", titleMain: "CodingSkuy!", titleSub: "Belajar Teknologi Harus Menyenangkan",
      desc: "Platform belajar, konten teknologi, eksperimen AI, dan komunitas developer. Belajar, membangun, dan berbagi bersama Rois Khoiron.",
      ctaStart: "Jelajahi Konten", ctaExplore: "Gabung Komunitas",
      joinCommunity: "Gabung Komunitas", follow: "Ikuti:", scroll: "gulir",
    },
    about: {
      title: "Tentang CodingSkuy",
      subtitle: "Cerita",
      role: "Software Engineer & Educator",
      location: "Bandung, Indonesia",
      email: "rois@codingskuy.com",
      status: "✅ Open to Work",
      story1: "CodingSkuy! adalah platform belajar teknologi yang dibangun dari keprihatinan — betapa sulitnya menemukan konten berkualitas berbahasa Indonesia untuk belajar coding. Semuanya dimulai dari catatan kecil Rois Khoiron saat belajar otodidak, berkembang menjadi media dengan 150+ artikel, puluhan video tutorial, dan ribuan anggota komunitas.",
      story2: "Misi kami sederhana: membuat belajar teknologi jadi menyenangkan, praktis, dan accessible untuk semua developer Indonesia — melalui artikel, video, learning paths, eksperimen AI, dan komunitas yang saling mendukung.",
      founder: "Rois Khoiron, Founder",
      highlights: {
        mobileDev: { label: "Mobile Dev", desc: "Flutter & Android native" },
        backend: { label: "Backend", desc: "REST API & Cloud services" },
        aiExploration: { label: "AI Exploration", desc: "LLM, MCP & Agents" },
        techWriting: { label: "Tech Writing", desc: "Articles & tutorials" },
        community: { label: "Community", desc: "Building together" },
      },
      quote: "\"CodingSkuy lahir dari pengalaman pahit-belajar coding dari sumber berbahasa Inggris yang tidak selalu mudah dipahami. Sekarang kami hadir dengan 150+ konten berkualitas dalam bahasa Indonesia — dan baru memulai.\"",
      quoteAuthor: "Rois Khoiron, Founder",
    },
    metrics: {
      title: "Dampak & Jangkauan",
      heading: "Pencapaian dalam Angka",
      items: [
        { value: "50+", label: "Konten Teknologi" },
        { value: "12", label: "Proyek Open Source" },
        { value: "5K+", label: "Komunitas Developer" },
        { value: "∞", label: "Semangat Belajar" },
      ],
    },
    learning: {
      title: "Jalur Belajar",
      heading: "Jalur Belajar",
      desc: "Kurikulum terstruktur dari expert. Belajar dengan roadmap yang jelas dan terukur.",
      items: [
        { title: "Mobile Development", desc: "Flutter, Kotlin, SwiftUI." },
        { title: "Backend & API", desc: "FastAPI, PostgreSQL, Firebase." },
        { title: "AI & Machine Learning", desc: "LLM, Vision, Speech AI." },
        { title: "DevOps & Tools", desc: "Docker, CI/CD, MCP Server." },
      ],
    },
    showcase: {
      title: "Proyek Unggulan",
      heading: "Lihat CodingSkuy dalam Aksi",
      desc: "Sekilas tentang platform, komunitas, dan ekosistem yang dibangun untuk developer Indonesia.",
      items: [
        { title: "ChefGenie", desc: "AI-powered kitchen companion.", tech: ["Flutter", "AI", "FastAPI"] },
        { title: "InsForge", desc: "Backend-as-a-Service lokal.", tech: ["Go", "PostgreSQL"] },
      ],
    },
    portfolio: {
      title: "Portofolio",
      heading: "Portofolio Pilihan",
      projects: [
        { name: "ChefGenie", desc: "Aplikasi dapur cerdas dengan AI." },
        { name: "CodingSkuy Platform", desc: "Platform belajar dan media teknologi." },
      ],
    },
    mediaHub: {
      title: "Media Hub",
      heading: "Learn, Build, Share",
      desc: "Artikel, tutorial, dan video tentang teknologi terkini dari CodingSkuy.",
    },
    contentLibrary: {
      title: "Content Library",
      heading: "Perpustakaan Konten",
      desc: "Koleksi materi belajar, source code, dan referensi developer.",
    },
    aiLab: {
      title: "AI Lab",
      heading: "Experiments & Research",
      desc: "Eksperimen dan riset AI untuk aplikasi nyata.",
      items: [
        { title: "LLM Playground", desc: "Eksperimen dengan berbagai Large Language Model." },
        { title: "AI Vision", desc: "Computer vision untuk deteksi objek dan OCR." },
      ],
    },
    community: {
      title: "Komunitas", heading: "Gabung Komunitas", desc: "Bergabung dengan sesama developer Indonesia.", join: "Gabung Sekarang",
    },
    openSource: {
      title: "Open Source",
      heading: "Projects for Developers",
      desc: "Proyek yang dibuka untuk kontribusi publik.",
      items: [
        { name: "lean-ctx", desc: "Context engineering tools untuk AI agent." },
        { name: "MCP Servers", desc: "Model Context Protocol implementations." },
      ],
    },
    newsletter: {
      title: "Dapatkan Update Terbaru", heading: "Update Mingguan", desc: "Dapatkan insight terbaru seputar software engineering, AI, Flutter, backend, dan eksperimen teknologi — langsung ke inbox kamu, setiap minggu.", placeholder: "email@example.com", button: "Langganan",
    },
    footer: {
      brand: "CodingSkuy!", tagline: "Learning Technology Should Be Fun.",
      personal: "Personal", codingskuy: "CodingSkuy", research: "Riset & OS",
      aboutMe: "Tentang Saya", portfolio: "Portfolio", experience: "Pengalaman",
      contact: "Kontak", articles: "Artikel", tutorials: "Tutorial",
      learningPaths: "Jalur Belajar", community_: "Komunitas",
      aiLab_: "AI Lab", openSource: "Open Source", githubProjects: "Proyek GitHub",
      newsletter_: "Newsletter",
      copyright: "CodingSkuy! by Rois Khoiron",
      madeWith: "Dibuat dengan", privacy: "Privasi", terms: "Ketentuan", sitemap: "Peta Situs",
    },
  },
  en: {
    nav: {
      about: "About", learning: "Learning", projects: "Projects",
      media: "Media", ailab: "AI Lab", community: "Community", activity: "Activity", philosophy: "Philosophy", hireMe: "Hire Me",
    },
    hero: {
      badge: "CodingSkuy!", titleMain: "CodingSkuy!", titleSub: "Learning Technology Should Be Fun",
      desc: "Learning platform, tech content, AI experiments, and developer community. Learn, build, and share with Rois Khoiron.",
      ctaStart: "Explore Content", ctaExplore: "Join Community",
      joinCommunity: "Join Community", follow: "Follow:", scroll: "scroll",
    },
    about: {
      title: "About CodingSkuy",
      subtitle: "The Story",
      role: "Software Engineer & Educator",
      location: "Bandung, Indonesia",
      email: "rois@codingskuy.com",
      status: "✅ Open to Work",
      story1: "CodingSkuy! is a tech learning platform born from a concern — how hard it is to find quality Indonesian-language content for learning to code. It all started from Rois Khoiron's small notes while self-learning, growing into a media platform with 150+ articles, dozens of video tutorials, and thousands of community members.",
      story2: "Our mission is simple: make learning technology fun, practical, and accessible for all Indonesian developers — through articles, videos, learning paths, AI experiments, and a supportive community.",
      founder: "Rois Khoiron, Founder",
      highlights: {
        mobileDev: { label: "Mobile Dev", desc: "Flutter & Android native" },
        backend: { label: "Backend", desc: "REST API & Cloud services" },
        aiExploration: { label: "AI Exploration", desc: "LLM, MCP & Agents" },
        techWriting: { label: "Tech Writing", desc: "Articles & tutorials" },
        community: { label: "Community", desc: "Building together" },
      },
      quote: "\"CodingSkuy was born from the bitter experience of learning to code from English sources that weren't always easy to understand. Now we're here with 150+ quality content in Indonesian — and we're just getting started.\"",
      quoteAuthor: "Rois Khoiron, Founder",
    },
    metrics: {
      title: "Impact & Reach",
      heading: "Achievements in Numbers",
      items: [
        { value: "50+", label: "Tech Contents" },
        { value: "12", label: "Open Source Projects" },
        { value: "5K+", label: "Developer Community" },
        { value: "∞", label: "Learning Spirit" },
      ],
    },
    learning: {
      title: "Learning Paths",
      heading: "Learning Paths",
      desc: "Structured curriculum from experts. Learn with clear, measurable roadmaps.",
      items: [
        { title: "Mobile Development", desc: "Flutter, Kotlin, SwiftUI." },
        { title: "Backend & API", desc: "FastAPI, PostgreSQL, Firebase." },
        { title: "AI & Machine Learning", desc: "LLM, Vision, Speech AI." },
        { title: "DevOps & Tools", desc: "Docker, CI/CD, MCP Server." },
      ],
    },
    showcase: {
      title: "Featured Projects",
      heading: "See CodingSkuy in Action",
      desc: "A glimpse into the platform, community, and ecosystem built for Indonesian developers.",
      items: [
        { title: "ChefGenie", desc: "AI-powered kitchen companion.", tech: ["Flutter", "AI", "FastAPI"] },
        { title: "InsForge", desc: "Local Backend-as-a-Service.", tech: ["Go", "PostgreSQL"] },
      ],
    },
    portfolio: {
      title: "Portfolio",
      heading: "Featured Portfolio",
      projects: [
        { name: "ChefGenie", desc: "Smart kitchen app with AI." },
        { name: "CodingSkuy Platform", desc: "Learning platform and tech media." },
      ],
    },
    mediaHub: {
      title: "Media Hub",
      heading: "Learn, Build, Share",
      desc: "Articles, tutorials, and videos on latest tech from CodingSkuy.",
    },
    contentLibrary: {
      title: "Content Library",
      heading: "Content Library",
      desc: "Collection of learning materials, source code, and developer references.",
    },
    aiLab: {
      title: "AI Lab",
      heading: "Experiments & Research",
      desc: "AI experiments and research for real-world applications.",
      items: [
        { title: "LLM Playground", desc: "Experiments with various Large Language Models." },
        { title: "AI Vision", desc: "Computer vision for object detection and OCR." },
      ],
    },
    community: {
      title: "Community", heading: "Join Community", desc: "Join fellow Indonesian developers.", join: "Join Now",
    },
    openSource: {
      title: "Open Source",
      heading: "Projects for Developers",
      desc: "Projects open for public contribution.",
      items: [
        { name: "lean-ctx", desc: "Context engineering tools for AI agents." },
        { name: "MCP Servers", desc: "Model Context Protocol implementations." },
      ],
    },
    newsletter: {
      title: "Get Latest Updates", heading: "Weekly Update", desc: "Get the latest insights on software engineering, AI, Flutter, backend, and tech experiments — delivered to your inbox every week.", placeholder: "email@example.com", button: "Subscribe",
    },
    footer: {
      brand: "CodingSkuy!", tagline: "Learning Technology Should Be Fun.",
      personal: "Personal", codingskuy: "CodingSkuy", research: "Research & OS",
      aboutMe: "About Me", portfolio: "Portfolio", experience: "Experience",
      contact: "Contact", articles: "Articles", tutorials: "Tutorials",
      learningPaths: "Learning Paths", community_: "Community",
      aiLab_: "AI Lab", openSource: "Open Source", githubProjects: "GitHub Projects",
      newsletter_: "Newsletter",
      copyright: "CodingSkuy! by Rois Khoiron",
      madeWith: "Made with", privacy: "Privacy", terms: "Terms", sitemap: "Sitemap",
    },
  },
  zh: {
    nav: {
      about: "关于", learning: "学习", projects: "项目",
      media: "媒体", ailab: "AI实验室", community: "社区", activity: "动态", philosophy: "理念", hireMe: "联系我",
    },
    hero: {
      badge: "CodingSkuy!", titleMain: "CodingSkuy!", titleSub: "学习技术应该很有趣",
      desc: "学习平台、技术内容、AI实验和开发者社区。与Rois Khoiron一起学习、构建和分享。",
      ctaStart: "探索内容", ctaExplore: "加入社区",
      joinCommunity: "加入社区", follow: "关注:", scroll: "滚动",
    },
    about: {
      title: "关于CodingSkuy",
      subtitle: "故事",
      role: "软件工程师与教育者",
      location: "万隆，印度尼西亚",
      email: "rois@codingskuy.com",
      status: "✅ 开放机会",
      story1: "CodingSkuy! 是一个技术学习平台，源于对难以找到高质量印尼语编程学习资源的担忧。一切都始于Rois Khoiron自学时的小笔记，逐渐发展成为一个拥有150+文章、数十个视频教程和数千社区成员的内容平台。",
      story2: "我们的使命很简单：让技术学习变得有趣、实用且对所有印尼开发者可及——通过文章、视频、学习路径、AI实验和互相支持的社区。",
      founder: "Rois Khoiron，创始人",
      highlights: {
        mobileDev: { label: "移动开发", desc: "Flutter和Android原生" },
        backend: { label: "后端", desc: "REST API和云服务" },
        aiExploration: { label: "AI探索", desc: "LLM、MCP和智能体" },
        techWriting: { label: "技术写作", desc: "文章和教程" },
        community: { label: "社区", desc: "共同建设" },
      },
      quote: "\"CodingSkuy诞生于从不易理解的英文资源学习编程的痛苦经历。现在我们提供150+篇印尼语优质内容——这只是开始。\"",
      quoteAuthor: "Rois Khoiron，创始人",
    },
    metrics: {
      title: "影响与覆盖",
      heading: "数据成就",
      items: [
        { value: "50+", label: "技术内容" },
        { value: "12", label: "开源项目" },
        { value: "5K+", label: "开发者社区" },
        { value: "∞", label: "学习精神" },
      ],
    },
    learning: {
      title: "学习路径",
      heading: "学习路径",
      desc: "专家设计的结构化课程。以清晰、可衡量的路线图学习。",
      items: [
        { title: "移动开发", desc: "Flutter, Kotlin, SwiftUI." },
        { title: "后端与API", desc: "FastAPI, PostgreSQL, Firebase." },
        { title: "AI与机器学习", desc: "LLM, Vision, Speech AI." },
        { title: "DevOps与工具", desc: "Docker, CI/CD, MCP Server." },
      ],
    },
    showcase: {
      title: "视频展示",
      heading: "看CodingSkuy在行动",
      desc: "平台、社区和生态系统的简介，专为印尼开发者打造。",
      items: [
        { title: "ChefGenie", desc: "AI驱动的厨房助手。", tech: ["Flutter", "AI", "FastAPI"] },
        { title: "InsForge", desc: "本地后端即服务。", tech: ["Go", "PostgreSQL"] },
      ],
    },
    portfolio: {
      title: "作品集",
      heading: "精选作品集",
      projects: [
        { name: "ChefGenie", desc: "智能厨房AI应用。" },
        { name: "CodingSkuy平台", desc: "学习平台和技术媒体。" },
      ],
    },
    mediaHub: {
      title: "媒体中心",
      heading: "学习、构建、分享",
      desc: "来自CodingSkuy的最新技术文章、教程和视频。",
    },
    contentLibrary: {
      title: "内容库",
      heading: "内容库",
      desc: "学习材料、源代码和开发者参考的集合。",
    },
    aiLab: {
      title: "AI实验室",
      heading: "实验与研究",
      desc: "面向实际应用的AI实验和研究。",
      items: [
        { title: "LLM游乐场", desc: "各种大型语言模型的实验。" },
        { title: "AI视觉", desc: "用于物体检测和OCR的计算机视觉。" },
      ],
    },
    community: {
      title: "社区", heading: "加入社区", desc: "与印尼开发者同行交流。", join: "立即加入",
    },
    openSource: {
      title: "开源",
      heading: "面向开发者的项目",
      desc: "向公众开放贡献的项目。",
      items: [
        { name: "lean-ctx", desc: "AI智能体的上下文工程工具。" },
        { name: "MCP服务器", desc: "模型上下文协议实现。" },
      ],
    },
    newsletter: {
      title: "获取最新更新", heading: "每周更新", desc: "获取软件工程、AI、Flutter、后端和技术实验的最新见解——每周发送到你的邮箱。", placeholder: "email@example.com", button: "订阅",
    },
    footer: {
      brand: "CodingSkuy!", tagline: "学习技术应该很有趣。",
      personal: "个人", codingskuy: "CodingSkuy", research: "研究与开源",
      aboutMe: "关于我", portfolio: "作品集", experience: "经验",
      contact: "联系", articles: "文章", tutorials: "教程",
      learningPaths: "学习路径", community_: "社区",
      aiLab_: "AI实验室", openSource: "开源", githubProjects: "GitHub项目",
      newsletter_: "通讯",
      copyright: "CodingSkuy! by Rois Khoiron",
      madeWith: "用心制作", privacy: "隐私", terms: "条款", sitemap: "网站地图",
    },
  },
  ja: {
    nav: {
      about: "概要", learning: "学習", projects: "プロジェクト",
      media: "メディア", ailab: "AIラボ", community: "コミュニティ", activity: "アクティビティ", philosophy: "哲学", hireMe: "お問い合わせ",
    },
    hero: {
      badge: "CodingSkuy!", titleMain: "CodingSkuy!", titleSub: "テクノロジー学習は楽しくあるべき",
      desc: "学習プラットフォーム、技術コンテンツ、AI実験、開発者コミュニティ。Rois Khoironと一緒に学び、作り、共有しましょう。",
      ctaStart: "コンテンツを見る", ctaExplore: "コミュニティに参加",
      joinCommunity: "コミュニティに参加", follow: "フォロー:", scroll: "スクロール",
    },
    about: {
      title: "CodingSkuyについて",
      subtitle: "ストーリー",
      role: "ソフトウェアエンジニア・教育者",
      location: "バンドン、インドネシア",
      email: "rois@codingskuy.com",
      status: "✅ 募集中",
      story1: "CodingSkuy! は、質の高いインドネシア語のプログラミング学習コンテンツを見つけるのが難しいという問題意識から生まれたテクノロジー学習プラットフォームです。Rois Khoironが独学時の小さなメモから始まり、150+の記事、数十のビデオチュートリアル、数千のコミュニティメンバーを持つメディアへと成長しました。",
      story2: "私たちの使命はシンプルです：テクノロジー学習を楽しく、実践的で、すべてのインドネシア開発者がアクセスできるものにすること — 記事、ビデオ、学習パス、AI実験、そして相互支援コミュニティを通じて。",
      founder: "Rois Khoiron, 創設者",
      highlights: {
        mobileDev: { label: "モバイル開発", desc: "Flutter・Androidネイティブ" },
        backend: { label: "バックエンド", desc: "REST API・クラウドサービス" },
        aiExploration: { label: "AI探求", desc: "LLM、MCP、エージェント" },
        techWriting: { label: "技術記事", desc: "記事とチュートリアル" },
        community: { label: "コミュニティ", desc: "共に構築する" },
      },
      quote: "\"CodingSkuyは、必ずしも理解しやすいとは限らない英語のソースからコードを学ぶ苦い経験から生まれました。現在、インドネシア語で150以上の質の高いコンテンツを提供しています — そしてこれはまだ始まりに過ぎません。\"",
      quoteAuthor: "Rois Khoiron, 創設者",
    },
    metrics: {
      title: "影響とリーチ",
      heading: "数字で見る実績",
      items: [
        { value: "50+", label: "技術コンテンツ" },
        { value: "12", label: "オープンソースプロジェクト" },
        { value: "5K+", label: "開発者コミュニティ" },
        { value: "∞", label: "学習精神" },
      ],
    },
    learning: {
      title: "学習パス",
      heading: "学習パス",
      desc: "専門家による構造化カリキュラム。明確で測定可能なロードマップで学習。",
      items: [
        { title: "モバイル開発", desc: "Flutter, Kotlin, SwiftUI." },
        { title: "バックエンド・API", desc: "FastAPI, PostgreSQL, Firebase." },
        { title: "AI・機械学習", desc: "LLM, Vision, Speech AI." },
        { title: "DevOps・ツール", desc: "Docker, CI/CD, MCP Server." },
      ],
    },
    showcase: {
      title: "ビデオショーケース",
      heading: "CodingSkuyの動作を見る",
      desc: "インドネシアの開発者向けに構築されたプラットフォーム、コミュニティ、エコシステムの概要。",
      items: [
        { title: "ChefGenie", desc: "AI搭載キッチンコンパニオン。", tech: ["Flutter", "AI", "FastAPI"] },
        { title: "InsForge", desc: "ローカルBaaS。", tech: ["Go", "PostgreSQL"] },
      ],
    },
    portfolio: {
      title: "ポートフォリオ",
      heading: "厳選ポートフォリオ",
      projects: [
        { name: "ChefGenie", desc: "AIスマートキッチンアプリ。" },
        { name: "CodingSkuyプラットフォーム", desc: "学習プラットフォーム＆テックメディア。" },
      ],
    },
    mediaHub: {
      title: "メディアハブ",
      heading: "学ぶ、作る、共有する",
      desc: "CodingSkuyからの最新技術記事、チュートリアル、動画。",
    },
    contentLibrary: {
      title: "コンテンツライブラリ",
      heading: "コンテンツライブラリ",
      desc: "学習教材、ソースコード、開発者向けリファレンスのコレクション。",
    },
    aiLab: {
      title: "AIラボ",
      heading: "実験と研究",
      desc: "実世界のアプリケーション向けAI実験と研究。",
      items: [
        { title: "LLMプレイグラウンド", desc: "様々な大規模言語モデルの実験。" },
        { title: "AIビジョン", desc: "物体検出とOCRのためのコンピュータビジョン。" },
      ],
    },
    community: {
      title: "コミュニティ", heading: "コミュニティに参加", desc: "仲間のインドネシア開発者と交流。", join: "今すぐ参加",
    },
    openSource: {
      title: "オープンソース",
      heading: "開発者のためのプロジェクト",
      desc: "一般の貢献に公開されているプロジェクト。",
      items: [
        { name: "lean-ctx", desc: "AIエージェント向けコンテキストエンジニアリングツール。" },
        { name: "MCPサーバー", desc: "Model Context Protocolの実装。" },
      ],
    },
    newsletter: {
      title: "最新情報を受け取る", heading: "週刊アップデート", desc: "ソフトウェアエンジニアリング、AI、Flutter、バックエンド、テクノロジー実験に関する最新情報を毎週あなたの受信箱にお届けします。", placeholder: "email@example.com", button: "購読",
    },
    footer: {
      brand: "CodingSkuy!", tagline: "Learning Technology Should Be Fun.",
      personal: "パーソナル", codingskuy: "CodingSkuy", research: "研究・OS",
      aboutMe: "私について", portfolio: "ポートフォリオ", experience: "経験",
      contact: "お問い合わせ", articles: "記事", tutorials: "チュートリアル",
      learningPaths: "学習パス", community_: "コミュニティ",
      aiLab_: "AIラボ", openSource: "オープンソース", githubProjects: "GitHubプロジェクト",
      newsletter_: "ニュースレター",
      copyright: "CodingSkuy! by Rois Khoiron",
      madeWith: "によって作られました", privacy: "プライバシー", terms: "利用規約", sitemap: "サイトマップ",
    },
  },
};
