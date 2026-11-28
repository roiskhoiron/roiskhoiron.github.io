export type Deck = { title:string; slug:string; slides:number; type:string; tags:string[]; lang:string; desc:string; color:string; date:string };
export type DeckSlide = {
  layout: 'cover'|'bullets'|'code'|'cards'|'split';
  subtitle: string; title: string; message?: string;
  points?: string[]; code?: string; cards?: {title:string;desc:string;icon:string}[];
  leftTitle?: string; leftPoints?: string[]; rightTitle?: string; rightPoints?: string[];
  gradient?: string;
};
export type Post = { title:string; slug:string; tag:string; date:string; desc:string; color:string; accent:string };
export type PostSlide = { num:string; label:string; title:string; subtitle?:string; body:string; theme:'white'|'black'; bullets?:string[]; code?:string|null };
export type BlogPost = { title:string; slug:string; date:string; mins:number; tags:string[]; excerpt:string; featured?:boolean };
export { blogData, blogFull } from './blog';
import { moreDecks, moreDeckSlides, morePosts, morePostSlides } from './library';
export type Video = { id:string; title:string; desc:string; thumb:string; date:string; duration:string; views:string; isShort:boolean; isLive:boolean; tag:string };

export const decksData: Deck[] = [
  ...moreDecks,
  {title:"Kotlin Multiplatform: Leverage, Not Replacement", slug:"kmp-leverage", slides:7, type:"Editorial Deck", tags:["kotlin","kmp","mobile"], lang:"ID", desc:"Sesi bersama Iqbal Fauzi: Mengapa KMP bukan tentang menggantikan Flutter, melainkan tentang leverage native codebase yang sudah ada.", color:"from-purple-600/30 to-blue-500/20", date:"2026-09-11"},
  {title:"Proyek 1: CLI Mini — Kalkulator & Todo", slug:"cli-mini-bun-typescript", slides:7, type:"Editorial Deck", tags:["typescript","bun","backend","cli"], lang:"ID", desc:"Belajar bareng TypeScript CLI: Kalkulator pure functions + Todo dengan file persistence. Insight yang sering terlewat: type-casting runtime, IO defensif, logic pure vs side-effect.", color:"from-orange-600/30 to-amber-500/20", date:"2026-09-12"},
  {title:"Promise.all vs allSettled", slug:"promise-all-vs-settled-deck", slides:8, type:"Editorial Deck", tags:["js","typescript","backend"], lang:"ID", desc:"Analogi satpam galak (Promise.all) vs satpam sabar (allSettled). Kapan pakai yang mana di backend.", color:"from-sky-500/25 to-blue-600/20", date:"2026-09-13"},
];

