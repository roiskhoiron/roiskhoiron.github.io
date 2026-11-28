import type { Deck, Post, BlogPost } from '../../data';

const DATE = '2026-11-28';

export const decks: Deck[] = [
  { slug: 'code-review-yang-membantu', title: 'Code Review yang Benar-Benar Membantu', type: 'Theory Deck',
    tags: ['teori', 'code-review', 'tim'], desc: 'PR 40 baris dapat sepuluh komentar. PR 2.000 baris dapat satu: "LGTM". Begini cara membuat review yang menemukan masalah sungguhan.', lang: 'ID', slides: 9, color: '', date: DATE },
  { slug: 'refactoring-langkah-kecil', title: 'Praktik: Refactoring Aman dalam Langkah Kecil', type: 'Tutorial Deck',
    tags: ['tutorial', 'refactoring', 'testing'], desc: 'Refactoring yang memakan dua minggu dan merusak tiga fitur itu bukan refactoring. Ini cara mengubah kode tanpa mengubah perilakunya.', lang: 'ID', slides: 9, color: '', date: DATE },
  { slug: 'utang-teknis-cunningham', title: 'Utang Teknis: Metafora yang Sering Disalahpahami', type: 'Theory Deck',
    tags: ['teori', 'utang-teknis', 'tim'], desc: 'Ward Cunningham memakai kata "utang" supaya atasan paham. Tiga puluh tahun kemudian, istilah itu dipakai untuk membenarkan kode asal-asalan.', lang: 'ID', slides: 9, color: '', date: DATE },
  { slug: 'semantic-versioning', title: 'Semantic Versioning: Janji di Balik Tiga Angka', type: 'Theory Deck',
    tags: ['teori', 'versioning', 'library'], desc: 'Kamu cuma menaikkan versi minor, lalu aplikasi orang lain rusak. Tiga angka di versi library sebenarnya adalah kontrak.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'desain-http-api', title: 'Praktik: Mendesain HTTP API yang Enak Dipakai', type: 'Tutorial Deck',
    tags: ['tutorial', 'api', 'backend'], desc: 'API-mu mengembalikan 200 OK dengan isi "error: true"? Developer mobile yang memakainya sedang menahan diri. Naming, error, pagination, versioning.', lang: 'ID', slides: 10, color: '', date: DATE },
  { slug: 'monolith-vs-microservices', title: 'Monolith vs Microservices: Kapan Pilih yang Mana', type: 'Theory Deck',
    tags: ['teori', 'arsitektur', 'backend'], desc: 'Tim lima orang dengan dua belas service bukan arsitektur modern. Itu dua belas tempat baru untuk error. Kapan monolith menang, kapan tidak.', lang: 'ID', slides: 9, color: '', date: DATE },
  { slug: 'message-queue-alur-pesanan', title: 'Message Queue dan Event-Driven lewat Satu Pesanan', type: 'Theory Deck',
    tags: ['teori', 'arsitektur', 'backend'], desc: 'Pengguna menekan "Bayar". Email, stok, poin, dan notifikasi harus jalan, tapi pengguna tidak perlu menunggu semuanya. Di sinilah queue bekerja.', lang: 'ID', slides: 9, color: '', date: DATE },
  { slug: 'piramida-testing', title: 'Piramida Testing: Unit, Integration, End-to-End', type: 'Theory Deck',
    tags: ['teori', 'testing', 'kualitas'], desc: 'Seribu tes end-to-end terdengar aman, sampai CI butuh 40 menit dan gagal acak tiap hari. Piramida testing menjelaskan kenapa bentuknya penting.', lang: 'ID', slides: 9, color: '', date: DATE },
  { slug: 'architecture-decision-records', title: 'Praktik: Architecture Decision Records (ADR)', type: 'Tutorial Deck',
    tags: ['tutorial', 'dokumentasi', 'arsitektur'], desc: '"Kenapa dulu kita pakai ini?" Kalau jawabannya cuma ada di kepala orang yang sudah resign, timmu butuh ADR. Satu halaman per keputusan.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'estimasi-hofstadter', title: 'Kenapa Estimasi Selalu Meleset (dan Cara Tetap Merencanakan)', type: 'Theory Deck',
    tags: ['teori', 'estimasi', 'perencanaan'], desc: 'Hukum Hofstadter: semuanya selalu lebih lama dari perkiraan, bahkan setelah kamu memperhitungkan hukum ini. Lalu bagaimana tim tetap bisa berjanji?', lang: 'ID', slides: 9, color: '', date: DATE }
];

