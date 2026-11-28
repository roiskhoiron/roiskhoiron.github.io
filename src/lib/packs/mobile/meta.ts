import type { Deck, Post, BlogPost } from '../../data';

const DATE = '2026-11-28';

export const decks: Deck[] = [
  { slug: 'lifecycle-android-ios', title: 'Lifecycle Aplikasi: Saat Pengguna Pergi', type: 'Theory Deck',
    tags: ['mobile', 'android', 'ios', 'lifecycle'], desc: 'Pengguna menekan tombol home, dan sejak detik itu sistem operasi boleh mematikan aplikasimu tanpa pamit. Begini Android dan iOS mengatur hidup-mati sebuah app.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'state-management-dari-nol', title: 'State Management dari Nol', type: 'Theory Deck',
    tags: ['mobile', 'state', 'flutter'], desc: 'Sebelum memilih Provider, Riverpod, atau Bloc, jawab dulu dua pertanyaan: sebenarnya state itu apa, dan siapa yang berhak memilikinya?', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'offline-first-sinkronisasi', title: 'Offline-First: Simpan Dulu, Sinkronkan Kemudian', type: 'Theory Deck',
    tags: ['mobile', 'offline-first', 'sinkronisasi'], desc: 'Lift, basement, kereta bawah tanah. Pengguna mobile sering offline. Aplikasi offline-first tetap jalan, lalu menyinkronkan data dan menyelesaikan konflik belakangan.', lang: 'ID', slides: 9, color: '', date: DATE },
  { slug: 'perjalanan-push-notification', title: 'Perjalanan Sebuah Push Notification', type: 'Theory Deck',
    tags: ['mobile', 'push-notification', 'fcm', 'apns'], desc: 'Server-mu tidak pernah bicara langsung dengan HP pengguna. Ada perantara bernama FCM dan APNs, dan memahami mereka menjelaskan kenapa notifikasi kadang tidak sampai.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'jank-anggaran-16-ms', title: 'Jank dan Anggaran 16 Milidetik', type: 'Theory Deck',
    tags: ['mobile', 'performa', 'flutter'], desc: 'Layar 60 Hz memberi aplikasimu sekitar 16,7 ms untuk menyiapkan setiap frame. Lewat sedikit saja, scroll terasa patah. Ini cara menemukan dan memperbaikinya.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'cold-start-ukuran-app', title: 'Kenapa Aplikasimu Lambat Dibuka', type: 'Theory Deck',
    tags: ['mobile', 'performa', 'startup'], desc: 'Sebelum layar pertama muncul, aplikasimu sudah memuat library, menyalakan SDK, dan membaca disk. Cold start adalah jumlah dari semua keputusan kecil itu.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'kotlin-coroutines-dasar', title: 'Kotlin Coroutines: Suspend, Scope, dan Struktur', type: 'Tutorial Deck',
    tags: ['mobile', 'kotlin', 'android', 'coroutines'], desc: 'Coroutine bukan thread. Kamu bisa menjalankan ribuan coroutine tanpa membuat ribuan thread. Pahami suspend, scope, dan structured concurrency lewat contoh Android.', lang: 'ID', slides: 9, color: '', date: DATE },
  { slug: 'swiftui-state-binding', title: 'SwiftUI: @State dan @Binding dengan Benar', type: 'Tutorial Deck',
    tags: ['mobile', 'swiftui', 'ios'], desc: 'Di SwiftUI, tampilan adalah fungsi dari data. Kalau satu data punya dua pemilik, layar mulai menampilkan hal yang salah. @State dan @Binding mengatur siapa pemiliknya.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'flutter-tiga-pohon', title: 'Flutter di Balik Layar: Tiga Pohon', type: 'Theory Deck',
    tags: ['mobile', 'flutter', 'teori'], desc: 'Kamu menulis widget, tapi Flutter tidak menggambar widget. Di belakangnya ada Element dan RenderObject yang membuat rebuild ratusan kali per detik tetap murah.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'rilis-aplikasi-mobile', title: 'Merilis Aplikasi Mobile Tanpa Deg-degan', type: 'Tutorial Deck',
    tags: ['mobile', 'rilis', 'tutorial'], desc: 'Website bisa di-rollback dalam semenit. Aplikasi mobile tidak: versi yang sudah terpasang tinggal di HP pengguna. Ini cara merilis dengan versi, rollout bertahap, dan review yang mulus.', lang: 'ID', slides: 9, color: '', date: DATE }
];