export const deckSlides: Record<string, DeckSlide[]> = {
  ...moreDeckSlides,
  "kmp-leverage": [
    {layout:"cover", subtitle:"Catatan dari sesi Iqbal Fauzi (Bobobox)", title:"KMP: Leverage, Not Replacement", message:"Saya datang ingin tahu Kotlin Multiplatform. Pulang dengan satu kesimpulan: positioning-nya jauh berbeda dari yang saya bayangkan.", points:["Bukan pesaing Flutter.","Pengungkit untuk codebase native yang sudah ada."], gradient:"from-purple-600/30 to-blue-500/20"},
    {layout:"bullets", subtitle:"Dua pertanyaan", title:"Speed yang Sesungguhnya", message:"KMP didemo langsung di device low-end. Bukan slide, bukan klaim.", points:["Seberapa cepat kita menulis code?","Seberapa baik hasilnya saat dijalankan?","KMP mencoba menjawab keduanya sekaligus."], gradient:"from-zinc-800 to-zinc-900"},
    {layout:"cards", subtitle:"Shared logic", title:"Share yang Masuk Akal", message:"KMP tidak memaksa UI menjadi abstraksi. Yang di-share hanya bagian yang memang layak.", cards:[{title:"Business logic",desc:"Aturan domain ditulis sekali, dipakai Android dan iOS.",icon:"◆"},{title:"Networking & data",desc:"Client API, cache, dan model data yang sama.",icon:"⇄"},{title:"Validasi & state",desc:"Satu sumber kebenaran untuk aturan input dan state.",icon:"✓"},{title:"UI tetap native",desc:"Jetpack Compose dan SwiftUI tetap platform-specific.",icon:"▣"}]},
    {layout:"bullets", subtitle:"Nilai bisnis terbesar", title:"Incremental Migration", message:"Untuk tim dengan investasi besar di native Android dan iOS, KMP tidak menuntut rewrite dari nol.", points:["Masuk per modul, bukan big-bang migration.","Mulai dari bagian yang paling memberi value.","Codebase lama tidak dibuang.","Risiko migrasi tidak diambil sekaligus."], gradient:"from-purple-900/20 to-zinc-900"},
    {layout:"split", subtitle:"False binary", title:"Flutter vs KMP", leftTitle:"Flutter", leftPoints:["Cross-platform UI.","Satu codebase.","Cocok saat mulai dari nol."], rightTitle:"Kotlin Multiplatform", rightPoints:["Shared logic, UI native.","Menumpang codebase yang ada.","Cocok saat native sudah berjalan."], gradient:"from-purple-600/20 to-zinc-900"},
    {layout:"bullets", subtitle:"Framework selection", title:"Problem First, Framework Second", message:"Solusi terbaik kadang bukan mengganti semuanya, tapi membuat yang sudah ada jadi lebih kuat.", points:["Codebase Anda sekarang seperti apa?","Berapa besar investasi yang sudah ada di native?","Framework mana yang memberi leverage terbesar?"], gradient:"from-zinc-800 to-zinc-900"},
    {layout:"bullets", subtitle:"Terima kasih, Iqbal Fauzi", title:"Takeaways", message:"KMP adalah opsi realistis, bukan sekadar teori.", points:["KMP dan Flutter menjawab konteks yang berbeda.","Nilai KMP ada di migrasi bertahap.","Evaluasi berdasarkan constraint nyata tim Anda."], gradient:"from-purple-500/15 to-zinc-900"},
  ],
  "cli-mini-bun-typescript": [
    {layout:"cover", subtitle:"Kalkulator & Todo CLI dengan Bun + TypeScript", title:"Proyek 1: CLI Mini", message:"Clean Architecture mini, pure functions, file persistence. Pelajaran yang sering terlewat: TypeScript itu kontrak saat coding, runtime masih butuh validasi.", points:["Calculator: pure functions, error handling.","Todo: async/await, file IO, CRUD."], gradient:"from-orange-600/30 to-amber-500/20"},
    {layout:"bullets", subtitle:"Kenapa Bun + TypeScript?", title:"Stack Choice", message:"Bun: all-in-one runtime (cepat, no setup). TypeScript: type safety dari awal.", points:["Bun menjalankan TS native, tanpa compile manual.","Type safety mencegah bug tipe di awal (String vs number).","Backend butuh kontrak yang ketat."], gradient:"from-zinc-800 to-zinc-900"},
    {layout:"code", subtitle:"Clean Architecture Mini", title:"Struktur Proyek", message:"Terpisah: utils (pure), domain (logic), cli (controller).", code:"src/\\n├── calculator.ts    # Pure functions\\n├── todo.ts          # Domain logic + IO\\n├── cli.ts           # Controller\\n└── utils/args.ts    # Helpers", points:["Single Responsibility.","DRY principles."]},
    {layout:"cards", subtitle:"Insight Praktisi: Jebakan TypeScript", title:"Unsung Heroes — Type Casting Runtime", message:"TypeScript compiler hanya berlaku saat develop. Runtime tetap perlu validasi manual.", cards:[{title:"isNaN() & Number()",desc:"User input selalu string. Casting tanpa check = bug.",icon:"!"},{title:"Process.argv.slice(2)",desc:"Memisahkan runtime env dari user input adalah kunci CLI stabil.",icon:"▦"},{title:"Try-Catch di Logic",desc:"Error di pure function (calculator) bukan di CLI. Reusable & testable.",icon:"↕"},{title:"Bun.file().exists()",desc:"IO defensif: file bisa hilang saat pertama kali run.",icon:"⬢"}]},
    {layout:"split", subtitle:"Lesson: TypeScript Kontrak Saja", title:"Compile Time vs Runtime", leftTitle:"TypeScript (Compile)", leftPoints:["✅ Pastiin tipe cocok.","✅ Check interface match.","❌ Nggak tahu input user apa.","❌ Nggak tahu file ada atau tidak."], rightTitle:"JavaScript (Runtime)", rightPoints:["✅ Terima apa saja.","✅ I/O benar-benar terjadi.","❌ Bisa dapat string, ekspek number.","❌ Bisa crash kalau file hilang."], gradient:"from-orange-600/20 to-zinc-900"},
    {layout:"bullets", subtitle:"Bedanya Praktisi & Pemula", title:"Praktisi Tahu", message:"TypeScript safety hanya sampai compile. Defensive programming tetap wajib.", points:["Input validation adalah bagian dari logic.","Side-effect (IO, network) butuh error handling explicit.","Pure logic terpisah dari CLI controller buat reusable.","Test logic tanpa perlu mock filesystem."], gradient:"from-orange-900/20 to-zinc-900"},
    {layout:"bullets", subtitle:"Key Insight", title:"Takeaways", message:"Code yang clean bukan cuma tentang struktur folder.", points:["Type-cast runtime = defensive, bukan asumsi.","Pisahkan pure logic dari side-effect.","Satu file cocok, tapi buat practice struktur yang jelas.","Backend yang robust = anticipate failure, bukan catch error."], gradient:"from-orange-500/15 to-zinc-900"},
  ],
  "promise-all-vs-settled-deck":[
    {layout:"cover", subtitle:"Satpam Galak vs Satpam Sabar", title:"Promise.all vs allSettled", message:"Pas ambil data dari multiple API, saya ketemu jebakan Promise.all. Satu gagal, semua dianggap gagal. Ternyata ada solusinya: allSettled.", points:["Promise.all: all-or-nothing.","allSettled: detailed report."], gradient:"from-sky-500/25 to-blue-600/20"},
    {layout:"bullets", subtitle:"Apa Itu Promise.all?", title:"Satpam Galak", message:"Promise.all tunggu semua selesai, tapi kalau satu reject, langsung error. Semua status nggak ketahuan.", points:["Satu gagal → semua gagal.","Tidak bisa tahu status masing-masing.","Error bocor kalau nggak ada try/catch."], gradient:"from-zinc-800 to-zinc-900"},
    {layout:"code", subtitle:"Contoh Masalah", title:"Promise.all Error", message:"Ambil 3 user, user kedua gagal.", code:"const hasil = await Promise.all([\n  ambilUser(1),  // ✅ jadi\n  ambilUser(2),  // ❌ gagal\n  ambilUser(3),  // ❓ nggak tahu\n])\n// Langsung error! User 1 dan 3 nggak ketahuan!", points:["Satu error → promise.all langsung reject.","Yang lain nggak sempat diproses ke hasil."]},
    {layout:"bullets", subtitle:"Apa Itu allSettled?", title:"Satpam Sabar", message:"allSettled tunggu semua selesai, entah jadi atau gagal. Baru lapor satu-satu dengan status detail.", points:["Tunggu semua selesai (fulfilled atau rejected).","Setiap hasil punya status dan value/reason.","Perfect buat backend yang robust."], gradient:"from-zinc-800 to-zinc-900"},
    {layout:"code", subtitle:"Perbandingan Hasil", title:"allSettled Success", message:"Lihat perbedaannya. allSettled tetap proses semuanya.", code:"const hasil = await Promise.allSettled([\n  ambilUser(1),  // ✅ jadi\n  ambilUser(2),  // ❌ gagal\n  ambilUser(3),  // ✅ jadi\n])\n// hasil = [\n//   { status: 'fulfilled', value: 'User 1' },\n//   { status: 'rejected', reason: 'Error' },\n//   { status: 'fulfilled', value: 'User 3' }\n// ]"},
    {layout:"split", subtitle:"Analogi Pesanan Kue", title:"Promise.all vs allSettled", leftTitle:"Promise.all", leftPoints:["Pesan: coklat, keju, strawberry.","Keju habis?","Semua pesanan GAGAL!","Nggak tahu coklat & strawberry."], rightTitle:"allSettled", rightPoints:["Tunggu semua siap.","Lapor satu-satu:","coklat ✅, keju ❌, strawberry ✅.","Tau persis status masing-masing."], gradient:"from-sky-500/20 to-zinc-900"},
    {layout:"bullets", subtitle:"Kapan Pakai Apa?", title:"Decision Map", message:"Pilih strategi yang cocok sama use case.", points:["Promise.all: Critical operation (semua atau nggak ada).","Promise.allSettled: Robust backend (sebagian ok, sebagian fail).","Contoh: 3 API. Weather down, Maps & DB tetap tampil."], gradient:"from-sky-900/20 to-zinc-900"},
    {layout:"bullets", subtitle:"Key Insights", title:"Takeaways", message:"Backend yang baik bisa handle partial failure.", points:["Promise.all = fail fast.","allSettled = graceful degradation.","Pilih yang sesuai kebutuhan user, bukan keyboard."], gradient:"from-sky-500/15 to-zinc-900"},
  ]
};

