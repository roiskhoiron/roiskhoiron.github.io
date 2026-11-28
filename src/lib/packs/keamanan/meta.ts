import type { Deck, Post, BlogPost } from '../../data';

const DATE = '2026-11-28';

export const decks: Deck[] = [
  { slug: 'owasp-top-10-pemula', title: 'OWASP Top 10 untuk Pemula', type: 'Theory Deck',
    tags: ['keamanan', 'owasp', 'web'], desc: 'Daftar ini bukan kumpulan serangan canggih. Isinya kesalahan sehari-hari yang paling sering membuat aplikasi biasa bocor.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'simpan-password-benar', title: 'Menyimpan Password dengan Benar', type: 'Tutorial Deck',
    tags: ['keamanan', 'password', 'backend'], desc: 'MD5 dan SHA-1 bukan cara menyimpan password, bahkan dengan salt. Ini alasannya, dan dua algoritma yang seharusnya kamu pakai.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'jwt-dibuktikan-dan-tidak', title: 'JWT: Apa yang Dibuktikan, Apa yang Tidak', type: 'Theory Deck',
    tags: ['keamanan', 'jwt', 'auth'], desc: 'JWT bisa dibaca siapa saja yang memegangnya. Ia hanya membuktikan satu hal: isinya tidak diubah sejak ditandatangani.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'sql-injection-parameter', title: 'SQL Injection dan Parameterized Query', type: 'Tutorial Deck',
    tags: ['keamanan', 'sql', 'backend', 'database'], desc: 'Bug yang sudah dibahas sejak akhir 1990-an dan masih muncul di kode baru. Obatnya sudah tersedia di setiap driver database.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'xss-output-encoding', title: 'XSS: Masalahnya Ada di Output', type: 'Theory Deck',
    tags: ['keamanan', 'xss', 'frontend', 'web'], desc: 'Memfilter input tidak cukup untuk menghentikan XSS. Yang menghentikannya adalah encoding yang sesuai dengan tempat data itu ditampilkan.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'kelola-secret-env', title: 'Secret di Kode: .env, Git, dan Rotasi', type: 'Tutorial Deck',
    tags: ['keamanan', 'secrets', 'devops', 'git'], desc: 'Menghapus API key di commit terbaru tidak menghapusnya dari riwayat Git. Begini cara menyimpan, mencegah, dan merotasi secret.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'cara-kerja-totp', title: 'Cara Kerja Kode 2FA Enam Digit', type: 'Theory Deck',
    tags: ['keamanan', '2fa', 'totp', 'kriptografi'], desc: 'Aplikasi authenticator di ponselmu tidak menghubungi server saat membuat kode. Ia hanya butuh dua hal: sebuah secret dan jam.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'apk-bukan-brankas', title: 'APK Bukan Brankas: Secret di Aplikasi Mobile', type: 'Theory Deck',
    tags: ['keamanan', 'mobile', 'android', 'ios'], desc: 'Semua yang kamu kirim ke ponsel user bisa dibongkar oleh pemilik ponsel itu. Begini cara mendesain aplikasi mobile dengan asumsi tersebut.', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'least-privilege-praktik', title: 'Least Privilege: Akses Secukupnya', type: 'Tutorial Deck',
    tags: ['keamanan', 'iam', 'database', 'cloud'], desc: 'Kalau akun database aplikasimu bisa DROP TABLE, satu bug kecil bisa menghapus semuanya. Pertanyaannya: kenapa akun itu harus bisa?', lang: 'ID', slides: 8, color: '', date: DATE },
  { slug: 'threat-modeling-stride', title: 'Threat Modeling untuk Tim Kecil', type: 'Tutorial Deck',
    tags: ['keamanan', 'threat-modeling', 'stride'], desc: 'Tidak butuh tim keamanan khusus. Satu diagram, enam huruf, dan satu jam diskusi bisa menemukan masalah sebelum jadi kode.', lang: 'ID', slides: 8, color: '', date: DATE }
];

