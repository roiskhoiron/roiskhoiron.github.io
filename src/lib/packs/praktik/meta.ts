// Pack "praktik": hands-on tutorials a reader can follow in 10–20 minutes.
import type { Deck, Post, BlogPost } from '../../data';

const DATE = '2026-11-28';
const deck = (slug: string, title: string, tags: string[], slides: number, desc: string): Deck =>
  ({ slug, title, type: 'Tutorial Deck', tags, desc, lang: 'ID', slides, color: '', date: DATE });
const post = (slug: string, title: string, desc: string): Post =>
  ({ slug, title, tag: 'tutorial', desc, date: DATE, color: '', accent: 'tutorial' });
const note = (slug: string, title: string, mins: number, tags: string[], excerpt: string): BlogPost =>
  ({ slug, title, date: DATE, mins, tags, excerpt });

export const decks: Deck[] = [
  deck('praktik-docker-101', 'Praktik: Docker 101, dari Dockerfile ke Container', ['docker', 'devops', 'tutorial'], 9,
    '"Di laptopku jalan kok." Kalimat itu berhenti berlaku begitu aplikasimu dibungkus jadi image. Lima belas menit, satu Dockerfile, satu container.'),
  deck('praktik-sql-101', 'Praktik: SQL 101 dengan Toko Kopi Kecil', ['sql', 'database', 'tutorial'], 9,
    'Siapa pelanggan paling royal? Produk apa yang tidak laku? Empat kata kunci SQL cukup untuk menjawabnya. Kita latih dengan tiga tabel toko kopi.'),
  deck('praktik-regex-tanpa-takut', 'Praktik: Regex Tanpa Takut, Cukup 10 Simbol', ['regex', 'javascript', 'tutorial'], 9,
    'Regex terlihat seperti kucing yang berjalan di atas keyboard. Padahal untuk pekerjaan harian, kamu cuma butuh sepuluh simbol.'),
  deck('praktik-ci-github-actions', 'Praktik: CI Pertamamu dengan GitHub Actions', ['ci', 'github-actions', 'testing', 'tutorial'], 9,
    'Tes yang hanya jalan di laptopmu adalah tes yang bisa lupa dijalankan. Satu file YAML membuatnya jalan di setiap push.'),
  deck('praktik-env-dan-konfigurasi', 'Praktik: Environment Variable dan Konfigurasi', ['konfigurasi', 'devops', 'tutorial'], 9,
    'API key yang ditulis di dalam kode akan ikut ter-commit, cepat atau lambat. Pisahkan config dari kode, dan satu build bisa jalan di dev maupun production.'),
  deck('praktik-curl-debug-api', 'Praktik: Debug API dengan curl', ['curl', 'api', 'http', 'tutorial'], 9,
    'Frontend bilang backend error, backend bilang frontend salah kirim. curl adalah hakim netral yang menjawab dalam satu baris.'),
  deck('praktik-validasi-zod', 'Praktik: Validasi Input dengan Zod', ['typescript', 'zod', 'validasi', 'tutorial'], 9,
    'TypeScript percaya pada tipe yang kamu tulis. Data dari luar tidak peduli. Zod menjaga perbatasan itu saat program berjalan.'),
  deck('praktik-conventional-commits', 'Praktik: Conventional Commits dan Changelog Otomatis', ['git', 'changelog', 'tutorial'], 9,
    '"fix", "update", "wip lagi". Riwayat commit seperti itu tidak bisa dibaca manusia, apalagi mesin. Satu format kecil mengubahnya jadi changelog.'),
  deck('praktik-lint-dan-format', 'Praktik: Lint dan Format Otomatis untuk Tim', ['tooling', 'javascript', 'tutorial'], 9,
    'Titik koma atau tidak? Dua spasi atau empat? Perdebatan ini bisa diakhiri dalam 15 menit dengan menyerahkannya ke mesin.'),
  deck('praktik-readme', 'Praktik: Menulis README yang Benar-Benar Dibaca', ['dokumentasi', 'open-source', 'tutorial'], 9,
    'Orang memutuskan memakai proyekmu atau tidak dari layar pertama README. Kebanyakan README menghabiskan layar itu untuk hal yang salah.')
];