export const postsData: Post[] = [
  ...morePosts,
  {title:"Kotlin Multiplatform: Leverage, Not Replacement", slug:"kmp-leverage-post", tag:"mobile", date:"2026-09-11", desc:"KMP bukan tentang menggantikan Flutter, melainkan leverage native codebase yang sudah ada. Sesi demo bersama Iqbal Fauzi.", color:"bg-white text-black", accent:"mobile"},
  {title:"Proyek 1: CLI Mini — Kalkulator & Todo", slug:"cli-mini-bun-typescript", tag:"tips", date:"2026-09-12", desc:"Belajar bareng TypeScript CLI: Kalkulator pure functions + Todo dengan file persistence. Insight yang sering terlewat: type-casting runtime, IO defensif, logic pure vs side-effect.", color:"bg-white text-black", accent:"tips"},
  {title:"TypeScript Template Literals", slug:"ts-template-literals", tag:"tips", date:"2026-09-12", desc:"Bedanya template string Kotlin vs JS/TS. Kapan pakai backtick dan ${} vs tanda kutip biasa.", color:"bg-white text-black", accent:"tips"},
  {title:"Promise.all vs allSettled", slug:"promise-all-vs-settled", tag:"tips", date:"2026-09-13", desc:"Analogi satpam galak (Promise.all) vs satpam sabar (allSettled). Kapan pakai yang mana di backend.", color:"bg-zinc-900 text-white border border-zinc-800", accent:"tips"},
];