export const posts: Post[] = [
  { slug: 'login-dicek-data-bocor', title: 'Login Sudah Dicek, Data Tetap Bocor', tag: 'teori',
    desc: 'Kategori nomor satu di OWASP Top 10 edisi 2021 bukan soal hacker jenius. Ini soal satu pengecekan yang terlupa.', date: DATE, color: '', accent: 'teori' },
  { slug: 'md5-itu-cepat', title: 'MD5 Itu Cepat. Itulah Masalahnya.', tag: 'tutorial',
    desc: 'Untuk password, hash yang cepat adalah hash yang salah. Enam kartu tentang cara menyimpan password supaya database bocor tidak jadi bencana.', date: DATE, color: '', accent: 'tutorial' },
  { slug: 'jwt-bisa-dibaca', title: 'JWT Bisa Dibaca Siapa Saja', tag: 'teori',
    desc: 'Decode bagian tengahnya dengan base64, isinya langsung terlihat. Enam kartu tentang apa yang sebenarnya dijamin oleh JWT.', date: DATE, color: '', accent: 'teori' },
  { slug: 'sql-injection-bug-lama', title: 'Bug Lama yang Masih Ditulis Ulang', tag: 'tutorial',
    desc: 'SQL injection sudah dibahas puluhan tahun, dan obatnya tersedia di setiap driver. Kenapa masih terus muncul di kode baru?', date: DATE, color: '', accent: 'tutorial' },
  { slug: 'xss-filter-input-gagal', title: 'Filter Input Tidak Menghentikan XSS', tag: 'teori',
    desc: 'Input yang sama bisa aman di satu tempat dan berbahaya di tempat lain. Karena itu XSS diperbaiki di output, bukan di input.', date: DATE, color: '', accent: 'teori' },
  { slug: 'hapus-key-git-belum', title: 'Kamu Sudah Hapus Key-nya. Git Belum.', tag: 'tutorial',
    desc: 'Commit baru yang menghapus secret tidak menghapusnya dari riwayat. Enam kartu tentang apa yang harus dilakukan, dan urutannya.', date: DATE, color: '', accent: 'tutorial' },
  { slug: 'authenticator-tanpa-internet', title: 'Authenticator-mu Bekerja Tanpa Internet', tag: 'teori',
    desc: 'Mode pesawat pun kodenya tetap diterima. Enam kartu tentang bagaimana dua perangkat sepakat soal angka yang sama tanpa saling bicara.', date: DATE, color: '', accent: 'teori' },
  { slug: 'api-key-di-apk', title: 'API Key di APK Bukan Rahasia', tag: 'teori',
    desc: 'Obfuscation memperlambat, bukan menyembunyikan. Enam kartu tentang apa yang boleh dan tidak boleh ikut terpaket di aplikasi mobile.', date: DATE, color: '', accent: 'teori' },
  { slug: 'kenapa-bisa-drop-table', title: 'Kenapa Aplikasimu Bisa DROP TABLE?', tag: 'tutorial',
    desc: 'Banyak aplikasi terhubung ke database dengan akun berhak penuh. Enam kartu untuk mempersempit akses tanpa merepotkan tim.', date: DATE, color: '', accent: 'tutorial' },
  { slug: 'stride-enam-pertanyaan', title: 'STRIDE: 6 Pertanyaan Sebelum Ngoding', tag: 'teori',
    desc: 'Threat modeling tidak harus rumit. Enam huruf ini memastikan tim kecilmu memikirkan hal yang biasanya baru ketahuan setelah rilis.', date: DATE, color: '', accent: 'teori' }
];

