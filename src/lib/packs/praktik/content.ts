// Pack "praktik": slides, cards and article bodies for the hands-on tutorials.
import type { DeckSlide, PostSlide } from '../../data';
import { p, ul, pre, c, b, type Full } from '../../blog-html';

const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

/* ───────────────────────── decks ───────────────────────── */

export const deckSlides: Record<string, DeckSlide[]> = {
  'praktik-docker-101': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'Docker 101: dari Dockerfile ke Container', message: 'Kamu akan membungkus aplikasi Bun kecil menjadi image, lalu menjalankannya sebagai container.', points: ['Butuh: Docker Desktop atau Docker Engine yang sudah jalan.', 'Cek dulu dengan docker --version.'] },
    { layout: 'split', subtitle: 'Konsep dasar', leftTitle: 'Image', leftPoints: ['Cetakan read-only yang tidak berubah.', 'Berisi OS minimal, runtime, dependency, dan kodemu.', 'Dibuat sekali dengan docker build.'], title: 'Hasil cetakannya', rightTitle: 'Container', rightPoints: ['Proses yang berjalan dari sebuah image.', 'Satu image bisa jadi banyak container.', 'Container dihapus, image-nya tetap ada.'] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'Aplikasi yang Mau Dibungkus', message: 'Jalankan bun init di folder baru, lalu ganti isi index.ts dengan server kecil ini.', code: "const port = Number(process.env.PORT ?? 3000)\n\nBun.serve({\n  port,\n  fetch() {\n    return new Response(\"Halo dari container!\")\n  },\n})\n\nconsole.log(`Jalan di port ${port}`)", points: ['Coba dulu tanpa Docker: bun run index.ts, lalu buka localhost:3000.'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'Tulis Dockerfile', message: 'Simpan di root proyek dengan nama Dockerfile, tanpa ekstensi.', code: `FROM oven/bun:1
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY . .

EXPOSE 3000
CMD ["bun", "run", "index.ts"]`, points: ['package.json di-copy duluan supaya layer dependency bisa di-cache.', 'Buat juga .dockerignore berisi node_modules dan .git.'] },
    { layout: 'cards', subtitle: 'Membaca Dockerfile', title: 'Empat Instruksi Inti', message: 'Dockerfile dibaca dari atas ke bawah saat docker build.', cards: [
      { title: 'FROM', desc: 'Image dasar. Di sini: Bun versi 1 di atas Linux.', icon: 'F' },
      { title: 'WORKDIR', desc: 'Folder kerja di dalam image. Perintah berikutnya jalan di sini.', icon: 'W' },
      { title: 'COPY', desc: 'Menyalin file dari folder proyekmu ke dalam image.', icon: 'C' },
      { title: 'RUN vs CMD', desc: 'RUN jalan saat build. CMD jalan saat container dinyalakan.', icon: 'R' }
    ] },
    { layout: 'code', subtitle: 'Langkah 3', title: 'Build dan Run', message: 'Titik di akhir build artinya "pakai folder ini". -p menyambungkan port laptop ke port container.', code: `docker build -t halo-bun .
docker images

docker run -d -p 3000:3000 --name halo halo-bun
docker ps

curl localhost:3000
# Halo dari container!`, points: ['-d menjalankan container di background.'] },
    { layout: 'code', subtitle: 'Langkah 4', title: 'Merawat Container', message: 'Lima perintah yang akan sering kamu ketik setelah ini.', code: `docker logs halo         # lihat output
docker exec -it halo sh  # masuk ke dalamnya
docker stop halo         # matikan
docker rm halo           # hapus container

# port 8080 di laptop, 3000 di container
docker run -d -p 8080:3000 halo-bun`, points: ['Angka kiri di -p milik laptop, angka kanan milik container.'] },
    { layout: 'bullets', subtitle: 'Jebakan umum', title: 'Kalau Ada yang Salah', message: 'Empat gejala yang paling sering ditemui pemula.', points: ['"port is already allocated": port di laptop sudah dipakai. Ganti angka kiri di -p.', 'Perubahan kode tidak muncul: image harus di-build ulang.', 'Container langsung mati: baca docker logs, biasanya error saat start.', 'Image bengkak: pastikan node_modules masuk .dockerignore.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Dua Container, Satu Image', message: 'Kerjakan tanpa melihat slide sebelumnya.', points: ['Jalankan dua container dari halo-bun, di port 3001 dan 3002.', 'Ubah teks respons, lalu build ulang dengan tag halo-bun:v2.', 'Buktikan dengan curl bahwa container lama masih menjawab teks lama.'] }
  ],

  'praktik-sql-101': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'SQL 101: SELECT, WHERE, ORDER BY, JOIN', message: 'Satu toko kopi, tiga tabel, dan pertanyaan bisnis yang dijawab dengan query.', points: ['Pakai SQLite: satu file, tanpa server.', 'Semua query di deck ini sudah dicoba di SQLite.'] },
    { layout: 'code', subtitle: 'Persiapan', title: 'Tiga Tabel Toko Kopi', message: 'Jalankan sqlite3 toko.db, lalu tempel skema ini.', code: `CREATE TABLE pelanggan (
  id INTEGER PRIMARY KEY, nama TEXT, kota TEXT);
CREATE TABLE produk (
  id INTEGER PRIMARY KEY, nama TEXT, harga INTEGER);
CREATE TABLE pesanan (
  id INTEGER PRIMARY KEY, pelanggan_id INTEGER,
  produk_id INTEGER, jumlah INTEGER);`, points: ['Tabel pesanan menyimpan id, bukan nama. Karena itu nanti butuh JOIN.'] },
    { layout: 'code', subtitle: 'Data contoh', title: 'Isi Datanya', message: 'Budi pesan dua kopi dan satu bento. Sari pesan tiga croissant. Andi belum pernah pesan.', code: `INSERT INTO pelanggan VALUES
  (1,'Budi','Bandung'), (2,'Sari','Jakarta'),
  (3,'Andi','Surabaya');
INSERT INTO produk VALUES
  (1,'Kopi Susu',25000), (2,'Croissant',32000),
  (3,'Teh Tarik',18000), (4,'Bento',55000);
INSERT INTO pesanan VALUES
  (1,1,1,2), (2,1,4,1), (3,2,2,3);` },
    { layout: 'code', subtitle: 'Kata kunci 1 dan 2', title: 'SELECT dan WHERE', message: 'SELECT memilih kolom. WHERE menyaring baris.', code: `-- semua kolom, semua baris
SELECT * FROM produk;

-- kolom tertentu, baris yang lolos syarat
SELECT nama, harga
FROM produk
WHERE harga < 30000;

-- gabung syarat dan cari pola
SELECT * FROM produk
WHERE harga > 20000 AND nama LIKE 'K%';`, points: ['Teks ditulis dengan kutip tunggal, bukan kutip ganda.'] },
    { layout: 'code', subtitle: 'Kata kunci 3', title: 'ORDER BY dan LIMIT', message: 'ORDER BY mengurutkan, dengan ASC (naik) sebagai default. LIMIT membatasi jumlah baris.', code: `-- tiga produk termahal
SELECT nama, harga
FROM produk
ORDER BY harga DESC
LIMIT 3;`, points: ['Tanpa ORDER BY, urutan hasil bisa berubah-ubah. Jangan bergantung padanya.'] },
    { layout: 'code', subtitle: 'Kata kunci 4', title: 'JOIN: Menyambung Tabel', message: 'Setiap baris pesanan disambungkan ke pelanggan dan produknya lewat id.', code: `SELECT pl.nama, pr.nama AS produk, ps.jumlah
FROM pesanan ps
JOIN pelanggan pl ON pl.id = ps.pelanggan_id
JOIN produk pr ON pr.id = ps.produk_id;`, points: ['ps, pl, dan pr adalah alias supaya query tidak kepanjangan.', 'Hasil: Budi, Kopi Susu, 2. Budi, Bento, 1. Sari, Croissant, 3.'] },
    { layout: 'split', subtitle: 'JOIN vs LEFT JOIN', leftTitle: 'JOIN', leftPoints: ['Hanya baris yang punya pasangan.', 'Andi tidak muncul karena belum pernah pesan.', 'Pilihan default untuk kebanyakan query.'], title: 'Semua baris kiri', rightTitle: 'LEFT JOIN', rightPoints: ['Semua baris tabel kiri tetap muncul.', 'Kolom tanpa pasangan bernilai NULL.', 'Cocok untuk mencari data yang "belum pernah".'] },
    { layout: 'code', subtitle: 'Menggabungkan semuanya', title: 'Siapa Pelanggan Paling Royal?', message: 'GROUP BY mengumpulkan baris per pelanggan, SUM menjumlahkan belanjanya.', code: `SELECT pl.nama,
       SUM(ps.jumlah * pr.harga) AS total
FROM pesanan ps
JOIN pelanggan pl ON pl.id = ps.pelanggan_id
JOIN produk pr ON pr.id = ps.produk_id
GROUP BY pl.nama
ORDER BY total DESC;`, points: ['Hasil: Budi 105000, Sari 96000.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Tiga Pertanyaan Bos', message: 'Jawab dengan query, lalu cocokkan hasilnya dengan data contoh.', points: ['Produk apa saja yang harganya di bawah 30.000, urut dari yang termurah?', 'Pelanggan mana yang belum pernah pesan? Petunjuk: LEFT JOIN dan IS NULL.', 'Berapa kali tiap produk dipesan, termasuk yang nol?'] }
  ],

  'praktik-regex-tanpa-takut': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'Regex Tanpa Takut', message: 'Sepuluh simbol, dibaca satu per satu, lalu dipakai untuk validasi dan mencari teks.', points: ['Coba langsung di konsol browser atau bun repl.', 'Contoh memakai regex JavaScript.'] },
    { layout: 'cards', subtitle: 'Simbol 1 sampai 4', title: 'Karakter Macam Apa?', message: 'Empat simbol yang masing-masing mewakili satu karakter.', cards: [
      { title: '.  titik', desc: 'Satu karakter apa saja, kecuali baris baru.', icon: '.' },
      { title: '\\d  digit', desc: 'Satu angka, 0 sampai 9.', icon: '\\d' },
      { title: '\\w  word', desc: 'Huruf, angka, atau underscore.', icon: '\\w' },
      { title: '\\s  spasi', desc: 'Spasi, tab, atau baris baru.', icon: '\\s' }
    ] },
    { layout: 'code', subtitle: 'Simbol 5', title: '[ ]: Pilih dari Daftar', message: 'Kurung siku berarti "salah satu dari ini". Tanda ^ di awal isinya berarti "bukan ini".', code: `/[aiueo]/.test("kopi")   // true
/[0-9]/.test("v2")       // true
/[A-Z]/.test("halo")     // false
/[^0-9]/.test("123")     // false, semua digit`, points: ['[0-9] artinya sama dengan \\d.'] },
    { layout: 'code', subtitle: 'Simbol 6 sampai 8', title: 'Berapa Kali: + * ?', message: 'Ditulis tepat setelah karakter yang mau dihitung.', code: `/ko+pi/.test("koooopi")  // true: o satu atau lebih
/ko*pi/.test("kpi")      // true: o nol atau lebih
/colou?r/.test("color")  // true: u opsional
/colou?r/.test("colour") // true`, points: ['+ butuh minimal satu, * boleh nol, ? artinya boleh ada boleh tidak.'] },
    { layout: 'code', subtitle: 'Simbol 9 dan 10', title: 'Posisi: ^ dan $', message: 'Tanpa jangkar, regex puas menemukan pola di mana saja dalam teks.', code: "/\\d+/.test(\"abc123\")     // true, ada digit\n/^\\d+$/.test(\"abc123\")   // false\n/^\\d+$/.test(\"123\")      // true, semuanya digit", points: ['Untuk validasi, hampir selalu pasang ^ di awal dan $ di akhir.'] },
    { layout: 'cards', subtitle: 'Bonus', title: 'Empat Pelengkap', message: 'Bukan bagian dari sepuluh, tapi akan sering kamu temui.', cards: [
      { title: '{n,m}', desc: 'Jumlah persis: \\d{4} berarti tepat empat digit.', icon: '{}' },
      { title: '( )', desc: 'Kelompokkan dan tangkap sebagian teks.', icon: '()' },
      { title: '|', desc: 'Atau: (jpg|png) cocok dengan salah satunya.', icon: '|' },
      { title: '\\ escape', desc: 'Jadikan simbol karakter biasa: \\. berarti titik sungguhan.', icon: '\\' }
    ] },
    { layout: 'code', subtitle: 'Dipakai sungguhan', title: 'Tiga Regex Siap Pakai', message: 'Cocokkan setiap simbol dengan slide sebelumnya.', code: "// tanggal seperti 2026-11-28\nconst tanggal = /^\\d{4}-\\d{2}-\\d{2}$/\n\n// nomor HP Indonesia: 08xx atau +628xx\nconst hp = /^(\\+62|0)8\\d{8,11}$/\n\n// rapikan spasi berlebih\n\"halo    dunia\".replace(/\\s+/g, \" \")", points: ['Regex tanggal hanya mengecek bentuk. 2026-13-45 tetap lolos.'] },
    { layout: 'code', subtitle: 'Menangkap teks', title: 'Flag g dan Grup', message: 'Flag g mencari semua kecocokan. Isi tiap kurung bisa dipanggil lagi sebagai $1, $2, $3.', code: "\"Order #123 dan #456\".match(/#\\d+/g)\n// [\"#123\", \"#456\"]\n\n\"2026-11-28\".replace(/(\\d+)-(\\d+)-(\\d+)/, \"$3/$2/$1\")\n// \"28/11/2026\"", points: ['Tanpa g, pencarian berhenti di kecocokan pertama.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Tulis Sendiri', message: 'Uji setiap jawaban dengan .test() pada contoh yang benar dan yang salah.', points: ['Kode pos Indonesia: tepat lima digit, tidak lebih, tidak kurang.', 'Plat nomor seperti "B 1234 XYZ": 1–2 huruf, 1–4 digit, 1–3 huruf.', 'Ambil semua hashtag dari sebuah kalimat dengan match dan flag g.'] }
  ],

  'praktik-ci-github-actions': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'CI Pertamamu dengan GitHub Actions', message: 'Setiap push otomatis menjalankan tes. Hasilnya muncul sebagai centang hijau atau silang merah.', points: ['Butuh: repo di GitHub dan proyek yang sudah punya tes.', 'Contoh utama memakai Bun. Versi Node ada di slide 6.'] },
    { layout: 'bullets', subtitle: 'Konsep', title: 'Apa Itu CI', message: 'Continuous Integration: setiap perubahan digabung dan diverifikasi sesering mungkin, secara otomatis.', points: ['Push ke GitHub memicu sebuah workflow.', 'Workflow menyalakan mesin bersih yang disebut runner.', 'Runner mengambil kodemu, memasang dependency, lalu menjalankan tes.', 'Hasilnya tercatat di tab Actions dan di setiap pull request.'] },
    { layout: 'cards', subtitle: 'Anatomi', title: 'Empat Istilah GitHub Actions', message: 'Kenali ini dulu, sisanya tinggal membaca YAML.', cards: [
      { title: 'Workflow', desc: 'Satu file YAML di folder .github/workflows/.', icon: 'W' },
      { title: 'Trigger (on)', desc: 'Kapan workflow jalan: push, pull_request, atau jadwal.', icon: 'T' },
      { title: 'Job', desc: 'Sekumpulan langkah di satu runner. Beberapa job bisa jalan paralel.', icon: 'J' },
      { title: 'Step', desc: 'Satu perintah shell (run) atau satu action siap pakai (uses).', icon: 'S' }
    ] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'Buat File Workflow', message: 'Simpan sebagai .github/workflows/ci.yml. Indentasi pakai spasi, jangan tab.', code: `name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun test`, points: ['Setiap step diawali tanda hubung, sejajar di bawah steps.'] },
    { layout: 'bullets', subtitle: 'Baris demi baris', title: 'Apa yang Terjadi Saat Push', message: 'Bacalah file tadi dari atas ke bawah.', points: ['on: workflow jalan di setiap push dan pull request.', 'runs-on: GitHub menyalakan mesin Ubuntu yang baru dan kosong.', 'checkout: kode repo disalin ke mesin itu. Tanpa langkah ini, foldernya kosong.', 'run: perintah shell biasa. Exit code selain 0 berarti gagal.'] },
    { layout: 'code', subtitle: 'Varian Node.js', title: 'Proyek Node? Ganti Langkahnya', message: 'Bagian di atas steps tetap sama.', code: `    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test`, points: ['npm ci butuh package-lock.json yang ikut di-commit.', 'with: memberi parameter ke sebuah action.'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'Push dan Lihat Hasilnya', message: 'Workflow langsung jalan begitu file-nya sampai di GitHub.', code: `git add .github/workflows/ci.yml
git commit -m "ci: jalankan tes di setiap push"
git push

# buka tab Actions di halaman repo,
# atau pantau dari terminal dengan GitHub CLI:
gh run list
gh run watch`, points: ['Rusak satu tes dengan sengaja untuk melihat silang merah.'] },
    { layout: 'bullets', subtitle: 'Supaya berguna', title: 'Jadikan CI Penjaga Gerbang', message: 'CI yang hasilnya diabaikan hanya membuang menit.', points: ['Aktifkan branch protection: PR tidak bisa di-merge sebelum CI hijau.', 'Jaga CI tetap cepat. Di bawah lima menit masih enak ditunggu.', 'Tambahkan lint dan typecheck sebelum tes.', 'CI merah di main diperbaiki dulu, sebelum fitur baru.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Dua Job Paralel', message: 'Kembangkan ci.yml milikmu sendiri.', points: ['Tambahkan job lint yang menjalankan bunx tsc --noEmit.', 'Pastikan job test dan lint berjalan bersamaan di tab Actions.', 'Pasang badge status workflow di README.'] }
  ],

  'praktik-env-dan-konfigurasi': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'Env Var dan Konfigurasi: Dev vs Production', message: 'Kode yang sama, perilaku berbeda per lingkungan, tanpa if-else yang berserakan.', points: ['Contoh memakai Bun dan Node.', 'Prinsipnya berlaku untuk bahasa apa pun.'] },
    { layout: 'code', subtitle: 'Masalahnya', title: 'Konfigurasi yang Ditanam di Kode', message: 'Rahasia ikut ter-commit, dan pindah lingkungan berarti mengubah kode.', code: `// jangan begini
const DB_URL = "postgres://admin:rahasia@prod-db/toko"
const API_KEY = "kunci-asli-production"
const DEBUG = true // jangan lupa dimatikan!`, points: ['Riwayat Git tetap menyimpan rahasia itu, meski barisnya sudah dihapus.'] },
    { layout: 'bullets', subtitle: 'Twelve-Factor App', title: 'Faktor III: Simpan Config di Env', message: 'Metodologi Twelve-Factor dari tim Heroku merumuskannya dengan sederhana.', points: ['Config adalah apa pun yang berbeda antar deploy: URL database, API key, nama host.', 'Config disimpan di environment variable, bukan di kode.', 'Tesnya: bisakah repo ini dibuat publik sekarang tanpa membocorkan kredensial?'] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'Baca dari process.env', message: 'Semua env var berupa string. Ubah tipenya di satu tempat saja.', code: `// config.ts
const port = Number(process.env.PORT ?? 3000)
const dbUrl = process.env.DATABASE_URL
const debug = process.env.DEBUG === "true"

if (!dbUrl) {
  throw new Error("DATABASE_URL belum di-set")
}

export const config = { port, dbUrl, debug }`, points: ['Gagal saat start lebih baik daripada error di tengah request.'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'File .env untuk Development', message: 'Bun membaca .env secara otomatis. Di Node 20.6 ke atas: node --env-file=.env app.js.', code: `# .env  (TIDAK di-commit)
PORT=3000
DATABASE_URL=postgres://dev:dev@localhost/toko
DEBUG=true

# .env.example  (di-commit, tanpa rahasia)
PORT=3000
DATABASE_URL=
DEBUG=false`, points: ['Tambahkan .env ke .gitignore sebelum commit pertama.'] },
    { layout: 'split', subtitle: 'Dev vs production', leftTitle: 'Development', leftPoints: ['Nilai dari file .env di laptop.', 'DEBUG=true dan log yang cerewet.', 'Database lokal atau di container.'], title: 'Di server', rightTitle: 'Production', rightPoints: ['Nilai dari dashboard hosting atau secret manager.', 'Rahasia disuntik saat deploy, bukan di-commit.', 'Kode dan hasil build-nya persis sama.'] },
    { layout: 'code', subtitle: 'Langkah 3', title: 'Menjalankan dengan Nilai Berbeda', message: 'Tidak ada satu baris kode pun yang perlu diubah.', code: `# set hanya untuk satu perintah
PORT=8080 bun run index.ts

# set untuk seluruh sesi terminal
export PORT=8080
printenv PORT

# Docker: lewat -e atau --env-file
docker run -e PORT=8080 --env-file .env.prod app`, points: ['Di CI, isi nilainya lewat secrets milik repo.'] },
    { layout: 'cards', subtitle: 'Jebakan', title: 'Empat Kesalahan Umum', message: 'Semuanya pernah bikin insiden di tim mana pun.', cards: [
      { title: 'Rahasia di frontend', desc: 'Env var yang masuk bundle JS browser bisa dibaca siapa pun.', icon: '!' },
      { title: 'Tanpa .env.example', desc: 'Rekan baru tidak tahu variabel apa saja yang dibutuhkan.', icon: '?' },
      { title: 'if (env === "prod")', desc: 'Cabang khusus production berarti kode itu tidak pernah dites di dev.', icon: 'if' },
      { title: 'Angka dibaca sebagai teks', desc: '"3000" bukan 3000. Dan string "false" bernilai truthy.', icon: '"' }
    ] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Satu Kode, Dua Perilaku', message: 'Pakai server kecil dari tutorial mana pun.', points: ['Baca PORT dan GREETING dari environment.', 'Buat .env dan .env.example, pastikan .env masuk .gitignore.', 'Jalankan dua kali dengan GREETING berbeda tanpa mengubah kode.'] }
  ],

  'praktik-curl-debug-api': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'Debug API dengan curl', message: 'Kirim request persis seperti yang kamu mau, lalu baca jawabannya apa adanya.', points: ['Sudah terpasang di macOS, Linux, dan Windows 10 ke atas.', 'Di Windows PowerShell, ketik curl.exe, bukan curl.'] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'GET: Request Paling Dasar', message: 'Tanpa flag apa pun, curl mengirim GET dan mencetak body.', code: `curl http://localhost:3000/produk
# [{"id":1,"nama":"Kopi"}]

# -i: tampilkan juga status dan header
curl -i http://localhost:3000/produk
# HTTP/1.1 200 OK
# Content-Type: application/json`, points: ['Biasakan -i saat debugging. Body saja sering menipu.'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'POST dengan Body JSON', message: '-X memilih method, -H menambah header, -d mengirim body.', code: `curl -X POST http://localhost:3000/produk \\
  -H "Content-Type: application/json" \\
  -d '{"nama":"Teh","harga":18000}'

# curl 7.82 ke atas punya jalan pintas:
curl --json '{"nama":"Teh"}' \\
  http://localhost:3000/produk`, points: ['Kutip tunggal di luar JSON supaya kutip gandanya aman.', '--json otomatis memakai POST dan memasang Content-Type.'] },
    { layout: 'code', subtitle: 'Langkah 3', title: 'Header dan Autentikasi', message: 'Header ditulis persis seperti di HTTP: "Nama: nilai". Satu -H untuk satu header.', code: `export TOKEN="isi-token-di-sini"

curl -H "Authorization: Bearer $TOKEN" \\
  http://localhost:3000/profil

curl -X DELETE \\
  -H "Authorization: Bearer $TOKEN" \\
  http://localhost:3000/produk/2`, points: ['Lupa header Authorization adalah penyebab klasik status 401.'] },
    { layout: 'cards', subtitle: 'Membaca jawaban', title: 'Status Code dalam Empat Kelompok', message: 'Digit pertama sudah memberi tahu siapa yang perlu dicurigai.', cards: [
      { title: '2xx: berhasil', desc: '200 OK, 201 Created, 204 No Content (tanpa body).', icon: '2' },
      { title: '3xx: pindah alamat', desc: 'Resource ada di URL lain. Tambah -L supaya curl mengikutinya.', icon: '3' },
      { title: '4xx: request salah', desc: '400 format salah, 401 belum login, 403 dilarang, 404 tidak ada.', icon: '4' },
      { title: '5xx: server salah', desc: '500 error di kode server. 502 dan 503: server di balik proxy bermasalah.', icon: '5' }
    ] },
    { layout: 'code', subtitle: 'Langkah 4', title: 'Cuma Status, atau Semua Detail', message: '-s membuat diam, -o /dev/null membuang body, -w mencetak info yang dipilih.', code: `# hanya status code dan waktu
curl -s -o /dev/null \\
  -w "%{http_code} %{time_total}s\\n" \\
  http://localhost:3000/produk
# 200 0.004s

# semua detail: koneksi, TLS, header keluar-masuk
curl -v https://api.example.com/health`, points: ['-v memperlihatkan header request yang benar-benar terkirim.'] },
    { layout: 'split', subtitle: 'Frontend vs backend', leftTitle: 'curl berhasil', leftPoints: ['API-nya sehat.', 'Bandingkan header dan body dengan request dari app.', 'Curigai CORS, token, atau format body di frontend.'], title: 'Sebaliknya', rightTitle: 'curl juga gagal', rightPoints: ['Masalahnya di server atau jaringan.', 'Baca status code dan body error-nya.', 'Kirim perintah curl itu ke tim backend.'] },
    { layout: 'bullets', subtitle: 'Kebiasaan harian', title: 'Tiga Trik yang Menghemat Waktu', message: 'Kecil, tapi terasa setiap hari.', points: ['DevTools browser: klik kanan request di tab Network, pilih Copy as cURL.', 'Rapikan JSON dengan jq: curl -s URL | jq', 'Lampirkan perintah curl di laporan bug, tanpa token asli. Siapa pun bisa mengulanginya.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Interogasi Satu API', message: 'Pakai API lokalmu atau API publik untuk latihan.', points: ['Kirim GET, catat status code dan Content-Type-nya.', 'Kirim POST dengan JSON yang sengaja dirusak. Status apa yang kembali?', 'Ukur time_total untuk lima request berturut-turut.'] }
  ],

  'praktik-validasi-zod': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'Validasi Input dengan Zod', message: 'Satu schema memberi dua hal sekaligus: pengecekan saat runtime dan tipe TypeScript.', points: ['Pasang: bun add zod, atau npm i zod.', 'Contoh memakai Zod 4.'] },
    { layout: 'code', subtitle: 'Masalahnya', title: 'Tipe yang Berbohong', message: 'as hanya meyakinkan compiler. Ia tidak memeriksa apa pun saat program berjalan.', code: `type User = { nama: string; umur: number }

const body = (await req.json()) as User
body.umur + 1
// kalau client kirim "20", hasilnya "201"`, points: ['Semua data dari luar perlu dicek: body, query, env, file, respons API lain.'] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'Tulis Schema', message: 'Schema adalah aturannya. Tipe diturunkan dari schema, jadi keduanya tidak mungkin berbeda.', code: `import { z } from "zod"

const Daftar = z.object({
  nama: z.string().min(2),
  email: z.email(),
  umur: z.number().int().min(13),
  bio: z.string().max(160).optional(),
})

type Daftar = z.infer<typeof Daftar>`, points: ['Di Zod 3, tulis z.string().email().'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'parse vs safeParse', message: 'Pakai safeParse di handler, supaya kamu yang memutuskan bentuk respons error-nya.', code: `// parse: melempar ZodError kalau gagal
const data = Daftar.parse(input)

// safeParse: mengembalikan hasil, tidak melempar
const hasil = Daftar.safeParse(input)
if (!hasil.success) {
  console.log(hasil.error.issues)
} else {
  console.log(hasil.data.nama)
}` },
    { layout: 'code', subtitle: 'Langkah 3', title: 'Pasang di Endpoint', message: 'Validasi di pintu masuk. Setelah lolos, data aman dipakai dan sudah bertipe.', code: `Bun.serve({
  async fetch(req) {
    const hasil = Daftar.safeParse(await req.json())
    if (!hasil.success) {
      return Response.json(hasil.error.issues,
        { status: 400 })
    }
    // hasil.data bertipe Daftar
    return Response.json(hasil.data, { status: 201 })
  },
})`, points: ['req.json() sendiri gagal kalau JSON rusak. Bungkus dengan try/catch.'] },
    { layout: 'cards', subtitle: 'Kosakata', title: 'Empat Fitur yang Sering Dipakai', message: 'Cukup ini untuk sebagian besar form dan endpoint.', cards: [
      { title: '.optional()', desc: 'Field boleh tidak ada. Tipenya ikut menjadi opsional.', icon: '?' },
      { title: '.default(x)', desc: 'Kalau field kosong, isi dengan nilai x.', icon: '=' },
      { title: 'z.enum([...])', desc: 'Hanya menerima nilai dari daftar, misalnya "member" atau "admin".', icon: 'E' },
      { title: 'z.coerce', desc: 'Ubah "3" menjadi 3. Cocok untuk query string dan env var.', icon: 'C' }
    ] },
    { layout: 'code', subtitle: 'Bonus', title: 'Validasi Env Var Sekalian', message: 'Aplikasi langsung berhenti saat start kalau konfigurasinya salah. Jauh lebih baik daripada error jam dua pagi.', code: `const Env = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
})

export const env = Env.parse(process.env)` },
    { layout: 'split', subtitle: 'Di mana memasang', leftTitle: 'Validasi di sini', leftPoints: ['Body, query, dan header request.', 'Respons API pihak ketiga.', 'Env var, file JSON, localStorage.'], title: 'Tidak perlu', rightTitle: 'Cukup tipe TS', rightPoints: ['Fungsi internal yang dipanggil kodemu sendiri.', 'Data yang sudah lolos schema di perbatasan.', 'Konstanta di dalam kode.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Form Ganti Password', message: 'Tulis schema-nya, lalu uji dengan safeParse.', points: ['Field password minimal 8 karakter. Field ulangi harus sama persis.', 'Petunjuk: pakai .refine() pada object, arahkan error ke path ulangi.', 'Uji tiga input: valid, terlalu pendek, dan tidak sama.'] }
  ],

  'praktik-conventional-commits': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'Conventional Commits dan Changelog', message: 'Format pesan commit yang sederhana, lalu changelog yang tersusun sendiri dari riwayat Git.', points: ['Spesifikasinya ada di conventionalcommits.org.', 'Berangkat dari aturan commit proyek Angular.'] },
    { layout: 'split', subtitle: 'Sebelum', leftTitle: 'Riwayat yang kabur', leftPoints: ['update', 'fix bug', 'wip lagi'], title: 'Sesudah', rightTitle: 'Conventional Commits', rightPoints: ['feat(cart): tambah kupon diskon', 'fix(login): refresh token yang kedaluwarsa', 'docs: cara menjalankan tes'] },
    { layout: 'code', subtitle: 'Format', title: 'Anatomi Satu Pesan Commit', message: 'Hanya baris pertama yang wajib. Scope opsional dan ditulis di dalam kurung.', code: `<type>(<scope>): <deskripsi singkat>

<body: kenapa perubahan ini dibuat>

<footer: BREAKING CHANGE, Refs #123>

# contoh nyata:
feat(cart): tambah kupon diskon

Pelanggan bisa memasukkan kode kupon di checkout.

Refs #42` },
    { layout: 'cards', subtitle: 'Type', title: 'Type yang Paling Sering Dipakai', message: 'feat dan fix ada di spesifikasinya. Sisanya konvensi populer dari Angular.', cards: [
      { title: 'feat', desc: 'Fitur baru untuk pengguna. Menaikkan versi minor.', icon: '+' },
      { title: 'fix', desc: 'Perbaikan bug. Menaikkan versi patch.', icon: 'x' },
      { title: 'docs / test', desc: 'Dokumentasi atau tes. Perilaku aplikasi tidak berubah.', icon: 'd' },
      { title: 'refactor / chore', desc: 'Merapikan kode atau urusan tooling. Juga tanpa ubah perilaku.', icon: 'r' }
    ] },
    { layout: 'code', subtitle: 'Breaking change', title: 'Menandai Perubahan yang Merusak', message: 'Tanda ! setelah type, atau footer BREAKING CHANGE. Keduanya berarti versi major.', code: `feat(api)!: hapus endpoint /v1/users

BREAKING CHANGE: pakai /v2/users. Field
"name" diganti menjadi "fullName".`, points: ['Hubungannya dengan SemVer: fix = patch, feat = minor, breaking = major.'] },
    { layout: 'code', subtitle: 'Changelog manual', title: 'Changelog dari git log', message: 'Tanpa alat tambahan pun, riwayat yang rapi sudah bisa disaring.', code: `# fitur sejak rilis v1.2.0
git log v1.2.0..HEAD --oneline --grep="^feat"

# perbaikan bug sejak rilis v1.2.0
git log v1.2.0..HEAD --oneline --grep="^fix"

# langsung jadi daftar markdown
git log v1.2.0..HEAD --grep="^feat" \\
  --pretty=format:"- %s"`, points: ['Ini hanya mungkin karena setiap pesan diawali type.'] },
    { layout: 'code', subtitle: 'Changelog otomatis', title: 'Biarkan Alat yang Menulis', message: 'git-cliff membaca riwayat commit dan mengelompokkannya per versi dan per type.', code: `# buat file konfigurasi cliff.toml
npx git-cliff --init

# tulis changelog dari seluruh riwayat
npx git-cliff -o CHANGELOG.md

# rilis berikutnya: beri tag, tulis ulang
git tag v1.3.0
npx git-cliff -o CHANGELOG.md`, points: ['Alternatif populer: release-please dan semantic-release.'] },
    { layout: 'code', subtitle: 'Penjaga format', title: 'Tolak Pesan yang Salah Format', message: 'commitlint memeriksa pesan commit sebelum masuk ke riwayat.', code: `# pasang commitlint
npm i -D @commitlint/cli \\
  @commitlint/config-conventional

# isi commitlint.config.js
export default {
  extends: ["@commitlint/config-conventional"],
}

# coba: pesan ini akan ditolak
echo "fix bug" | npx commitlint`, points: ['Pasang sebagai hook commit-msg (misalnya lewat husky) atau sebagai langkah CI.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Rapikan Riwayatmu', message: 'Pakai repo latihan, bukan repo tim.', points: ['Tulis ulang lima pesan commit lama ke format Conventional Commits, cukup di catatanmu.', 'Buat tiga commit baru: satu feat, satu fix, satu docs.', 'Jalankan git log --grep="^feat" dan pastikan hanya satu yang muncul.'] }
  ],

  'praktik-lint-dan-format': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'Lint dan Format: Akhiri Debat Gaya Kode', message: 'Formatter mengurus tampilan, linter mengurus potensi bug. Keduanya jalan otomatis.', points: ['Contoh: Prettier dan ESLint untuk proyek JS dan TS.', 'Alternatif satu alat untuk keduanya: Biome.'] },
    { layout: 'split', subtitle: 'Dua alat, dua tugas', leftTitle: 'Formatter', leftPoints: ['Mengatur spasi, kutip, dan baris baru.', 'Tidak mengubah perilaku kode.', 'Contoh: Prettier, dart format, gofmt.'], title: 'Mencari masalah', rightTitle: 'Linter', rightPoints: ['Menandai variabel tak terpakai dan == yang berbahaya.', 'Menemukan bug sebelum kode dijalankan.', 'Contoh: ESLint, ktlint, SwiftLint.'] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'Pasang Prettier', message: '--write merapikan file. --check hanya memeriksa, cocok untuk CI.', code: `npm i -D prettier

# isi file .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}

npx prettier --write .
npx prettier --check .`, points: ['Pilih aturannya sekali, lalu jangan dibahas lagi.'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'Pasang ESLint', message: 'eslint-config-prettier mematikan aturan ESLint yang bentrok dengan Prettier.', code: `npm i -D eslint @eslint/js typescript-eslint \\
  eslint-config-prettier

// eslint.config.mjs
import js from "@eslint/js"
import tseslint from "typescript-eslint"
import prettier from "eslint-config-prettier"
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
]`, points: ['prettier diletakkan paling akhir supaya bisa menimpa aturan sebelumnya.'] },
    { layout: 'code', subtitle: 'Langkah 3', title: 'Satukan di package.json', message: 'Semua orang menjalankan perintah yang sama, di laptop maupun di CI.', code: `{
  "scripts": {
    "format": "prettier --write .",
    "lint": "eslint .",
    "check": "prettier --check . && eslint ."
  }
}`, points: ['Biasakan npm run check sebelum push.'] },
    { layout: 'cards', subtitle: 'Supaya otomatis', title: 'Empat Lapis Pertahanan', message: 'Semakin awal masalah tertangkap, semakin murah memperbaikinya.', cards: [
      { title: 'Editor', desc: 'Format on save, misalnya dengan ekstensi Prettier di VS Code.', icon: 'E' },
      { title: '.editorconfig', desc: 'Indentasi dan akhir baris yang sama di semua editor.', icon: '{}' },
      { title: 'Pre-commit hook', desc: 'husky dan lint-staged: rapikan file yang di-stage saja.', icon: 'H' },
      { title: 'CI', desc: 'npm run check di setiap PR. Hakim terakhir yang tidak bisa dilewati.', icon: 'CI' }
    ] },
    { layout: 'bullets', subtitle: 'Proyek lama', title: 'Menerapkan di Repo yang Sudah Besar', message: 'Satu commit besar, lalu tidak ada lagi diff gaya di PR.', points: ['Sepakati konfigurasi, lalu jalankan prettier --write . dalam satu commit khusus.', 'Catat hash commit itu di .git-blame-ignore-revs supaya git blame tetap berguna.', 'Mulai dari aturan lint recommended. Tambah aturan hanya kalau ada bug nyata yang dicegahnya.', 'Aturan yang sering di-disable sebaiknya dimatikan saja.'] },
    { layout: 'code', subtitle: 'Bahasa lain', title: 'Bukan Cuma JavaScript', message: 'Hampir setiap ekosistem punya formatter resmi atau yang dipakai hampir semua orang.', code: `dart format .                  # Dart / Flutter
gofmt -w .                     # Go
ruff format . && ruff check .  # Python
ktlint --format                # Kotlin
swift-format format -i -r Sources   # Swift` },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Satu Proyek, Nol Debat', message: 'Kerjakan di proyek pribadimu dulu.', points: ['Pasang Prettier dan ESLint dengan konfigurasi dari slide 3 dan 4.', 'Tambahkan script check, lalu jalankan sampai bersih.', 'Tambahkan langkah npm run check ke workflow CI.'] }
  ],

  'praktik-readme': [
    { layout: 'cover', subtitle: 'Tutorial praktik, 15 menit', title: 'README yang Benar-Benar Dibaca', message: 'Struktur sederhana yang menjawab pertanyaan pembaca, sesuai urutan kebutuhannya.', points: ['Berlaku untuk proyek open source maupun repo internal tim.'] },
    { layout: 'bullets', subtitle: 'Siapa pembacanya', title: 'Tiga Pertanyaan Pembaca', message: 'Pembaca datang dengan pertanyaan, dan berhenti membaca begitu pertanyaannya terjawab.', points: ['Proyek ini apa, dan apakah cocok untuk kebutuhannya?', 'Bagaimana mencobanya dalam lima menit?', 'Ke mana kalau ada masalah atau ingin ikut berkontribusi?'] },
    { layout: 'code', subtitle: 'Kerangka', title: 'Urutan yang Mengikuti Pembaca', message: 'Bagian atas untuk pengguna baru. Detail untuk kontributor ada di bawah.', code: `# catat-uang

Satu kalimat: apa ini dan untuk siapa.

## Mulai cepat
## Contoh pemakaian
## Konfigurasi
## Pengembangan lokal
## Kontribusi
## Lisensi` },
    { layout: 'split', subtitle: 'Kalimat pembuka', leftTitle: 'Pembuka yang kabur', leftPoints: ['"Aplikasi yang dibuat dengan Flutter."', 'Tidak menyebut masalah yang diselesaikan.'], title: 'Sesudah', rightTitle: 'Pembuka yang tajam', rightPoints: ['"Catat pengeluaran dari notifikasi bank, tanpa internet."', 'Menyebut fungsi, pengguna, dan pembedanya.'] },
    { layout: 'code', subtitle: 'Mulai cepat', title: 'Perintah yang Bisa Langsung Disalin', message: 'Sebutkan prasyarat beserta versinya, lalu perintah yang bisa ditempel apa adanya.', code: "## Mulai cepat\n\nButuh Bun 1.1 ke atas.\n\n```bash\ngit clone https://github.com/kamu/catat-uang\ncd catat-uang\nbun install\nbun run dev\n```\n\nBuka http://localhost:3000.", points: ['Uji dari folder kosong. Di situlah langkah yang terlupa ketahuan.'] },
    { layout: 'cards', subtitle: 'Sering terlupa', title: 'Empat Hal yang Sering Hilang', message: 'Kecil, tapi menentukan apakah orang lanjut membaca.', cards: [
      { title: 'Screenshot atau GIF', desc: 'Satu gambar menjelaskan aplikasi lebih cepat daripada tiga paragraf.', icon: 'S' },
      { title: 'Status proyek', desc: 'Aktif, eksperimen, atau tidak dirawat lagi. Pembaca perlu tahu.', icon: '!' },
      { title: 'Env var yang dibutuhkan', desc: 'Daftar nama variabel dan contohnya. Rujuk ke .env.example.', icon: 'E' },
      { title: 'Lisensi', desc: 'Tanpa lisensi, orang lain tidak punya izin untuk memakai kodemu.', icon: 'L' }
    ] },
    { layout: 'bullets', subtitle: 'Yang dibuang', title: 'Yang Tidak Perlu Ada di README', message: 'README bukan tempat seluruh dokumentasi.', points: ['Riwayat versi lengkap: pindahkan ke CHANGELOG.md.', 'Panduan kontribusi yang panjang: CONTRIBUTING.md.', 'Dokumentasi API detail: folder docs atau situs dokumentasi.', 'Paragraf pembuka tentang betapa hebatnya teknologi yang dipakai.'] },
    { layout: 'bullets', subtitle: 'Merawat', title: 'README Juga Bisa Basi', message: 'Perintah yang tidak jalan lagi lebih merugikan daripada tidak ada perintah sama sekali.', points: ['Uji ulang bagian Mulai cepat setiap kali ada rilis besar.', 'Perlakukan README seperti kode: ikut di-review di PR.', 'Pertanyaan yang muncul dua kali di issue, jawabannya masuk README.'] },
    { layout: 'bullets', subtitle: 'Latihan', title: 'Latihan: Audit README Milikmu', message: 'Pilih satu repo yang kamu punya.', points: ['Tulis ulang kalimat pertamanya: apa, untuk siapa, apa bedanya.', 'Minta teman menjalankan Mulai cepat tanpa bantuanmu. Catat di mana ia tersangkut.', 'Tambahkan satu screenshot dan bagian lisensi.'] }
  ]
};

