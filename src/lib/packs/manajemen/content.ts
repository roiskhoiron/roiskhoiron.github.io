// Management pack: technical management in the AI era, for engineers and leadership.
import type { DeckSlide, PostSlide } from '../../data';
import { p, ul, c, b, type Full } from '../../blog-html';

const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

export const deckSlides: Record<string, DeckSlide[]> = {
  'peta-keputusan-ai': [
    { layout: 'cover', subtitle: 'Manajemen teknis di era AI', title: 'Peta Keputusan: Apa yang Tidak Diserahkan ke AI', message: 'AI bisa menulis, menguji, bahkan membuka PR. Pertanyaannya bukan apa yang bisa ia lakukan, tapi keputusan mana yang tetap harus punya nama manusia.', points: ['Untuk CTO, EM, dan senior engineer.', 'Hasilnya: satu peta yang bisa ditempel di wiki tim.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Kemampuan Bukan Izin', message: 'Agent yang bisa menjalankan perintah apa pun belum tentu boleh menjalankan semuanya.', points: ['Akses terminal sering diberikan sekaligus, bukan bertahap.', 'Batas tanggung jawab jarang ditulis sampai ada insiden.', 'Saat sesuatu rusak, "AI yang melakukannya" bukan jawaban untuk pelanggan.', 'Yang perlu dipetakan adalah keputusan, bukan tugas.'] },
    { layout: 'cards', subtitle: 'Empat keputusan inti', title: 'Yang Selalu Punya Nama Manusia', message: 'Setiap keputusan di bawah ini butuh satu orang yang bisa ditanya "kenapa".', cards: [
      { title: 'Definisi Done', desc: 'Siapa yang menyatakan tiket memenuhi kebutuhan pengguna, bukan sekadar lolos tes.', icon: '1' },
      { title: 'Merge dan rilis', desc: 'Siapa yang menyetujui perubahan masuk branch utama dan sampai ke pengguna.', icon: '2' },
      { title: 'Sentuhan ke production', desc: 'Migrasi data, rotasi secret, perubahan infrastruktur, rollback.', icon: '3' },
      { title: 'Akuntabilitas', desc: 'Siapa yang menjelaskan ke pelanggan, auditor, atau direksi saat ada masalah.', icon: '4' }] },
    { layout: 'split', subtitle: 'Delegasi yang sehat', leftTitle: 'Boleh ke AI', leftPoints: ['Draf kode dan tes dari tiket yang jelas.', 'Ringkasan diff, log, dan dokumentasi.', 'Usulan refactor dengan alasan tertulis.'], title: 'Batasnya', rightTitle: 'Tetap di Manusia', rightPoints: ['Approve PR dan menekan tombol merge.', 'Perintah yang mengubah data production.', 'Keputusan menerima risiko keamanan.'] },
    { layout: 'code', subtitle: 'Tulis di repo, bukan di kepala', title: 'Peta Keputusan sebagai CODEOWNERS', message: 'GitHub memakai file ini untuk meminta review dari pemilik path. Aktifkan aturan wajib review code owner di branch protection.', code: `# .github/CODEOWNERS
# Path di bawah wajib di-review pemiliknya

*                 @acme/engineering
/infra/           @acme/platform-leads
/db/migrations/   @acme/data-owners
/.github/         @acme/eng-managers
/src/payments/    @acme/payments-leads`, points: ['Agent boleh membuka PR, tapi tidak bisa menjadi code owner.', 'Pakai nama tim, bukan individu, supaya tidak ada titik tunggal.'] },
    { layout: 'bullets', subtitle: 'Matriks sederhana', title: 'Empat Kolom untuk Tiap Keputusan', message: 'Mirip matriks RACI, dengan satu kolom tambahan untuk peran AI.', points: ['Keputusan: misalnya "rilis ke production".', 'Pemilik: satu peran manusia, bukan "tim".', 'Peran AI: tidak ada, menyiapkan draf, atau mengeksekusi setelah approve.', 'Bukti: apa yang harus ada sebelum keputusan diambil.'] },
    { layout: 'bullets', subtitle: 'Pertanyaan uji', title: 'Empat Pertanyaan untuk Setiap Akses Baru', message: 'Ajukan sebelum memberi agent izin baru, sekecil apa pun.', points: ['Kalau ini salah, siapa yang tahu pertama kali?', 'Bisakah dibatalkan dalam lima menit?', 'Apakah ada data pelanggan yang tersentuh?', 'Siapa yang akan ditanya auditor tentang keputusan ini?'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Delegasikan pekerjaan, bukan tanggung jawab.', points: ['Petakan keputusan, lalu tentukan peran AI di tiap keputusan.', 'Kunci jalur ke production dengan aturan, bukan kepercayaan.', 'Akuntabilitas selalu berakhir di nama seseorang.'] }
  ],

  'mengukur-tim-era-ai': [
    { layout: 'cover', subtitle: 'Metrik engineering', title: 'Mengukur Tim Saat AI Ikut Menulis Kode', message: 'Saat menulis kode jadi murah, metrik yang menghitung hasil ketikan kehilangan maknanya. Yang perlu diukur adalah alirannya.', points: ['Kenapa LOC dan jumlah PR menyesatkan.', 'Empat metrik DORA dan cara membacanya.'] },
    { layout: 'bullets', subtitle: 'Metrik lama', title: 'Kenapa LOC dan Jumlah PR Menyesatkan', message: 'Keduanya mengukur aktivitas, bukan hasil.', points: ['AI membuat baris kode hampir gratis, jadi angkanya mudah membengkak.', 'Kode lebih banyak berarti lebih banyak yang harus di-review dan dirawat.', 'PR bisa dipecah kecil-kecil tanpa menambah nilai apa pun.', 'Begitu dijadikan target, orang dan agent akan mengoptimalkan angkanya.'] },
    { layout: 'cards', subtitle: 'DORA', title: 'Empat Metrik DORA', message: 'Dua mengukur kecepatan, dua mengukur stabilitas. Dibaca berpasangan, tidak sendiri-sendiri.', cards: [
      { title: 'Deployment frequency', desc: 'Seberapa sering perubahan sampai ke production.', icon: '1' },
      { title: 'Lead time for changes', desc: 'Waktu dari commit sampai perubahan berjalan di production.', icon: '2' },
      { title: 'Change failure rate', desc: 'Porsi deploy yang memicu insiden, rollback, atau hotfix.', icon: '3' },
      { title: 'Time to restore', desc: 'Waktu memulihkan layanan setelah deploy bermasalah.', icon: '4' }] },
    { layout: 'split', subtitle: 'Membaca berpasangan', leftTitle: 'Kecepatan', leftPoints: ['Deployment frequency.', 'Lead time for changes.', 'Naik sendirian bisa berarti terburu-buru.'], title: 'Penyeimbang', rightTitle: 'Stabilitas', rightPoints: ['Change failure rate.', 'Time to restore.', 'Menjaga agar kecepatan tidak dibayar dengan insiden.'] },
    { layout: 'code', subtitle: 'Contoh query', title: 'Lead Time dari Data Deploy', message: 'Contoh sederhana di PostgreSQL. Sesuaikan nama tabel dan kolom dengan data yang kamu punya.', code: `SELECT
  date_trunc('week', d.deployed_at) AS minggu,
  percentile_cont(0.5) WITHIN GROUP (
    ORDER BY d.deployed_at - c.committed_at
  ) AS median_lead_time
FROM deploys d
JOIN commits c ON c.sha = d.sha
GROUP BY 1
ORDER BY 1;`, points: ['Pakai median supaya satu PR yang macet tidak merusak angka.', 'Lihat trennya per minggu, bukan angka satu hari.'] },
    { layout: 'bullets', subtitle: 'Sinyal tambahan', title: 'Yang Perlu Dilihat Saat AI Masuk', message: 'Bukan pengganti DORA, tapi penjelas di baliknya.', points: ['Waktu tunggu review: berapa lama PR menunggu reviewer pertama.', 'Rework: seberapa sering kode yang baru di-merge diubah lagi dalam beberapa minggu.', 'Ukuran PR: PR raksasa dari agent memperlambat review.', 'Insiden yang akar masalahnya ada di kode hasil AI.'] },
    { layout: 'bullets', subtitle: 'Jebakan', title: 'Cara Metrik Berubah Jadi Racun', message: 'Metrik tim dipakai untuk belajar, bukan untuk menilai individu.', points: ['Jangan membandingkan tim yang konteksnya berbeda.', 'Jangan menjadikan satu angka sebagai target bonus.', 'Jangan mengukur tanpa memberi tahu tim alasannya.', 'Ukur sebelum adopsi AI, supaya ada pembanding.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Ukur aliran perubahan sampai ke pengguna, bukan jumlah ketikan.', points: ['LOC dan jumlah PR menghitung aktivitas, bukan nilai.', 'Baca empat metrik DORA berpasangan: kecepatan dan stabilitas.', 'Tambahkan waktu tunggu review dan rework untuk melihat efek AI.'] }
  ],

  'biaya-nyata-ai-coding': [
    { layout: 'cover', subtitle: 'Anggaran engineering', title: 'Biaya Nyata AI Coding', message: 'Langganan tercatat di invoice. Biaya lainnya tersebar di jam review, bug yang kembali, dan risiko yang belum terlihat.', points: ['Lima pos biaya yang perlu dihitung.', 'Pertanyaan untuk rapat anggaran.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Kenapa Invoice Menipu', message: 'Biaya yang terlihat belum tentu yang terbesar, apalagi satu-satunya.', points: ['Langganan dibayar bagian keuangan, jam review dibayar tim engineering.', 'Biaya tersembunyi tidak punya baris sendiri di laporan.', 'Sebagian baru muncul berbulan-bulan kemudian.', 'Akibatnya, keputusan adopsi dibuat dengan setengah data.'] },
    { layout: 'cards', subtitle: 'Pos biaya', title: 'Empat Biaya di Luar Invoice', message: 'Masing-masing butuh cara ukur sendiri.', cards: [
      { title: 'Waktu review', desc: 'Kode lebih banyak dan lebih cepat berarti antrean review lebih panjang.', icon: '1' },
      { title: 'Rework', desc: 'Kode yang lolos review tapi diubah lagi karena salah paham kebutuhan.', icon: '2' },
      { title: 'Utang teknis', desc: 'Duplikasi, pola yang tidak konsisten, dependency yang tidak perlu.', icon: '3' },
      { title: 'Eksposur keamanan', desc: 'Secret di prompt, celah di kode, paket yang tidak dicek asalnya.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Utang teknis', title: 'Bagaimana Utang Menumpuk Diam-diam', message: 'AI cenderung menambah kode, jarang menghapus.', points: ['Fungsi baru ditulis padahal versi serupa sudah ada.', 'Setiap prompt menghasilkan gaya yang sedikit berbeda.', 'Library ditambahkan untuk masalah yang bisa diselesaikan lima baris.', 'Tidak ada yang merasa memiliki kode yang tidak ia tulis.'] },
    { layout: 'split', subtitle: 'Keamanan', leftTitle: 'Risiko di Input', leftPoints: ['Kode atau dokumen rahasia ikut terkirim di prompt.', 'API key tertempel di konteks.', 'Data pelanggan dipakai sebagai contoh.'], title: 'Dua arah', rightTitle: 'Risiko di Output', rightPoints: ['Query tanpa parameter, validasi yang terlewat.', 'Nama paket yang tidak ada atau mirip paket asli.', 'Kode yang asal lisensinya tidak jelas.'] },
    { layout: 'code', subtitle: 'Cara menghitung', title: 'Model Biaya Sederhana', message: 'Bukan rumus pasti. Kerangka supaya semua pos masuk ke satu tabel.', code: `type BiayaBulanan = {
  langganan: number
  jamReview: number
  jamRework: number
  jamInsiden: number
}

function total(b: BiayaBulanan, tarifJam: number) {
  const jam = b.jamReview + b.jamRework + b.jamInsiden
  return b.langganan + jam * tarifJam
}`, points: ['Jam review dan rework diambil dari data PR, bukan tebakan.', 'Utang teknis dan keamanan dicatat sebagai risiko terpisah.'] },
    { layout: 'bullets', subtitle: 'Rapat anggaran', title: 'Pertanyaan Sebelum Menambah Kursi', message: 'Ajukan ini sebelum memperluas lisensi ke seluruh tim.', points: ['Apakah waktu tunggu review naik sejak AI dipakai?', 'Berapa banyak PR yang dibuka ulang atau di-revert?', 'Siapa yang memeriksa dependency baru yang ditambahkan AI?', 'Data apa saja yang sudah keluar lewat prompt?'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Hitung biaya total, lalu putuskan.', points: ['Langganan hanya satu dari lima pos biaya.', 'Ukur review dan rework dari data, bukan dari kesan.', 'Perlakukan keamanan dan utang teknis sebagai risiko yang dipantau.'] }
  ],

  'bottleneck-pindah-ke-review': [
    { layout: 'cover', subtitle: 'Struktur tim', title: 'Bottleneck Pindah ke Meja Reviewer', message: 'Menulis kode makin murah. Membaca dan memahami kode tidak. Sebuah sistem hanya secepat bagian paling lambatnya.', points: ['Gejala antrean review yang macet.', 'Perubahan struktur tim dan praktik review.'] },
    { layout: 'bullets', subtitle: 'Teori singkat', title: 'Hambatan Selalu Pindah', message: 'Ide dari Theory of Constraints (Goldratt): mempercepat bagian yang bukan hambatan tidak mempercepat sistem.', points: ['Dulu, menulis kode adalah bagian paling lambat.', 'Sekarang, kode menumpuk di depan reviewer.', 'Mempercepat penulisan lagi hanya memperpanjang antrean.', 'Perbaikan harus dilakukan di titik hambatan yang baru.'] },
    { layout: 'bullets', subtitle: 'Gejala', title: 'Tanda Review Sudah Jadi Hambatan', message: 'Cek di repositori timmu minggu ini.', points: ['PR menunggu lebih lama daripada waktu menulisnya.', 'Approve datang cepat untuk PR besar: tanda dibaca sekilas.', 'Senior menghabiskan sebagian besar harinya untuk review.', 'Bug lolos karena reviewer tidak sempat menjalankan kodenya.'] },
    { layout: 'cards', subtitle: 'Praktik review', title: 'Empat Perubahan Cara Review', message: 'Tujuannya: setiap jam review menghasilkan keyakinan, bukan sekadar centang.', cards: [
      { title: 'Batasi ukuran PR', desc: 'PR kecil lebih cepat dibaca dan lebih jarang lolos dengan bug.', icon: '1' },
      { title: 'Penulis review duluan', desc: 'Yang membuka PR membaca seluruh diff, termasuk bagian buatan AI.', icon: '2' },
      { title: 'Mesin dulu, baru manusia', desc: 'Lint, tes, dan scan keamanan lulus sebelum reviewer dipanggil.', icon: '3' },
      { title: 'Review sesuai risiko', desc: 'Path sensitif butuh reviewer senior, perubahan teks cukup satu orang.', icon: '4' }] },
    { layout: 'code', subtitle: 'Template PR', title: 'Deskripsi PR yang Mempercepat Review', message: 'Reviewer tidak perlu menebak maksud perubahan.', code: `## Kenapa
Tiket: PAY-142. Retry pembayaran tertagih dobel.

## Apa yang berubah
- Idempotency key di endpoint /charge

## Cara memverifikasi
1. Jalankan: bun test payments
2. Kirim request yang sama dua kali

## Bagian yang dibuat AI
- Tes di payments.test.ts (sudah dibaca ulang)`, points: ['Bagian "dibuat AI" bukan untuk menyalahkan, tapi untuk mengarahkan fokus review.'] },
    { layout: 'split', subtitle: 'Struktur tim', leftTitle: 'Pola Lama', leftPoints: ['Banyak penulis, sedikit reviewer.', 'Review dianggap gangguan dari kerja utama.', 'Senior menjadi satu-satunya gerbang.'], title: 'Pergeseran', rightTitle: 'Pola Baru', rightPoints: ['Kapasitas review direncanakan seperti kapasitas coding.', 'Review dihitung sebagai kontribusi yang terlihat.', 'Kepemilikan per area, bukan per orang.'] },
    { layout: 'bullets', subtitle: 'Mulai minggu ini', title: 'Tiga Eksperimen Kecil', message: 'Coba dua minggu, lalu bandingkan waktu tunggu review dengan sebelumnya.', points: ['Tetapkan batas lunak ukuran PR yang disepakati tim.', 'Sediakan slot review terjadwal dua kali sehari.', 'Rotasikan reviewer supaya pengetahuan tersebar.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Kalau menulis makin cepat, investasi berikutnya ada di membaca.', points: ['Hambatan sudah pindah dari keyboard ke meja reviewer.', 'Perkecil PR, otomatiskan pemeriksaan, arahkan review sesuai risiko.', 'Rencanakan dan hargai kapasitas review secara eksplisit.'] }
  ],

  'spec-adalah-aset-baru': [
    { layout: 'cover', subtitle: 'Product dan engineering', title: 'Spec Adalah Aset Baru', message: 'Saat kode bisa dihasilkan dari teks, kualitas teks itu menentukan kualitas kode. Tiket, PRD, dan acceptance criteria naik kelas.', points: ['Kenapa spec makin penting, bukan makin usang.', 'Anatomi tiket yang siap dikerjakan agent maupun manusia.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Dulu Intuisi Menambal Tiket Kabur', message: 'Programmer manusia bertanya, menebak konteks, atau ingat obrolan kemarin.', points: ['Agent tidak hadir di rapat kemarin.', 'Kalau tidak diminta bertanya, ia mengisi celah dengan tebakan.', 'Tebakan yang masuk akal tetap bisa salah.', 'Hasilnya: kode rapi untuk kebutuhan yang keliru.'] },
    { layout: 'cards', subtitle: 'Anatomi', title: 'Anatomi Tiket yang Siap Dikerjakan', message: 'Kalau satu bagian kosong, tiket belum siap.', cards: [
      { title: 'Masalah', desc: 'Siapa yang terganggu dan kenapa. Bukan solusi yang sudah dipilih.', icon: '1' },
      { title: 'Acceptance criteria', desc: 'Kondisi yang bisa diuji: diberikan, ketika, maka.', icon: '2' },
      { title: 'Batasan', desc: 'Yang tidak boleh berubah: API publik, skema, performa.', icon: '3' },
      { title: 'Di luar cakupan', desc: 'Yang sengaja tidak dikerjakan, supaya tidak ditambah sendiri.', icon: '4' }] },
    { layout: 'code', subtitle: 'Acceptance criteria', title: 'Format Given-When-Then', message: 'Ditulis dengan sintaks Gherkin. Bisa dibaca product, QA, engineer, dan agent.', code: `Feature: Retur barang

  Scenario: Retur dalam batas waktu
    Given pesanan diterima 3 hari lalu
    When pelanggan mengajukan retur
    Then status pesanan menjadi "retur diproses"

  Scenario: Retur lewat batas waktu
    Given pesanan diterima 10 hari lalu
    When pelanggan mengajukan retur
    Then muncul pesan "batas retur 7 hari"`, points: ['Setiap skenario bisa menjadi tes otomatis.', 'Kasus gagal ditulis, bukan diasumsikan.'] },
    { layout: 'split', subtitle: 'Siapa menulis apa', leftTitle: 'Product', leftPoints: ['Masalah dan siapa penggunanya.', 'Prioritas dan kriteria sukses.', 'Apa yang di luar cakupan.'], title: 'Kolaborasi', rightTitle: 'Engineering', rightPoints: ['Batasan teknis dan risiko.', 'Skenario gagal dan kasus tepi.', 'Cara memverifikasi di lingkungan nyata.'] },
    { layout: 'bullets', subtitle: 'Gerbang', title: 'Definition of Ready', message: 'Tiket baru boleh dikerjakan setelah lolos daftar ini.', points: ['Masalah ditulis tanpa memaksakan solusi tertentu.', 'Minimal satu skenario sukses dan satu skenario gagal.', 'Batasan dan bagian di luar cakupan tertulis eksplisit.', 'Ada nama orang yang bisa ditanya kalau spec ambigu.'] },
    { layout: 'bullets', subtitle: 'Aset', title: 'Kenapa Disebut Aset', message: 'Spec yang baik dipakai berkali-kali, tidak habis sekali baca.', points: ['Jadi instruksi untuk agent dan konteks untuk reviewer.', 'Jadi dasar tes dan dokumentasi perilaku sistem.', 'Jadi jejak keputusan saat seseorang bertanya "kenapa begini?".', 'Jadi bahan onboarding untuk anggota tim baru.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Waktu yang dihemat saat menulis kode sebaiknya diinvestasikan ke menulis spec.', points: ['AI mengisi celah spec dengan tebakan, bukan pertanyaan.', 'Acceptance criteria yang bisa diuji adalah kontrak terbaik.', 'Pasang Definition of Ready sebagai gerbang sebelum kode.'] }
  ],

  'junior-developer-era-ai': [
    { layout: 'cover', subtitle: 'Pipeline talenta', title: 'Dari Mana Senior Berikutnya Datang?', message: 'Senior engineer lahir dari ribuan jam memperbaiki kesalahan sendiri. Kalau semua kesalahan pertama diambil alih AI, jalur itu ikut hilang.', points: ['Risiko bagi organisasi, bukan hanya individu.', 'Cara melatih junior yang tetap memakai AI.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Tangga yang Anak Tangganya Hilang', message: 'Tugas kecil dulu adalah tempat belajar, bukan sekadar pekerjaan murah.', points: ['Bug sederhana, tes, dan halaman CRUD dulu dikerjakan junior.', 'Tugas-tugas itu kini paling mudah diberikan ke AI.', 'Junior bisa menyelesaikan tiket tanpa memahami sistemnya.', 'Lima tahun lagi, siapa yang mampu me-review kode AI?'] },
    { layout: 'split', subtitle: 'Dua cara memakai AI', leftTitle: 'AI sebagai Penopang', leftPoints: ['Menjelaskan kode dan konsep yang belum dipahami.', 'Memberi petunjuk, bukan jawaban penuh.', 'Junior tetap menulis dan menjelaskan solusinya.'], title: 'Bedanya', rightTitle: 'AI sebagai Pengganti', rightPoints: ['AI menulis solusi, junior hanya menyalin.', 'Error ditempel ke chat tanpa dibaca.', 'Tiket selesai, pemahaman tidak bertambah.'] },
    { layout: 'cards', subtitle: 'Program latihan', title: 'Empat Praktik untuk Melatih Junior', message: 'Bisa dijalankan tanpa melarang AI.', cards: [
      { title: 'Jelaskan diff-mu', desc: 'Junior menjelaskan setiap baris PR-nya, termasuk yang ditulis AI.', icon: '1' },
      { title: 'Debug tanpa AI', desc: 'Sesekali, bug dikerjakan dengan log dan debugger saja.', icon: '2' },
      { title: 'Review sebagai latihan', desc: 'Junior ikut me-review PR senior dan PR dari agent.', icon: '3' },
      { title: 'Pairing rutin', desc: 'Senior berpikir keras, junior bertanya. Termasuk saat memakai AI.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Pertanyaan review', title: 'Pertanyaan yang Membangun Pemahaman', message: 'Pakai saat me-review PR junior.', points: ['"Apa yang terjadi kalau input ini kosong?"', '"Kenapa memilih pendekatan ini, bukan yang lain?"', '"Bagian mana yang ditulis AI, dan bagaimana kamu memeriksanya?"', '"Kalau ini rusak di production, di mana kamu mulai mencari?"'] },
    { layout: 'bullets', subtitle: 'Untuk manajemen', title: 'Junior Adalah Investasi Pipeline', message: 'Berhenti merekrut junior terlihat hemat hari ini dan mahal nanti.', points: ['Senior tidak bisa direkrut tanpa batas dari pasar.', 'Pengetahuan domain tumbuh dari dalam tim.', 'Ukur kemajuan junior dari pemahaman, bukan jumlah tiket.', 'Sediakan waktu mentoring secara eksplisit di kapasitas tim.'] },
    { layout: 'bullets', subtitle: 'Untuk junior', title: 'Kalau Kamu Junior', message: 'AI adalah tutor yang sabar, asal kamu memakainya untuk bertanya.', points: ['Minta penjelasan, bukan hanya kode.', 'Ketik ulang solusinya, lalu ubah satu hal untuk menguji pemahamanmu.', 'Baca pesan error sebelum menempelkannya ke chat.', 'Kuasai dasar: debugging, Git, membaca kode orang lain.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Tim yang berhenti melatih junior sedang meminjam dari masa depannya sendiri.', points: ['Tugas level junior adalah tempat senior dibentuk.', 'Pakai AI sebagai penopang belajar, bukan pengganti berpikir.', 'Rencanakan mentoring sebagai bagian dari kapasitas tim.'] }
  ],

  'kebijakan-ai-data-sensitif': [
    { layout: 'cover', subtitle: 'Keamanan dan kepatuhan', title: 'Kebijakan AI untuk Data Sensitif', message: 'Kebijakan yang baik menjawab tiga hal: data apa yang boleh masuk prompt, alat mana yang disetujui, dan bagaimana semuanya diaudit.', points: ['Klasifikasi data untuk prompt.', 'Persetujuan alat dan jejak audit.'] },
    { layout: 'split', subtitle: 'Dua kegagalan umum', leftTitle: 'Larangan Total', leftPoints: ['Orang tetap memakai AI lewat akun pribadi.', 'Tidak ada jejak, tidak ada kontrol.', 'Tim kehilangan manfaatnya sama sekali.'], title: 'Ekstrem lainnya', rightTitle: 'Bebas Tanpa Aturan', rightPoints: ['Data pelanggan dipakai sebagai contoh di prompt.', 'Setiap orang memakai alat yang berbeda.', 'Tidak ada yang tahu apa yang sudah keluar.'] },
    { layout: 'cards', subtitle: 'Klasifikasi', title: 'Empat Kelas Data untuk Prompt', message: 'Sesuaikan dengan klasifikasi data yang sudah dimiliki perusahaanmu.', cards: [
      { title: 'Publik', desc: 'Dokumentasi terbuka, kode open source. Boleh di alat yang disetujui.', icon: '1' },
      { title: 'Internal', desc: 'Kode dan dokumen internal. Hanya di alat yang punya kontrak perusahaan.', icon: '2' },
      { title: 'Rahasia', desc: 'Secret, kredensial, private key. Tidak pernah masuk prompt.', icon: '3' },
      { title: 'Data pribadi', desc: 'Data pelanggan dan karyawan. Disamarkan, atau dengan izin tertulis.', icon: '4' }] },
    { layout: 'code', subtitle: 'Policy as code', title: 'Kebijakan yang Bisa Dibaca Mesin', message: 'Contoh format internal. Simpan di repo dan ubah lewat PR, sama seperti kode.', code: `ai_policy:
  version: 3
  owner: security-team
  approved_tools:
    - name: assistant-enterprise
      data_classes: [publik, internal]
      retention: "tanpa training, log 30 hari"
  forbidden_in_prompt:
    - secrets
    - customer_pii
  exceptions_require: [ciso, data-owner]`, points: ['Setiap perubahan kebijakan punya riwayat dan reviewer.', 'Formatnya bebas, yang penting ada satu sumber kebenaran.'] },
    { layout: 'bullets', subtitle: 'Persetujuan alat', title: 'Pertanyaan Sebelum Menyetujui Alat', message: 'Ajukan ke vendor dan dokumentasikan jawabannya.', points: ['Apakah isi prompt dipakai untuk melatih model?', 'Berapa lama data disimpan, dan di negara mana?', 'Apakah ada SSO, kontrol admin, dan log penggunaan?', 'Bagaimana data dihapus saat kontrak berakhir?'] },
    { layout: 'bullets', subtitle: 'Audit', title: 'Jejak yang Perlu Ada', message: 'Kalau terjadi kebocoran, kamu harus bisa menjawab apa, kapan, dan oleh siapa.', points: ['Daftar alat yang disetujui beserta pemiliknya.', 'Log penggunaan dari alat enterprise, bukan akun pribadi.', 'Catatan pengecualian: siapa yang meminta, siapa yang menyetujui.', 'Review berkala, misalnya setiap kuartal.'] },
    { layout: 'bullets', subtitle: 'Supaya dipatuhi', title: 'Kebijakan yang Dipatuhi Orang', message: 'Kebijakan yang menyulitkan akan diakali.', points: ['Sediakan alat resmi yang lebih mudah daripada jalan pintas.', 'Tulis contoh konkret: mana yang boleh, mana yang tidak.', 'Pasang secret scanning di editor dan CI.', 'Sediakan jalur bertanya yang cepat ke tim keamanan.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Tujuannya bukan melarang AI, tapi tahu persis data apa yang keluar dan ke mana.', points: ['Klasifikasikan data, lalu petakan ke alat yang disetujui.', 'Rahasia dan data pribadi tidak masuk prompt tanpa pengecualian tertulis.', 'Simpan kebijakan sebagai kode, lengkap dengan jejak audit.'] }
  ],

  'rencana-adopsi-ai-90-hari': [
    { layout: 'cover', subtitle: 'Strategi adopsi', title: 'Rencana Adopsi AI 90 Hari', message: 'Tiga fase, masing-masing dengan tujuan, pagar pengaman, dan metrik sendiri. Keputusan lanjut atau berhenti diambil di akhir tiap fase.', points: ['Untuk CTO dan engineering manager.', 'Bisa disesuaikan dengan ukuran organisasi.'] },
    { layout: 'bullets', subtitle: 'Hari 0', title: 'Sebelum Mulai', message: 'Tanpa titik awal, kamu tidak akan tahu apa yang berubah.', points: ['Catat baseline: empat metrik DORA, waktu tunggu review, rework.', 'Tetapkan kebijakan data minimum: apa yang tidak boleh masuk prompt.', 'Pilih satu sponsor di manajemen dan satu pemilik teknis.', 'Tulis kriteria kapan pilot dihentikan.'] },
    { layout: 'cards', subtitle: 'Hari 1–30', title: 'Fase 1: Pilot', message: 'Satu tim, satu jenis pekerjaan, aturan ketat.', cards: [
      { title: 'Pilih tim pilot', desc: 'Tim yang prosesnya matang dan rajin mencatat, bukan hanya yang antusias.', icon: '1' },
      { title: 'Batasi cakupan', desc: 'Mulai dari tes, refactor kecil, dan dokumentasi.', icon: '2' },
      { title: 'Pagar pengaman', desc: 'Review manusia wajib, tidak ada akses production.', icon: '3' },
      { title: 'Catat semuanya', desc: 'Jurnal mingguan: yang berhasil, yang gagal, yang mengejutkan.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Akhir fase 1', title: 'Yang Diukur di Hari 30', message: 'Bandingkan dengan baseline, bukan dengan harapan.', points: ['Lead time dan change failure rate tim pilot.', 'Waktu tunggu review: naik, turun, atau tetap?', 'Insiden atau temuan keamanan terkait kode AI.', 'Pendapat tim: apa yang ingin dilanjutkan, apa yang dibuang.'] },
    { layout: 'split', subtitle: 'Hari 31–60', leftTitle: 'Fase 2: Perluasan', leftPoints: ['Dua sampai tiga tim tambahan.', 'Tim pilot menjadi pendamping.', 'Cakupan diperluas ke fitur kecil.'], title: 'Pagar tambahan', rightTitle: 'Yang Dijaga', rightPoints: ['Batas ukuran PR dan template PR.', 'Secret scanning di editor dan CI.', 'Retrospektif khusus AI tiap dua minggu.'] },
    { layout: 'bullets', subtitle: 'Hari 61–90', title: 'Fase 3: Standardisasi', message: 'Ubah pelajaran menjadi aturan tertulis.', points: ['Kebijakan AI resmi, disimpan di repo.', 'Playbook: kapan memakai AI, kapan tidak.', 'Peta keputusan: apa yang tetap milik manusia.', 'Rencana pelatihan untuk anggota baru dan junior.'] },
    { layout: 'code', subtitle: 'Gerbang keputusan', title: 'Kriteria Lanjut atau Berhenti', message: 'Contoh format. Sepakati isinya bersama tim sebelum fase dimulai.', code: `gate_fase_1:
  lanjut_jika:
    - change_failure_rate tidak naik dari baseline
    - waktu_tunggu_review tidak naik dari baseline
    - nol secret bocor lewat prompt
  berhenti_jika:
    - insiden production dari kode AI tanpa review
  diputuskan_oleh: [cto, em-tim-pilot]`, points: ['Kriteria ditulis sebelum data ada, supaya tidak disesuaikan belakangan.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Adopsi yang baik terasa membosankan: kecil, terukur, dan bisa dihentikan.', points: ['Ukur baseline sebelum hari pertama.', 'Satu tim pilot dengan pagar ketat, lalu perluas bertahap.', 'Tulis kriteria lanjut atau berhenti sebelum fase dimulai.'] }
  ],

  'rekrutmen-engineer-era-ai': [
    { layout: 'cover', subtitle: 'Rekrutmen', title: 'Merekrut Engineer Saat Kandidat Memakai AI', message: 'Kandidat akan memakai AI di pekerjaannya nanti. Pertanyaannya bukan cara mencegahnya, tapi apa yang sebenarnya ingin kamu ukur.', points: ['Apa yang tidak lagi berguna di proses lama.', 'Format wawancara yang tetap bermakna.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Yang Tidak Lagi Membedakan Kandidat', message: 'Format lama dirancang untuk dunia tanpa asisten AI.', points: ['Take-home test tanpa diskusi: hasilnya bisa dibuat AI.', 'Soal algoritma hafalan: AI menjawabnya dalam hitungan detik.', 'Pertanyaan definisi: bisa dicari, tidak membedakan kandidat.', 'Larangan AI yang tidak bisa ditegakkan.'] },
    { layout: 'cards', subtitle: 'Yang diukur', title: 'Empat Hal yang Tetap Membedakan', message: 'Kemampuan untuk bekerja bersama AI, bukan bersaing dengannya.', cards: [
      { title: 'Memahami masalah', desc: 'Bertanya untuk memperjelas sebelum menulis kode.', icon: '1' },
      { title: 'Menilai kode', desc: 'Menemukan bug dan risiko dalam kode yang bukan buatannya.', icon: '2' },
      { title: 'Trade-off', desc: 'Menjelaskan kenapa memilih satu pendekatan dan apa harganya.', icon: '3' },
      { title: 'Debugging', desc: 'Menelusuri masalah secara sistematis saat jawaban tidak ada di chat.', icon: '4' }] },
    { layout: 'split', subtitle: 'Pilih kebijakan', leftTitle: 'AI Diizinkan', leftPoints: ['Mirip kondisi kerja sebenarnya.', 'Nilai cara kandidat memeriksa output AI.', 'Butuh soal yang lebih terbuka.'], title: 'Tetap konsisten', rightTitle: 'AI Tidak Diizinkan', rightPoints: ['Cocok untuk menguji dasar dan penalaran.', 'Lakukan secara live, bukan take-home.', 'Beri tahu kandidat aturannya sejak awal.'] },
    { layout: 'code', subtitle: 'Format: review kode', title: 'Minta Kandidat Me-review, Bukan Menulis', message: 'Siapkan potongan kode dengan beberapa masalah tersembunyi.', code: `async function transfer(from, to, amount) {
  const saldo = await db.getSaldo(from)
  if (saldo >= amount) {
    await db.kurangi(from, amount)
    await db.tambah(to, amount)
  }
}`, points: ['Yang dicari: race condition, tidak ada transaksi, amount negatif.', 'Lihat juga cara kandidat bertanya dan memprioritaskan temuan.'] },
    { layout: 'bullets', subtitle: 'Pertanyaan wawancara', title: 'Pertanyaan yang Sulit Dicontek', message: 'Jawaban yang baik bersumber dari pengalaman, bukan hafalan.', points: ['"Ceritakan kode AI yang pernah kamu tolak. Kenapa?"', '"Bagaimana kamu tahu output AI ini benar?"', '"Bug tersulit yang pernah kamu telusuri: langkahnya apa saja?"', '"Kalau fitur ini harus dikirim besok, apa yang kamu korbankan?"'] },
    { layout: 'bullets', subtitle: 'Keadilan proses', title: 'Menjaga Proses Tetap Adil', message: 'Aturan yang jelas lebih adil daripada kecurigaan.', points: ['Tulis dan sampaikan kebijakan AI untuk setiap tahap.', 'Gunakan rubrik yang sama untuk semua kandidat.', 'Nilai proses berpikir, bukan hanya hasil akhir.', 'Latih interviewer, jangan hanya memperbarui soal.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Rekrut orang yang bisa menilai kode, bukan hanya menghasilkannya.', points: ['Format yang bisa diselesaikan AI tidak lagi membedakan kandidat.', 'Ukur pemahaman masalah, penilaian kode, trade-off, dan debugging.', 'Tetapkan kebijakan AI per tahap, dan beri tahu kandidat sejak awal.'] }
  ],

  'estimasi-saat-ai-menulis-kode': [
    { layout: 'cover', subtitle: 'Planning', title: 'Estimasi Saat AI Menulis Sebagian Kode', message: 'Waktu mengetik kode bisa menyusut. Ketidakpastian tidak ikut menyusut. Estimasi yang baik memisahkan keduanya.', points: ['Bagian mana yang dipercepat AI, bagian mana yang tidak.', 'Cara menyesuaikan planning dan komitmen.'] },
    { layout: 'bullets', subtitle: 'Masalahnya', title: 'Kenapa Estimasi Lama Meleset', message: 'Estimasi tim dulu menyatu: menulis, memahami, menguji, mengintegrasikan.', points: ['AI mempercepat sebagian, sehingga angka lama tidak lagi akurat.', 'Manajemen mendengar "AI lebih cepat" lalu memotong semua estimasi.', 'Bagian yang lambat, seperti klarifikasi dan integrasi, tidak berubah.', 'Hasilnya: komitmen terlalu optimistis, lalu lembur.'] },
    { layout: 'split', subtitle: 'Pecah pekerjaannya', leftTitle: 'Cenderung Dipercepat', leftPoints: ['Boilerplate, CRUD, dan kode yang polanya jelas.', 'Tes untuk perilaku yang sudah terdefinisi.', 'Migrasi mekanis dan refactor berulang.'], title: 'Tidak banyak berubah', rightTitle: 'Tetap Lambat', rightPoints: ['Memperjelas kebutuhan yang kabur.', 'Integrasi dengan sistem lain dan pihak ketiga.', 'Review, verifikasi, dan rilis bertahap.'] },
    { layout: 'cards', subtitle: 'Teknik', title: 'Empat Cara Menyesuaikan Estimasi', message: 'Bukan rumus, tapi kebiasaan yang membuat angka lebih jujur.', cards: [
      { title: 'Pisah tulis dan review', desc: 'Estimasi pembuatan dan estimasi verifikasi ditulis terpisah.', icon: '1' },
      { title: 'Tandai ketidakpastian', desc: 'Tiket dengan kebutuhan kabur diberi spike dulu, bukan angka.', icon: '2' },
      { title: 'Pakai data sendiri', desc: 'Bandingkan estimasi dan realisasi tim, bukan klaim vendor.', icon: '3' },
      { title: 'Rentang, bukan titik', desc: '"3–5 hari" lebih jujur daripada "4 hari".', icon: '4' }] },
    { layout: 'code', subtitle: 'Contoh', title: 'Mencatat Estimasi dan Realisasi', message: 'Data sederhana per tiket. Setelah beberapa sprint, polanya mulai terlihat.', code: `type CatatanTiket = {
  id: string
  estimasiHari: [min: number, max: number]
  realisasiHari: number
  pakaiAI: boolean
  jamReview: number
}

const meleset = (t: CatatanTiket) =>
  t.realisasiHari > t.estimasiHari[1]`, points: ['Bandingkan tiket dengan dan tanpa AI di tim yang sama.', 'Jangan pakai data ini untuk menilai individu.'] },
    { layout: 'bullets', subtitle: 'Untuk manajemen', title: 'Percakapan dengan Stakeholder', message: 'Kecepatan menulis kode tidak sama dengan kecepatan rilis.', points: ['Jangan potong estimasi secara merata hanya karena tim memakai AI.', 'Minta tim menunjukkan bagian mana yang benar-benar menyusut.', 'Komitmen tanggal berbasis rentang dan risiko, bukan titik.', 'Sisihkan kapasitas untuk review dan rework.'] },
    { layout: 'bullets', subtitle: 'Hukum lama', title: 'Hukum Hofstadter Masih Berlaku', message: '"Selalu lebih lama dari perkiraan, bahkan setelah memperhitungkan Hukum Hofstadter." Douglas Hofstadter, 1979.', points: ['AI tidak menghapus ketidakpastian, hanya memindahkannya.', 'Kode cepat jadi, lalu waktunya habis di integrasi dan klarifikasi.', 'Planning yang jujur mengakui ini sejak awal.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Estimasikan ketidakpastian, bukan ketikan.', points: ['Pisahkan bagian yang dipercepat AI dari yang tidak.', 'Estimasi dalam rentang, dengan waktu review tertulis eksplisit.', 'Kalibrasi dengan data tim sendiri setiap beberapa sprint.'] }
  ]
};

export const postSlides: Record<string, PostSlide[]> = {
  'keputusan-milik-manusia': [
    card('manajemen', 'AI Boleh Membuka PR. Bukan Menekan Merge.', 'Agent makin mampu. Justru karena itu, batas keputusannya harus ditulis sebelum ada insiden, bukan sesudahnya.'),
    card('1', 'Siapa yang Bilang "Done"?', 'Tes hijau membuktikan kode sesuai tes. Belum tentu sesuai kebutuhan pengguna. Yang menyatakan selesai harus orang yang paham kebutuhannya.'),
    card('2', 'Siapa yang Menekan Merge?', 'Approve adalah tanda tangan. Tanda tangan butuh nama.', { bullets: ['Agent boleh membuka dan merevisi PR.', 'Approve dan merge tetap di tangan reviewer manusia.'] }),
    card('3', 'Siapa yang Menyentuh Production?', 'Migrasi data dan perubahan infrastruktur sulit dibatalkan. Jalurnya harus melewati manusia, tanpa pengecualian "cuma sebentar".'),
    card('4', 'Siapa yang Menjelaskan ke Pelanggan?', 'Saat terjadi insiden, pelanggan tidak menerima jawaban "AI yang melakukannya". Akuntabilitas berhenti di orang, bukan alat.'),
    card('praktiknya', 'Tulis Petanya Minggu Ini', 'Satu tabel cukup: keputusan, pemilik, peran AI, bukti yang dibutuhkan.', { bullets: ['Simpan di repo, bukan di slide rapat.', 'Tinjau ulang setiap kali akses agent bertambah.'] })
  ],

  'baris-kode-bukan-produktivitas': [
    card('manajemen', 'Baris Kode Naik. Belum Tentu Timmu Membaik.', 'AI bisa menulis ratusan baris dalam semenit. Kalau dashboard-mu menghitung baris, dashboard-mu sedang dibohongi.'),
    card('jebakan 1', 'Lines of Code', 'Lebih banyak kode berarti lebih banyak yang harus dibaca, dites, dan dirawat. Kode terbaik kadang adalah kode yang dihapus.'),
    card('jebakan 2', 'Jumlah PR', 'Satu fitur bisa dipecah jadi sepuluh PR tanpa menambah nilai. Begitu dijadikan target, angkanya pasti naik.'),
    card('gantinya', 'Empat Metrik DORA', 'Ukur aliran perubahan sampai ke pengguna.', { bullets: ['Kecepatan: deployment frequency, lead time.', 'Stabilitas: change failure rate, time to restore.', 'Baca berpasangan, jangan sendiri-sendiri.'] }),
    card('tambahan', 'Lihat Juga Antrean Review', 'Kalau kode makin cepat ditulis tapi PR makin lama menunggu, hambatannya sudah pindah. Ukur waktu tunggu review dan rework.'),
    card('aturannya', 'Metrik untuk Belajar, Bukan Menghukum', 'Pakai angka tim untuk menemukan hambatan. Begitu dipakai menilai individu, orang akan mengoptimalkan angkanya, bukan hasilnya.')
  ],

  'tagihan-ai-di-luar-invoice': [
    card('manajemen', 'Tagihan AI yang Tidak Ada di Invoice', 'Langganan AI per orang terlihat murah. Biaya sebenarnya dibayar dengan jam kerja yang tidak pernah masuk laporan keuangan.'),
    card('biaya 1', 'Waktu Review', 'Kode yang ditulis dalam hitungan menit tetap harus dibaca manusia. Antrean review adalah biaya pertama yang terasa.'),
    card('biaya 2', 'Rework', 'Kode yang lolos review lalu diubah lagi karena salah paham kebutuhan. Dibayar dua kali, dan yang kedua biasanya lebih mahal.'),
    card('biaya 3', 'Utang Teknis', 'AI pandai menambah, jarang menghapus.', { bullets: ['Fungsi duplikat yang tidak saling tahu.', 'Dependency baru untuk masalah kecil.', 'Gaya kode berbeda di tiap file.'] }),
    card('biaya 4', 'Eksposur Keamanan', 'Secret yang tertempel di prompt. Query tanpa parameter. Nama paket yang ternyata tidak ada. Murah dibuat, mahal dibersihkan.'),
    card('praktiknya', 'Satu Tabel, Lima Baris', 'Langganan, review, rework, utang teknis, keamanan. Isi tiap bulan dari data PR dan insiden, lalu putuskan.')
  ],

  'membaca-kode-tidak-makin-murah': [
    card('manajemen', 'Menulis Kode Makin Murah. Membacanya Tidak.', 'AI mempercepat satu tahap. Tahap berikutnya, review, masih berjalan dengan kecepatan manusia. Di situlah antrean baru terbentuk.'),
    card('gejala', 'PR Menunggu Lebih Lama dari Ditulis', 'Kalau ini terjadi di timmu, hambatannya sudah pindah. Menambah kecepatan menulis hanya memperpanjang antrean.'),
    card('bahaya', 'Approve Cepat untuk PR Besar', 'Ribuan baris disetujui dalam lima menit bukan tanda efisien. Itu tanda tidak dibaca.'),
    card('ubah 1', 'Perkecil PR', 'Satu PR, satu tujuan.', { bullets: ['Lebih cepat dibaca.', 'Lebih mudah di-revert.', 'Lebih sedikit yang lolos tanpa disadari.'] }),
    card('ubah 2', 'Mesin Dulu, Baru Manusia', 'Lint, tes, dan scan keamanan harus hijau sebelum reviewer dipanggil. Jangan habiskan jam senior untuk hal yang bisa dicek otomatis.'),
    card('ubah 3', 'Hitung Review sebagai Kerja', 'Kalau yang dihargai hanya fitur yang dikirim, review akan selalu dianggap gangguan. Jadwalkan, ukur, dan akui.')
  ],

  'ai-menebak-bukan-bertanya': [
    card('manajemen', 'AI Tidak Bertanya Kalau Tiketmu Kabur', 'Programmer manusia akan menghampiri mejamu. Agent akan mengisi celahnya dengan tebakan yang terdengar masuk akal.'),
    card('contoh', '"Tambahkan Fitur Retur"', 'Berapa hari batasnya? Barang apa saja? Siapa yang menyetujui? Tanpa jawaban, setiap pembaca menulis versi yang berbeda.'),
    card('tulis ini', 'Masalah, Bukan Solusi', 'Jelaskan siapa yang terganggu dan kenapa. Biarkan solusi dibahas setelah masalahnya disepakati.'),
    card('tulis ini', 'Kriteria yang Bisa Diuji', 'Satu skenario sukses, satu skenario gagal.', { code: `Given pesanan diterima 10 hari lalu\nWhen pelanggan mengajukan retur\nThen muncul "batas retur 7 hari"` }),
    card('tulis ini', 'Yang Tidak Dikerjakan', 'Bagian "di luar cakupan" mencegah agent dan manusia menambah fitur yang tidak diminta.'),
    card('intinya', 'Spec Kini Bagian dari Engineering', 'Waktu yang dihemat saat menulis kode, investasikan ke menulis tiket. Spec yang jelas dipakai ulang oleh agent, reviewer, dan tes.')
  ],

  'senior-lima-tahun-lagi': [
    card('manajemen', 'Siapa yang Jadi Senior Lima Tahun Lagi?', 'Kalau AI mengerjakan semua tiket level junior hari ini, pertanyaan ini akan dijawab dengan lowongan yang tidak pernah terisi.'),
    card('masalahnya', 'Tugas Kecil Adalah Sekolah', 'Bug sederhana dan halaman CRUD bukan pekerjaan rendahan. Di sanalah orang belajar bagaimana sistem rusak.'),
    card('jebakannya', 'Tiket Selesai, Pemahaman Tidak', 'Junior bisa menutup tiket dengan bantuan AI tanpa paham kenapa solusinya bekerja. Dari luar, terlihat produktif.'),
    card('latih ini', 'Tiga Kebiasaan', 'Tanpa perlu melarang AI.', { bullets: ['Jelaskan setiap baris PR-mu, termasuk buatan AI.', 'Sesekali debug tanpa AI.', 'Ikut me-review PR orang lain dan PR dari agent.'] }),
    card('untuk lead', 'Tanya "Kenapa", Bukan "Sudah?"', '"Bagian mana yang ditulis AI, dan bagaimana kamu memeriksanya?" Satu pertanyaan itu mengubah AI dari jalan pintas menjadi bahan belajar.'),
    card('intinya', 'Junior Adalah Pipeline, Bukan Biaya', 'Senior tidak tumbuh di pasar kerja. Mereka tumbuh di tim yang mau melatih.')
  ],

  'apa-yang-boleh-masuk-prompt': [
    card('manajemen', 'Sebelum Menempel ke Prompt, Tanyakan Ini', 'Satu Ctrl+V bisa mengirim data pelanggan ke server pihak ketiga. Kebijakan AI dimulai dari pertanyaan sederhana: data ini kelas apa?'),
    card('boleh', 'Publik dan Internal', 'Dokumentasi terbuka bebas dipakai. Kode internal hanya di alat yang punya kontrak dengan perusahaan.'),
    card('jangan', 'Secret dan Kredensial', 'API key, password, private key, token. Tidak pernah masuk prompt, apa pun alasannya.', { code: `# pasang di pre-commit dan CI\ngitleaks detect --source .` }),
    card('hati-hati', 'Data Pribadi', 'Nama, NIK, nomor telepon, alamat pelanggan. Samarkan dulu, atau minta persetujuan tertulis dari pemilik data.'),
    card('untuk perusahaan', 'Larangan Total Tidak Bekerja', 'Orang akan memakai akun pribadi diam-diam. Lebih aman menyediakan alat resmi dengan aturan yang jelas.'),
    card('checklist', 'Tiga Hal yang Harus Ada', 'Untuk tim keamanan dan engineering manager.', { bullets: ['Daftar alat yang disetujui beserta pemiliknya.', 'Klasifikasi data yang boleh masuk prompt.', 'Log penggunaan dan catatan pengecualian.'] })
  ],

  'adopsi-ai-tiga-fase': [
    card('manajemen', 'Bagi Lisensi ke Semua Orang Bukan Rencana', 'Tanpa baseline dan pagar pengaman, kamu tidak akan pernah tahu apakah AI membantu timmu atau hanya menyibukkannya.'),
    card('hari 0', 'Ukur Dulu', 'Catat metrik DORA, waktu tunggu review, dan rework sebelum siapa pun memakai AI. Tanpa ini, semua klaim hanya kesan.'),
    card('hari 1–30', 'Pilot Satu Tim', 'Cakupan sempit, aturan ketat.', { bullets: ['Tes, refactor kecil, dokumentasi.', 'Review manusia wajib.', 'Tidak ada akses production.'] }),
    card('hari 31–60', 'Perluas Pelan-pelan', 'Dua sampai tiga tim tambahan, didampingi tim pilot. Tambahkan template PR dan secret scanning.'),
    card('hari 61–90', 'Tulis Jadi Aturan', 'Kebijakan resmi, playbook, dan peta keputusan. Yang tadinya eksperimen menjadi cara kerja.'),
    card('gerbangnya', 'Boleh Berhenti', 'Tulis kriteria lanjut atau berhenti sebelum tiap fase. Rencana yang tidak bisa dihentikan bukan rencana, melainkan komitmen buta.')
  ],

  'wawancara-saat-kandidat-pakai-ai': [
    card('manajemen', 'Soal Interview-mu Dijawab AI dalam Detik', 'Kalau tes rekrutmen bisa diselesaikan chatbot, tes itu sedang mengukur siapa yang punya chatbot, bukan siapa yang bisa bekerja.'),
    card('ganti ini', 'Take-home Tanpa Diskusi', 'Hasil akhirnya bisa dibuat siapa saja. Tambahkan sesi di mana kandidat menjelaskan dan mengubah kodenya secara live.'),
    card('coba ini', 'Review, Bukan Menulis', 'Beri potongan kode bermasalah, lalu minta kandidat mencari masalahnya.', { code: `const saldo = await getSaldo(from)\nif (saldo >= amount) {\n  await kurangi(from, amount)\n  await tambah(to, amount)\n}` }),
    card('yang dicari', 'Berapa Masalah yang Ia Temukan?', 'Race condition, tidak ada transaksi, amount negatif. Lalu perhatikan cara ia memprioritaskan temuannya.'),
    card('tanyakan ini', 'Pertanyaan dari Pengalaman', 'Sulit dicontek karena jawabannya personal.', { bullets: ['"Kode AI apa yang pernah kamu tolak?"', '"Bagaimana kamu tahu output ini benar?"', '"Bug tersulitmu: langkahnya apa saja?"'] }),
    card('aturannya', 'Tulis Kebijakan AI per Tahap', 'Boleh atau tidak, sampaikan sejak awal. Aturan yang jelas lebih adil daripada kecurigaan diam-diam.')
  ],

  'estimasi-bukan-soal-mengetik': [
    card('manajemen', 'Kode Jadi Cepat. Tanggal Rilis Belum Tentu.', 'AI memangkas waktu mengetik. Tapi sebagian besar ketidakpastian proyek tidak pernah ada di keyboard.'),
    card('dipercepat', 'Yang Cenderung Lebih Cepat', 'Pola yang jelas dan sudah sering ditulis.', { bullets: ['Boilerplate dan CRUD.', 'Tes untuk perilaku yang terdefinisi.', 'Refactor mekanis.'] }),
    card('tetap lambat', 'Yang Tidak Banyak Berubah', 'Memperjelas kebutuhan, integrasi dengan sistem lain, review, dan rilis bertahap. Di sinilah jadwal biasanya meleset.'),
    card('jebakan', 'Memotong Semua Estimasi', '"Tim sudah pakai AI, jadi semua estimasi dipotong." Kedengarannya logis. Hasilnya komitmen yang mustahil dan lembur.'),
    card('gantinya', 'Rentang, Bukan Titik', '"3–5 hari, tergantung jawaban dari tim payment" lebih berguna daripada "4 hari" yang hampir pasti meleset.'),
    card('kalibrasi', 'Pakai Data Timmu Sendiri', 'Catat estimasi dan realisasi per tiket selama beberapa sprint. Angka timmu lebih jujur daripada klaim siapa pun.')
  ]
};

export const noteBodies: Record<string, Full> = {
  'ai-tidak-bisa-ditelepon-jam-dua-pagi': {
    lead: 'Tentang perbedaan antara mendelegasikan pekerjaan dan mendelegasikan tanggung jawab.',
    sections: [
      { id: 'skenario', title: 'Sebuah skenario tengah malam', body: p(
        'Misalnya, sebuah tim memberi agent akses untuk menjalankan migrasi database. Selama tiga bulan semuanya lancar. Lalu satu migrasi menghapus kolom yang ternyata masih dibaca layanan lain. Alert berbunyi jam dua pagi.',
        'Yang ditelepon bukan agent. Yang ditelepon adalah engineer on-call, yang tidak menulis migrasi itu, tidak me-review-nya, dan baru melihatnya sekarang. Di situlah masalah sebenarnya: pekerjaan sudah didelegasikan, tapi tanggung jawabnya tertinggal tanpa pemilik.'
      ) },
      { id: 'kemampuan-bukan-izin', title: 'Kemampuan bukan izin', body: p(
        'Diskusi tentang AI di tim engineering sering berputar di pertanyaan "bisa atau tidak". Bisakah agent menulis tes? Bisa. Bisakah ia menjalankan deploy? Secara teknis juga bisa, kalau diberi token.',
        'Pertanyaan manajemennya berbeda: kalau hasilnya salah, siapa yang menjelaskan, siapa yang memperbaiki, dan siapa yang memutuskan bahwa risiko itu layak diambil? Selama jawabannya belum ada, kemampuan teknis tidak otomatis menjadi izin.'
      ) },
      { id: 'empat-keputusan', title: 'Empat keputusan yang harus punya nama', body: p('Ada empat keputusan yang sebaiknya selalu bisa ditelusuri ke satu orang:') + ul(
        b('Definisi Done.') + ' Lolos tes tidak sama dengan menyelesaikan masalah pengguna.',
        b('Merge dan rilis.') + ' Approve PR adalah tanda tangan, bukan formalitas.',
        b('Akses production.') + ' Semua yang sulit dibatalkan: migrasi, secret, infrastruktur.',
        b('Akuntabilitas eksternal.') + ' Siapa yang bicara dengan pelanggan, auditor, atau regulator.'
      ) + p('Agent boleh membantu di keempatnya. Ia bisa menyiapkan draf, mengumpulkan bukti, dan menulis ringkasan. Yang tidak berpindah adalah keputusannya.') },
      { id: 'kunci-dengan-aturan', title: 'Kunci dengan aturan, bukan dengan niat baik', body: p(
        'Kesepakatan lisan mudah dilanggar saat deadline mepet. Lebih aman kalau batasnya ditegakkan oleh sistem: branch protection yang mewajibkan review manusia, file ' + c('CODEOWNERS') + ' untuk path sensitif, token agent yang tidak punya izin ke production, dan pipeline deploy yang butuh approval dari peran tertentu.',
        'Dengan begitu, pertanyaan "boleh atau tidak" tidak bergantung pada ingatan siapa pun. Ia tertulis di konfigurasi yang bisa di-review seperti kode lain.'
      ) },
      { id: 'untuk-pemimpin', title: 'Untuk CTO dan engineering manager', body: p(
        'Uji kesiapan timmu dengan satu latihan: ambil insiden terakhir, lalu tanyakan siapa yang memutuskan setiap langkah yang berujung ke insiden itu. Kalau ada langkah yang jawabannya "agent", berarti ada keputusan yang lepas dari peta.',
        'Tujuannya bukan memperlambat AI. Tujuannya memastikan bahwa ketika telepon berbunyi jam dua pagi, orang yang mengangkatnya pernah punya kesempatan untuk berkata tidak.'
      ) }
    ]
  },

  'saat-jumlah-pr-jadi-target': {
    lead: 'Tentang metrik yang diakali, dan kenapa AI mempercepat prosesnya.',
    sections: [
      { id: 'goodhart', title: 'Hukum yang lebih tua dari Git', body: p(
        'Ekonom Charles Goodhart mengamati pola ini pada 1975, jauh sebelum ada pull request. Versi populernya kira-kira berbunyi: ketika sebuah ukuran dijadikan target, ia berhenti menjadi ukuran yang baik.',
        'Dalam engineering, contohnya klasik. Hitung baris kode, maka kode akan membengkak. Hitung jumlah bug yang ditutup, maka bug kecil akan dilaporkan satu per satu. Hitung jumlah PR, maka satu perubahan akan dipecah menjadi banyak PR kecil.'
      ) },
      { id: 'ai-mempercepat', title: 'AI mempercepat permainannya', body: p(
        'Manusia setidaknya punya batas tenaga. Mengakali metrik itu melelahkan, dan rasa malu ikut menahan. Agent tidak punya keduanya. Kalau instruksinya menghargai PR yang banyak, ia akan membuat PR yang banyak.',
        'Lebih halus lagi: bahkan tanpa niat mengakali, AI membuat aktivitas jadi murah. Angka aktivitas naik dengan sendirinya. Dashboard terlihat hijau, padahal yang sampai ke pengguna mungkin tidak berubah.'
      ) },
      { id: 'ukur-aliran', title: 'Ukur aliran, bukan ketikan', body: p('Empat metrik DORA menggeser pertanyaannya dari "berapa banyak yang ditulis" menjadi "seberapa lancar perubahan sampai ke pengguna, dan seberapa sering ia merusak sesuatu".') + ul(
        b('Deployment frequency') + ' dan ' + b('lead time for changes') + ' menunjukkan kecepatan aliran.',
        b('Change failure rate') + ' dan ' + b('time to restore') + ' menunjukkan harga dari kecepatan itu.'
      ) + p('Kekuatannya ada di pasangan. Tim yang lebih sering deploy tapi juga lebih sering rollback belum tentu membaik. Tim yang lead time-nya memendek sementara stabilitas terjaga, kemungkinan besar sedang membaik.') },
      { id: 'yang-ditambahkan', title: 'Yang perlu ditambahkan saat AI masuk', body: p(
        'DORA tidak langsung memperlihatkan di mana AI mengubah pekerjaan. Dua sinyal membantu: waktu tunggu review dan rework. Kalau PR makin cepat dibuat tapi makin lama menunggu reviewer, hambatannya sudah pindah. Kalau kode yang baru di-merge sering diubah lagi dalam beberapa minggu, kecepatan menulis sedang dibayar belakangan.',
        'Untuk engineer, sinyal ini juga berguna: ia memberi bahasa untuk berkata "kita butuh waktu review" dengan data, bukan keluhan.'
      ) },
      { id: 'aturan-main', title: 'Aturan main yang menjaga metrik tetap jujur', body: ul(
        'Ukur sebelum adopsi AI dimulai, supaya ada titik pembanding.',
        'Tampilkan metrik di level tim, tidak di level individu.',
        'Bahas angka di retrospektif sebagai pertanyaan, bukan vonis.',
        'Ganti metrik yang mulai diakali, dan jelaskan alasannya ke tim.'
      ) + p('Metrik yang baik membuat tim lebih cepat menemukan masalah. Metrik yang dijadikan target membuat tim lebih pandai menyembunyikannya.') }
    ]
  },

  'harga-langganan-bukan-pertanyaannya': {
    lead: 'Tentang biaya AI coding yang tidak punya baris sendiri di laporan keuangan.',
    sections: [
      { id: 'pertanyaan-mudah', title: 'Pertanyaan yang terlalu mudah', body: p(
        'Saat tim mengusulkan alat AI coding, pertanyaan pertama dari sisi bisnis biasanya soal harga per kursi. Pertanyaan itu wajar, dan jawabannya gampang dicari. Justru karena gampang, ia sering menjadi satu-satunya angka di rapat.',
        'Masalahnya, langganan adalah biaya yang dibayar oleh bagian keuangan. Biaya lainnya dibayar oleh tim engineering dalam bentuk jam, dan jam itu tidak muncul sebagai baris terpisah di mana pun.'
      ) },
      { id: 'review-dan-rework', title: 'Review dan rework: biaya yang dibayar dengan jam', body: p(
        'Setiap baris yang ditulis AI tetap harus dibaca seseorang sebelum di-merge. Kalau kecepatan menulis naik sementara kapasitas review tetap, antrean memanjang. PR menunggu, konteks hilang, dan reviewer mulai membaca sekilas.',
        'Rework adalah sisi lain dari koin yang sama. Kode yang lolos review tapi ternyata salah memahami kebutuhan akan ditulis ulang. Pekerjaan itu dibayar dua kali, dan yang kedua biasanya lebih mahal karena sudah ada yang bergantung padanya.'
      ) },
      { id: 'utang-dan-keamanan', title: 'Utang teknis dan keamanan: biaya yang ditunda', body: p(
        'Dua pos berikutnya lebih licin karena tidak langsung terasa. Utang teknis tumbuh dari hal kecil: fungsi duplikat, gaya yang tidak konsisten, dependency yang ditambahkan untuk masalah lima baris. Tidak ada satu PR pun yang terlihat bermasalah, tapi codebase pelan-pelan makin sulit diubah.',
        'Keamanan bekerja ke dua arah. Di sisi input, data sensitif bisa ikut terkirim di prompt. Di sisi output, kode bisa membawa celah klasik seperti query tanpa parameter, atau merujuk paket yang sebenarnya tidak ada sehingga membuka peluang bagi paket palsu dengan nama yang sama.'
      ) },
      { id: 'cara-menghitung', title: 'Cara menghitung tanpa angka karangan', body: p('Tidak perlu model finansial rumit. Mulai dari satu tabel bulanan dengan lima baris:') + ul(
        'Langganan: dari invoice.',
        'Review: jam reviewer, diperkirakan dari waktu aktif di PR.',
        'Rework: PR yang di-revert atau file yang diubah ulang dalam beberapa minggu.',
        'Utang teknis: temuan dari review berkala, dicatat sebagai backlog.',
        'Keamanan: temuan scanner, secret yang bocor, dan dependency baru yang belum dicek.'
      ) + p('Angkanya tidak akan sempurna. Tapi tabel jujur dengan lima baris jauh lebih berguna daripada satu angka tepat untuk pertanyaan yang salah.') },
      { id: 'untuk-dua-pihak', title: 'Untuk engineer dan untuk manajemen', body: p(
        'Bagi engineer, tabel ini memberi bahasa untuk meminta waktu review dan refactor dengan data, bukan perasaan. Bagi manajemen, tabel ini mencegah kejutan: keputusan menambah kursi diambil dengan melihat seluruh biaya, bukan hanya yang tercetak di invoice.'
      ) }
    ]
  },

  'reviewer-adalah-jalur-kritis': {
    lead: 'Tentang hambatan yang berpindah tempat, dan kenapa itu bukan masalah alat.',
    sections: [
      { id: 'pabrik', title: 'Pelajaran dari lantai pabrik', body: p(
        'Eliyahu Goldratt mempopulerkan ide sederhana lewat Theory of Constraints: sebuah sistem hanya secepat bagian paling lambatnya. Mempercepat mesin lain tidak membantu, malah menumpuk barang setengah jadi di depan mesin yang lambat.',
        'Tim software tidak jauh berbeda. Selama bertahun-tahun, menulis kode adalah langkah yang paling lama. Proses review, tes, dan deploy dibangun di sekitar asumsi itu. AI coding mengubah asumsinya.'
      ) },
      { id: 'antrean', title: 'Antrean yang tidak terlihat', body: p(
        'Saat penulisan kode dipercepat, PR datang lebih sering dan lebih besar. Jumlah reviewer tidak bertambah. Hasilnya adalah antrean, dan antrean di software tidak terlihat seperti tumpukan kardus. Ia terlihat seperti tab browser yang terbuka berhari-hari dan notifikasi yang diabaikan.',
        'Antrean ini punya efek samping yang lebih buruk dari sekadar lambat. Reviewer yang kewalahan mulai membaca sekilas. PR besar di-approve karena "sepertinya oke". Kualitas turun tanpa ada yang memutuskan untuk menurunkannya.'
      ) },
      { id: 'cara-review', title: 'Mengubah cara review', body: p('Perbaikannya bukan menyuruh orang me-review lebih cepat. Perbaikannya adalah membuat setiap jam review lebih bernilai:') + ul(
        'PR kecil dengan satu tujuan, supaya bisa dipahami utuh.',
        'Penulis PR membaca diff-nya sendiri lebih dulu, termasuk bagian yang ditulis AI.',
        'Pemeriksaan otomatis lulus sebelum manusia dipanggil.',
        'Kedalaman review mengikuti risiko: pembayaran dan autentikasi berbeda dengan perubahan teks.'
      ) },
      { id: 'struktur', title: 'Mengubah struktur tim', body: p(
        'Di level organisasi, kapasitas review perlu direncanakan seperti kapasitas coding. Kalau sprint planning hanya menghitung siapa menulis apa, review akan selalu jadi pekerjaan sisa. Sebagian tim menjadwalkan slot review harian. Sebagian lain membagi kepemilikan per area kode supaya tidak semua PR jatuh ke satu senior.',
        'Yang paling sering terlupa adalah pengakuan. Kalau promosi hanya melihat fitur yang dikirim, engineer yang menghabiskan hari untuk menjaga kualitas akan terlihat tidak produktif. Review harus menjadi kontribusi yang terlihat, dibahas, dan dihargai.'
      ) },
      { id: 'pertanyaan', title: 'Pertanyaan untuk tim minggu ini', body: ul(
        'Berapa lama PR biasanya menunggu reviewer pertama?',
        'Siapa yang me-review paling banyak, dan apakah itu tercermin dalam penilaian kinerjanya?',
        'PR terbesar bulan lalu: apakah benar-benar dibaca?'
      ) + p('Jawaban jujur atas tiga pertanyaan itu biasanya sudah cukup untuk tahu di mana hambatan timmu sekarang.') }
    ]
  },

  'menulis-spec-bukan-administrasi': {
    lead: 'Tentang pergeseran nilai dari mengetik kode ke merumuskan apa yang harus dibuat.',
    sections: [
      { id: 'stereotip', title: 'Stereotip yang perlu ditinggalkan', body: p(
        'Di banyak tim, menulis tiket dianggap pekerjaan administratif. Product manager menulis seadanya, engineer mengeluh tiketnya kurang jelas, lalu semua orang mengandalkan obrolan di chat untuk mengisi kekurangannya. Selama yang mengerjakan adalah manusia yang ikut obrolan itu, cara ini kurang lebih berjalan.',
        'Begitu sebagian pekerjaan diberikan ke agent, celahnya terbuka. Agent tidak membaca thread kemarin. Ia membaca tiketnya, dan mengerjakan persis yang tertulis.'
      ) },
      { id: 'tebakan', title: 'Celah diisi dengan tebakan', body: p(
        'Ketika spesifikasi tidak lengkap, programmer manusia biasanya bertanya. Agent cenderung tidak bertanya kecuali diinstruksikan; ia memilih interpretasi yang paling masuk akal lalu melanjutkan. Hasilnya bisa berupa kode yang bersih, teruji, dan rapi untuk kebutuhan yang salah.',
        'Kesalahan semacam ini mahal karena tidak terlihat seperti kesalahan. Tes lulus. Review melihat kode yang masuk akal. Masalahnya baru ketahuan saat pengguna mencoba fiturnya.'
      ) },
      { id: 'isi-spec', title: 'Apa yang membuat spec bisa dipakai', body: ul(
        b('Masalah') + ' yang ditulis dari sisi pengguna, bukan solusi yang sudah dipilih.',
        b('Acceptance criteria') + ' yang bisa diuji, misalnya dengan format ' + c('Given / When / Then') + '.',
        b('Batasan') + ': apa yang tidak boleh berubah, seperti API publik atau skema data.',
        b('Di luar cakupan') + ': apa yang sengaja tidak dikerjakan.'
      ) + p('Empat bagian itu tidak butuh dokumen panjang. Sering kali satu layar sudah cukup. Yang penting bukan panjangnya, tapi tidak ada celah yang harus ditebak.') },
      { id: 'aset', title: 'Spec sebagai aset, bukan formalitas', body: p(
        'Kode bisa ditulis ulang dalam hitungan menit. Pemahaman tentang apa yang harus dibuat dan kenapa tidak semudah itu. Spec yang baik dipakai berkali-kali: sebagai instruksi untuk agent, konteks untuk reviewer, dasar untuk tes, dan jawaban saat setahun kemudian seseorang bertanya kenapa fitur bekerja seperti itu.',
        'Artinya, waktu yang dihemat dari menulis kode punya tempat yang jelas untuk diinvestasikan kembali.'
      ) },
      { id: 'peran', title: 'Konsekuensi untuk setiap peran', body: p(
        'Untuk product lead, kualitas tiket kini berdampak langsung pada kualitas kode. Untuk engineer, kemampuan merumuskan kasus tepi dan batasan menjadi bagian inti pekerjaan, bukan pelengkap. Untuk engineering manager, ' + c('Definition of Ready') + ' layak dijaga sama ketatnya dengan ' + c('Definition of Done') + '.'
      ) }
    ]
  },

  'jangan-hapus-anak-tangga-pertama': {
    lead: 'Tentang junior developer, AI, dan pipeline talenta yang jarang dipikirkan.',
    sections: [
      { id: 'sore-yang-hilang', title: 'Sore yang tidak tercatat di mana pun', body: p(
        'Tanyakan ke senior engineer mana pun bagaimana mereka belajar membaca stack trace, dan jawabannya jarang berupa kursus. Biasanya berupa cerita: satu bug yang menghabiskan sore, satu query yang lambat tanpa alasan jelas, satu deploy yang gagal karena konfigurasi.',
        'Pengalaman semacam itu tidak efisien. Justru karena tidak efisien, ia membekas. Intuisi senior adalah kumpulan sore-sore seperti itu.'
      ) },
      { id: 'yang-berubah', title: 'Apa yang berubah', body: p(
        'Tugas-tugas yang dulu diberikan ke junior, seperti bug kecil, tes, dan fitur CRUD, adalah tugas yang paling mudah diserahkan ke AI. Dari sudut pandang sprint, keputusannya masuk akal: lebih cepat dan lebih murah.',
        'Dari sudut pandang lima tahun, keputusan yang sama terlihat berbeda. Kalau tidak ada yang mengerjakan tugas level junior, tidak ada yang naik ke level berikutnya. Dan kode yang ditulis AI tetap butuh senior yang mampu me-review-nya.'
      ) },
      { id: 'penopang', title: 'Penopang, bukan pengganti', body: p('Melarang AI untuk junior bukan jawaban. Alat ini akan ada di pekerjaan mereka, dan memakai alat dengan baik juga keterampilan. Yang perlu dibedakan adalah cara memakainya.') + ul(
        'Sebagai penopang: AI menjelaskan, memberi petunjuk, dan menjawab pertanyaan. Junior tetap menulis dan bisa menjelaskan hasilnya.',
        'Sebagai pengganti: AI menulis, junior menyalin. Tiket selesai, tapi tidak ada yang tersisa di kepala.'
      ) + p('Pertanyaan sederhana di review bisa menggeser kebiasaan: bagian mana yang ditulis AI, dan bagaimana kamu memastikan itu benar?') },
      { id: 'tugas-pemimpin', title: 'Tugas pemimpin teknis', body: p(
        'Untuk engineering manager dan CTO, junior adalah investasi pipeline. Itu berarti mentoring perlu masuk ke perencanaan kapasitas, bukan dikerjakan di sela-sela. Itu juga berarti mengukur kemajuan junior dari pemahaman yang tumbuh, bukan jumlah tiket yang ditutup.',
        'Beberapa latihan bisa dijalankan tanpa biaya besar: sesi debugging tanpa AI, rotasi junior sebagai reviewer, dan pairing di mana senior berpikir keras sambil memakai AI di depan junior.'
      ) },
      { id: 'untuk-junior', title: 'Kalau kamu sedang di anak tangga itu', body: p(
        'Gunakan AI seperti tutor yang sabar. Minta penjelasan, bukan hanya kode. Baca pesan error sebelum menempelkannya. Setelah mendapat solusi, ubah satu bagian dan lihat apa yang rusak. Kebiasaan kecil ini yang membedakan orang yang memakai AI dari orang yang bergantung padanya.'
      ) }
    ]
  },

  'kebijakan-ai-yang-dipatuhi': {
    lead: 'Tentang merancang aturan AI yang realistis untuk perusahaan yang memegang data sensitif.',
    sections: [
      { id: 'titik-buta', title: 'Masalah yang tidak terlihat di rapat', body: p(
        'Perusahaan yang memegang data sensitif, seperti fintech, layanan kesehatan, atau instansi pemerintah, sering memulai dengan larangan. Alasannya masuk akal: tidak ada yang mau data pelanggan berakhir di server pihak ketiga.',
        'Tapi larangan tanpa alternatif punya efek samping. Engineer yang dikejar deadline akan membuka chat AI di akun pribadi, menempelkan potongan kode, dan melanjutkan pekerjaan. Tidak ada log, tidak ada kontrak, tidak ada yang tahu apa yang sudah keluar. Larangan berubah menjadi titik buta.'
      ) },
      { id: 'tiga-pertanyaan', title: 'Tiga pertanyaan inti', body: p('Kebijakan yang bisa dijalankan biasanya menjawab tiga pertanyaan:') + ul(
        b('Data apa yang boleh masuk prompt?') + ' Petakan ke klasifikasi data yang sudah ada: publik, internal, rahasia, data pribadi.',
        b('Alat mana yang disetujui?') + ' Dengan kontrak yang jelas soal penyimpanan data, pemakaian untuk training, dan lokasi server.',
        b('Bagaimana diaudit?') + ' Log penggunaan, daftar pengecualian, dan review berkala.'
      ) + p('Di Indonesia, pemrosesan data pribadi diatur dalam UU Pelindungan Data Pribadi (UU Nomor 27 Tahun 2022). Libatkan tim legal untuk memastikan alur data lewat alat AI sesuai dengan kewajiban itu.') },
      { id: 'garis-merah', title: 'Garis merah yang tidak bisa ditawar', body: p(
        'Ada dua kategori yang sebaiknya tidak pernah masuk prompt tanpa pengecualian tertulis: rahasia (API key, password, private key, token) dan data pribadi pelanggan maupun karyawan. Untuk kategori pertama, kontrol teknis lebih bisa diandalkan daripada ingatan manusia. Pasang secret scanning seperti ' + c('gitleaks') + ' di pre-commit dan CI.',
        'Untuk data pribadi, biasakan menyamarkan contoh. Data uji sintetis hampir selalu cukup untuk men-debug sebuah query.'
      ) },
      { id: 'dipatuhi', title: 'Membuat kebijakan yang dipatuhi', body: p(
        'Kebijakan dipatuhi kalau jalur resmi lebih mudah daripada jalan pintas. Artinya perusahaan perlu menyediakan alat yang disetujui, dengan login yang sama seperti alat kerja lain. Artinya juga contoh konkret: potongan kode internal boleh di alat enterprise, log berisi nomor telepon pelanggan tidak boleh.',
        'Terakhir, sediakan jalur bertanya yang cepat. Engineer yang ragu dan mendapat jawaban dalam satu jam akan bertanya lagi lain kali. Yang menunggu seminggu akan berhenti bertanya.'
      ) },
      { id: 'audit', title: 'Audit sebagai kebiasaan', body: p(
        'Tulis kebijakan di repositori, ubah lewat pull request, dan tinjau berkala. Dengan begitu, saat auditor atau regulator bertanya, jawabannya bukan ingatan seseorang, melainkan riwayat perubahan yang bisa dibaca siapa saja yang berwenang.'
      ) }
    ]
  },

  'adopsi-ai-mulai-dari-satu-tim': {
    lead: 'Tentang kenapa rencana adopsi AI sebaiknya kecil, terukur, dan bisa dihentikan.',
    sections: [
      { id: 'godaan', title: 'Godaan untuk bergerak serentak', body: p(
        'Begitu manajemen memutuskan memakai AI coding, tekanan untuk bergerak cepat datang dari mana-mana. Pesaing katanya sudah memakai. Vendor menawarkan harga khusus untuk lisensi massal. Cara tercepat terlihat jelas: bagikan akses ke semua engineer minggu ini.',
        'Masalahnya, adopsi serentak menghilangkan kemampuan untuk belajar. Kalau semua tim berubah bersamaan, tidak ada pembanding. Kalau muncul masalah, tidak jelas sumbernya.'
      ) },
      { id: 'tim-pilot', title: 'Memilih tim pilot', body: p(
        'Tim yang paling antusias belum tentu pilot terbaik. Antusiasme membantu, tapi yang lebih menentukan adalah kemampuan tim untuk mengamati dan mencatat. Tim dengan proses review yang rapi, metrik yang sudah dicatat, dan kebiasaan retrospektif akan menghasilkan pelajaran yang bisa dipakai tim lain.',
        'Cakupan pilot juga sebaiknya sempit. Tes, refactor kecil, dan dokumentasi adalah titik awal yang risikonya rendah. Fitur besar dan kode pembayaran bisa menunggu fase berikutnya.'
      ) },
      { id: 'tiga-fase', title: 'Tiga fase, tiga pertanyaan', body: ul(
        b('Hari 1–30, pilot.') + ' Apakah AI membantu tim ini tanpa menaikkan kegagalan deploy dan antrean review?',
        b('Hari 31–60, perluasan.') + ' Apakah pelajaran dari pilot bisa dipindahkan ke tim dengan konteks berbeda?',
        b('Hari 61–90, standardisasi.') + ' Aturan apa yang perlu ditulis supaya cara kerja ini bertahan tanpa pengawasan khusus?'
      ) + p('Setiap fase diakhiri dengan keputusan eksplisit: lanjut, ubah, atau berhenti.') },
      { id: 'kriteria', title: 'Tulis kriteria sebelum ada data', body: p(
        'Kesalahan paling umum dalam pilot adalah menentukan ukuran keberhasilan setelah hasilnya keluar. Begitu data ada, mudah sekali memilih angka yang terlihat bagus. Karena itu, kriteria lanjut atau berhenti sebaiknya ditulis di hari pertama, disepakati sponsor dan tim, dan disimpan di tempat yang bisa dibaca semua orang.',
        'Kriterianya tidak harus rumit. Misalnya: change failure rate tidak naik dari baseline, waktu tunggu review tidak memburuk, dan tidak ada secret yang bocor lewat prompt.'
      ) },
      { id: 'untuk-engineer', title: 'Untuk engineer di tim pilot', body: p(
        'Kalau timmu terpilih sebagai pilot, peranmu bukan sekadar mencoba alat. Peranmu adalah menjadi pengamat yang jujur. Catat yang gagal sama telitinya dengan yang berhasil. Laporan "tugas ini lebih lambat dengan AI" sama berharganya dengan laporan sebaliknya, karena keduanya membantu organisasi mengambil keputusan yang tepat.'
      ) }
    ]
  },

  'larangan-ai-di-interview': {
    lead: 'Tentang merancang ulang wawancara teknis untuk pekerjaan yang sudah berubah.',
    sections: [
      { id: 'perlombaan', title: 'Perlombaan yang sulit dimenangkan', body: p(
        'Sejak asisten AI mudah diakses, banyak tim rekrutmen menghadapi pola yang sama. Take-home test kembali dengan solusi yang terlalu rapi. Jawaban di wawancara online terdengar seperti dibacakan. Reaksi pertama biasanya memperketat pengawasan: kamera wajib, layar dibagikan, alat deteksi.',
        'Perlombaan ini sulit dimenangkan. Yang lebih penting, ia mengalihkan perhatian dari pertanyaan utama: apa yang sebenarnya ingin diukur?'
      ) },
      { id: 'pekerjaan-berubah', title: 'Pekerjaannya sudah berubah', body: p(
        'Engineer yang direkrut hari ini kemungkinan besar akan memakai AI setiap hari. Pekerjaan mereka akan lebih banyak berisi memahami kebutuhan, memeriksa kode yang tidak mereka tulis, memilih di antara beberapa pendekatan, dan menelusuri bug yang tidak bisa dijawab chatbot.',
        'Kalau itu pekerjaannya, wawancara yang menguji kecepatan menulis algoritma dari nol sedang mengukur keterampilan yang makin jarang dipakai.'
      ) },
      { id: 'format', title: 'Format yang tetap bermakna', body: ul(
        b('Review kode.') + ' Beri potongan kode dengan masalah tersembunyi, minta kandidat menemukan dan memprioritaskannya.',
        b('Take-home plus diskusi.') + ' Kandidat boleh memakai AI, lalu menjelaskan dan mengubah solusinya secara live.',
        b('Diskusi trade-off.') + ' Berikan skenario desain dengan batasan nyata, nilai alasan di balik pilihannya.',
        b('Debugging live.') + ' Sistem kecil yang rusak, kandidat menelusuri penyebabnya sambil berpikir keras.'
      ) + p('Keempat format ini tetap berguna, entah AI diizinkan atau tidak, karena yang diukur adalah penilaian, bukan ketikan.') },
      { id: 'keadilan', title: 'Aturan yang jelas lebih adil', body: p(
        'Apa pun kebijakannya, sampaikan sejak awal dan untuk setiap tahap. Kandidat yang tidak tahu aturannya akan menebak, dan tebakan itu merugikan yang jujur. Gunakan rubrik yang sama untuk semua kandidat, dan latih interviewer untuk menilai proses berpikir, bukan hanya jawaban akhir.',
        'Untuk engineer yang menjadi interviewer, ini juga perubahan peran: lebih banyak bertanya "kenapa" dan "bagaimana kamu tahu", lebih sedikit mencocokkan jawaban dengan kunci.'
      ) },
      { id: 'satu-latihan', title: 'Satu latihan untuk tim rekrutmen', body: p(
        'Ambil soal wawancara yang sekarang dipakai, tempelkan ke asisten AI, dan lihat hasilnya. Kalau jawabannya cukup untuk lolos, soal itu tidak sedang mengukur kandidat. Itu bukan alasan untuk panik, tapi titik awal yang jelas untuk merancang ulang.'
      ) }
    ]
  },

  'ai-mempercepat-bagian-yang-jarang-telat': {
    lead: 'Tentang estimasi, ketidakpastian, dan godaan memotong semua angka.',
    sections: [
      { id: 'kenapa-telat', title: 'Kenapa proyek telat', body: p(
        'Coba ingat proyek terakhir yang meleset dari jadwal. Kemungkinan besar penyebabnya bukan seseorang yang lambat menulis fungsi. Lebih sering penyebabnya adalah kebutuhan yang berubah di tengah jalan, API pihak ketiga yang tidak sesuai dokumentasi, keputusan yang menunggu persetujuan, atau bug integrasi yang baru muncul di staging.',
        'Fred Brooks menulis dalam esai "No Silver Bullet" (1986) bahwa bagian tersulit dari membangun sistem software adalah memutuskan dengan tepat apa yang harus dibangun. Pengamatan itu tidak berubah hanya karena alat menulis kodenya berubah.'
      ) },
      { id: 'yang-dipercepat', title: 'Yang dipercepat dan yang tidak', body: p(
        'AI coding cenderung membantu di bagian yang polanya jelas: boilerplate, CRUD, tes untuk perilaku yang sudah didefinisikan, refactor mekanis. Bagian ini nyata dan menghemat waktu. Tapi ini juga bagian yang dulu paling mudah diestimasi.',
        'Bagian yang membuat estimasi meleset, yaitu ketidakpastian, hampir tidak tersentuh. Bahkan ada bagian yang bertambah: kode lebih banyak berarti lebih banyak yang harus di-review dan diverifikasi.'
      ) },
      { id: 'potong-rata', title: 'Jebakan memotong rata', body: p(
        'Reaksi yang umum dari sisi manajemen adalah potongan merata: tim sudah memakai AI, jadi semua estimasi dikurangi sekian persen. Logikanya terdengar rapi, tapi ia memperlakukan seluruh pekerjaan seolah-olah semuanya adalah ketikan.',
        'Akibatnya bisa ditebak. Tiket yang isinya kebanyakan klarifikasi dan integrasi tetap memakan waktu yang sama, tapi kini dianggap terlambat. Tim mulai melewatkan review untuk mengejar angka, dan biaya itu muncul lagi sebagai rework.'
      ) },
      { id: 'lebih-jujur', title: 'Cara yang lebih jujur', body: ul(
        'Pecah estimasi menjadi pembuatan dan verifikasi, lalu tulis keduanya.',
        'Beri tiket dengan kebutuhan kabur sebuah spike, bukan angka.',
        'Pakai rentang, misalnya 3–5 hari, dan sebutkan apa yang bisa menggeser angkanya.',
        'Catat estimasi dan realisasi per tiket, lalu kalibrasi setiap beberapa sprint.'
      ) + p('Data tim sendiri, walau sedikit, lebih bisa dipegang daripada angka umum dari luar.') },
      { id: 'stakeholder', title: 'Untuk percakapan dengan stakeholder', body: p(
        'Untuk CTO dan product lead, kalimat yang berguna adalah: kecepatan menulis kode bukan kecepatan rilis. Untuk senior engineer, kontribusi terbesar dalam planning adalah menunjuk bagian yang tidak pasti sejak awal, supaya komitmen dibuat dengan mata terbuka, bukan dengan harapan.'
      ) }
    ]
  }
};