export const posts: Post[] = [
  { slug: 'aplikasi-bisa-dibunuh', title: 'Aplikasimu Tidak Tidur. Ia Bisa Dibunuh.', tag: 'teori',
    desc: 'Form yang sudah diisi setengah hilang setelah pengguna membalas chat sebentar. Itu bukan bug acak, tapi lifecycle yang tidak ditangani.', date: DATE, color: '', accent: 'teori' },
  { slug: 'state-lokal-atau-bersama', title: 'State Lokal atau Bersama? Satu Pertanyaan Saja', tag: 'teori',
    desc: 'Kebanyakan kekacauan state management berawal dari satu keputusan: menaruh state di tempat yang salah. Ini cara memilih tempatnya.', date: DATE, color: '', accent: 'teori' },
  { slug: 'sinyal-hilang-kondisi-normal', title: 'Sinyal Hilang Bukan Error, Tapi Kondisi Normal', tag: 'teori',
    desc: 'Aplikasi yang menampilkan spinner abadi saat offline sedang memperlakukan kenyataan sehari-hari sebagai pengecualian. Lima kartu tentang offline-first.', date: DATE, color: '', accent: 'teori' },
  { slug: 'server-tidak-bisa-telepon-hp', title: 'Server-mu Tidak Bisa Menghubungi HP Langsung', tag: 'teori',
    desc: 'HP pengguna tidak punya alamat yang bisa kamu panggil. Jadi bagaimana notifikasi "pesanan dikirim" bisa muncul di layar terkunci?', date: DATE, color: '', accent: 'teori' },
  { slug: 'kenapa-scroll-patah', title: 'Kenapa Scroll-mu Patah-Patah', tag: 'teori',
    desc: 'Jank bukan soal HP murah. Itu soal satu frame yang butuh 30 ms padahal jatahnya cuma 16. Begini cara berpikir tentang frame budget.', date: DATE, color: '', accent: 'teori' },
  { slug: 'splash-screen-bukan-solusi', title: 'Splash Screen Bukan Solusi Cold Start', tag: 'teori',
    desc: 'Menambah logo animasi tidak membuat aplikasimu lebih cepat. Itu cuma menutupi pekerjaan yang seharusnya tidak dikerjakan saat startup.', date: DATE, color: '', accent: 'teori' },
  { slug: 'coroutines-enam-kartu', title: 'Kotlin Coroutines dalam 6 Kartu', tag: 'tutorial',
    desc: 'Suspend, launch, async, scope, dispatcher, dan pembatalan. Enam konsep yang membuat kode async di Android terbaca seperti kode biasa.', date: DATE, color: '', accent: 'tutorial' },
  { slug: 'state-memiliki-binding-meminjam', title: '@State Memiliki, @Binding Meminjam', tag: 'tutorial',
    desc: 'Dua property wrapper paling dasar di SwiftUI, dijelaskan dengan satu analogi dan dua potong kode yang bisa langsung kamu coba.', date: DATE, color: '', accent: 'tutorial' },
  { slug: 'widget-bukan-yang-digambar', title: 'Widget Bukan yang Digambar di Layar', tag: 'teori',
    desc: 'Widget di Flutter hanyalah deskripsi yang dibuang dan dibuat ulang terus-menerus. Yang bertahan dan menggambar adalah dua pohon lain.', date: DATE, color: '', accent: 'teori' },
  { slug: 'checklist-rilis-mobile', title: 'Checklist Rilis: Versi, Rollout, Review', tag: 'tutorial',
    desc: 'Tombol "publish" di Play Console dan App Store Connect terasa sederhana. Enam kartu ini memastikan kamu tidak menyesal setelah menekannya.', date: DATE, color: '', accent: 'tutorial' }
];