/* ───────────────────────── carousels ───────────────────────── */

export const postSlides: Record<string, PostSlide[]> = {
  'docker-image-vs-container': [
    card('tutorial', 'Image dan container itu bukan sinonim', 'Banyak kebingungan soal Docker berawal dari menganggap keduanya sama. Hubungan mereka lebih mirip class dan object.'),
    card('Image', 'Image adalah cetakan', 'Read-only. Berisi sistem minimal, runtime, dependency, dan kodemu. Dibuat dengan docker build dan bisa dipakai berulang kali.'),
    card('Container', 'Container adalah cetakan yang hidup', 'Proses yang berjalan dari sebuah image. Satu image bisa melahirkan sepuluh container yang saling terpisah.'),
    card('Dockerfile', 'Resepnya cuma beberapa baris', 'Dockerfile minimal untuk aplikasi Bun, dibaca dari atas ke bawah saat docker build.', { code: 'FROM oven/bun:1\nWORKDIR /app\nCOPY . .\nRUN bun install\nCMD ["bun", "index.ts"]' }),
    card('Perintah', 'Tiga perintah untuk mulai', 'Urutannya selalu sama: build, run, lalu cek.', { code: 'docker build -t app .\ndocker run -p 3000:3000 app\ndocker ps' }),
    card('Ingat', 'Ubah kode? Build ulang', 'Container tidak membaca ulang kodemu. Ia menjalankan isi image saat image itu dibuat. Lupa build ulang adalah jebakan klasik pemula.')
  ],

  'sql-empat-kata-kunci': [
    card('tutorial', 'Empat kata SQL yang dipakai setiap hari', 'SELECT, WHERE, ORDER BY, JOIN. Dengan empat ini, kebanyakan pertanyaan tentang data sudah bisa dijawab. Sisanya dipelajari sambil jalan.'),
    card('SELECT', 'Pilih kolomnya', 'Sebutkan kolom yang dibutuhkan saja. SELECT * cocok untuk mengintip, bukan untuk kode aplikasi.', { code: 'SELECT nama, harga\nFROM produk;' }),
    card('WHERE', 'Saring barisnya', 'Hanya baris yang lolos syarat yang ikut ke hasil.', { code: 'SELECT nama FROM produk\nWHERE harga < 30000;' }),
    card('ORDER BY', 'Urutkan hasilnya', 'DESC untuk yang terbesar dulu. Tambah LIMIT untuk mengambil beberapa teratas.', { code: 'SELECT nama, harga FROM produk\nORDER BY harga DESC\nLIMIT 3;' }),
    card('JOIN', 'Sambungkan tabelnya', 'Tabel pesanan hanya menyimpan id. JOIN menukarnya dengan nama.', { code: 'SELECT pl.nama, ps.jumlah\nFROM pesanan ps\nJOIN pelanggan pl\n  ON pl.id = ps.pelanggan_id;' }),
    card('Urutan', 'Urutan tulis bukan urutan proses', 'Kamu menulis SELECT duluan, tapi secara logika database memproses FROM dan JOIN dulu, lalu WHERE, SELECT, baru ORDER BY.')
  ],

  'regex-sepuluh-simbol': [
    card('tutorial', 'Regex bukan sandi rahasia', 'Kelihatannya acak, tapi setiap simbol punya satu arti. Baca dari kiri ke kanan: satu simbol, satu langkah.'),
    card('Karakter', 'Lima simbol: karakter apa', 'Pertanyaan pertama: karakter macam apa yang dicari?', { bullets: ['. berarti satu karakter apa saja', '\\d digit, \\w huruf/angka/_, \\s spasi', '[abc] berarti salah satu dari a, b, atau c'] }),
    card('Jumlah', 'Tiga simbol: berapa kali', 'Diletakkan tepat setelah karakter yang mau dihitung.', { bullets: ['+ satu kali atau lebih', '* nol kali atau lebih', '? nol atau satu kali, alias opsional'] }),
    card('Posisi', 'Dua simbol: di mana', '^ berarti awal teks, $ berarti akhir. Untuk validasi, pasang keduanya.', { code: '/\\d+/.test("abc123")   // true\n/^\\d+$/.test("abc123") // false' }),
    card('Contoh', 'Baca regex ini pelan-pelan', 'Awal teks, empat digit, tanda hubung, dua digit, tanda hubung, dua digit, akhir teks.', { code: '/^\\d{4}-\\d{2}-\\d{2}$/' }),
    card('Tips', 'Uji juga dengan contoh yang salah', 'Regex yang menerima semua input benar belum tentu menolak yang salah. Siapkan tiga contoh lolos dan tiga contoh gagal sebelum dipakai.')
  ],

  'ci-pertama-satu-file': [
    card('tutorial', 'Tes yang lupa dijalankan tidak menolong', 'CI menjalankan tesmu di mesin bersih setiap kali ada push. Tidak bergantung pada ingatan siapa pun.'),
    card('Lokasi', 'Semua dimulai dari satu folder', 'GitHub membaca setiap file YAML di .github/workflows/. Tidak perlu klik apa pun untuk mengaktifkannya.'),
    card('Pemicu', 'Kapan dan di mesin apa', 'Bagian atas file .github/workflows/ci.yml.', { code: 'on: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest' }),
    card('Langkah', 'Lalu apa yang dikerjakan', 'Lanjutan file yang sama, tepat di bawah runs-on. Indentasinya harus sejajar.', { code: '    steps:\n      - uses: actions/checkout@v4\n      - uses: oven-sh/setup-bun@v2\n      - run: bun install\n      - run: bun test' }),
    card('Hasil', 'Centang hijau atau silang merah', 'Setiap commit dan PR mendapat tanda status. Klik tandanya untuk melihat log lengkap, termasuk tes mana yang gagal.'),
    card('Aturan', 'CI yang diabaikan tidak berguna', 'Tiga kebiasaan yang membuat CI benar-benar menjaga.', { bullets: ['PR baru boleh di-merge setelah CI hijau', 'Jaga durasinya tetap pendek', 'Main merah? Perbaiki dulu, baru lanjut fitur'] })
  ],

  'env-config-bukan-kode': [
    card('tutorial', 'Bisakah repomu dibuka ke publik hari ini?', 'Kalau jawabannya "jangan, ada password di dalamnya", konfigurasimu masih tercampur dengan kode.'),
    card('Definisi', 'Config: apa pun yang beda per deploy', 'Routing dan logic bisnis bukan config. Itu tetap kode.', { bullets: ['URL database dan cache', 'API key layanan pihak ketiga', 'Port, nama host, level log'] }),
    card('Cara', 'Baca dari environment', 'Satu file config, satu tempat untuk mengecek semuanya.', { code: 'const url = process.env.DATABASE_URL\nif (!url) throw new Error("no DB")' }),
    card('.env', 'File .env hanya untuk laptop', 'Commit .env.example berisi nama variabel tanpa nilai rahasia. File .env sendiri masuk .gitignore.'),
    card('Production', 'Di server, nilainya dari platform', 'Dashboard hosting, secret manager, atau secrets di CI. Build yang sama, nilai yang berbeda.'),
    card('Bocor?', 'Sudah ter-commit? Ganti kuncinya', 'Menghapus baris tidak menghapus riwayat Git. Anggap rahasia itu sudah terbaca, lalu buat kunci baru di penyedia layanannya.')
  ],

  'curl-enam-flag': [
    card('tutorial', 'Satu baris curl mengakhiri debat', 'Frontend dan backend saling tunjuk? Kirim request yang sama dari terminal. Jawabannya tidak memihak siapa pun.'),
    card('-i', 'Lihat status dan header', 'Body saja tidak cukup. Status code sering menjelaskan lebih banyak.', { code: 'curl -i localhost:3000/produk' }),
    card('-X dan -d', 'Pilih method, kirim body', 'Kutip tunggal di luar, kutip ganda di dalam JSON.', { code: 'curl -X POST localhost:3000/produk \\\n  -H "Content-Type: application/json" \\\n  -d \'{"nama":"Teh"}\'' }),
    card('-H', 'Tambah header', 'Token, Accept, atau header kustom. Satu -H untuk satu header.', { code: 'curl localhost:3000/profil \\\n  -H "Authorization: Bearer $TOKEN"' }),
    card('-s -o -w', 'Cuma butuh status code?', 'Cocok untuk script dan health check.', { code: 'curl -s -o /dev/null \\\n  -w "%{http_code}\\n" \\\n  localhost:3000/produk' }),
    card('-v', 'Masih bingung? Lihat semuanya', '-v menampilkan header yang benar-benar dikirim dan diterima, termasuk proses koneksinya. Di sinilah header yang lupa biasanya ketahuan.')
  ],

  'zod-jangan-percaya-input': [
    card('tutorial', 'Tipe TypeScript hilang saat runtime', 'Setelah di-compile, semua anotasi tipe dihapus. Data dari luar masuk tanpa diperiksa siapa pun, kecuali kamu memasang penjaga.'),
    card('Schema', 'Tulis aturannya sekali', 'Satu schema, aturan yang bisa dibaca manusia.', { code: 'const User = z.object({\n  nama: z.string().min(2),\n  umur: z.number().int(),\n})' }),
    card('Tipe', 'Tipe gratis dari schema', 'Tidak perlu menulis interface terpisah yang bisa basi.', { code: 'type User = z.infer<typeof User>' }),
    card('Cek', 'safeParse tidak melempar error', 'Hasilnya objek dengan success bernilai true atau false.', { code: 'const r = User.safeParse(body)\nif (!r.success) {\n  return r.error.issues\n}' }),
    card('Pesan', 'Error yang siap dikirim ke client', 'Setiap issue berisi path dan message, misalnya path ["umur"] dengan pesan bahwa yang diharapkan adalah number. Cukup untuk menandai field yang salah di form.'),
    card('Batas', 'Validasi di perbatasan saja', 'Di dalam aplikasi, cukup percaya pada tipe.', { bullets: ['Body, query, dan header request', 'Respons dari API pihak ketiga', 'Env var saat aplikasi start'] })
  ],

  'commit-message-yang-berguna': [
    card('tutorial', '"fix" bukan pesan commit', 'Enam bulan lagi, seseorang akan membaca riwayat ini sambil mencari kapan sebuah bug masuk. "fix" tidak menjawab apa pun.'),
    card('Format', 'type(scope): deskripsi', 'Satu baris, huruf kecil, kalimat perintah.', { code: 'feat(cart): tambah kupon diskon\nfix(login): refresh token\ndocs: cara menjalankan tes' }),
    card('Type', 'Lima type untuk mulai', 'Tidak perlu hafal semuanya di hari pertama.', { bullets: ['feat untuk fitur baru, fix untuk bug', 'docs, test, refactor: tanpa mengubah perilaku', 'chore untuk urusan tooling dan dependency'] }),
    card('Breaking', 'Tanda seru untuk perubahan besar', 'Pemakai API-mu perlu tahu ada yang rusak.', { code: 'feat(api)!: hapus endpoint v1' }),
    card('SemVer', 'Pesan commit menentukan versi', 'fix menaikkan patch, dari 1.2.3 ke 1.2.4. feat menaikkan minor ke 1.3.0. Breaking change menaikkan major ke 2.0.0.'),
    card('Bonus', 'Changelog yang menulis dirinya sendiri', 'Karena setiap pesan diawali type, alat seperti git-cliff atau release-please bisa mengelompokkan fitur dan perbaikan ke CHANGELOG.md.')
  ],

  'berhenti-debat-gaya-kode': [
    card('tutorial', 'Review-mu habis untuk urusan spasi?', 'Kalau komentar PR didominasi soal kutip dan titik koma, waktu reviewer terbuang untuk hal yang bisa diselesaikan mesin dalam sedetik.'),
    card('Formatter', 'Formatter: soal tampilan', 'Ketik sesukamu. Saat disimpan, file dirapikan ke satu gaya.', { code: 'npx prettier --write .' }),
    card('Linter', 'Linter: soal potensi bug', 'Variabel tak terpakai, import yang hilang, == yang seharusnya ===. Temuan seperti ini yang layak dibahas.'),
    card('Aturan', 'Aturan terbaik: yang tidak dibahas', 'Pilih konfigurasi, commit, selesai. Konsistensi lebih berharga daripada gaya siapa yang menang.'),
    card('Otomatis', 'Biarkan berjalan sendiri', 'Tiga lapis, supaya tidak bergantung pada ingatan.', { bullets: ['Format on save di editor', 'Pre-commit hook untuk file yang di-stage', 'prettier --check dan eslint di CI'] }),
    card('Proyek lama', 'Satu commit besar, lalu tenang', 'Format seluruh repo dalam satu commit khusus. Masukkan hash-nya ke .git-blame-ignore-revs supaya git blame tidak menunjuk ke commit itu.')
  ],

  'readme-yang-dibaca': [
    card('tutorial', 'README adalah halaman depan', 'Orang membukanya untuk satu keputusan: coba sekarang atau tutup tab. Tulis untuk keputusan itu, bukan untuk arsip.'),
    card('Pembuka', 'Satu kalimat: apa dan untuk siapa', 'Bukan "aplikasi yang dibuat dengan Flutter", tapi "catat pengeluaran dari notifikasi bank, tanpa internet". Fungsi dulu, teknologi belakangan.'),
    card('Visual', 'Tunjukkan, jangan cuma ceritakan', 'Satu screenshot atau GIF pendek tepat di bawah judul. Pembaca langsung tahu seperti apa hasilnya.'),
    card('Mulai cepat', 'Perintah yang bisa langsung ditempel', 'Prasyarat, lalu perintah yang jalan dari folder kosong.', { code: 'git clone <url-repo>\ncd nama-proyek\nbun install\nbun run dev' }),
    card('Urutan', 'Pengguna di atas, kontributor di bawah', 'Ikuti urutan pertanyaan pembaca.', { bullets: ['Apa ini, screenshot, mulai cepat', 'Contoh pemakaian dan konfigurasi', 'Pengembangan lokal, kontribusi, lisensi'] }),
    card('Rawat', 'README basi lebih buruk dari kosong', 'Perintah yang sudah tidak jalan membuat orang menyerah di menit pertama. Uji ulang bagian mulai cepat setiap ada rilis besar.')
  ]
};