export const postsSlides: Record<string, PostSlide[]> = {
  ...morePostSlides,
  "promise-all-vs-settled":[
    {num:"", label:"tips", title:"Promise.all vs allSettled", body:"Pas ambil data dari beberapa API sekaligus, saya ketemu jebakan Promise.all: satu gagal, semuanya dianggap gagal.", theme:"black"},
    {num:"02", label:"Satpam galak", title:"Promise.all", body:"Menunggu semua selesai, tapi begitu satu reject, langsung error.", bullets:["Satu gagal → semua gagal.","Status masing-masing tidak ketahuan.","Cocok untuk operasi all-or-nothing."], theme:"black"},
    {num:"03", label:"Masalahnya", title:"Satu error, semua hilang", body:"Ambil tiga user, user kedua gagal. User 1 dan 3 ikut hilang.", code:"const hasil = await Promise.all([\n  ambilUser(1),  // ✅\n  ambilUser(2),  // ❌\n  ambilUser(3),  // ❓\n])\n// langsung throw", theme:"black"},
    {num:"04", label:"Satpam sabar", title:"Promise.allSettled", body:"Menunggu semuanya selesai, berhasil atau gagal, lalu melapor satu per satu.", code:"const hasil = await Promise.allSettled([...])\n// { status: 'fulfilled', value }\n// { status: 'rejected', reason }", theme:"black"},
    {num:"05", label:"Analogi", title:"Pesanan kue", body:"Pesan coklat, keju, strawberry. Keju habis.", bullets:["Promise.all: semua pesanan batal.","allSettled: coklat ✅, keju ❌, strawberry ✅."], theme:"black"},
    {num:"06", label:"Kapan pakai apa", title:"Decision map", body:"Pilih berdasarkan kebutuhan user, bukan kebiasaan.", bullets:["Promise.all = fail fast.","allSettled = graceful degradation.","Contoh: Weather down, Maps & DB tetap tampil."], theme:"black"},
  ],
  "kmp-leverage-post":[
    {num:"", label:"mobile", title:"KMP: Leverage, Not Replacement", body:"Datang ingin tahu KMP. Pulang kepikiran: ternyata positioning-nya sangat berbeda dari yang saya bayangkan.", theme:"white"},
    {num:"02", label:"Dua Pertanyaan", title:"Speed Yang Sesungguhnya", body:"Di sesi Iqbal Fauzi, KMP didemo langsung di device low-end. Bukan slide. Bukan klaim. Langsung dijalankan.", bullets:["Seberapa cepat kita menulis code?","Seberapa baik hasilnya saat dijalankan?","KMP menjawab keduanya sekaligus."], theme:"white"},
    {num:"03", label:"Shared Logic", title:"Share Yang Masuk Akal", body:"KMP tidak memaksa UI menjadi abstraksi. Anda share bagian yang memang layak di-share.", bullets:["Business logic & domain rules.","Networking & data layer.","Validation & state management.","UI? Tetap native, tetap platform-specific."], theme:"white"},
    {num:"04", label:"Nilai Bisnis Terbesar", title:"Incremental Migration", body:"Untuk perusahaan dengan investasi besar di native Android dan iOS, KMP tidak memaksa rewrite dari nol.", bullets:["Masuk per modul, bukan big-bang migration.","Mulai dari bagian yang paling memberikan value.","Tidak buang codebase lama.","Tidak ambil risiko migrasi sekaligus."], theme:"white"},
    {num:"05", label:"False Binary", title:"KMP Tidak Akan Membunuh Flutter", body:"Pertanyaannya bukan siapa yang menang. Pertanyaannya adalah: problem Anda apa?", bullets:["Flutter: cross-platform UI, satu codebase, mulai dari nol.","KMP: shared logic, native UI, leverage existing codebase.","Dua pendekatan berbeda untuk dua konteks berbeda."], theme:"white"},
    {num:"06", label:"Framework Selection", title:"Problem First, Framework Second", body:"Solusi terbaik kadang bukan mengganti semuanya — tapi membuat yang sudah ada menjadi lebih powerful.", bullets:["Codebase Anda sekarang seperti apa?","Berapa besar investasi yang sudah ada di native?","Framework mana yang memberi leverage terbesar?"], theme:"white"},
    {num:"07", label:"Terima kasih Iqbal Fauzi", title:"Closing", body:"Insight dan demo dari Iqbal Fauzi, Senior Mobile Developer di Bobobox. KMP sebagai opsi realistis, bukan sekadar teori.", bullets:["KotlinMultiplatform #KMP #Flutter.","#MobileDevelopment #SoftwareEngineering.","Evaluate based on your actual constraints."], theme:"white"},
  ],
  "ts-template-literals":[
    {num:"", label:"tips", title:"Template Literals: JS/TS vs Kotlin", body:"Hampir bener Rois! Pas baru pindah ke JS/TS, saya sempat berkali-kali nulis string interpolation kayak di Kotlin tapi malah zonk. Ternyata, JS/TS punya aturannya sendiri.", theme:"white"},
    {num:"02", label:"Problem", title:"Kenapa $a nggak jalan?", body:"Awalnya saya pakai kutip dua (\"$a + $b = $hasil\"). Di console hasilnya malah teks mentah: $a + $b = $hasil. Ternyata, kutip dua di JS itu bukan untuk template string, tapi teks murni.", bullets:["Kutip dua (\") tidak melakukan apa-apa pada variabel.","Programmer sering terjebak habit dari bahasa lain."], theme:"white"},
    {num:"03", label:"Solusi", title:"Template Literals: Backtick + ${}", body:"Ternyata kuncinya ada di backtick (`). Saya belajar membayangkan backtick ini sebagai 'gerbang template' dan ${} sebagai lubang tempat kita masukin variabelnya.", code:"let a = 5; let b = 10; let hasil = a + b;\n\n// Pakai backtick (`), bukan kutip biasa\nconsole.log(`${a} + ${b} = ${hasil}`);", theme:"white"},
    {num:"04", label:"Refleksi", title:"Kenapa Saya Suka Ini?", body:"Setelah terbiasa, backtick ini malah terasa lebih clean daripada cara jadul (`a + \" + \" + b`).", bullets:["Lebih readable saat string-nya panjang.","Tidak perlu repot dengan operator + lagi.","Sangat mirip dengan kemudahan Kotlin."], theme:"white"},
    {num:"05", label:"Perbandingan", title:"Coba Bandingkan", body:"Lihat bedanya di console. Satu bikin error logic, satu lagi langsung jalan.", code:"// ❌ Jangan pakai kutip dua\nconsole.log(\"$a + $b = $hasil\");\n\n// ✅ Pakai backtick (`)\nconsole.log(`${a} + ${b} = ${hasil}`);", theme:"white"},
  ],
  "cli-mini-bun-typescript": [
    {num:"", label:"tips", title:"Proyek 1: CLI Mini", body:"Belajar bareng TypeScript CLI: Kalkulator pure functions + Todo dengan file persistence. Insight yang sering terlewat: type-casting runtime, IO defensif, logic pure vs side-effect.", theme:"white"},
    {num:"02", label:"tips", title:"Type Casting Runtime", body:"Input user (args) selalu string. Mengandalkan `as number` tanpa validasi runtime adalah jebakan batman.", bullets:["Gunakan Number() dan isNaN().","Input validation = logic part."], theme:"white"},
    {num:"03", label:"tips", title:"IO Defensif", body:"Bun.file().exists() sering terlupakan di proyek pemula.", bullets:["File bisa hilang/belum ada.","Handling IO failure itu wajib."], theme:"white"},
    {num:"04", label:"tips", title:"Pure vs Side-effect", body:"Pisahkan logic (kalkulator) dari side-effect (CLI/IO). Jadi logic bisa di-test tanpa butuh filesystem.", theme:"white"},
  ],
};