export const notes: BlogPost[] = [
  { slug: 'process-death-tidak-muncul-di-emulator', title: 'Process Death: Bug yang Tidak Muncul di HP Developer', date: DATE, mins: 4,
    tags: ['mobile', 'android', 'ios', 'lifecycle'], excerpt: 'Di HP developer dengan RAM besar, aplikasi jarang dimatikan sistem. Di HP pengguna, itu terjadi setiap hari. Begini cara mengujinya dengan sengaja.' },
  { slug: 'masalah-state-bukan-library', title: 'Masalah State-mu Bukan Soal Library', date: DATE, mins: 4,
    tags: ['mobile', 'state', 'flutter'], excerpt: 'Perdebatan Bloc lawan Riverpod sering melompati pertanyaan yang lebih dasar. Library hanya memindahkan state; kekacauannya berasal dari desain.' },
  { slug: 'konflik-sinkronisasi-keputusan-produk', title: 'Konflik Sinkronisasi Adalah Keputusan Produk', date: DATE, mins: 4,
    tags: ['mobile', 'offline-first', 'sinkronisasi'], excerpt: 'Dua HP mengubah data yang sama saat offline. Siapa yang menang? Jawabannya tidak ada di library sinkronisasi, tapi di pemahamanmu tentang pengguna.' },
  { slug: 'push-notification-bukan-janji', title: 'Push Notification Itu Usaha Terbaik, Bukan Janji', date: DATE, mins: 4,
    tags: ['mobile', 'push-notification', 'arsitektur'], excerpt: 'FCM dan APNs tidak pernah menjamin pesanmu sampai. Kalau fitur penting bergantung pada notifikasi, desainnya perlu rencana cadangan.' },
  { slug: 'jangan-ukur-performa-di-debug', title: 'Jangan Ukur Performa di Mode Debug', date: DATE, mins: 4,
    tags: ['mobile', 'performa', 'flutter'], excerpt: 'Aplikasi Flutter yang patah-patah di mode debug bisa mulus di release. Sebaliknya juga bisa terjadi di HP pengguna. Ukur dengan cara yang benar dulu.' },
  { slug: 'sdk-punya-tagihan-startup', title: 'Setiap SDK yang Kamu Pasang Punya Tagihan di Startup', date: DATE, mins: 4,
    tags: ['mobile', 'performa', 'startup'], excerpt: 'Analytics, crash reporter, chat, iklan, A/B testing. Masing-masing cuma butuh "satu baris init". Bersama-sama, mereka adalah alasan aplikasimu lambat dibuka.' },
  { slug: 'globalscope-jalan-pintas-bocor', title: 'GlobalScope Itu Jalan Pintas yang Bocor', date: DATE, mins: 4,
    tags: ['mobile', 'kotlin', 'coroutines'], excerpt: 'Coroutine yang tidak punya induk tidak ada yang menunggu dan tidak ada yang membatalkan. Structured concurrency ada untuk mencegah pekerjaan yatim seperti itu.' },
  { slug: 'jebakan-nilai-awal-state-swiftui', title: 'Jebakan Nilai Awal @State di SwiftUI', date: DATE, mins: 4,
    tags: ['mobile', 'swiftui', 'ios'], excerpt: 'Parent mengirim nilai baru, tapi child tetap menampilkan yang lama. Bukan bug SwiftUI: @State memang hanya membaca nilai awalnya sekali.' },
  { slug: 'rebuild-murah-key-mahal', title: 'Rebuild Itu Murah. Salah Paham Soal Key yang Mahal.', date: DATE, mins: 4,
    tags: ['mobile', 'flutter', 'teori'], excerpt: 'Banyak developer Flutter takut memanggil setState. Padahal yang lebih sering bikin bug adalah list tanpa key yang menempelkan state ke item yang salah.' },
  { slug: 'tidak-bisa-rollback-aplikasi-mobile', title: 'Kamu Tidak Bisa Rollback Aplikasi Mobile', date: DATE, mins: 4,
    tags: ['mobile', 'rilis', 'devops'], excerpt: 'Di backend, versi buruk diganti dalam menit. Di mobile, versi buruk tinggal di HP pengguna selama mereka tidak update. Cara merilisnya pun harus berbeda.' }
];