export const posts: Post[] = [
  post('docker-image-vs-container', 'Image vs Container dalam 6 Kartu',
    'Image itu resep, container itu masakannya. Sekali paham bedanya, separuh kebingungan soal Docker langsung hilang.'),
  post('sql-empat-kata-kunci', 'SQL: Empat Kata Kunci, Satu Toko Kopi',
    'SQL lahir di tahun 1970-an dan masih dipakai di hampir setiap backend. Kabar baiknya: empat kata kunci sudah membawamu jauh.'),
  post('regex-sepuluh-simbol', 'Regex: 10 Simbol yang Benar-Benar Kamu Pakai',
    'Kamu tidak perlu hafal seluruh sintaks regex. Sepuluh simbol ini menutup kebutuhan validasi dan pencarian sehari-hari.'),
  post('ci-pertama-satu-file', 'CI Pertama: Satu File, Setiap Push',
    'Tes yang tidak dijalankan sama saja dengan tidak ada tes. GitHub Actions menjalankannya untukmu, bahkan saat kamu lupa.'),
  post('env-config-bukan-kode', 'Config Bukan Kode: 6 Kartu Env Var',
    'Kalau repomu dibuat publik detik ini, rahasia apa yang ikut bocor? Pertanyaan itu adalah inti faktor ketiga Twelve-Factor App.'),
  post('curl-enam-flag', 'curl: 6 Flag untuk Debug API',
    'Postman bagus, tapi curl ada di setiap server, setiap CI, dan setiap laporan bug yang bisa diulang. Enam flag sudah cukup untuk mulai.'),
  post('zod-jangan-percaya-input', 'Jangan Percaya Input: Zod dalam 6 Kartu',
    'Tipe TypeScript hilang begitu kode di-compile. Data dari pengguna datang sesudahnya. Zod adalah satpam yang tetap berjaga saat runtime.'),
  post('commit-message-yang-berguna', 'Pesan Commit yang Masih Berguna 6 Bulan Lagi',
    'Riwayat Git adalah dokumentasi yang kamu tulis setiap hari. Conventional Commits membuatnya bisa dibaca manusia dan diolah mesin.'),
  post('berhenti-debat-gaya-kode', 'Berhenti Debat Titik Koma di Code Review',
    'Setiap komentar soal spasi di code review adalah komentar soal logic yang tidak sempat ditulis. Serahkan gaya kode ke formatter.'),
  post('readme-yang-dibaca', 'README yang Dibaca, Bukan Dilewati',
    'Calon pengguna memberi README-mu beberapa detik saja. Enam kartu ini memastikan detik itu dipakai untuk hal yang tepat.')
];

export const notes: BlogPost[] = [
  note('di-laptop-jalan-bukan-alasan', 'Kenapa "Di Laptopku Jalan" Bukan Lagi Alasan', 4, ['tutorial', 'docker', 'devops'],
    'Docker sering dijual sebagai alat deploy. Nilai terbesarnya justru lebih sederhana: lingkungan yang sama persis di laptop, CI, dan server.'),
  note('sql-lebih-tua-dari-bahasamu', 'SQL Lebih Tua dari Bahasa Favoritmu, dan Itu Kabar Baik', 4, ['tutorial', 'sql', 'database'],
    'Framework dan ORM datang silih berganti. Query yang kamu tulis hari ini kemungkinan besar masih terbaca sepuluh tahun lagi. Itu alasan cukup untuk belajar SQL langsung.'),
  note('regex-dibaca-bukan-dihafal', 'Regex Itu Dibaca, Bukan Dihafal', 4, ['tutorial', 'regex', 'javascript'],
    'Orang takut regex karena mencoba membacanya sekaligus. Begitu dipecah per simbol, regex sepanjang apa pun terbaca seperti kalimat pendek.'),
  note('ci-rekan-paling-jujur', 'CI Adalah Rekan Kerja Paling Jujur di Timmu', 4, ['tutorial', 'ci', 'testing'],
    'CI tidak capek, tidak sungkan, dan tidak lupa. Karena itu ia cocok untuk tugas yang paling sering dilewatkan manusia: memeriksa ulang.'),
  note('satu-build-semua-lingkungan', 'Satu Build untuk Semua Lingkungan', 4, ['tutorial', 'konfigurasi', 'devops'],
    'Kalau build untuk staging dan production berbeda, yang kamu tes di staging bukan yang kamu rilis. Environment variable menutup celah itu.'),
  note('coba-curl-dulu', 'Sebelum Menyalahkan Backend, Coba curl Dulu', 4, ['tutorial', 'curl', 'api'],
    'Banyak bug "API error" ternyata soal request yang dikirim tidak sama dengan yang dikira. curl memperlihatkan request apa adanya, tanpa lapisan aplikasi.'),
  note('typescript-tidak-memeriksa-data', 'TypeScript Tidak Pernah Memeriksa Datamu', 4, ['tutorial', 'typescript', 'zod'],
    'Banyak yang mengira TypeScript menjaga aplikasi saat berjalan. Kenyataannya, semua tipe dihapus sebelum kode jalan. Yang tersisa hanya JavaScript dan data apa pun yang datang.'),
  note('riwayat-git-adalah-dokumentasi', 'Riwayat Git Adalah Dokumentasi yang Kamu Tulis Setiap Hari', 4, ['tutorial', 'git', 'changelog'],
    'Kamu menulis puluhan pesan commit per minggu. Sedikit struktur mengubah tumpukan pesan itu menjadi changelog, catatan rilis, dan jejak keputusan.'),
  note('gaya-kode-soal-biaya', 'Gaya Kode Bukan Soal Selera, Tapi Soal Biaya', 4, ['tutorial', 'tooling', 'code-review'],
    'Tim yang berdebat soal titik koma sedang membayar mahal untuk keputusan yang tidak terasa oleh pengguna sama sekali. Formatter menghentikan tagihan itu.'),
  note('readme-halaman-depan', 'README Adalah Halaman Depan, Bukan Gudang', 4, ['tutorial', 'dokumentasi', 'open-source'],
    'Kode bagus dengan README buruk akan dilewati. Kode biasa dengan README jelas akan dicoba. Begitulah perhatian orang bekerja di GitHub.')
];