export const posts: Post[] = [
  { slug: 'code-review-6-kebiasaan', title: '6 Kebiasaan Reviewer yang Disukai Tim', tag: 'teori',
    desc: 'Review yang bagus bukan yang paling banyak komentarnya. Enam kebiasaan yang membuat PR cepat merge dan kode tetap waras.', date: DATE, color: '', accent: 'teori' },
  { slug: 'refactor-aman-5-aturan', title: 'Refactor Tanpa Drama: 5 Aturan', tag: 'tutorial',
    desc: 'Kalau tesnya merah lebih dari lima menit, kamu tidak sedang refactor. Kamu sedang menulis ulang. Lima aturan untuk tetap di jalur aman.', date: DATE, color: '', accent: 'tutorial' },
  { slug: 'utang-teknis-ada-bunganya', title: 'Utang Teknis Itu Ada Bunganya', tag: 'teori',
    desc: 'Jalan pintas hari ini terasa gratis. Tagihannya datang tiap kali seseorang menyentuh kode itu lagi. Enam kartu tentang utang yang tidak tercatat.', date: DATE, color: '', accent: 'teori' },
  { slug: 'semver-tiga-angka', title: 'MAJOR.MINOR.PATCH dalam 6 Kartu', tag: 'teori',
    desc: 'Versi 2.0.0 bukan berarti "lebih bagus". Artinya "ada yang bisa rusak". Arti sebenarnya dari setiap angka di versi library.', date: DATE, color: '', accent: 'teori' },
  { slug: 'http-api-6-aturan', title: '6 Aturan HTTP API yang Disukai Developer Mobile', tag: 'tutorial',
    desc: 'Developer frontend dan mobile menilai API-mu dari tiga hal: nama endpoint, bentuk error, dan cara mengambil halaman berikutnya.', date: DATE, color: '', accent: 'tutorial' },
  { slug: 'microservices-bukan-default', title: 'Microservices Bukan Pilihan Default', tag: 'teori',
    desc: 'Netflix pakai microservices. Timmu bukan Netflix. Enam kartu untuk memutuskan arsitektur berdasarkan masalah, bukan tren.', date: DATE, color: '', accent: 'teori' },
  { slug: 'event-driven-satu-pesanan', title: 'Satu Pesanan, Lima Service, Nol Menunggu', tag: 'teori',
    desc: 'Pengguna tidak perlu menunggu email terkirim untuk melihat "Pesanan berhasil". Event-driven architecture dalam tujuh kartu.', date: DATE, color: '', accent: 'teori' },
  { slug: 'piramida-testing-kartu', title: 'Kenapa Tes Unit Harus Paling Banyak', tag: 'teori',
    desc: 'Tes end-to-end paling mirip pengguna sungguhan. Justru karena itu ia paling mahal, paling lambat, dan paling sering gagal tanpa alasan.', date: DATE, color: '', accent: 'teori' },
  { slug: 'adr-satu-halaman', title: 'ADR: Satu Halaman, Satu Keputusan', tag: 'tutorial',
    desc: 'Dokumen arsitektur 40 halaman tidak dibaca siapa pun. Lima bagian pendek ini akan dibaca, bahkan dua tahun lagi.', date: DATE, color: '', accent: 'tutorial' },
  { slug: 'estimasi-selalu-meleset', title: 'Estimasimu Meleset. Itu Normal.', tag: 'teori',
    desc: 'Masalahnya bukan estimasi yang meleset. Masalahnya estimasi yang disampaikan sebagai satu angka pasti. Enam kartu untuk berjanji dengan jujur.', date: DATE, color: '', accent: 'teori' }
];