export const videosData: Video[] = [
  // — dari channel UCrmuEbY204vec5E1-JZ1Z4A (@codingskuy) via youtubei/v1/browse —
  // Videos (16:9) — tab Videos
  {id:"OYlvW32U7VM", title:"Gen Z belajar Kotlin di Era AI!", desc:"Live coding Kotlin untuk Gen Z di era AI — kenapa masih relevan.", thumb:"https://i.ytimg.com/vi/OYlvW32U7VM/hq720.jpg", date:"4 weeks ago", duration:"1:08:38", views:"25", isShort:false, isLive:true, tag:"kotlin"},
  {id:"3xG5rPoh49I", title:"Part II - Gen Z Belajar TypeScript di Zaman AI, Masih Aman?", desc:"Lanjutan deep dive TypeScript untuk Gen Z.", thumb:"https://i.ytimg.com/vi/3xG5rPoh49I/hq720.jpg", date:"1 month ago", duration:"1:47:38", views:"5", isShort:false, isLive:false, tag:"typescript"},
  {id:"UzPpXbyWMJs", title:"🚀 Gen Z Belajar TypeScript di Zaman AI, Masih Aman?", desc:"Apakah TypeScript masih aman untuk Gen Z di zaman AI?", thumb:"https://i.ytimg.com/vi/UzPpXbyWMJs/hq720.jpg", date:"1 month ago", duration:"1:34:25", views:"11", isShort:false, isLive:false, tag:"typescript"},
  {id:"2RDMEdUmENA", title:"Who I Am?", desc:"Perkenalan — Who I Am?", thumb:"https://i.ytimg.com/vi/2RDMEdUmENA/hq720.jpg", date:"1 month ago", duration:"0:33", views:"6", isShort:false, isLive:false, tag:"intro"},
  {id:"y740aHNY-kw", title:"Day #7 Programmer Nganggur", desc:"Hari ke-7 perjalanan programmer nganggur.", thumb:"https://i.ytimg.com/vi/y740aHNY-kw/hq720.jpg", date:"7 months ago", duration:"47:10", views:"13", isShort:false, isLive:false, tag:"series"},
  {id:"PRtfeCY_px4", title:"Day #6 Programmer Nganggur", desc:"Hari ke-6 — catatan harian.", thumb:"https://i.ytimg.com/vi/PRtfeCY_px4/hq720.jpg", date:"8 months ago", duration:"46:47", views:"7", isShort:false, isLive:false, tag:"series"},
  {id:"lzm6EuGzoZE", title:"Day #5 Programmer Nganggur", desc:"Hari ke-5 — progress dan refleksi.", thumb:"https://i.ytimg.com/vi/lzm6EuGzoZE/hq720.jpg", date:"8 months ago", duration:"1:06:41", views:"2", isShort:false, isLive:false, tag:"series"},
  {id:"G5boTGk8yuk", title:"Strategi Sukses Mengatur Tim Lintas Fungsi dan Rekrutmen Anggota yang Tepat!", desc:"Strategi atur tim lintas fungsi.", thumb:"https://i.ytimg.com/vi/G5boTGk8yuk/hq720.jpg", date:"8 months ago", duration:"4:00", views:"—", isShort:false, isLive:false, tag:"leadership"},
  {id:"3AkVb6ryll0", title:"Framework SMART  Cara Jitu Mengelola Proyek Supaya Tujuan Mudah Tercapai!", desc:"Framework SMART untuk kelola proyek.", thumb:"https://i.ytimg.com/vi/3AkVb6ryll0/hq720.jpg", date:"8 months ago", duration:"3:57", views:"2", isShort:false, isLive:false, tag:"project"},
  {id:"nMcDyaKVOtY", title:"Day #4 Programmer Nganggur", desc:"Hari ke-4 — cerita lapangan.", thumb:"https://i.ytimg.com/vi/nMcDyaKVOtY/hq720.jpg", date:"8 months ago", duration:"1:00:51", views:"15", isShort:false, isLive:false, tag:"series"},
  {id:"eWb7-0uMfac", title:"Day #3 Programmer Nganggur", desc:"Hari ke-3 — tantangan freelance.", thumb:"https://i.ytimg.com/vi/eWb7-0uMfac/hq720.jpg", date:"8 months ago", duration:"56:37", views:"10", isShort:false, isLive:false, tag:"series"},
  {id:"JEzLi1TsqNI", title:"Day #1 Programmer Nganggur", desc:"Hari pertama — awal perjalanan.", thumb:"https://i.ytimg.com/vi/JEzLi1TsqNI/hq720.jpg", date:"8 months ago", duration:"42:31", views:"10", isShort:false, isLive:false, tag:"series"},
  {id:"lpCwC24rNa4", title:"Day #2 Programmer Nganggur", desc:"Hari kedua — adaptasi.", thumb:"https://i.ytimg.com/vi/lpCwC24rNa4/hq720.jpg", date:"8 months ago", duration:"36:55", views:"3", isShort:false, isLive:false, tag:"series"},
  // Shorts (9:16) — tab Shorts
  {id:"D7wVsxPqqtc", title:"GenZ Belajar TypeScript di Zaman AI? #TypeScript #JavaScript #Programming #GenZ #AI #LiveCoding", desc:"Short — GenZ TypeScript live.", thumb:"https://i.ytimg.com/vi/D7wVsxPqqtc/hq720.jpg", date:"recent", duration:"0:29", views:"171", isShort:true, isLive:false, tag:"short"},
  {id:"s2OFRR2ZCPc", title:"EUREKA Milestone", desc:"Short — milestone Eureka.", thumb:"https://i.ytimg.com/vi/s2OFRR2ZCPc/hq720.jpg", date:"recent", duration:"0:16", views:"91", isShort:true, isLive:false, tag:"short"},
  {id:"UtJApwTXZL4", title:"Rahasia Jadi Mobile Developer dan Freelance Sukses di Era AI yang Wajib Kamu Tahu!", desc:"Short — rahasia mobile freelance.", thumb:"https://i.ytimg.com/vi/UtJApwTXZL4/hq720.jpg", date:"recent", duration:"0:59", views:"289", isShort:true, isLive:false, tag:"short"},
  {id:"ttqQh6dmNpY", title:"ngoding kuy", desc:"Short — ngoding kuy.", thumb:"https://i.ytimg.com/vi/ttqQh6dmNpY/hq720.jpg", date:"recent", duration:"0:15", views:"23", isShort:true, isLive:false, tag:"short"},
  {id:"J_2qcRcCG8I", title:"Cooming Soon", desc:"Short — coming soon.", thumb:"https://i.ytimg.com/vi/J_2qcRcCG8I/hq720.jpg", date:"recent", duration:"0:11", views:"744", isShort:true, isLive:false, tag:"short"},
  // Live Streams (archived) — tab Live
  {id:"OYlvW32U7VM", title:"Gen Z belajar Kotlin di Era AI! (Live Archive)", desc:"Arsip live coding Kotlin untuk Gen Z di era AI — full session.", thumb:"https://i.ytimg.com/vi/OYlvW32U7VM/hq720.jpg", date:"4 weeks ago", duration:"1:08:38", views:"25", isShort:false, isLive:true, tag:"kotlin"},
  {id:"3xG5rPoh49I", title:"Gen Z Belajar TypeScript (Live Archive)", desc:"Arsip live session TypeScript untuk Gen Z.", thumb:"https://i.ytimg.com/vi/3xG5rPoh49I/hq720.jpg", date:"1 month ago", duration:"1:47:38", views:"5", isShort:false, isLive:true, tag:"typescript"},
];