/* ───────────────────────── notes ───────────────────────── */

export const noteBodies: Record<string, Full> = {
  'di-laptop-jalan-bukan-alasan': {
    lead: 'Docker bukan cuma soal server. Docker soal menghapus satu kalimat dari rapat tim.',
    sections: [
      { id: 'kalimat-itu', title: 'Kalimat yang pernah didengar semua tim', body: p(
        'Bug muncul di server, tapi tidak bisa direproduksi di laptop. Penyebabnya sering bukan kodenya: versi runtime berbeda, library sistem berbeda, env var lupa di-set, atau ada file yang hanya ada di satu laptop.',
        'Misalnya, laptop programmer memakai Node 22 sementara server masih Node 18. Satu fungsi bawaan yang baru tersedia di versi terbaru berjalan mulus di laptop dan gagal di server. Kodenya identik, lingkungannya tidak.'
      ) },
      { id: 'apa-yang-dibungkus', title: 'Apa yang sebenarnya dibungkus', body: p(
        `Image Docker membungkus seluruh sistem file yang dibutuhkan aplikasi: OS minimal, runtime dengan versi tertentu, dependency, dan kodenya. Yang berjalan di laptop, CI, dan server adalah ${b('image yang sama')}, bukan sekadar kode yang sama.`,
        'Container bukan virtual machine. Container berbagi kernel dengan host, sehingga bisa menyala dalam hitungan detik. Di macOS dan Windows, Docker Desktop menjalankan VM Linux kecil di belakang layar supaya container Linux tetap bisa jalan.'
      ) },
      { id: 'dockerfile-dokumentasi', title: 'Dockerfile adalah dokumentasi yang bisa dijalankan', body:
        p('README yang berkata "pasang Bun versi sekian, lalu jalankan ini" bisa basi tanpa ada yang sadar. Dockerfile tidak bisa basi diam-diam: kalau salah, build-nya gagal.') +
        pre(`FROM oven/bun:1
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
COPY . .
CMD ["bun", "run", "index.ts"]`) +
        p(`Urutannya disengaja. ${c('package.json')} dan lockfile di-copy lebih dulu, sehingga layer dependency hanya di-build ulang saat dependency berubah, bukan setiap kali satu baris kode diedit.`) },
      { id: 'yang-tidak-diselesaikan', title: 'Yang tidak diselesaikan Docker', body: ul(
        `${b('Konfigurasi dan rahasia.')} Jangan masukkan API key ke image. Kirim lewat env var saat ${c('docker run')}.`,
        `${b('Data.')} Isi container hilang saat container dihapus. Simpan data di volume, misalnya ${c('-v data:/app/data')}.`,
        `${b('Ukuran image.')} Tanpa ${c('.dockerignore')}, folder ${c('node_modules')} dan ${c('.git')} ikut terbawa.`,
        `${b('Bug di kode.')} Docker membuat bug bisa direproduksi, bukan menghilangkannya.`
      ) },
      { id: 'mulai-kecil', title: 'Mulai dari satu layanan', body:
        p('Kamu tidak perlu langsung men-dockerize seluruh sistem. Langkah pertama yang paling terasa manfaatnya sering kali justru database untuk development:') +
        pre('docker run -d --name db -p 5432:5432 \\\n  -e POSTGRES_PASSWORD=rahasia postgres:16') +
        p('Satu perintah, dan setiap anggota tim punya PostgreSQL versi yang sama tanpa instalasi manual. Dari situ, membungkus aplikasinya sendiri tinggal selangkah lagi.') }
    ]
  },

  'sql-lebih-tua-dari-bahasamu': {
    lead: 'Framework punya umur. SQL sudah melewati beberapa generasi framework dan masih berdiri di tempat yang sama.',
    sections: [
      { id: 'asal-usul', title: 'Dari paper ke bahasa sehari-hari', body: p(
        'Pada 1970, Edgar F. Codd dari IBM menerbitkan model relasional: data disimpan dalam tabel, dan hubungan antar data dinyatakan lewat nilai, bukan lewat pointer. Ide itu kedengarannya sederhana, dan justru karena itu bertahan lama.',
        'Bahasa query yang kemudian dikenal sebagai SQL dikembangkan di IBM pada 1970-an oleh Donald Chamberlin dan Raymond Boyce, lalu menjadi standar ANSI pada 1986. JavaScript, Python, Java, Kotlin, Dart, dan Swift semuanya lahir lebih belakangan.'
      ) },
      { id: 'deklaratif', title: 'Kamu menyebut hasilnya, bukan langkahnya', body:
        p('Di JavaScript, mencari produk murah berarti menulis loop: ambil semua data, periksa satu per satu, kumpulkan hasilnya. Di SQL, kamu cukup menyebut apa yang diinginkan:') +
        pre('SELECT nama, harga FROM produk WHERE harga < 30000;') +
        p(`Bagaimana cara mencarinya diserahkan ke database. Query planner memutuskan apakah memakai index atau membaca seluruh tabel. Karena itu query yang sama bisa tetap cepat ketika datanya tumbuh dari seratus menjadi sejuta baris, asalkan index-nya tepat.`) },
      { id: 'orm', title: 'ORM bukan pengganti, tapi penerjemah', body: p(
        'ORM berguna: kode lebih ringkas, tipe lebih aman, migrasi lebih rapi. Tapi ORM tetap menghasilkan SQL. Begitu ada halaman yang lambat, yang perlu dibaca adalah SQL yang dihasilkannya.',
        `Contoh klasiknya masalah N+1. Kode mengambil 100 pesanan, lalu untuk setiap pesanan memanggil ${c('pesanan.pelanggan')}. Hasilnya 101 query ke database. Programmer yang paham SQL langsung melihat bahwa semuanya bisa diganti satu query dengan ${c('JOIN')}.`
      ) },
      { id: 'cara-latihan', title: 'Cara latihan paling murah', body:
        p(`SQLite tidak butuh server, cukup satu file. Kalau kamu memakai Bun, SQLite sudah tersedia lewat ${c('bun:sqlite')}:`) +
        pre(`import { Database } from "bun:sqlite"

const db = new Database("toko.db")
const murah = db
  .query("SELECT nama, harga FROM produk WHERE harga < ?")
  .all(30000)

console.log(murah)`) +
        p(`Perhatikan tanda ${c('?')}. Nilai dari luar tidak pernah ditempel langsung ke string query, tapi dikirim sebagai parameter. Kebiasaan kecil ini yang menutup pintu SQL injection.`) },
      { id: 'tanya-dulu', title: 'Tulis pertanyaannya dulu, baru query-nya', body: p(
        'Kesalahan umum pemula adalah langsung mengetik SELECT tanpa tahu persis apa yang dicari. Coba balik urutannya: tulis pertanyaan dalam kalimat biasa, misalnya "total belanja tiap pelanggan, urut dari yang terbesar".',
        'Setelah itu terjemahkan per bagian. "Tiap pelanggan" menjadi GROUP BY. "Total belanja" menjadi SUM. "Urut dari yang terbesar" menjadi ORDER BY DESC. Kalimat yang jelas hampir selalu berujung pada query yang jelas.'
      ) }
    ]
  },

  'regex-dibaca-bukan-dihafal': {
    lead: 'Regex jarang sulit ditulis. Yang sulit adalah membaca regex orang lain, dan itu bisa dilatih.',
    sections: [
      { id: 'kenapa-seram', title: 'Kenapa regex terlihat seram', body: p(
        'Regex padat. Tidak ada spasi, tidak ada nama variabel, dan setiap karakter adalah satu instruksi. Mata yang terbiasa membaca kode biasa langsung menyerah melihat deretan garis miring dan kurung.',
        `Padahal idenya sudah tua dan matang. Konsep regular expression berasal dari matematikawan Stephen Kleene pada 1950-an. Ken Thompson kemudian membawanya ke editor teks, dan nama ${c('grep')} sendiri berasal dari perintah ${c('g/re/p')} di editor ed: cari secara global sebuah regex, lalu cetak barisnya.`
      ) },
      { id: 'cara-membaca', title: 'Cara membaca: pecah, lalu terjemahkan', body:
        p('Ambil regex nomor HP Indonesia ini:') +
        pre('/^(\\+62|0)8\\d{8,11}$/') +
        p('Jangan dibaca sekaligus. Pecah dari kiri ke kanan:') +
        ul(
          `${c('^')}: mulai dari awal teks.`,
          `${c('(\\+62|0)')}: diawali "+62" atau "0". Backslash membuat tanda plus menjadi karakter biasa.`,
          `${c('8')}: lalu angka delapan.`,
          `${c('\\d{8,11}')}: lalu 8 sampai 11 digit.`,
          `${c('$')}: dan teks harus berakhir di situ.`
        ) +
        p('Lima potong, lima kalimat pendek. Regex sepanjang apa pun bisa dibaca dengan cara ini.') },
      { id: 'kapan-jangan', title: 'Kapan sebaiknya tidak memakai regex', body: ul(
        `${b('Mem-parsing HTML atau JSON.')} Strukturnya bersarang. Pakai parser yang memang dibuat untuk itu.`,
        `${b('Validasi email secara sempurna.')} Cek bentuk dasarnya saja, lalu kirim email verifikasi. Itu satu-satunya bukti alamatnya benar-benar ada.`,
        `${b('Memastikan tanggal valid.')} Regex bisa mengecek bentuk 2026-11-28, tapi tidak tahu bahwa bulan 13 tidak ada.`,
        `${b('Saat greedy menjebak.')} ${c('<.+>')} pada teks ${c('<b>tebal</b>')} menangkap seluruh teks, bukan hanya ${c('<b>')}. Tambahkan ${c('?')} menjadi ${c('<.+?>')} supaya berhenti di kecocokan terpendek.`
      ) },
      { id: 'tulis-tes', title: 'Regex butuh tes, sama seperti fungsi', body:
        p('Regex adalah kode, dan kode tanpa tes adalah tebakan. Tulis contoh yang harus lolos dan contoh yang harus ditolak:') +
        pre(`import { test, expect } from "bun:test"

const hp = /^(\\+62|0)8\\d{8,11}$/

test("nomor HP", () => {
  for (const ok of ["081234567890", "+6281234567890"])
    expect(hp.test(ok)).toBe(true)
  for (const salah of ["0212345678", "08-1234", ""])
    expect(hp.test(salah)).toBe(false)
})`) +
        p('Contoh yang salah sama pentingnya dengan yang benar. Regex yang menerima segalanya akan lolos semua tes "harus lolos".') },
      { id: 'beri-nama', title: 'Beri nama pada bagiannya', body:
        p(`JavaScript mendukung named group sejak ES2018. Daripada mengingat bahwa ${c('$1')} adalah tahun dan ${c('$2')} adalah bulan, beri nama langsung:`) +
        pre(`const m = "2026-11-28".match(/^(?<tahun>\\d{4})-(?<bulan>\\d{2})/)
console.log(m?.groups?.tahun) // "2026"`) +
        p('Regex yang bisa dibaca rekan setim lebih berharga daripada regex yang paling pendek.') }
    ]
  },

  'ci-rekan-paling-jujur': {
    lead: 'Code review menangkap ide yang keliru. CI menangkap hal yang terlewat. Tim butuh keduanya.',
    sections: [
      { id: 'bukan-malas', title: 'Masalahnya bukan malas, tapi lupa', body: p(
        'Misalnya, Jumat sore ada satu perubahan kecil, "cuma ganti teks". Tes tidak dijalankan karena rasanya tidak perlu. Ternyata teks itu dipakai di sebuah snapshot test, dan Senin pagi main sudah merah tanpa ada yang tahu sebabnya.',
        'Tidak ada yang lalai di sini. Manusia memang melewatkan pemeriksaan ketika merasa yakin dan sedang terburu-buru. CI tidak punya rasa yakin. Ia menjalankan hal yang sama setiap kali.'
      ) },
      { id: 'ide-lama', title: 'Ide lama, alat baru', body: p(
        'Continuous Integration bukan konsep baru. Praktik ini dipopulerkan oleh Extreme Programming di akhir 1990-an, dan Martin Fowler menulis artikel yang banyak dirujuk tentangnya di awal 2000-an. Intinya: gabungkan perubahan sesering mungkin, dan verifikasi setiap penggabungan secara otomatis.',
        'Yang berubah adalah biayanya. Dulu tim harus merawat server build sendiri. Sekarang, satu file YAML di repo sudah cukup untuk mendapatkan mesin bersih di setiap push.'
      ) },
      { id: 'mesin-bersih', title: 'Kenapa mesin bersih itu penting', body: p(
        'Laptopmu menyimpan banyak hal yang tidak ada di repo: dependency yang dipasang global, file konfigurasi lama, cache, env var di profil shell. Tes bisa hijau di laptop justru karena hal-hal itu.',
        `Runner CI dimulai dari nol setiap kali. Lupa meng-commit file? Gagal. Lockfile tidak sinkron dengan ${c('package.json')}? ${c('bun install --frozen-lockfile')} gagal. Kegagalan seperti ini menyebalkan, tapi jauh lebih murah ditemukan di CI daripada di production.`
      ) },
      { id: 'gerbang', title: 'Dari laporan menjadi gerbang', body:
        p('CI yang hanya melapor gampang diabaikan. CI yang menjadi syarat merge tidak bisa diabaikan. Pisahkan pemeriksaan menjadi beberapa job supaya jalan paralel dan penyebab gagalnya langsung terlihat:') +
        pre(`jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bunx tsc --noEmit
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun test`) +
        p(`Lalu aktifkan ${b('required status checks')} di pengaturan branch protection, sehingga PR baru bisa di-merge setelah kedua job hijau.`) },
      { id: 'jaga-cepat', title: 'CI yang lambat akan diakali', body: p(
        'Kalau CI butuh setengah jam, orang mulai mencari jalan pintas: menggabungkan banyak perubahan dalam satu push, atau me-merge sebelum hasilnya keluar. Jaga durasinya tetap pendek dengan cache dependency dan job paralel.',
        'Perhatikan juga tes yang kadang hijau kadang merah tanpa perubahan kode. Tes flaky seperti itu mengajari tim untuk tidak memercayai CI. Perbaiki atau karantina segera, sebelum kepercayaan itu hilang.'
      ) }
    ]
  },

  'satu-build-semua-lingkungan': {
    lead: 'Yang diuji harus sama dengan yang dirilis. Env var adalah cara paling sederhana untuk memastikannya.',
    sections: [
      { id: 'build-berbeda', title: 'Masalah build yang berbeda-beda', body: p(
        'Misalnya, sebuah tim membuat dua build: satu untuk staging dengan URL API staging tertanam di kode, satu lagi untuk production. Semua tes lolos di staging. Lalu build production dirilis, dan sebuah bug muncul karena di build itu ada cabang kode yang tidak pernah berjalan di staging.',
        'Masalahnya bukan pada tesnya. Masalahnya, yang dites dan yang dirilis adalah dua artefak yang berbeda.'
      ) },
      { id: 'twelve-factor', title: 'Apa kata Twelve-Factor', body: p(
        `Metodologi Twelve-Factor App, yang ditulis oleh orang-orang Heroku, merumuskan dua aturan yang relevan. Faktor III: simpan config di environment. Faktor V: pisahkan tahap ${b('build')}, ${b('release')}, dan ${b('run')}.`,
        'Build menghasilkan satu artefak. Release adalah artefak itu ditambah config untuk satu lingkungan. Run adalah menjalankannya. Dengan begitu, artefak yang sama bergerak dari staging ke production, dan yang berubah hanya config-nya.'
      ) },
      { id: 'validasi-saat-start', title: 'Validasi saat start, bukan saat dipakai', body:
        p('Env var yang lupa di-set biasanya baru ketahuan saat kode yang memakainya dipanggil, kadang berjam-jam setelah deploy. Lebih baik aplikasi menolak menyala sejak awal:') +
        pre(`function wajib(nama: string): string {
  const nilai = process.env[nama]
  if (!nilai) throw new Error("Env " + nama + " belum di-set")
  return nilai
}

export const config = {
  dbUrl: wajib("DATABASE_URL"),
  port: Number(process.env.PORT ?? 3000),
}`) +
        p('Deploy yang gagal di menit pertama jauh lebih mudah ditangani daripada error yang muncul saat pengguna sedang checkout.') },
      { id: 'frontend', title: 'Hati-hati dengan frontend', body: p(
        `Di frontend, "env var" sebenarnya ditempel ke dalam file JavaScript saat build. Vite hanya mengekspos variabel berawalan ${c('VITE_')} lewat ${c('import.meta.env')}, dan Next.js memakai awalan ${c('NEXT_PUBLIC_')} untuk variabel yang boleh sampai ke browser.`,
        `Awalan itu sengaja dibuat supaya kamu berpikir dua kali. Apa pun yang sampai ke browser bisa dibaca siapa pun lewat DevTools. Secret key tempatnya di server, ${b('tidak pernah')} di bundle frontend.`
      ) },
      { id: 'terlanjur-bocor', title: 'Kalau rahasia sudah terlanjur di-commit', body: ul(
        `${b('Ganti kuncinya dulu.')} Buat kunci baru di penyedia layanan dan matikan yang lama. Ini langkah yang benar-benar menutup celahnya.`,
        `${b('Baru bersihkan riwayat')} kalau memang perlu, misalnya dengan ${c('git filter-repo')}. Ingat, clone dan fork yang sudah ada tetap menyimpan salinannya.`,
        `${b('Cegah terulang.')} Tambahkan ${c('.env')} ke ${c('.gitignore')}, dan aktifkan secret scanning kalau platform Git-mu menyediakannya.`
      ) }
    ]
  },

  'coba-curl-dulu': {
    lead: 'Bug di perbatasan frontend dan backend sering berubah jadi debat. Satu perintah bisa menggantinya dengan fakta.',
    sections: [
      { id: 'debat', title: 'Debat yang tidak perlu terjadi', body: p(
        'Aplikasi menampilkan "Terjadi kesalahan". Tim frontend yakin API-nya bermasalah. Tim backend yakin endpoint-nya baik-baik saja, karena tesnya hijau. Keduanya benar menurut sudut pandang masing-masing, dan diskusinya bisa berputar selama berjam-jam.',
        'Yang hilang dari diskusi itu adalah bukti. Request seperti apa yang sebenarnya dikirim, dan apa yang sebenarnya dijawab server?'
      ) },
      { id: 'pisahkan-lapisan', title: 'Pisahkan lapisan, sempitkan masalah', body: p(
        'Debugging yang baik adalah mempersempit wilayah pencarian. curl mengirim request langsung ke API, tanpa UI, tanpa state aplikasi, dan tanpa library HTTP di frontend.',
        `Kalau curl dengan header dan body yang sama berhasil, masalahnya ada di sisi aplikasi. Kalau curl juga gagal, masalahnya di server atau jaringan. Satu perintah memotong wilayah pencarian menjadi separuh, dan ${c('-i')} atau ${c('-v')} menunjukkan detail yang selama ini tersembunyi di balik pesan "Terjadi kesalahan".`
      ) },
      { id: 'baca-status', title: 'Status code adalah kalimat pertama', body:
        p('Sebelum membaca body, baca status code-nya. Beberapa yang sering disalahpahami:') +
        ul(
          `${b('401 Unauthorized')} sebenarnya berarti belum terautentikasi: token tidak ada, salah, atau kedaluwarsa.`,
          `${b('403 Forbidden')} berarti server tahu siapa kamu, tapi kamu tidak punya izin.`,
          `${b('404 Not Found')} bisa berarti path salah ketik, bukan berarti datanya terhapus.`,
          `${b('405 Method Not Allowed')} biasanya tanda kamu mengirim GET ke endpoint yang mengharapkan POST.`
        ) },
      { id: 'laporan-bug', title: 'Laporan bug yang bisa diulang', body:
        p(`Di tab Network DevTools, klik kanan sebuah request dan pilih ${b('Copy as cURL')}. Request persis seperti yang dikirim browser kini bisa ditempel di terminal, lengkap dengan header dan body-nya. Laporan bug yang berisi perintah seperti ini jauh lebih cepat ditindaklanjuti:`) +
        pre(`curl -i -X POST https://api.contoh.id/pesanan \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <TOKEN>" \\
  -d '{"produk_id":4,"jumlah":0}'`) +
        p(`Ganti token asli dengan penanda seperti ${c('<TOKEN>')} sebelum dibagikan. Perintah curl yang disalin dari browser membawa semua cookie dan header autentikasimu.`) },
      { id: 'batasnya', title: 'Batasnya: curl bukan browser', body: p(
        'curl tidak menerapkan CORS, tidak menjalankan JavaScript, dan tidak menyimpan cookie kecuali diminta. Karena itu, curl yang berhasil belum tentu berarti browser juga berhasil.',
        'Justru di situ nilainya. Kalau curl berhasil tapi browser gagal, daftar tersangkanya langsung pendek: konfigurasi CORS, cookie yang tidak terkirim, atau header yang ditambahkan aplikasi. Kamu berhenti menebak dan mulai memeriksa.'
      ) }
    ]
  },

  'typescript-tidak-memeriksa-data': {
    lead: 'TypeScript adalah janji antar bagian kodemu. Dunia luar tidak pernah ikut menandatanganinya.',
    sections: [
      { id: 'tipe-dihapus', title: 'Tipe dihapus sebelum kode jalan', body: p(
        `TypeScript bekerja saat kamu menulis dan meng-compile kode. Setelah itu, semua anotasi tipe dihapus. Yang dijalankan browser atau server adalah JavaScript biasa, tanpa satu pun ${c('interface')} atau ${c(': string')} yang tersisa.`,
        'Artinya, TypeScript hanya bisa menjaga data yang lahir di dalam kodemu sendiri. Data yang datang dari request, file, database, atau API lain masuk setelah semua pemeriksaan tipe selesai.'
      ) },
      { id: 'as-adalah-janji', title: 'as adalah janji, bukan pemeriksaan', body:
        p(`Hasil ${c('JSON.parse')} dan ${c('req.json()')} bertipe ${c('any')} atau ${c('unknown')}. Supaya enak dipakai, banyak kode langsung menulis:`) +
        pre(`const user = (await req.json()) as User`) +
        p(`Compiler percaya. Tapi kalau client mengirim ${c('"umur": "20"')} sebagai string, ${c('user.umur + 1')} menghasilkan ${c('"201"')}, bukan 21. Tidak ada error, tidak ada peringatan. Bug-nya baru terasa jauh di hilir, di tempat yang tidak ada hubungannya dengan request tadi.`) },
      { id: 'parse-bukan-validasi', title: 'Parse, jangan sekadar validasi', body:
        p(`Alexis King menulis esai berjudul "Parse, don't validate" pada 2019. Idenya: jangan hanya mengecek data lalu membuang hasil pengecekannya. Ubah data mentah menjadi tipe yang lebih ketat, sehingga sisa program tidak perlu mengecek ulang.`) +
        pre(`const hasil = Daftar.safeParse(await req.json())
if (!hasil.success) return Response.json(hasil.error.issues, { status: 400 })

simpan(hasil.data) // tipe Daftar, sudah terbukti`) +
        p(`Itulah yang dilakukan Zod. ${c('safeParse')} tidak sekadar menjawab ya atau tidak. Ia mengembalikan data yang tipenya sudah dibuktikan saat runtime.`) },
      { id: 'perbatasan', title: 'Pasang di perbatasan, bukan di mana-mana', body: p(
        'Validasi runtime punya biaya: kode tambahan dan sedikit waktu eksekusi. Karena itu, pasang hanya di tempat data masuk dari luar: body dan query request, respons API pihak ketiga, env var saat aplikasi start, isi file atau localStorage.',
        'Setelah melewati perbatasan, percayakan sisanya pada TypeScript. Memvalidasi ulang di setiap fungsi internal hanya menambah kebisingan tanpa menambah keamanan.'
      ) },
      { id: 'bukan-satu-satunya', title: 'Zod bukan satu-satunya', body: p(
        'Ada Valibot yang fokus pada ukuran bundle kecil, ArkType dengan sintaks mirip tipe TypeScript, dan Yup yang lebih dulu populer di dunia form. Pilihannya soal selera dan kebutuhan.',
        'Yang tidak boleh ditawar adalah prinsipnya: data dari luar dianggap tidak dikenal sampai terbukti sebaliknya. Library apa pun yang kamu pilih hanyalah cara untuk menegakkan prinsip itu.'
      ) }
    ]
  },

  'riwayat-git-adalah-dokumentasi': {
    lead: 'Pesan commit dibaca jauh lebih lama daripada waktu menulisnya. Format kecil membayar lunas biaya itu.',
    sections: [
      { id: 'pembacanya', title: 'Siapa yang membaca pesan commit', body: p(
        `Lebih banyak dari yang kamu kira. Reviewer yang membuka PR. Rekan yang menjalankan ${c('git blame')} untuk tahu kenapa sebuah baris ada. Orang yang memakai ${c('git bisect')} untuk mencari kapan bug masuk. Release manager yang menyusun catatan rilis. Dan kamu sendiri, enam bulan dari sekarang, yang sudah lupa semuanya.`,
        'Pesan "fix" atau "update" tidak menolong satu pun dari mereka.'
      ) },
      { id: 'asal-format', title: 'Dari aturan Angular ke spesifikasi terbuka', body: p(
        `Tim Angular punya aturan pesan commit yang ketat supaya changelog bisa dibuat otomatis. Aturan itu kemudian dirumuskan ulang menjadi spesifikasi terbuka bernama ${b('Conventional Commits')}, yang bisa dibaca di conventionalcommits.org.`,
        `Spesifikasinya pendek. Pesan diawali type seperti ${c('feat')} atau ${c('fix')}, boleh diikuti scope dalam kurung, lalu titik dua dan deskripsi. Perubahan yang merusak kompatibilitas ditandai ${c('!')} atau footer ${c('BREAKING CHANGE')}.`
      ) },
      { id: 'apa-dan-kenapa', title: 'Subjek menjawab apa, body menjawab kenapa', body:
        p('Diff sudah menunjukkan bagaimana kode berubah. Yang tidak bisa ditunjukkan diff adalah alasannya. Itu tugas body:') +
        pre(`fix(checkout): tolak kupon setelah tanggal kedaluwarsa

Sebelumnya kupon hanya dicek saat ditambahkan ke keranjang.
Pengguna yang membiarkan keranjang semalaman tetap
mendapat diskon dari kupon yang sudah berakhir.

Refs #214`) +
        p('Pesan seperti ini menjawab pertanyaan yang akan muncul setahun lagi: kenapa ada pengecekan tanggal kedua di checkout?') },
      { id: 'otomatisasi', title: 'Dari pesan ke versi dan changelog', body: p(
        `Begitu setiap pesan punya type, mesin bisa membacanya. ${c('fix')} menaikkan versi patch, ${c('feat')} menaikkan versi minor, dan breaking change menaikkan versi major, sesuai aturan Semantic Versioning.`,
        `Alat seperti git-cliff, release-please, dan semantic-release memanfaatkan ini untuk menyusun ${c('CHANGELOG.md')} dan menentukan nomor versi berikutnya. Catatan rilis yang dulu ditulis manual setiap sprint berubah menjadi hasil samping dari kebiasaan menulis commit.`
      ) },
      { id: 'jangan-birokrasi', title: 'Jangan sampai format jadi birokrasi', body: p(
        'Format yang terlalu ketat membuat orang menulis pesan asal lolos validasi. Itu sama buruknya dengan tidak ada format.',
        `Banyak tim memakai squash merge, sehingga yang masuk ke main hanya satu commit per PR. Dalam pola itu, cukup judul PR yang wajib mengikuti Conventional Commits. Commit kecil selama pengerjaan boleh bebas, karena yang dibaca orang dan mesin hanyalah judul PR yang menjadi pesan commit di main.`
      ) }
    ]
  },

  'gaya-kode-soal-biaya': {
    lead: 'Yang penting bukan gaya mana yang dipilih. Yang penting tidak ada lagi yang perlu memikirkannya.',
    sections: [
      { id: 'biaya-tersembunyi', title: 'Biaya tersembunyi dari debat gaya', body: p(
        'Setiap komentar "tolong pakai kutip tunggal" di code review memakan waktu dua orang: yang menulis komentar dan yang memperbaikinya. Lebih buruk lagi, komentar itu menenggelamkan komentar penting soal logic di antara belasan komentar soal spasi.',
        'Ada juga biaya di diff. Kalau editor tiap orang merapikan file dengan aturan berbeda, satu perubahan kecil bisa muncul sebagai ratusan baris berubah. Reviewer tidak bisa lagi melihat apa yang sebenarnya diubah.'
      ) },
      { id: 'pelajaran-gofmt', title: 'Pelajaran dari gofmt', body: p(
        `Go sejak awal dirilis bersama ${c('gofmt')}, formatter resmi yang hampir tanpa opsi. Salah satu Go Proverbs dari Rob Pike berbunyi: "Gofmt's style is no one's favorite, yet gofmt is everyone's favorite."`,
        'Tidak ada yang mendapatkan gaya favoritnya, dan justru karena itu tidak ada yang perlu berdebat. Prettier mengambil sikap serupa untuk dunia JavaScript dengan sengaja menyediakan sedikit opsi. Keputusan gaya diambil sekali, lalu dilupakan.'
      ) },
      { id: 'dua-alat', title: 'Formatter dan linter adalah dua alat berbeda', body: ul(
        `${b('Formatter')} mengubah tampilan tanpa mengubah perilaku: indentasi, kutip, baris baru. Hasilnya tidak perlu didiskusikan.`,
        `${b('Linter')} mencari pola yang berpotensi bug: variabel tak terpakai, ${c('==')} yang seharusnya ${c('===')}, kode yang tidak pernah tercapai. Temuannya layak dibaca.`,
        `${b('Jangan campur tugasnya.')} Pasang ${c('eslint-config-prettier')} supaya ESLint tidak ikut mengurus gaya yang sudah ditangani Prettier.`
      ) },
      { id: 'proyek-lama', title: 'Memasang di proyek yang sudah besar', body:
        p('Ketakutan terbesar adalah satu commit raksasa yang merusak git blame. Masalah itu sudah ada solusinya:') +
        pre(`npx prettier --write .
git commit -am "style: format seluruh repo dengan prettier"
git rev-parse HEAD >> .git-blame-ignore-revs
git config blame.ignoreRevsFile .git-blame-ignore-revs`) +
        p(`Commit file ${c('.git-blame-ignore-revs')} itu juga. GitHub membacanya otomatis di tampilan blame, sehingga baris-baris kode tetap menunjuk ke commit yang benar-benar mengubah logikanya.`) },
      { id: 'aturan-membayar', title: 'Setiap aturan lint harus membayar sewanya', body: p(
        'Linter yang terlalu cerewet akan diabaikan, atau lebih buruk, dipenuhi komentar disable. Mulai dari konfigurasi recommended, lalu tambahkan aturan hanya ketika ada bug nyata yang bisa dicegahnya.',
        'Kalau sebuah aturan lebih sering di-disable daripada ditaati, itu tanda aturannya tidak cocok untuk timmu. Matikan saja. Tujuannya kode yang lebih aman, bukan skor lint yang sempurna.'
      ) }
    ]
  },

  'readme-halaman-depan': {
    lead: 'README tidak ditulis untuk menjelaskan semua hal. README ditulis supaya orang mau mencoba.',
    sections: [
      { id: 'keputusan-cepat', title: 'Keputusan dalam hitungan detik', body: p(
        'Orang tiba di repo-mu dari hasil pencarian, tautan di forum, atau rekomendasi teman. Mereka membaca judul, kalimat pertama, mungkin melihat satu gambar, lalu memutuskan: lanjut atau tutup tab.',
        'Artinya, bagian atas README melakukan hampir semua pekerjaan. Kalau bagian itu habis untuk badge, daftar isi, dan sejarah proyek, kebanyakan pembaca pergi sebelum sampai ke bagian yang penting.'
      ) },
      { id: 'kalimat-pertama', title: 'Kalimat pertama melakukan kerja paling berat', body:
        p('Pola sederhana yang hampir selalu berhasil: [nama proyek] membantu [siapa] [melakukan apa], [dengan pembeda apa]. Bandingkan dua pembuka ini:') +
        ul(
          '"Catat Uang adalah aplikasi yang dibuat dengan Flutter dan Riverpod."',
          '"Catat Uang mencatat pengeluaranmu otomatis dari notifikasi bank, dan tetap jalan tanpa internet."'
        ) +
        p('Kalimat pertama berbicara tentang teknologi. Kalimat kedua berbicara tentang masalah pembaca. Teknologi tetap boleh disebut, tapi letaknya di bagian bawah.') },
      { id: 'mulai-cepat', title: 'Mulai cepat harus benar-benar cepat', body: p(
        'Bagian mulai cepat punya satu ukuran keberhasilan: orang yang belum pernah melihat proyekmu bisa menjalankannya tanpa bertanya. Sebutkan prasyarat beserta versinya, lalu tulis perintah yang bisa ditempel apa adanya.',
        `Cara mengujinya sederhana. Clone repo ke folder baru, atau minta teman mencobanya, lalu ikuti README kata demi kata. Hampir selalu ada langkah yang terlupa, misalnya env var yang wajib diisi atau perintah migrasi database. Tambahkan juga ${c('.env.example')} supaya tidak ada yang harus menebak.`
      ) },
      { id: 'repo-internal', title: 'README internal juga butuh perhatian', body: p(
        'Repo internal sering punya README paling tipis, padahal pembacanya jelas: anggota tim baru di minggu pertama. README yang baik bisa memangkas hari-hari bertanya ke sana kemari.',
        'Untuk repo internal, tambahkan hal yang tidak dibutuhkan proyek open source: siapa pemilik layanan ini, cara deploy, di mana log dan dashboard-nya, serta layanan lain yang bergantung padanya.'
      ) },
      { id: 'seperti-kode', title: 'Perlakukan README seperti kode', body: p(
        'README basi lebih merugikan daripada README kosong, karena pembaca percaya pada isinya. Setiap PR yang mengubah cara menjalankan proyek seharusnya ikut mengubah README, dan reviewer berhak menolaknya kalau tidak.',
        'Satu kebiasaan kecil yang membantu: setiap kali pertanyaan yang sama muncul dua kali di issue atau chat, jawabannya dipindahkan ke README. Lama-lama README berisi tepat hal-hal yang memang ditanyakan orang.'
      ) }
    ]
  }
};