export const notes: BlogPost[] = [
  { slug: 'pr-kecil-review-jujur', title: 'PR Besar Tidak Di-review. PR Besar Disetujui.', date: DATE, mins: 4,
    tags: ['teori', 'code-review', 'tim'], excerpt: 'Ada alasan kenapa PR 2.000 baris lolos lebih cepat daripada PR 50 baris. Alasannya bukan karena kodenya bagus.' },
  { slug: 'refactor-bukan-rewrite', title: 'Refactoring Bukan Izin untuk Menulis Ulang', date: DATE, mins: 4,
    tags: ['tutorial', 'refactoring', 'testing'], excerpt: '"Sprint ini kita refactor dulu" sering berarti dua minggu tanpa fitur dan setumpuk bug baru. Refactoring yang sebenarnya hampir tidak terlihat.' },
  { slug: 'utang-teknis-bukan-kode-jelek', title: 'Utang Teknis Bukan Nama Lain untuk Kode Jelek', date: DATE, mins: 4,
    tags: ['teori', 'utang-teknis', 'manajemen'], excerpt: 'Cunningham tidak pernah bilang menulis kode berantakan itu boleh asal nanti dibayar. Yang ia maksud jauh lebih menarik.' },
  { slug: 'semver-adalah-janji', title: 'Nomor Versi Adalah Janji, Bukan Kalender', date: DATE, mins: 4,
    tags: ['teori', 'versioning', 'library'], excerpt: 'Library yang betah di 0.x selama bertahun-tahun, versi 5.0 yang cuma ganti logo. Semver gagal saat kita lupa siapa yang membaca angkanya.' },
  { slug: 'error-api-untuk-manusia', title: 'Pesan Error API-mu Dibaca Manusia Jam 2 Pagi', date: DATE, mins: 4,
    tags: ['tutorial', 'api', 'backend'], excerpt: 'Desain API diuji bukan saat semuanya lancar, tapi saat ada yang gagal dan seseorang harus mencari tahu kenapa.' },
  { slug: 'mulai-dari-monolith', title: 'Mulailah dari Monolith yang Rapi', date: DATE, mins: 4,
    tags: ['teori', 'arsitektur', 'backend'], excerpt: 'Memecah sistem menjadi service itu mudah. Yang sulit adalah tahu di mana garis pemisahnya. Dan itu hampir mustahil diketahui di hari pertama.' },
  { slug: 'antrian-dan-idempotensi', title: 'Pesan Akan Datang Dua Kali. Bersiaplah.', date: DATE, mins: 5,
    tags: ['teori', 'arsitektur', 'backend'], excerpt: 'Queue membuat sistemmu lebih tahan banting, dengan satu syarat yang sering dilupakan: consumer harus aman menerima pesan yang sama berulang kali.' },
  { slug: 'tes-e2e-yang-flaky', title: 'Tes yang Kadang Gagal Lebih Buruk daripada Tanpa Tes', date: DATE, mins: 4,
    tags: ['teori', 'testing', 'kualitas'], excerpt: 'Begitu tim terbiasa menekan "re-run", tes itu berhenti memberi informasi. Piramida testing adalah cara menghindarinya.' },
  { slug: 'dokumentasi-yang-dibaca', title: 'Dokumentasi yang Dibaca Itu Pendek dan Punya Tanggal', date: DATE, mins: 4,
    tags: ['tutorial', 'dokumentasi', 'tim'], excerpt: 'Wiki tim penuh halaman yang terakhir disentuh tiga tahun lalu. ADR berhasil karena ia tidak berusaha selalu benar.' },
  { slug: 'estimasi-sebagai-rentang', title: 'Berhenti Memberi Satu Angka', date: DATE, mins: 4,
    tags: ['teori', 'estimasi', 'perencanaan'], excerpt: '"Kira-kira berapa lama?" adalah pertanyaan yang adil. "Tiga hari" adalah jawaban yang hampir pasti salah. Ada jawaban yang lebih jujur.' }
];