export const notes: BlogPost[] = [
  { slug: 'owasp-bukan-checklist', title: 'OWASP Top 10 Bukan Checklist, dan Itu Kabar Baik', date: DATE, mins: 4,
    tags: ['keamanan', 'owasp', 'teori'], excerpt: 'Banyak tim mencentang sepuluh kategori lalu merasa aman. Padahal daftar itu dibuat untuk membuka mata, bukan untuk dicentang.' },
  { slug: 'md5-plus-salt-tetap-salah', title: 'Kenapa MD5 Ditambah Salt Tetap Bukan Jawaban', date: DATE, mins: 4,
    tags: ['keamanan', 'password', 'backend'], excerpt: 'Salt menyelesaikan satu masalah dan meninggalkan masalah yang lebih besar: kecepatan. Begini cara berpikir yang benar soal menyimpan password.' },
  { slug: 'jwt-bukan-pengganti-sesi', title: 'JWT Bukan Pengganti Sesi, dan Tidak Harus Jadi Pengganti', date: DATE, mins: 4,
    tags: ['keamanan', 'jwt', 'auth'], excerpt: 'JWT sering dipilih karena "stateless". Lalu tim menambah blocklist, refresh token, dan tabel sesi, dan bertanya kenapa semuanya jadi rumit.' },
  { slug: 'sql-injection-terus-ditulis', title: 'SQL Injection: Masalah yang Sudah Selesai, Tapi Terus Ditulis Ulang', date: DATE, mins: 4,
    tags: ['keamanan', 'sql', 'backend'], excerpt: 'Solusinya sudah ada di setiap driver database selama bertahun-tahun. Bug-nya tetap muncul karena alasan yang lebih manusiawi daripada teknis.' },
  { slug: 'xss-masalah-konteks', title: 'XSS Bukan Masalah Input, Tapi Masalah Konteks', date: DATE, mins: 4,
    tags: ['keamanan', 'xss', 'frontend'], excerpt: 'Karakter yang aman di dalam paragraf bisa berbahaya di dalam atribut atau URL. Begitu kamu paham konteks output, XSS jauh lebih mudah dicegah.' },
  { slug: 'api-key-di-riwayat-git', title: 'API Key di Riwayat Git: Kenapa Menghapus Saja Tidak Cukup', date: DATE, mins: 4,
    tags: ['keamanan', 'secrets', 'git'], excerpt: 'Begitu sebuah secret di-push, pertanyaannya bukan lagi "bagaimana menghapusnya", tapi "siapa yang mungkin sudah menyalinnya".' },
  { slug: 'totp-tetap-benar-offline', title: 'Kenapa Kode 2FA Tetap Benar Saat Ponselmu Offline', date: DATE, mins: 4,
    tags: ['keamanan', '2fa', 'totp'], excerpt: 'Tidak ada sinkronisasi, tidak ada notifikasi. Hanya secret yang dibagi sekali dan jam yang terus berdetak. Begini cara TOTP bekerja dan cara mengimplementasikannya.' },
  { slug: 'mobile-tidak-bisa-menyimpan-rahasia', title: 'Aplikasi Mobile Tidak Bisa Menyimpan Rahasia', date: DATE, mins: 4,
    tags: ['keamanan', 'mobile', 'android', 'ios'], excerpt: 'Developer mobile sering bertanya di mana menyembunyikan API key. Jawaban jujurnya: tidak ada tempat. Yang bisa diubah adalah desainnya.' },
  { slug: 'semua-orang-admin', title: 'Semua Orang Admin, Sampai Ada yang Salah Ketik', date: DATE, mins: 4,
    tags: ['keamanan', 'iam', 'least-privilege'], excerpt: 'Memberi hak penuh terasa praktis di awal proyek. Tagihannya datang saat ada bug, kebocoran, atau perintah yang dijalankan di environment yang salah.' },
  { slug: 'threat-modeling-tim-kecil', title: 'Threat Modeling Justru Paling Dibutuhkan Tim Kecil', date: DATE, mins: 4,
    tags: ['keamanan', 'threat-modeling', 'tim'], excerpt: 'Tim kecil sering menganggap threat modeling urusan perusahaan besar. Justru tim kecil yang paling tidak sanggup membayar kesalahan desain.' }
];
