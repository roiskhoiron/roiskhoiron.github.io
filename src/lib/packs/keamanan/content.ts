import type { DeckSlide, PostSlide } from '../../data';
import { p, ul, pre, c, b, type Full } from '../../blog-html';

const card = (label: string, title: string, body: string, extra: Partial<PostSlide> = {}): PostSlide =>
  ({ num: '', label, title, body, theme: 'white', ...extra });

// Shared samples (used in more than one format).
const TOTP_CODE = `import { createHmac } from "node:crypto"

function totp(key: Buffer, now = Date.now()) {
  const counter = Math.floor(now / 1000 / 30)
  const msg = Buffer.alloc(8)
  msg.writeBigUInt64BE(BigInt(counter))
  const h = createHmac("sha1", key)
    .update(msg).digest()
  const o = h[h.length - 1] & 0x0f
  const n = h.readUInt32BE(o) & 0x7fffffff
  return String(n % 1_000_000).padStart(6, "0")
}`;

const IAM_POLICY = `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::foto-user/*"
  }]
}`;

export const deckSlides: Record<string, DeckSlide[]> = {
  'owasp-top-10-pemula': [
    { layout: 'cover', subtitle: 'Teori keamanan aplikasi', title: 'OWASP Top 10 untuk Pemula', message: 'Sepuluh kategori risiko yang paling sering ditemukan di aplikasi web. Bukan standar lengkap, tapi titik awal yang tepat.', points: ['Apa sebenarnya isi daftar ini.', 'Kategori yang paling sering dilanggar.'] },
    { layout: 'bullets', subtitle: 'Konteks', title: 'Apa Itu OWASP Top 10', message: 'Dokumen kesadaran (awareness document) dari OWASP, komunitas keamanan aplikasi nonprofit.', points: ['Disusun dari data temuan dan masukan praktisi.', 'Diperbarui setiap beberapa tahun. Cek owasp.org untuk edisi terbaru.', 'Isinya kategori risiko, bukan daftar bug spesifik.', 'Untuk standar pengujian lengkap, OWASP punya ASVS.'] },
    { layout: 'cards', subtitle: 'Edisi 2021', title: 'Empat Kategori yang Sering Muncul', message: 'Tidak ada yang butuh teknik canggih. Semuanya berawal dari asumsi yang tidak diperiksa.', cards: [{ title: 'Broken Access Control', desc: 'User bisa membuka data atau menjalankan aksi milik orang lain.', icon: 'A' }, { title: 'Cryptographic Failures', desc: 'Data sensitif tanpa enkripsi, atau hash yang lemah.', icon: 'C' }, { title: 'Injection', desc: 'Input user ikut dieksekusi sebagai query atau perintah.', icon: 'I' }, { title: 'Security Misconfiguration', desc: 'Mode debug menyala, password bawaan, setelan default.', icon: 'M' }] },
    { layout: 'code', subtitle: 'Posisi pertama di 2021', title: 'Broken Access Control', message: 'Endpoint mengecek login, tapi lupa mengecek kepemilikan data.', code: `// rawan: hanya cek login
const bocor = await db.invoice.findUnique({
  where: { id: req.params.id }
})

// aman: cek pemiliknya juga
const inv = await db.invoice.findFirst({
  where: { id: req.params.id, ownerId: req.user.id }
})
if (!inv) return res.sendStatus(404)`, points: ['Balas 404 supaya keberadaan data orang lain tidak terkonfirmasi.'] },
    { layout: 'split', subtitle: 'Dua kategori lain', title: 'Misconfiguration', leftTitle: 'Injection', leftPoints: ['Input disambung langsung ke query atau perintah.', 'Perbaikan: parameterized query.', 'Sejak edisi 2021, XSS masuk kategori ini.'], rightTitle: 'Konfigurasi Salah', rightPoints: ['Mode debug menyala di production.', 'Akun dan password bawaan tidak diganti.', 'Bucket storage terbuka untuk publik.'] },
    { layout: 'cards', subtitle: 'Sisanya', title: 'Kategori Lain Secara Singkat', message: 'Ditambah Insecure Design dan Software and Data Integrity Failures.', cards: [{ title: 'Komponen usang', desc: 'Library dengan celah yang sudah diketahui publik.', icon: 'V' }, { title: 'Autentikasi lemah', desc: 'Tanpa batas percobaan login, sesi tidak pernah kedaluwarsa.', icon: 'L' }, { title: 'Logging minim', desc: 'Serangan terjadi, tapi tidak ada yang tahu.', icon: 'G' }, { title: 'SSRF', desc: 'Server bisa disuruh mengambil URL internal yang seharusnya tertutup.', icon: 'S' }] },
    { layout: 'bullets', subtitle: 'Praktik', title: 'Cara Memakai Daftar Ini', message: 'Pakai sebagai lensa, bukan formulir yang dicentang.', points: ['Jadikan pertanyaan tetap saat code review.', 'Pilih dua kategori paling relevan dengan aplikasimu.', 'Pasang dependency scanner di CI untuk komponen usang.', 'Lanjutkan ke ASVS saat butuh daftar uji yang lengkap.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Sebagian besar kebocoran bukan hasil serangan canggih.', points: ['Cek kepemilikan data di setiap endpoint.', 'Jangan percaya input apa pun dari klien.', 'Konfigurasi production di-review seperti kode.'] }
  ],

  'simpan-password-benar': [
    { layout: 'cover', subtitle: 'Tutorial keamanan', title: 'Menyimpan Password dengan Benar', message: 'Database bisa bocor di perusahaan mana pun. Yang menentukan seberapa parah dampaknya adalah cara password disimpan.', points: ['Hash, salt, dan cost factor.', 'Contoh dengan Bun dan Node.js.'] },
    { layout: 'bullets', subtitle: 'Aturan dasar', title: 'Jangan Simpan, Jangan Enkripsi', message: 'Password disimpan sebagai hash satu arah.', points: ['Plaintext: sekali bocor, semua akun langsung terbuka.', 'Enkripsi: kalau kuncinya ikut bocor, semua bisa didekripsi.', 'Hash: server hanya bisa mencocokkan, tidak bisa membaca.', 'Kalau fitur lupa password mengirim password lama, sistemnya salah.'] },
    { layout: 'split', subtitle: 'Kenapa bukan MD5', title: 'Hash password', leftTitle: 'Hash Cepat', leftPoints: ['MD5, SHA-1, SHA-256.', 'Dirancang untuk secepat mungkin.', 'GPU bisa menguji miliaran tebakan per detik.'], rightTitle: 'Sengaja Lambat', rightPoints: ['bcrypt, scrypt, Argon2.', 'Punya cost factor yang bisa dinaikkan.', 'scrypt dan Argon2 juga berat di memori.'] },
    { layout: 'bullets', subtitle: 'Salt', title: 'Satu Password, Hash Berbeda', message: 'Salt adalah nilai acak unik per user yang ikut di-hash.', points: ['Dua user dengan password sama menghasilkan hash berbeda.', 'Tabel hash yang dihitung sebelumnya jadi tidak berguna.', 'Salt tidak rahasia, disimpan di samping hash.', 'bcrypt dan Argon2 membuat salt secara otomatis.'] },
    { layout: 'code', subtitle: 'Bun', title: 'Argon2id dengan Bun.password', message: 'Bun.password memakai Argon2id secara default.', code: `// daftar
const hash = await Bun.password.hash(pw)
await db.user.create({ data: { email, hash } })

// login
const ok = await Bun.password.verify(pw, user.hash)
if (!ok) {
  return new Response("Login gagal", { status: 401 })
}`, points: ['String hash sudah memuat algoritma, parameter, dan salt.', 'Pesan error sama untuk email salah maupun password salah.'] },
    { layout: 'code', subtitle: 'Node.js', title: 'bcrypt di Node.js', message: 'Pilih cost factor minimal 10, naikkan sesuai kemampuan server.', code: `import bcrypt from "bcrypt"

const COST = 12
const hash = await bcrypt.hash(password, COST)

const ok = await bcrypt.compare(password, user.hash)`, points: ['bcrypt hanya membaca 72 byte pertama password.', 'Untuk proyek baru, OWASP merekomendasikan Argon2id.'] },
    { layout: 'cards', subtitle: 'Praktik', title: 'Detail yang Sering Terlewat', message: 'Algoritma yang benar baru separuh pekerjaan.', cards: [{ title: 'Ukur cost-nya', desc: 'Lambat bagi penebak, tetap wajar bagi user yang login.', icon: '1' }, { title: 'Rate limit login', desc: 'Hash lambat tidak menghentikan tebakan lewat form login.', icon: '2' }, { title: 'Rehash saat login', desc: 'Saat cost dinaikkan, hash ulang password user ketika mereka login.', icon: '3' }, { title: 'Jangan bikin sendiri', desc: 'Pakai library teruji. Kriptografi buatan sendiri mudah salah.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Tujuannya membuat setiap tebakan menjadi mahal.', points: ['Password disimpan sebagai hash, bukan dienkripsi.', 'Pakai Argon2id atau bcrypt, bukan MD5 atau SHA-1.', 'Salt unik per user, dibuat otomatis oleh library.', 'Cost factor ditinjau ulang seiring hardware makin cepat.'] }
  ],

  'jwt-dibuktikan-dan-tidak': [
    { layout: 'cover', subtitle: 'Teori autentikasi', title: 'JWT: Apa yang Dibuktikan, Apa yang Tidak', message: 'JSON Web Token (RFC 7519) dipakai di mana-mana. Sebagian besar masalahnya datang dari salah paham tentang apa yang dibuktikan token itu.', points: ['Struktur dan tanda tangan.', 'Expiry, penyimpanan, dan "alg".'] },
    { layout: 'code', subtitle: 'Anatomi', title: 'Tiga Bagian, Dipisah Titik', message: 'Header dan payload hanya di-encode base64url, bukan dienkripsi.', code: `// header
{ "alg": "HS256", "typ": "JWT" }

// payload (bisa dibaca siapa saja)
{ "sub": "user_42", "role": "member",
  "exp": 1767225600 }

// signature
HMACSHA256(base64url(header) + "." +
  base64url(payload), secret)`, points: ['Jangan taruh data rahasia di payload.'] },
    { layout: 'split', subtitle: 'Garansi JWT', title: 'Batasnya', leftTitle: 'Membuktikan', leftPoints: ['Isi token tidak diubah sejak ditandatangani.', 'Penandatangannya memegang kunci yang benar.'], rightTitle: 'Tidak Membuktikan', rightPoints: ['Pemegangnya adalah pemilik asli token.', 'User masih aktif dan masih punya role itu.', 'Isinya rahasia.'] },
    { layout: 'code', subtitle: 'Verifikasi', title: 'Kunci Algoritmanya di Server', message: 'Jangan biarkan header token memilih cara ia diverifikasi.', code: `import { jwtVerify } from "jose"

const key = new TextEncoder()
  .encode(process.env.JWT_SECRET)

const { payload } = await jwtVerify(token, key, {
  algorithms: ["HS256"],
  issuer: "api.contoh.id",
  audience: "app-mobile",
})`, points: ['"alg": "none" berarti token tanpa tanda tangan. Tolak.', 'jwtVerify juga menolak token yang exp-nya sudah lewat.'] },
    { layout: 'bullets', subtitle: 'Expiry', title: 'Token Tidak Bisa Ditarik Kembali', message: 'Token yang valid tetap valid sampai exp, meski user sudah logout.', points: ['Access token berumur pendek, hitungan menit.', 'Refresh token disimpan server dan bisa dicabut.', 'Logout paksa butuh daftar token yang diblokir.', 'Butuh pencabutan instan? Sesi server bisa lebih sederhana.'] },
    { layout: 'split', subtitle: 'Penyimpanan di browser', title: 'Alternatifnya', leftTitle: 'localStorage', leftPoints: ['Mudah dipakai.', 'Bisa dibaca script apa pun, termasuk hasil XSS.', 'Tidak terkirim otomatis.'], rightTitle: 'Cookie HttpOnly', rightPoints: ['Tidak bisa dibaca JavaScript.', 'Terkirim otomatis, jadi perlu proteksi CSRF.', 'Pasang atribut Secure dan SameSite.'] },
    { layout: 'cards', subtitle: 'Checklist', title: 'Empat Pertanyaan untuk Setiap JWT', message: 'Jawab sebelum token pertama sampai ke production.', cards: [{ title: 'Algoritma dikunci?', desc: 'Daftar algoritma ditentukan server, bukan header token.', icon: '1' }, { title: 'Exp pendek?', desc: 'Access token berumur menit, bukan bulan.', icon: '2' }, { title: 'Payload bersih?', desc: 'Tidak ada password, NIK, atau data rahasia lain.', icon: '3' }, { title: 'Secret kuat?', desc: 'Kunci HS256 panjang dan acak, bukan kata yang mudah ditebak.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'JWT adalah alat yang bagus, asal tahu batasnya.', points: ['JWT membuktikan integritas, bukan identitas pemegangnya.', 'Selalu tentukan algorithms saat verifikasi.', 'Umur pendek plus refresh token yang bisa dicabut.', 'Pilih penyimpanan dengan sadar risiko XSS dan CSRF.'] }
  ],

  'sql-injection-parameter': [
    { layout: 'cover', subtitle: 'Tutorial keamanan', title: 'SQL Injection dan Parameterized Query', message: 'Masalahnya bukan di SQL, tapi di cara query disusun dari string. Perbaikannya biasanya hanya beberapa karakter.', points: ['Kenapa terjadi.', 'Cara memperbaikinya di beberapa bahasa.'] },
    { layout: 'bullets', subtitle: 'Akar masalah', title: 'Data Berubah Menjadi Perintah', message: 'Database tidak bisa membedakan bagian query yang kamu tulis dan bagian yang diketik user.', points: ['Query disusun dengan menyambung string.', 'Input berisi tanda kutip mengubah struktur query.', 'Akibatnya: data bocor, terhapus, atau login terlewati.', 'Escape manual rapuh dan mudah terlewat.'] },
    { layout: 'code', subtitle: 'Sebelum dan sesudah', title: 'Node.js dengan pg', message: 'Placeholder $1 dikirim terpisah dari nilainya.', code: `// rawan: input ikut menjadi bagian SQL
const q = "SELECT * FROM users WHERE email = '"
  + email + "'"
await pool.query(q)

// aman: query dan nilai dikirim terpisah
await pool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
)`, points: ['Driver mengirim nilai sebagai data, tidak pernah sebagai kode.'] },
    { layout: 'code', subtitle: 'Bahasa lain', title: 'Polanya Sama di Mana-mana', message: 'Bentuk placeholder-nya berbeda, prinsipnya sama.', code: `# Python (psycopg)
cur.execute(
  "SELECT * FROM users WHERE email = %s", (email,))

// Kotlin (Android SQLite)
db.rawQuery(
  "SELECT * FROM users WHERE email = ?",
  arrayOf(email))

// Go (database/sql, driver MySQL)
db.Query("SELECT * FROM users WHERE email = ?", email)`, points: ['PostgreSQL di Go memakai $1, MySQL memakai ?.'] },
    { layout: 'split', subtitle: 'Batas parameter', title: 'Solusinya', leftTitle: 'Bisa Diparameter', leftPoints: ['Nilai di WHERE, INSERT, dan UPDATE.', 'Angka, teks, tanggal.'], rightTitle: 'Pakai Allowlist', rightPoints: ['Nama tabel dan nama kolom.', 'Arah ORDER BY: ASC atau DESC.', 'Cocokkan input dengan daftar yang diizinkan.'] },
    { layout: 'code', subtitle: 'Allowlist', title: 'Kolom Sort yang Aman', message: 'Nama kolom tidak bisa jadi parameter, jadi batasi pilihannya.', code: "const SORTABLE = [\"created_at\", \"price\", \"name\"]\nconst sort = String(req.query.sort)\nconst col = SORTABLE.includes(sort)\n  ? sort\n  : \"created_at\"\nconst dir = req.query.dir === \"asc\" ? \"ASC\" : \"DESC\"\n\nawait pool.query(\n  `SELECT * FROM products ORDER BY ${col} ${dir}`\n)", points: ['Yang masuk ke SQL hanya string dari daftarmu sendiri.'] },
    { layout: 'cards', subtitle: 'Lapisan tambahan', title: 'Pertahanan Berlapis', message: 'Kalau satu tempat terlewat, lapisan berikutnya membatasi kerusakan.', cards: [{ title: 'ORM bukan jaminan', desc: 'Fungsi raw query di ORM tetap bisa rawan.', icon: '1' }, { title: 'Akun database terbatas', desc: 'Akun aplikasi tidak perlu hak DROP TABLE.', icon: '2' }, { title: 'Error tidak dibocorkan', desc: 'Pesan error SQL dicatat di log, tidak dikirim ke klien.', icon: '3' }, { title: 'Static analysis', desc: 'Semgrep atau CodeQL di CI menandai pola rawan.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Perbaikan termurah adalah kebiasaan sejak baris pertama.', points: ['Jangan pernah menyusun SQL dengan menyambung input.', 'Pakai placeholder dari driver atau ORM.', 'Identifier dinamis lewat allowlist.', 'Batasi hak akun database aplikasi.'] }
  ],

  'xss-output-encoding': [
    { layout: 'cover', subtitle: 'Teori keamanan web', title: 'XSS: Masalahnya Ada di Output', message: 'Cross-site scripting terjadi saat data dari user ditampilkan sebagai kode di browser orang lain.', points: ['Tiga jenis XSS.', 'Encoding sesuai konteks dan CSP.'] },
    { layout: 'cards', subtitle: 'Jenis', title: 'Tiga Jenis XSS', message: 'Sumbernya berbeda, akar masalahnya sama.', cards: [{ title: 'Stored', desc: 'Tersimpan di database, tampil ke setiap pengunjung halaman.', icon: 'S' }, { title: 'Reflected', desc: 'Dipantulkan dari parameter URL ke halaman respons.', icon: 'R' }, { title: 'DOM-based', desc: 'Terjadi sepenuhnya di JavaScript sisi klien.', icon: 'D' }, { title: 'Dampaknya', desc: 'Script berjalan dengan hak akses user yang membuka halaman.', icon: '!' }] },
    { layout: 'code', subtitle: 'Sebelum dan sesudah', title: 'innerHTML vs textContent', message: 'Kalau datanya teks, perlakukan sebagai teks.', code: `const comment = await getComment(id)

// rawan: HTML di komentar ikut dirender
el.innerHTML = comment.text

// aman: ditampilkan sebagai teks biasa
el.textContent = comment.text`, points: ['Banyak kasus selesai dengan perubahan sekecil ini.'] },
    { layout: 'bullets', subtitle: 'Konteks', title: 'Encoding Tergantung Tempatnya', message: 'Satu data bisa butuh perlakuan berbeda di tempat berbeda.', points: ['Isi elemen HTML: escape karakter < > & dan tanda kutip.', 'Atribut: escape nilainya dan selalu pakai tanda kutip.', 'URL: encodeURIComponent, dan tolak skema selain http atau https.', 'Di dalam tag script: hindari, kirim datanya lewat JSON.'] },
    { layout: 'split', subtitle: 'Framework', title: 'Pintu darurat', leftTitle: 'Aman secara Default', leftPoints: ['React: teks di JSX di-escape.', 'Vue: interpolasi {{ }} di-escape.', 'Svelte: {value} di-escape.'], rightTitle: 'Tetap Bisa Bocor', rightPoints: ['dangerouslySetInnerHTML di React.', 'v-html di Vue, {@html} di Svelte.', 'href dari input user tanpa cek skema.'] },
    { layout: 'code', subtitle: 'Kalau harus HTML', title: 'Sanitasi dengan DOMPurify', message: 'Untuk konten kaya seperti isi editor artikel, bersihkan HTML-nya dulu.', code: `import DOMPurify from "dompurify"

const clean = DOMPurify.sanitize(post.html)

// React
<div dangerouslySetInnerHTML={{ __html: clean }} />`, points: ['Sanitasi tepat sebelum ditampilkan.', 'Jangan menulis sanitizer sendiri dengan regex.'] },
    { layout: 'bullets', subtitle: 'Lapis kedua', title: 'Content Security Policy', message: 'CSP memberi tahu browser script mana yang boleh berjalan.', points: ['Larang inline script dan sumber yang tidak dikenal.', 'Mulai dengan mode report-only untuk melihat dampaknya.', 'Cookie sesi pakai HttpOnly agar tidak terbaca script.', 'CSP adalah jaring pengaman, bukan pengganti encoding.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Pertanyaannya selalu: data ini tampil di mana?', points: ['Validasi input berguna, tapi encoding output yang menghentikan XSS.', 'Pakai textContent dan template yang auto-escape.', 'Setiap pintu darurat HTML butuh sanitizer.', 'Pasang CSP sebagai lapis kedua.'] }
  ],

  'kelola-secret-env': [
    { layout: 'cover', subtitle: 'Tutorial keamanan', title: 'Secret di Kode: .env, Git, dan Rotasi', message: 'API key, password database, dan token tidak boleh masuk repo. Kalau terlanjur masuk, ada urutan langkah yang benar.', points: ['Simpan, cegah, rotasi.', 'Termasuk jebakan di frontend.'] },
    { layout: 'bullets', subtitle: 'Prinsip', title: 'Konfigurasi di Environment', message: 'Kodenya sama di semua environment, secret-nya berbeda.', points: ['Secret dibaca dari environment variable.', 'Saat development, isinya dari file .env lokal.', 'Di production, dari secret manager atau setelan platform.', 'Repo hanya berisi contoh tanpa nilai asli.'] },
    { layout: 'code', subtitle: 'Langkah 1', title: 'Pisahkan .env dari Repo', message: 'Commit file contoh, abaikan file aslinya.', code: `# .gitignore
.env
.env.*
!.env.example

# .env.example (ikut di-commit)
DATABASE_URL=
PAYMENT_SECRET_KEY=`, points: ['Buat .gitignore sebelum commit pertama.'] },
    { layout: 'code', subtitle: 'Langkah 2', title: 'Gagal Cepat Kalau Secret Kosong', message: 'Validasi saat aplikasi start, bukan saat request pertama.', code: `function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error("Env " + name + " belum diisi")
  }
  return value
}

export const config = {
  databaseUrl: requireEnv("DATABASE_URL"),
  paymentKey: requireEnv("PAYMENT_SECRET_KEY"),
}`, points: ['Jangan log nilai secret, cukup namanya.'] },
    { layout: 'split', subtitle: 'Jebakan frontend', title: 'Aturannya', leftTitle: 'Bukan Secret Lagi', leftPoints: ['Variabel VITE_ dan NEXT_PUBLIC_ masuk ke bundle.', 'Siapa pun bisa membacanya di DevTools.', 'Hal yang sama berlaku untuk aplikasi mobile.'], rightTitle: 'Tempat Secret', rightPoints: ['Hanya di server.', 'Frontend memanggil API-mu, server yang memakai kunci.', 'Kunci publik tetap dibatasi domain atau kuota.'] },
    { layout: 'bullets', subtitle: 'Langkah 3', title: 'Cegah Sebelum Push', message: 'Mesin lebih teliti daripada mata yang lelah.', points: ['Pasang secret scanner seperti gitleaks di pre-commit.', 'Aktifkan secret scanning dan push protection di GitHub.', 'Jalankan scanner yang sama di CI.', 'Periksa diff sebelum commit, terutama file konfigurasi.'] },
    { layout: 'cards', subtitle: 'Kalau sudah bocor', title: 'Urutan yang Benar', message: 'Anggap secret yang pernah di-push sudah diketahui orang lain.', cards: [{ title: 'Rotasi dulu', desc: 'Buat kunci baru, cabut kunci lama. Ini langkah paling mendesak.', icon: '1' }, { title: 'Cek pemakaian', desc: 'Periksa log pemakaian kunci lama sejak waktu bocor.', icon: '2' }, { title: 'Bersihkan riwayat', desc: 'Pakai git filter-repo, lalu koordinasikan dengan tim.', icon: '3' }, { title: 'Cari penyebab', desc: 'Tambah scanner atau aturan supaya tidak terulang.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Secret yang aman adalah secret yang tidak pernah menyentuh repo.', points: ['Secret di environment, contoh di repo.', 'Yang dikirim ke browser atau ponsel bukan secret.', 'Scanner di pre-commit dan CI.', 'Bocor berarti rotasi, bukan sekadar hapus commit.'] }
  ],

  'cara-kerja-totp': [
    { layout: 'cover', subtitle: 'Teori kriptografi praktis', title: 'Cara Kerja Kode 2FA Enam Digit', message: 'TOTP (RFC 6238) menghasilkan kode yang berganti setiap 30 detik tanpa koneksi internet. Mekanismenya muat dalam sepuluh baris kode.', points: ['Secret bersama ditambah waktu.', 'HMAC dan dynamic truncation.'] },
    { layout: 'bullets', subtitle: 'Pendaftaran', title: 'Semuanya Dimulai dari QR Code', message: 'QR yang kamu pindai berisi secret acak milik akunmu.', points: ['Server membuat secret acak dan menyimpannya.', 'Secret dikirim ke aplikasi lewat QR berisi URI otpauth://.', 'Sejak itu, server dan ponsel memegang secret yang sama.', 'Itu satu-satunya saat secret berpindah tempat.'] },
    { layout: 'cards', subtitle: 'Langkah per langkah', title: 'Dari Waktu ke Enam Digit', message: 'Server dan ponsel menjalankan langkah yang persis sama.', cards: [{ title: 'Hitung counter', desc: 'Unix time dalam detik dibagi 30, dibulatkan ke bawah.', icon: '1' }, { title: 'HMAC', desc: 'HMAC-SHA1 dari counter, dengan secret sebagai kunci.', icon: '2' }, { title: 'Truncation', desc: 'Ambil 4 byte dari posisi yang ditentukan byte terakhir.', icon: '3' }, { title: 'Modulo', desc: 'Hasilnya dimodulo 1.000.000 menjadi enam digit.', icon: '4' }] },
    { layout: 'code', subtitle: 'Implementasi', title: 'TOTP dalam Sepuluh Baris', message: 'Ilustrasi dengan modul crypto Node.js. Di production, pakai library yang teruji.', code: TOTP_CODE, points: ['key adalah bytes hasil decode base32 dari QR.', 'Cocok dengan test vector di RFC 6238.'] },
    { layout: 'bullets', subtitle: 'Verifikasi', title: 'Di Sisi Server', message: 'Server menghitung kode yang sama, lalu membandingkan.', points: ['Terima juga satu periode sebelum dan sesudahnya, untuk jam yang meleset.', 'Bandingkan dengan fungsi constant-time.', 'Tolak kode dari periode yang sudah pernah dipakai.', 'Batasi percobaan: enam digit hanya sejuta kemungkinan.'] },
    { layout: 'split', subtitle: 'Perbandingan', title: 'Aplikasi TOTP', leftTitle: 'OTP via SMS', leftPoints: ['Bergantung pada operator seluler.', 'Rawan SIM swap.', 'Kode dikirim lewat jaringan.'], rightTitle: 'Dihitung Lokal', rightPoints: ['Kode dibuat di perangkat.', 'Tidak butuh sinyal atau internet.', 'Secret harus dijaga di server dan di ponsel.'] },
    { layout: 'bullets', subtitle: 'Batasan', title: 'Yang Tidak Dicegah TOTP', message: 'Jauh lebih baik dari password saja, tapi bukan tanpa celah.', points: ['Situs phishing bisa meminta kode lalu langsung memakainya.', 'Kalau secret di server bocor, kode bisa dihitung ulang.', 'Passkey (WebAuthn) terikat ke domain, jadi tahan phishing.', 'Sediakan recovery code untuk user yang kehilangan ponsel.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Enam digit itu hasil hitungan, bukan pesan dari server.', points: ['TOTP = HMAC(secret, waktu / 30), dipotong jadi enam digit.', 'Tidak butuh internet karena kedua pihak punya jam.', 'Server wajib membatasi percobaan dan mencegah replay.', 'Untuk tahan phishing, pertimbangkan passkey.'] }
  ],

  'apk-bukan-brankas': [
    { layout: 'cover', subtitle: 'Teori keamanan mobile', title: 'APK Bukan Brankas', message: 'APK dan IPA adalah paket yang kamu serahkan ke perangkat orang lain. Isinya bisa dibaca dengan alat yang tersedia bebas.', points: ['Kenapa secret di aplikasi tidak rahasia.', 'Certificate pinning dan trade-off-nya.'] },
    { layout: 'bullets', subtitle: 'Fakta', title: 'Aplikasi Bisa Dibongkar', message: 'Decompiler dan alat analisis tersedia bebas dan dipakai luas.', points: ['String di kode atau resource bisa diekstrak.', 'R8 atau ProGuard memperlambat analisis, tidak mencegahnya.', 'Kunci yang dirakit saat runtime tetap terlihat saat dipakai.', 'Asumsikan pemilik perangkat bisa melihat semuanya.'] },
    { layout: 'code', subtitle: 'Sebelum dan sesudah', title: 'Pindahkan Kunci ke Server', message: 'Aplikasi memanggil backend-mu, backend yang memegang kunci.', code: `// rawan: kunci ikut terpaket di APK
const val PAYMENT_KEY = "sk_live_xxxxxxxx"

// aman: app memanggil backend milikmu
suspend fun pay(orderId: String) =
  client.post("https://api.contoh.id/payments") {
    bearerAuth(session.accessToken)
    setBody(PayRequest(orderId))
  }`, points: ['Yang dibawa aplikasi hanya token user berumur pendek.'] },
    { layout: 'split', subtitle: 'Bukan secret', title: 'Jangan di aplikasi', leftTitle: 'Boleh di Aplikasi', leftPoints: ['Konfigurasi Firebase, dijaga Security Rules.', 'API key Maps yang dibatasi package dan sertifikat.', 'Kunci yang memang dirancang untuk klien.'], rightTitle: 'Tinggal di Server', rightPoints: ['Secret key payment gateway.', 'Kredensial database atau service account.', 'Token admin layanan pihak ketiga.'] },
    { layout: 'bullets', subtitle: 'Data user', title: 'Keystore dan Keychain', message: 'Untuk token milik user, pakai penyimpanan aman bawaan platform.', points: ['Android: kunci enkripsi di Android Keystore.', 'iOS: Keychain.', 'Flutter: flutter_secure_storage membungkus keduanya.', 'Melindungi dari aplikasi lain, bukan dari pemilik perangkat yang di-root.'] },
    { layout: 'code', subtitle: 'Certificate pinning', title: 'Pinning dengan OkHttp', message: 'Aplikasi hanya percaya pada kunci publik server yang kamu tentukan.', code: `val pinner = CertificatePinner.Builder()
  // pin utama dan pin cadangan
  .add("api.contoh.id", "sha256/AAAA...=")
  .add("api.contoh.id", "sha256/BBBB...=")
  .build()

val client = OkHttpClient.Builder()
  .certificatePinner(pinner)
  .build()`, points: ['Pin kunci publik, dan selalu sertakan pin cadangan.'] },
    { layout: 'split', subtitle: 'Trade-off pinning', title: 'Risikonya', leftTitle: 'Yang Didapat', leftPoints: ['Tahan terhadap CA palsu atau yang disusupi.', 'User lebih terlindungi di jaringan publik.'], rightTitle: 'Yang Dipertaruhkan', rightPoints: ['Kunci server berganti, aplikasi lama tidak bisa konek.', 'Butuh rencana rotasi dan pin cadangan.', 'Tidak menghentikan pemilik perangkat yang di-root.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Desain dengan asumsi aplikasimu terbaca seluruhnya.', points: ['Yang dikirim ke perangkat user bukan secret.', 'Kunci berharga tinggal di server.', 'Token user disimpan di Keystore atau Keychain.', 'Pinning melindungi user, bukan API-mu dari pemilik perangkat.'] }
  ],

  'least-privilege-praktik': [
    { layout: 'cover', subtitle: 'Tutorial keamanan', title: 'Least Privilege: Akses Secukupnya', message: 'Prinsip dari Saltzer dan Schroeder (1975): setiap program dan user hanya mendapat hak yang ia butuhkan untuk tugasnya.', points: ['Database, cloud IAM, API key.', 'Contoh konkret per lapisan.'] },
    { layout: 'bullets', subtitle: 'Kenapa', title: 'Membatasi Radius Ledakan', message: 'Least privilege tidak mencegah bug. Ia membatasi kerusakan saat bug terjadi.', points: ['SQL injection di akun read-only tidak bisa menghapus data.', 'Key bocor dengan scope sempit kerugiannya kecil.', 'Salah ketik manusia ikut dibatasi.', 'Audit lebih mudah: siapa bisa apa terlihat jelas.'] },
    { layout: 'code', subtitle: 'Database', title: 'Pisahkan Akun Aplikasi', message: 'Contoh PostgreSQL: aplikasi yang berjalan tidak perlu mengubah skema.', code: `-- akun aplikasi saat berjalan
CREATE ROLE app_rw LOGIN PASSWORD '...';
GRANT SELECT, INSERT, UPDATE
  ON orders, order_items TO app_rw;

-- akun khusus laporan
CREATE ROLE report_ro LOGIN PASSWORD '...';
GRANT SELECT ON orders TO report_ro;

-- migrasi memakai akun terpisah
-- yang hanya dipakai pipeline CI`, points: ['Tanpa DELETE kalau aplikasi hanya memakai soft delete.'] },
    { layout: 'code', subtitle: 'Cloud IAM', title: 'Policy yang Sempit', message: 'Contoh AWS: service upload hanya boleh baca-tulis satu bucket.', code: IAM_POLICY, points: ['Hindari "Action": "*" dan "Resource": "*".'] },
    { layout: 'split', subtitle: 'API key', title: 'Yang lebih aman', leftTitle: 'Key Serba Bisa', leftPoints: ['Satu key untuk semua service.', 'Bisa baca, tulis, dan hapus.', 'Tidak pernah kedaluwarsa.'], rightTitle: 'Key per Kebutuhan', rightPoints: ['Satu key per service atau integrasi.', 'Scope dan izin seminimal mungkin.', 'Punya masa berlaku dan bisa dicabut.'] },
    { layout: 'cards', subtitle: 'Manusia juga', title: 'Akses untuk Tim', message: 'Prinsip yang sama berlaku untuk akun manusia.', cards: [{ title: 'Admin bukan default', desc: 'Akun harian tanpa hak admin. Naik level hanya saat perlu.', icon: 'A' }, { title: 'Akses sementara', desc: 'Akses production diberikan untuk jangka waktu tertentu.', icon: 'T' }, { title: 'Review berkala', desc: 'Cabut akses orang yang pindah tim atau keluar.', icon: 'R' }, { title: 'Pisah environment', desc: 'Kredensial staging tidak bisa menyentuh production.', icon: 'E' }] },
    { layout: 'bullets', subtitle: 'Mulai dari mana', title: 'Langkah Pertama Minggu Ini', message: 'Tidak perlu sempurna sekaligus.', points: ['Daftar semua kredensial yang dipakai aplikasi.', 'Tandai yang punya hak admin atau wildcard.', 'Ganti satu per satu dengan akun berizin sempit.', 'Catat alasan setiap izin di kode infrastruktur.'] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Kesalahan kecil sebaiknya tetap kecil.', points: ['Tanyakan "butuh apa", bukan "biar gampang".', 'Satu kredensial, satu tugas.', 'Izin sempit membatasi dampak bug dan kebocoran.', 'Akses ditinjau ulang secara berkala.'] }
  ],

  'threat-modeling-stride': [
    { layout: 'cover', subtitle: 'Tutorial keamanan', title: 'Threat Modeling untuk Tim Kecil', message: 'Threat modeling adalah memikirkan apa yang bisa salah sebelum kodenya ditulis. STRIDE membuat diskusinya tidak hanya bergantung pada intuisi.', points: ['Empat pertanyaan dasar.', 'STRIDE sebagai checklist.'] },
    { layout: 'bullets', subtitle: 'Kerangka', title: 'Empat Pertanyaan', message: 'Dirumuskan oleh Adam Shostack dan dipakai luas di komunitas keamanan.', points: ['Apa yang sedang kita bangun?', 'Apa yang bisa salah?', 'Apa yang akan kita lakukan terhadapnya?', 'Apakah kita sudah melakukannya dengan cukup baik?'] },
    { layout: 'bullets', subtitle: 'Langkah 1', title: 'Gambar Aliran Datanya', message: 'Cukup kotak dan panah di papan tulis.', points: ['Aktor: user, admin, sistem lain.', 'Proses: aplikasi, API, worker.', 'Penyimpanan: database, bucket, cache.', 'Trust boundary: tempat data melewati batas kepercayaan.'] },
    { layout: 'bullets', subtitle: 'STRIDE (1/2)', title: 'Spoofing, Tampering, Repudiation', message: 'Dikembangkan di Microsoft pada akhir 1990-an. Satu huruf, satu jenis ancaman.', points: ['Spoofing: bisakah seseorang menyamar jadi orang lain? Lawannya autentikasi.', 'Tampering: bisakah data diubah di jalan atau di penyimpanan? Lawannya integritas.', 'Repudiation: bisakah seseorang menyangkal perbuatannya? Lawannya audit log.'] },
    { layout: 'bullets', subtitle: 'STRIDE (2/2)', title: 'Disclosure, DoS, Elevation', message: 'Tiga huruf berikutnya melengkapi daftarnya.', points: ['Information disclosure: bisakah data terbaca yang tidak berhak? Lawannya kerahasiaan.', 'Denial of service: bisakah layanan dibuat lumpuh? Lawannya ketersediaan.', 'Elevation of privilege: bisakah user biasa dapat hak admin? Lawannya otorisasi.'] },
    { layout: 'split', subtitle: 'Contoh', title: 'Temuan STRIDE', leftTitle: 'Fitur Upload Avatar', leftPoints: ['User mengirim file ke API.', 'API menyimpannya ke bucket storage.', 'Dua trust boundary: internet ke API, API ke bucket.'], rightTitle: 'Yang Ditemukan', rightPoints: ['T: tipe file palsu. Cek tipe dan isi di server.', 'I: URL foto bisa ditebak. Pakai nama acak.', 'D: file raksasa. Batasi ukuran upload.'] },
    { layout: 'cards', subtitle: 'Ritme', title: 'Supaya Jalan di Tim Kecil', message: 'Kebiasaan ringan lebih berguna daripada dokumen tebal.', cards: [{ title: 'Satu jam', desc: 'Batasi sesi, fokus pada satu fitur atau perubahan besar.', icon: '1' }, { title: 'Saat desain', desc: 'Lakukan sebelum coding, saat perubahan masih murah.', icon: '2' }, { title: 'Tulis di tiket', desc: 'Setiap ancaman jadi tugas atau keputusan yang tercatat.', icon: '3' }, { title: 'Ulangi', desc: 'Perbarui model saat arsitektur berubah.', icon: '4' }] },
    { layout: 'bullets', subtitle: 'Penutup', title: 'Takeaways', message: 'Pertanyaan yang tepat di waktu yang tepat lebih murah daripada patch.', points: ['Threat modeling adalah kebiasaan, bukan dokumen.', 'Mulai dari diagram aliran data dan trust boundary.', 'STRIDE memastikan tidak ada kategori yang terlupa.', 'Hasilnya harus berupa tugas, bukan sekadar catatan.'] }
  ]
};

export const postSlides: Record<string, PostSlide[]> = {
  'login-dicek-data-bocor': [
    card('teori', 'Login Sudah Dicek, Data Tetap Bocor', 'Di OWASP Top 10 edisi 2021, posisi pertama ditempati Broken Access Control. Penyebabnya sering cuma satu pengecekan yang hilang.'),
    card('masalahnya', 'Autentikasi Bukan Otorisasi', 'Autentikasi menjawab "kamu siapa". Otorisasi menjawab "kamu boleh apa". Banyak endpoint hanya menjawab pertanyaan pertama.'),
    card('contoh', 'Ganti Angka di URL', 'User A membuka pesanan miliknya di /orders/1041. Kalau angka di URL diganti dan pesanan orang lain muncul, otorisasinya bolong.', { bullets: ['Namanya IDOR: Insecure Direct Object Reference.', 'Tidak butuh alat khusus untuk menemukannya.'] }),
    card('perbaikan', 'Cek Pemiliknya di Query', 'Jangan ambil data berdasarkan ID saja.', { code: `db.order.findFirst({\n  where: { id, userId: me.id }\n})` }),
    card('juga sering', 'Tiga Kategori Lain', 'Yang juga sering ditemukan di aplikasi sehari-hari:', { bullets: ['Injection: input ikut dieksekusi.', 'Cryptographic Failures: data sensitif tidak terlindungi.', 'Security Misconfiguration: setelan default lupa diganti.'] }),
    card('takeaway', 'Tes dengan Dua Akun', 'Login sebagai user A di aplikasimu sendiri, lalu coba buka data milik user B. Kalau berhasil, kamu baru menemukan kategori nomor satu.')
  ],

  'md5-itu-cepat': [
    card('tutorial', 'MD5 Itu Cepat. Itulah Masalahnya.', 'Hash cepat cocok untuk checksum file. Untuk password, kecepatan justru membantu siapa pun yang ingin menebak.'),
    card('hash cepat', 'Miliaran Tebakan per Detik', 'Dengan GPU, kamus password umum bisa diuji terhadap hash MD5 dalam waktu singkat.', { bullets: ['SHA-1 dan SHA-256 polos punya masalah yang sama.', 'Menambah salt tidak membuatnya lebih lambat.'] }),
    card('salt', 'Salt Bikin Hash Unik', 'Salt acak per user membuat password yang sama menghasilkan hash berbeda. Tapi salt tidak membuat setiap tebakan lebih mahal.'),
    card('solusinya', 'Pakai Hash yang Sengaja Lambat', 'Argon2id atau bcrypt. Salt sudah termasuk.', { code: `const hash =\n  await Bun.password.hash(pw)\n\nawait Bun.password.verify(pw, hash)` }),
    card('detail', 'Tiga Hal Kecil', 'Setelah algoritmanya benar:', { bullets: ['Cost factor dinaikkan berkala.', 'Percobaan login dibatasi.', 'Pesan error sama untuk email dan password salah.'] }),
    card('cek sendiri', 'Tes Sederhana', 'Buka tabel user-mu. Kalau kolom hash diawali $argon2id$ atau $2b$, kamu di jalur yang benar. Kalau berupa 32 karakter hex, itu kemungkinan MD5.')
  ],

  'jwt-bisa-dibaca': [
    card('teori', 'JWT Bisa Dibaca Siapa Saja', 'Bagian tengah token hanya di-encode base64url. Tidak ada enkripsi. Tanda tangan hanya menjaga isinya tidak diubah.'),
    card('buktikan', 'Decode Tanpa Secret', 'Payload token-mu sendiri bisa dibaca dengan dua baris.', { code: `const body = token.split(".")[1]\nBuffer.from(body, "base64url")\n  .toString()` }),
    card('alg none', 'Token Tanpa Tanda Tangan', 'Spesifikasi JWT mengenal "alg": "none". Library yang menerimanya begitu saja bisa ditipu token buatan sendiri.', { bullets: ['Tentukan daftar algoritma di server.', 'Tolak token tanpa tanda tangan.'] }),
    card('expiry', 'Logout Tidak Membatalkan Token', 'Token tetap sah sampai exp. Pakai access token berumur menit dan refresh token yang bisa dicabut server.'),
    card('penyimpanan', 'localStorage atau Cookie?', 'Tidak ada pilihan yang gratis.', { bullets: ['localStorage: bisa terbaca oleh XSS.', 'Cookie HttpOnly: aman dari JS, tapi perlu proteksi CSRF.'] }),
    card('takeaway', 'Integritas, Bukan Identitas', 'JWT membuktikan isinya asli. Siapa pemegangnya, dan apakah ia masih berhak, tetap tugas sistemmu.')
  ],

  'sql-injection-bug-lama': [
    card('tutorial', 'Bug Lama yang Masih Ditulis Ulang', 'SQL injection terjadi saat input user disambung langsung ke query. Perbaikannya sudah tersedia di setiap driver database.'),
    card('penyebab', 'Data Berubah Menjadi Kode', 'Saat query disusun dari string, database tidak tahu mana bagian yang kamu tulis dan mana yang diketik user.'),
    card('perbaikan', 'Pakai Placeholder', 'Query dan nilainya dikirim terpisah.', { code: `// rawan\n"WHERE email = '" + email + "'"\n// aman\npool.query("... WHERE email = $1",\n  [email])` }),
    card('batasnya', 'Nama Kolom Tidak Bisa Diparameter', 'Untuk ORDER BY atau nama tabel dinamis, pakai allowlist.', { bullets: ['Cocokkan input dengan daftar kolom yang diizinkan.', 'Selain itu, pakai nilai default.'] }),
    card('orm', 'ORM Tidak Otomatis Aman', 'Fungsi raw query di ORM mana pun tetap bisa rawan kalau kamu menyambung string atau interpolasi biasa di dalamnya.'),
    card('kebiasaan', 'Cek Saat Code Review', 'Setiap kali melihat penyambungan string di dekat kata SELECT, INSERT, atau UPDATE, berhenti dan periksa asal nilainya.')
  ],

  'xss-filter-input-gagal': [
    card('teori', 'Filter Input Tidak Menghentikan XSS', 'Data yang sama bisa aman di dalam paragraf dan berbahaya di dalam atribut atau URL. Yang menentukan adalah tempat ia ditampilkan.'),
    card('definisi', 'Data yang Dijalankan sebagai Kode', 'XSS terjadi saat teks dari user diperlakukan browser sebagai HTML atau JavaScript, lalu berjalan di sesi user lain.'),
    card('perbaikan', 'Teks Tetap Teks', 'Satu properti yang mengubah segalanya.', { code: `// rawan\nel.innerHTML = name\n\n// aman\nel.textContent = name` }),
    card('framework', 'Framework Membantu, Sampai Di-bypass', 'Framework populer meng-escape teks secara default. Pintu daruratnya punya nama yang jelas:', { bullets: ['React: dangerouslySetInnerHTML', 'Vue: v-html', 'Svelte: {@html}'] }),
    card('konteks', 'Link Juga Bisa Jadi Masalah', 'Kalau href diisi dari input user, pastikan skemanya http atau https. Tolak skema lain seperti javascript:.'),
    card('lapis kedua', 'CSP dan Cookie HttpOnly', 'CSP membatasi script yang boleh berjalan. HttpOnly menjaga cookie sesi dari JavaScript. Keduanya jaring pengaman, bukan pengganti encoding.')
  ],

  'hapus-key-git-belum': [
    card('tutorial', 'Kamu Sudah Hapus Key-nya. Git Belum.', 'Commit "hapus API key" hanya menghapusnya dari versi terbaru. Commit sebelumnya masih menyimpannya, lengkap.'),
    card('faktanya', 'Repo Publik Terus Dipindai', 'Ada bot yang memindai repo publik untuk mencari kredensial. Anggap secret yang sudah di-push telah diketahui orang lain.'),
    card('langkah 1', 'Rotasi, Bukan Hapus', 'Buat kunci baru dan cabut yang lama. Membersihkan riwayat Git adalah langkah berikutnya, bukan pengganti rotasi.'),
    card('pencegahan', 'Pisahkan dari Repo', 'Commit contohnya, abaikan file aslinya.', { code: `# .gitignore\n.env\n.env.*\n!.env.example` }),
    card('jebakan', 'VITE_ Bukan Tempat Secret', 'Variabel dengan prefix publik ikut masuk ke bundle JavaScript.', { bullets: ['VITE_ di Vite, NEXT_PUBLIC_ di Next.js.', 'Siapa pun bisa membacanya dari browser.'] }),
    card('otomatiskan', 'Biarkan Mesin yang Mengawasi', 'Pasang gitleaks di pre-commit dan aktifkan push protection di GitHub. Kelalaian tertahan sebelum sampai ke remote.')
  ],

  'authenticator-tanpa-internet': [
    card('teori', 'Authenticator-mu Bekerja Tanpa Internet', 'Nyalakan mode pesawat, kodenya tetap diterima server. Ponsel dan server tidak saling bicara saat kode dibuat.'),
    card('bahannya', 'Dua Bahan: Secret dan Jam', 'Saat memindai QR, ponsel menyimpan secret yang sama dengan server. Sisanya cukup jam yang kurang lebih sinkron.'),
    card('rumusnya', 'Hitungannya Singkat', 'Counter berganti setiap 30 detik.', { code: `counter = floor(unixTime / 30)\nhash = HMAC-SHA1(secret, counter)\nkode = potong(hash) mod 1000000` }),
    card('server', 'Server Menghitung Hal yang Sama', 'Kalau hasilnya cocok, kode diterima. Server yang baik juga:', { bullets: ['Memberi toleransi satu periode untuk jam yang meleset.', 'Menolak kode yang sudah pernah dipakai.', 'Membatasi jumlah percobaan.'] }),
    card('batasan', 'Bukan Anti-Phishing', 'Situs palsu bisa meminta kode lalu meneruskannya ke situs asli. Passkey terikat ke domain sehingga tahan terhadap cara ini.'),
    card('takeaway', 'Lebih Baik dari SMS', 'Tidak bergantung operator dan tidak rawan SIM swap. Untuk aplikasimu, TOTP adalah langkah 2FA yang murah dan solid.')
  ],

  'api-key-di-apk': [
    card('teori', 'API Key di APK Bukan Rahasia', 'APK dan IPA bisa dibongkar dengan alat yang tersedia bebas. Apa pun yang kamu tanam di dalamnya, anggap sudah terbaca.'),
    card('mitos', 'Obfuscation Bukan Enkripsi', 'R8, ProGuard, atau string yang dipecah-pecah hanya memperlambat. Saat aplikasi berjalan, nilainya tetap muncul di memori.'),
    card('perbaikan', 'Kunci Tinggal di Server', 'Aplikasi memanggil API-mu dengan token user.', { code: `// rawan\nconst val KEY = "sk_live_..."\n\n// aman: server yang pegang kunci\nclient.post(API + "/payments")` }),
    card('boleh', 'Yang Boleh Ada di Aplikasi', 'Kunci yang memang dirancang publik, asal dibatasi:', { bullets: ['Config Firebase, dijaga Security Rules.', 'API key Maps, dibatasi package dan sertifikat.'] }),
    card('pinning', 'Certificate Pinning Punya Harga', 'Pinning menahan serangan lewat CA palsu. Tapi kalau kunci server berganti tanpa pin cadangan, aplikasi lama berhenti terhubung.'),
    card('takeaway', 'Desain dengan Asumsi Terburuk', 'Anggap pemilik perangkat bisa membaca dan mengubah apa pun di aplikasimu. Validasi dan otorisasi tetap di server.')
  ],

  'kenapa-bisa-drop-table': [
    card('tutorial', 'Kenapa Aplikasimu Bisa DROP TABLE?', 'Kalau akun database aplikasimu punya hak penuh, satu bug kecil bisa menghapus seluruh data. Aplikasi jarang benar-benar butuh hak itu.'),
    card('prinsipnya', 'Hak Secukupnya untuk Tugasnya', 'Least privilege: setiap user, service, dan key hanya mendapat izin yang benar-benar dipakai. Tidak lebih.'),
    card('database', 'Pisahkan Akun Aplikasi', 'Aplikasi yang berjalan tidak perlu mengubah skema.', { code: `GRANT SELECT, INSERT, UPDATE\n  ON orders TO app_rw;` }),
    card('cloud', 'Hindari Tanda Bintang', 'Policy dengan "Action": "*" memberi semua izin. Sebutkan hanya aksi dan resource yang benar-benar dibutuhkan.'),
    card('api key', 'Satu Key, Satu Tugas', 'Kalau bocor, kerusakannya terbatas.', { bullets: ['Scope seminimal mungkin.', 'Punya masa berlaku.', 'Satu key per integrasi.'] }),
    card('takeaway', 'Bukan Soal Curiga', 'Least privilege tidak menuduh siapa pun. Ia memastikan kesalahan kecil tetap kecil.')
  ],

  'stride-enam-pertanyaan': [
    card('teori', 'STRIDE: 6 Pertanyaan Sebelum Ngoding', 'Threat modeling sederhananya adalah bertanya "apa yang bisa salah?" secara terstruktur. STRIDE memberi enam arah pertanyaan.'),
    card('S dan T', 'Spoofing dan Tampering', 'Menguji identitas dan integritas.', { bullets: ['S: bisakah seseorang menyamar jadi orang lain?', 'T: bisakah data diubah tanpa ketahuan?'] }),
    card('R dan I', 'Repudiation dan Info Disclosure', 'Menguji jejak audit dan kerahasiaan.', { bullets: ['R: bisakah seseorang menyangkal perbuatannya?', 'I: bisakah data terbaca oleh yang tidak berhak?'] }),
    card('D dan E', 'Denial of Service dan Elevation', 'Menguji ketersediaan dan otorisasi.', { bullets: ['D: bisakah layanan dibuat lumpuh?', 'E: bisakah user biasa mendapat hak admin?'] }),
    card('caranya', 'Mulai dari Satu Diagram', 'Gambar user, API, dan database dengan panah. Tandai tempat data melewati batas kepercayaan, lalu tanyakan enam huruf itu di setiap batas.'),
    card('hasilnya', 'Jadikan Tiket', 'Setiap ancaman berakhir sebagai tugas perbaikan, keputusan menerima risiko dengan alasan tertulis, atau catatan kenapa tidak relevan.'),
    card('takeaway', 'Satu Jam Sebelum Coding', 'Mengubah desain di papan tulis jauh lebih murah daripada menambal fitur yang sudah dipakai user.')
  ]
};

export const noteBodies: Record<string, Full> = {
  'owasp-bukan-checklist': {
    lead: 'Daftar yang paling sering disalahpahami, justru oleh tim yang paling rajin memakainya.',
    sections: [
      { id: 'salah-kaprah', title: 'Salah kaprah yang paling umum', body: p(
        'Skenario yang sering terjadi: menjelang audit, seseorang membuka OWASP Top 10, membuat spreadsheet berisi sepuluh baris, lalu mengisi kolom status dengan "aman". Spreadsheet selesai dalam sehari. Aplikasinya tidak menjadi lebih aman sedikit pun.',
        'Masalahnya bukan di daftarnya. OWASP sendiri menyebut Top 10 sebagai dokumen kesadaran (awareness document), bukan standar. Ia dirancang untuk menjawab "risiko apa yang paling sering ditemukan di aplikasi web", bukan "apa saja yang harus diuji sebelum rilis".'
      ) },
      { id: 'kategori-bukan-bug', title: 'Kategori, bukan daftar bug', body: p(
        'Setiap item di Top 10 adalah kategori yang memayungi banyak kelemahan spesifik. Injection mencakup SQL injection, command injection, dan sejak edisi 2021 juga XSS. Broken Access Control mencakup IDOR, endpoint admin tanpa pengecekan role, sampai konfigurasi CORS yang terlalu longgar.',
        'Karena itu, mencentang "Injection: aman" tidak punya arti. Pertanyaan yang lebih jujur: di mana saja aplikasi ini menyusun perintah dari input user, dan bagaimana setiap tempat itu dilindungi? Jawabannya berupa daftar lokasi di kode, bukan satu centang.'
      ) },
      { id: 'yang-membosankan', title: 'Yang paling sering jebol justru yang membosankan', body: p(
        'Di edisi 2021, Broken Access Control naik ke posisi pertama. Ini bukan kategori yang butuh teknik canggih. Kasus klasiknya: endpoint memeriksa apakah user sudah login, tapi tidak memeriksa apakah data yang diminta memang miliknya.',
        `Hal serupa berlaku untuk ${b('Security Misconfiguration')}: mode debug yang lupa dimatikan, dashboard admin yang terbuka ke internet, bucket storage yang bisa dibaca publik. Tidak ada yang menarik dari bug-bug ini. Justru karena membosankan, mereka lolos dari review.`
      ) },
      { id: 'cara-pakai', title: 'Cara memakainya di tim', body: ul(
        `${b('Sebagai bahan belajar.')} Bahas satu kategori per minggu, lengkap dengan contoh dari kode sendiri.`,
        `${b('Sebagai lensa code review.')} Untuk setiap endpoint baru, tanyakan minimal: siapa yang boleh memanggil ini, dan data siapa yang dikembalikan?`,
        `${b('Sebagai pemicu otomasi.')} Kategori komponen usang paling mudah ditangani dengan dependency scanner di CI.`,
        `${b('Sebagai pintu masuk.')} Untuk daftar pengujian yang benar-benar lengkap, OWASP punya ASVS (Application Security Verification Standard).`
      ) },
      { id: 'kabar-baik', title: 'Kenapa ini kabar baik', body: p(
        'Kalau Top 10 bukan checklist, kamu tidak perlu menunggu audit untuk memakainya. Satu kategori yang dipahami dengan baik dan diterapkan di code review memberi dampak lebih besar daripada sepuluh centang di spreadsheet.',
        'Daftarnya diperbarui setiap beberapa tahun, jadi cek owasp.org untuk edisi terbaru. Urutannya bisa bergeser, tapi polanya cenderung sama: sebagian besar masalah datang dari asumsi yang tidak pernah diperiksa.'
      ) }
    ]
  },

  'md5-plus-salt-tetap-salah': {
    lead: 'Dua masalah berbeda butuh dua solusi berbeda. Salt hanya menjawab salah satunya.',
    sections: [
      { id: 'dua-masalah', title: 'Dua masalah yang sering dicampur', body: p(
        'Saat database berisi hash password bocor, penyerang punya dua strategi. Pertama, mencocokkan hash dengan tabel besar berisi hash jutaan password umum yang sudah dihitung sebelumnya. Kedua, menebak satu per satu: ambil kamus password, hash setiap kata, lalu bandingkan.',
        `Salt menyelesaikan strategi pertama. Karena setiap user punya salt acak sendiri, tabel yang dihitung sebelumnya tidak berguna, dan dua user dengan password ${c('rahasia123')} menghasilkan hash berbeda. Tapi salt tidak menyentuh strategi kedua sama sekali.`
      ) },
      { id: 'kecepatan', title: 'Kecepatan adalah musuhnya', body: p(
        'MD5, SHA-1, dan SHA-256 dirancang untuk cepat. Itu sifat yang bagus untuk memverifikasi file unduhan atau menghitung checksum. Untuk password, sifat yang sama berubah menjadi kelemahan.',
        'Dengan GPU, hash seperti MD5 bisa dihitung miliaran kali per detik. Menguji kamus berisi jutaan password umum, ditambah variasi seperti angka di belakang, menjadi pekerjaan singkat. Salt hanya memaksa proses itu diulang per user, dan setiap pengulangan tetap cepat.',
        'Jadi pertanyaan yang tepat bukan "apakah hash-nya pakai salt", tapi "berapa mahal satu tebakan".'
      ) },
      { id: 'sengaja-lambat', title: 'Algoritma yang sengaja lambat', body: p(
        `Algoritma hashing password seperti ${b('bcrypt')}, ${b('scrypt')}, dan ${b('Argon2')} dibuat dengan tujuan sebaliknya: lambat, dan kelambatannya bisa diatur lewat cost factor. Argon2 memenangkan Password Hashing Competition pada 2015, dan varian Argon2id kini menjadi rekomendasi pertama OWASP. scrypt dan Argon2 juga memakai banyak memori, sehingga lebih sulit dipercepat dengan GPU.`,
        'Bagi server, menunggu puluhan sampai ratusan milidetik saat user login tidak terasa. Bagi penebak yang ingin mencoba jutaan kemungkinan, selisih itu berlipat menjadi waktu yang sangat panjang. Library-nya juga membuat salt otomatis dan menyimpannya di dalam string hash, jadi kamu tidak perlu mengelolanya sendiri.'
      ) },
      { id: 'migrasi', title: 'Migrasi dari hash lama tanpa reset massal', body: p(
        'Kalau sistemmu sudah terlanjur menyimpan MD5 atau SHA-1, tidak perlu memaksa semua user mengganti password. Ada dua langkah yang bisa digabung.',
        'Pertama, bungkus hash lama: hitung Argon2id dari hash MD5 yang sudah ada, simpan hasilnya, lalu hapus MD5 aslinya. Semua akun langsung terlindungi tanpa user melakukan apa pun. Kedua, saat user berhasil login, hash ulang password aslinya langsung dengan Argon2id, lalu tandai akunnya sudah bermigrasi.'
      ) + pre(`// md5() di sini adalah fungsi hash lama milikmu
if (user.hashVersion === 1) {
  const legacy = md5(password)
  if (await Bun.password.verify(legacy, user.hash)) {
    user.hash = await Bun.password.hash(password)
    user.hashVersion = 2
    await save(user)
  }
}`) + p('Setelah akun-akun aktif bermigrasi, hapus jalur kode lama dan pertimbangkan meminta reset password untuk akun yang sudah lama tidak login.') }
    ]
  },

  'jwt-bukan-pengganti-sesi': {
    lead: 'JWT adalah alat yang bagus untuk masalah tertentu. Sayangnya, ia sering dipakai untuk masalah yang lain.',
    sections: [
      { id: 'kenapa-dipilih', title: 'Kenapa JWT dipilih', body: p(
        'Alasan yang paling sering terdengar: JWT itu stateless. Server tidak perlu menyimpan sesi, cukup memverifikasi tanda tangan. Cocok untuk microservice, cocok untuk aplikasi mobile, dan terasa modern.',
        'Lalu kebutuhan nyata mulai datang. User ingin logout dari semua perangkat. Admin perlu memblokir akun yang disalahgunakan. Role user berubah dan harus berlaku sekarang, bukan satu jam lagi. Satu per satu, tim menambahkan state kembali: tabel refresh token, daftar token yang diblokir, pengecekan ke database di setiap request.'
      ) },
      { id: 'apa-yang-dibuktikan', title: 'Apa yang sebenarnya dibuktikan', body: p(
        `JWT yang ditandatangani menjamin satu hal: isinya dibuat oleh pihak yang memegang kunci dan tidak diubah sejak itu. Ia ${b('tidak')} menjamin isinya rahasia, karena header dan payload hanya di-encode base64url. Ia juga tidak menjamin bahwa pemegang token adalah pemilik aslinya, atau bahwa klaim di dalamnya masih benar saat ini.`,
        `Klaim ${c('"role": "admin"')} di dalam token berarti "saat token dibuat, user ini admin". Kalau role-nya dicabut lima menit kemudian, token itu tetap mengatakan hal yang sama sampai kedaluwarsa.`
      ) },
      { id: 'tiga-jebakan', title: 'Tiga jebakan teknis', body: ul(
        `${b('Algoritma dari header.')} Spesifikasi JWT mengenal ${c('"alg": "none"')}, yaitu token tanpa tanda tangan. Beberapa library di masa lalu menerimanya, atau bisa dibuat salah memakai kunci publik RSA sebagai secret HMAC. Perbaikannya sama: server menentukan daftar algoritma yang diterima, bukan token.`,
        `${b('Umur terlalu panjang.')} Token yang berlaku 30 hari berarti token curian juga berlaku 30 hari. Access token sebaiknya berumur menit, ditemani refresh token yang disimpan server dan bisa dicabut.`,
        `${b('Penyimpanan tanpa pertimbangan.')} Di browser, localStorage bisa dibaca oleh script hasil XSS. Cookie HttpOnly tidak, tapi karena terkirim otomatis, ia butuh SameSite dan proteksi CSRF.`
      ) + pre(`const { payload } = await jwtVerify(token, key, {
  algorithms: ["HS256"],
  issuer: "api.contoh.id",
  audience: "app-web",
})`) },
      { id: 'kapan-cocok', title: 'Kapan JWT cocok, kapan tidak', body: p(
        'JWT bersinar saat satu pihak menerbitkan token dan pihak lain perlu memverifikasinya tanpa bertanya balik. Contohnya identity provider yang menerbitkan ID token, atau service internal yang saling memanggil dengan token berumur sangat pendek.',
        'Untuk aplikasi web biasa dengan satu backend, sesi server dengan cookie HttpOnly sering lebih sederhana: logout benar-benar logout, dan mencabut akses cukup dengan menghapus satu baris. Tidak ada yang salah dengan memilih JWT. Yang perlu dihindari adalah memilihnya karena "stateless", lalu diam-diam membangun ulang sesi di atasnya.'
      ) }
    ]
  },

  'sql-injection-terus-ditulis': {
    lead: 'Secara teknis, masalah ini sudah lama terpecahkan. Yang belum adalah kebiasaannya.',
    sections: [
      { id: 'akar-masalah', title: 'Akar masalah dalam satu kalimat', body: p(
        'SQL injection terjadi saat data dari user ikut menjadi bagian dari perintah SQL. Database menerima satu string utuh dan tidak bisa membedakan bagian yang kamu tulis dari bagian yang diketik user. Tanda kutip yang tidak terduga cukup untuk mengubah struktur query.',
        'Parameterized query memisahkan keduanya. Query dikirim dengan placeholder, nilainya dikirim terpisah, dan database tidak pernah menafsirkan nilai itu sebagai kode. Fitur ini tersedia di driver untuk hampir semua bahasa populer.'
      ) + pre(`// rawan
await pool.query(
  "SELECT * FROM users WHERE email = '" + email + "'"
)

// aman
await pool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
)`) },
      { id: 'kenapa-masih-ada', title: 'Kenapa masih terus muncul', body: p(
        'Kalau solusinya sudah ada, kenapa bug ini masih ditemukan di kode baru? Beberapa pola yang sering terlihat:'
      ) + ul(
        `${b('Filter dinamis.')} Halaman pencarian dengan sepuluh filter opsional menggoda orang untuk menyusun klausa WHERE dengan menyambung string.`,
        `${b('Raw query di ORM.')} ORM aman untuk operasi biasa, lalu satu laporan rumit ditulis dengan fungsi raw query dan interpolasi biasa.`,
        `${b('Bagian yang tidak bisa diparameter.')} Nama kolom untuk ORDER BY tidak bisa jadi placeholder, jadi input langsung disisipkan.`,
        `${b('Kode hasil salin.')} Contoh lama dari internet, atau kode dari AI yang tidak di-review, ikut membawa pola rawan.`
      ) },
      { id: 'allowlist', title: 'Untuk nama kolom, pakai allowlist', body: p(
        `Placeholder hanya bekerja untuk nilai. Nama tabel, nama kolom, dan kata kunci seperti ${c('ASC')} atau ${c('DESC')} harus ditulis di dalam query. Solusinya bukan escape, tapi membatasi pilihan: input user hanya dipakai untuk memilih dari daftar yang kamu tulis sendiri.`
      ) + pre(`const SORTABLE = ["created_at", "price", "name"]
const col = SORTABLE.includes(input) ? input : "created_at"
const sql = "SELECT * FROM products ORDER BY " + col`) + p(
        'Ini satu-satunya jenis penyambungan string yang boleh: yang disambung adalah string milikmu sendiri, bukan milik user.'
      ) },
      { id: 'berlapis', title: 'Pertahanan berlapis', body: p(
        'Parameterized query adalah perbaikan utamanya. Lapisan berikutnya membatasi kerusakan kalau ada satu tempat yang terlewat.'
      ) + ul(
        'Akun database aplikasi tidak punya hak DROP, ALTER, atau akses ke tabel yang tidak dipakai.',
        'Pesan error dari database dicatat di log server, tidak dikirim ke klien.',
        'Code review secara khusus mencari penyambungan string atau interpolasi di dekat SELECT, INSERT, UPDATE, dan DELETE.',
        'Static analysis seperti Semgrep atau CodeQL di CI bisa menandai pola rawan secara otomatis.'
      ) }
    ]
  },

  'xss-masalah-konteks': {
    lead: 'Pertanyaan yang tepat bukan "input ini berbahaya atau tidak", tapi "input ini akan tampil di mana".',
    sections: [
      { id: 'filter-gagal', title: 'Kenapa memfilter input tidak cukup', body: p(
        'Respons pertama banyak developer terhadap XSS adalah membuat filter: hapus tag script dari setiap input. Filter seperti ini hampir selalu bisa dilewati, karena HTML punya banyak cara lain untuk menjalankan JavaScript, misalnya lewat atribut event atau URL dengan skema javascript:.',
        `Filter input juga merusak data yang sah. User yang menulis "pakai tag ${c('<b>')} untuk huruf tebal" di forum programming tiba-tiba kehilangan sebagian kalimatnya. Validasi input tetap berguna untuk memastikan format data benar, tapi ia bukan pertahanan utama terhadap XSS.`
      ) },
      { id: 'empat-konteks', title: 'Satu data, empat konteks', body: p(
        'Data yang sama bisa butuh perlakuan berbeda tergantung di mana ia ditampilkan:'
      ) + ul(
        `${b('Isi elemen HTML.')} Karakter ${c('<')}, ${c('>')}, dan ${c('&')} harus di-escape menjadi entity.`,
        `${b('Nilai atribut.')} Selalu pakai tanda kutip, dan escape tanda kutip di dalam nilainya.`,
        `${b('URL di href atau src.')} Escape saja tidak cukup. Pastikan skemanya ${c('http')} atau ${c('https')}.`,
        `${b('Di dalam JavaScript.')} Hindari menyisipkan data ke dalam tag script. Kirim lewat JSON atau atribut data, lalu baca dari kode.`
      ) + p('Karena itu encoding dilakukan di output, tepat di tempat data ditampilkan, oleh kode yang tahu konteksnya.') },
      { id: 'pintu-darurat', title: 'Framework membantu, sampai pintu darurat dibuka', body: p(
        `React, Vue, Svelte, dan Angular meng-escape teks secara default. Menulis ${c('{comment.text}')} di JSX aman. Masalah muncul di pintu darurat yang sengaja disediakan untuk merender HTML mentah: ${c('dangerouslySetInnerHTML')} di React, ${c('v-html')} di Vue, ${c('{@html}')} di Svelte. Di JavaScript polos, padanannya adalah ${c('innerHTML')}.`,
        'Setiap pintu darurat itu layak dicari saat code review. Kalau memang harus merender HTML dari user, misalnya dari editor teks kaya, bersihkan dulu dengan sanitizer yang teruji seperti DOMPurify.'
      ) + pre(`// rawan
el.innerHTML = comment.text

// aman untuk teks biasa
el.textContent = comment.text

// kalau memang harus HTML
el.innerHTML = DOMPurify.sanitize(comment.html)`) },
      { id: 'csp', title: 'CSP sebagai jaring pengaman', body: p(
        'Content Security Policy adalah header yang memberi tahu browser script mana yang boleh berjalan. Kebijakan yang melarang inline script dan membatasi sumber script ke domain tertentu membuat banyak XSS gagal dieksekusi, meski celahnya ada.',
        `CSP paling mudah dipasang sejak awal proyek. Untuk aplikasi lama, mulai dengan header ${c('Content-Security-Policy-Report-Only')} untuk melihat apa yang akan diblokir tanpa merusak halaman. Tambahkan juga atribut HttpOnly pada cookie sesi supaya script tidak bisa membacanya.`,
        'Keduanya lapis kedua. Lapis pertamanya tetap encoding yang benar di setiap output.'
      ) }
    ]
  },

  'api-key-di-riwayat-git': {
    lead: 'Urutan langkah setelah secret bocor lebih penting daripada kecepatan menghapusnya.',
    sections: [
      { id: 'git-mengingat', title: 'Git dirancang untuk mengingat', body: p(
        'Skenarionya umum. Seorang developer menambahkan file konfigurasi berisi API key, commit, push, lalu sadar beberapa menit kemudian. Ia menghapus key dari file, commit lagi dengan pesan "hapus secret", dan merasa urusannya selesai.',
        'Git tidak bekerja seperti itu. Setiap commit adalah snapshot utuh, dan commit lama tetap ada di riwayat. Siapa pun yang punya akses ke repo bisa membuka commit sebelumnya dan membaca key itu. Kalau repo-nya publik, "siapa pun" berarti benar-benar siapa pun, termasuk bot yang memindai repo publik untuk mencari kredensial.'
      ) },
      { id: 'anggap-bocor', title: 'Anggap sudah bocor', body: p(
        'Begitu secret sampai ke remote, kamu tidak bisa membuktikan bahwa tidak ada yang menyalinnya. Clone lokal milik rekan tim, cache CI, fork, dan mirror bisa menyimpan salinan. Menulis ulang riwayat Git tidak menjangkau salinan-salinan itu.',
        `Karena itu, langkah pertama ${b('bukan')} membersihkan riwayat. Langkah pertama adalah membuat secret itu tidak berharga lagi.`
      ) },
      { id: 'urutan-respons', title: 'Urutan respons yang benar', body: ul(
        `${b('Rotasi.')} Buat kunci baru di penyedia layanan, pasang di environment, lalu cabut kunci lama.`,
        `${b('Periksa pemakaian.')} Lihat log atau dashboard penyedia layanan untuk aktivitas tidak wajar sejak kunci itu ter-push.`,
        `${b('Bersihkan riwayat.')} Gunakan ${c('git filter-repo')} untuk menghapus file atau string dari semua commit, lalu koordinasikan force push dengan tim.`,
        `${b('Perbaiki prosesnya.')} Cari tahu kenapa secret bisa sampai ke commit, lalu pasang pencegahan.`
      ) + p('Membersihkan riwayat tetap layak dilakukan supaya scanner tidak terus menandai hal yang sama, tapi ia tidak menggantikan rotasi.') },
      { id: 'mencegah', title: 'Mencegah lebih murah', body: p(
        `Simpan secret di environment variable, isi lewat file ${c('.env')} saat development, dan pastikan ${c('.env')} ada di ${c('.gitignore')} sejak commit pertama. Commit ${c('.env.example')} berisi nama variabel tanpa nilai, supaya anggota tim baru tahu apa yang harus diisi.`,
        'Tambahkan mesin sebagai penjaga. Secret scanner seperti gitleaks bisa dipasang di pre-commit hook dan di CI. GitHub juga menyediakan secret scanning dan push protection yang menolak push berisi pola kredensial yang dikenali.',
        `Ingat juga satu jebakan di frontend: variabel dengan prefix publik seperti ${c('VITE_')} atau ${c('NEXT_PUBLIC_')} ikut masuk ke bundle yang diunduh browser. Itu bukan tempat secret.`
      ) },
      { id: 'rotasi-rutin', title: 'Rotasi sebagai kebiasaan', body: p(
        'Tim yang belum pernah merotasi kunci biasanya kelabakan saat pertama kali harus melakukannya: tidak ada yang ingat di mana saja kunci itu dipakai. Rotasi terjadwal membuat prosesnya terlatih. Secret manager seperti Vault atau layanan bawaan cloud provider membantu dengan versioning dan rotasi otomatis. Saat kebocoran benar-benar terjadi, responsnya jadi rutinitas, bukan improvisasi.'
      ) }
    ]
  },

  'totp-tetap-benar-offline': {
    lead: 'Mekanisme di balik enam digit yang kamu ketik setiap hari, dan apa yang harus dijaga server.',
    sections: [
      { id: 'terasa-ajaib', title: 'Terasa ajaib, padahal sederhana', body: p(
        'Kamu membuka aplikasi authenticator dalam mode pesawat, mengetik enam digit yang muncul, dan server menerimanya. Tidak ada pesan yang dikirim, tidak ada sinkronisasi. Bagaimana dua perangkat bisa sepakat soal angka yang sama?',
        'Jawabannya: keduanya menghitung hal yang sama dari bahan yang sama. Bahan pertama adalah secret yang dibagi sekali saat kamu memindai QR code. Bahan kedua adalah waktu, yang diketahui kedua pihak tanpa perlu saling bertanya.'
      ) },
      { id: 'hotp-ke-totp', title: 'Dari HOTP ke TOTP', body: p(
        'TOTP dibangun di atas HOTP (RFC 4226), yang menghasilkan kode dari secret dan sebuah counter. Kelemahan HOTP adalah counter di kedua sisi harus tetap sinkron. TOTP (RFC 6238) mengganti counter itu dengan waktu: jumlah periode 30 detik sejak Unix epoch.',
        'Server dan ponsel menghitung HMAC-SHA1 dari counter waktu itu dengan secret sebagai kunci. Hasilnya 20 byte. Empat bit terakhir dari byte terakhir menentukan posisi empat byte yang diambil, lalu angkanya dimodulo satu juta untuk menghasilkan enam digit. Proses pemotongan ini disebut dynamic truncation.'
      ) + pre(TOTP_CODE) },
      { id: 'tugas-server', title: 'Yang harus dijaga server', body: p(
        'Menghitung kodenya mudah. Bagian yang sering terlewat ada di sekitarnya:'
      ) + ul(
        `${b('Toleransi waktu.')} Jam ponsel bisa meleset. Server umumnya menerima kode dari satu periode sebelum dan sesudahnya, tidak lebih.`,
        `${b('Perbandingan constant-time.')} Pakai fungsi seperti ${c('timingSafeEqual')}, bukan ${c('===')}.`,
        `${b('Cegah replay.')} Simpan periode terakhir yang berhasil dipakai, lalu tolak kode dari periode yang sama atau lebih lama.`,
        `${b('Batasi percobaan.')} Enam digit hanya berarti satu juta kemungkinan. Tanpa rate limit, menebak menjadi realistis.`,
        `${b('Lindungi secret-nya.')} Server harus bisa membaca secret TOTP untuk menghitung kode, jadi ia tidak bisa di-hash seperti password. Simpan terenkripsi dan batasi aksesnya.`
      ) + p('Untuk production, pakai library TOTP yang teruji daripada menulis sendiri. Kode di atas cukup untuk memahami mekanismenya, dan hasilnya cocok dengan test vector di RFC 6238.') },
      { id: 'batasan', title: 'Batasan yang perlu diakui', body: p(
        'TOTP jauh lebih baik daripada password saja, dan lebih baik daripada OTP lewat SMS yang bergantung pada operator dan rawan SIM swap. Tapi TOTP tidak tahan phishing. Situs palsu bisa meminta password dan kode sekaligus, lalu meneruskannya ke situs asli selama kode masih berlaku.',
        'Passkey berbasis WebAuthn menutup celah itu karena kredensialnya terikat ke domain: browser tidak akan memakainya di situs palsu. Untuk banyak aplikasi, TOTP tetap pilihan 2FA yang murah dan solid. Sediakan juga recovery code, karena ponsel hilang adalah skenario yang cepat atau lambat dialami sebagian user.'
      ) }
    ]
  },

  'mobile-tidak-bisa-menyimpan-rahasia': {
    lead: 'Pertanyaan "di mana menyembunyikan API key" punya jawaban yang tidak enak, tapi justru membebaskan.',
    sections: [
      { id: 'pertanyaan-salah', title: 'Pertanyaan yang salah', body: p(
        'Di forum developer mobile, pertanyaan ini muncul berulang: di mana tempat paling aman menyimpan API key di aplikasi? Jawabannya beragam. Taruh di native code lewat NDK. Pecah string-nya jadi beberapa bagian. Enkripsi, lalu simpan kuncinya di tempat lain. Aktifkan obfuscation.',
        'Semua saran itu menambah waktu yang dibutuhkan untuk menemukan kuncinya. Tidak satu pun membuatnya mustahil. Aplikasi harus memakai kunci itu saat berjalan, dan saat dipakai, kunci itu ada dalam bentuk asli di memori perangkat yang dikendalikan sepenuhnya oleh orang lain.'
      ) },
      { id: 'model-ancaman', title: 'Ubah model ancamannya', body: p(
        'APK dan IPA adalah paket yang kamu serahkan ke perangkat orang lain. Decompiler dan alat analisis tersedia bebas. Di perangkat yang di-root atau di-jailbreak, pemiliknya bisa mengamati memori, mengubah perilaku fungsi, dan membaca lalu lintas jaringan aplikasi.',
        `Asumsi yang lebih jujur: ${b('apa pun yang ada di aplikasi, pemilik perangkat bisa melihatnya')}. Begitu asumsi ini diterima, pertanyaannya berubah dari "di mana menyembunyikan kunci" menjadi "bagaimana mendesain sistem yang tetap aman walau aplikasinya terbaca".`
      ) },
      { id: 'desain', title: 'Desain yang tahan dibaca', body: ul(
        `${b('Kunci berharga tinggal di server.')} Aplikasi memanggil backend-mu, dan backend yang memanggil payment gateway atau layanan berbayar.`,
        `${b('Kredensial per user, bukan per aplikasi.')} User login, mendapat token berumur pendek, dan token itu hanya bisa melakukan apa yang boleh dilakukan user tersebut.`,
        `${b('Kunci publik dibatasi.')} Kunci yang memang dirancang untuk klien, seperti API key Google Maps, dibatasi ke package name dan sidik jari sertifikat aplikasimu, plus kuota.`,
        `${b('Otorisasi di server.')} Jangan percaya flag seperti ${c('isPremium')} yang dikirim aplikasi. Server yang memutuskan.`
      ) + p('Android Keystore dan iOS Keychain tetap berguna, tapi untuk tujuan berbeda: melindungi token milik user dari aplikasi lain dan dari pencurian file. Keduanya tidak dirancang untuk menyembunyikan rahasia dari pemilik perangkat itu sendiri.') },
      { id: 'pinning', title: 'Certificate pinning, tajam di kedua sisi', body: p(
        'Certificate pinning membuat aplikasi hanya mau bicara dengan server yang memiliki kunci publik tertentu. Ini melindungi user dari serangan man-in-the-middle lewat certificate authority yang palsu atau disusupi, misalnya di Wi-Fi publik.',
        'Harganya nyata. Kalau server berganti kunci dan aplikasi tidak punya pin cadangan, semua versi lama aplikasi berhenti terhubung sampai user memperbarui. Karena itu, pin kunci publik, selalu sertakan pin cadangan, dan siapkan rencana rotasi.',
        'Satu hal yang sering disalahpahami: pinning melindungi user dari pihak ketiga di jaringan. Pinning tidak menghentikan pemilik perangkat yang ingin mempelajari API-mu, karena di perangkatnya sendiri pinning bisa dimatikan. Perlindungan API tetap harus ada di server.'
      ) },
      { id: 'daftar-kerja', title: 'Yang tersisa untuk dikerjakan', body: p(
        'Daftar praktisnya pendek. Cari string yang mirip kunci di kode aplikasimu. Pindahkan yang berharga ke backend. Batasi kunci publik yang tersisa. Simpan token user di Keystore atau Keychain. Pertimbangkan attestation seperti Play Integrity API atau App Attest untuk mempersulit penyalahgunaan dari aplikasi tiruan, dengan sadar bahwa itu menambah lapisan, bukan memberi jaminan. Sisanya adalah otorisasi yang ketat di server, tempat kamu benar-benar memegang kendali.'
      ) }
    ]
  },

  'semua-orang-admin': {
    lead: 'Least privilege terdengar birokratis. Dalam praktiknya, ia cara murah membuat kesalahan tetap kecil.',
    sections: [
      { id: 'kenapa-terjadi', title: 'Kenapa semua orang jadi admin', body: p(
        'Di awal proyek, semuanya bergerak cepat. Aplikasi terhubung ke database dengan akun pemilik database karena itu yang pertama dibuat. Service di cloud memakai role dengan izin penuh karena "nanti saja dirapikan". Semua anggota tim punya akses admin ke production karena timnya baru tiga orang.',
        'Tidak ada yang salah dengan keputusan itu saat dibuat. Masalahnya, "nanti" jarang datang. Proyek tumbuh, tim bertambah, dan akses penuh yang tadinya sementara berubah menjadi konfigurasi permanen yang tidak ada yang berani menyentuh.'
      ) },
      { id: 'radius-ledakan', title: 'Radius ledakan', body: p(
        'Prinsip least privilege dirumuskan oleh Saltzer dan Schroeder pada 1975: setiap program dan setiap user sebaiknya beroperasi dengan hak sekecil mungkin yang cukup untuk tugasnya. Prinsip ini tidak mencegah bug. Ia membatasi apa yang bisa dilakukan sebuah bug.',
        'Bandingkan dua skenario dengan celah SQL injection yang sama. Di skenario pertama, aplikasi memakai akun pemilik database, jadi celah itu bisa membaca semua tabel dan menghapusnya. Di skenario kedua, akun aplikasi hanya bisa SELECT, INSERT, dan UPDATE pada tabel yang ia pakai. Celahnya tetap serius, tapi kerusakannya jauh lebih terbatas. Logika yang sama berlaku untuk API key yang bocor, laptop yang hilang, atau perintah yang dijalankan di terminal yang salah.'
      ) },
      { id: 'tiga-lapisan', title: 'Tiga tempat untuk memulai', body: ul(
        `${b('Database.')} Pisahkan akun aplikasi, akun migrasi, dan akun laporan read-only. Akun aplikasi tidak perlu hak mengubah skema.`,
        `${b('Cloud IAM.')} Ganti policy berisi ${c('"Action": "*"')} dengan daftar aksi yang benar-benar dipanggil, pada resource yang spesifik. Cloud provider besar punya alat untuk melihat izin mana yang tidak pernah dipakai.`,
        `${b('API key dan token.')} Satu key per integrasi, dengan scope seminimal mungkin dan masa berlaku. Kalau penyedia layanan mendukung restricted key, pakai itu.`
      ) + pre(IAM_POLICY) },
      { id: 'friksi', title: 'Supaya tidak menyiksa tim', body: p(
        'Least privilege gagal kalau setiap permintaan akses butuh tiga hari. Tim akhirnya mencari jalan pintas, dan jalan pintas itu biasanya berupa satu akun admin yang dipakai bersama.',
        'Beberapa cara menjaga friksi tetap rendah: definisikan izin di kode infrastruktur supaya perubahan bisa di-review seperti kode lain; sediakan akses production sementara yang bisa diminta dan otomatis kedaluwarsa; pisahkan kredensial staging dan production supaya eksperimen tidak pernah menyentuh data asli. Lalu tinjau akses secara berkala, terutama saat ada yang pindah tim atau keluar.',
        'Least privilege bukan soal tidak percaya pada rekan kerja. Ia memastikan salah ketik tetap menjadi salah ketik, bukan insiden.'
      ) }
    ]
  },

  'threat-modeling-tim-kecil': {
    lead: 'Satu jam diskusi, satu diagram, dan enam huruf. Tidak perlu lebih dari itu untuk mulai.',
    sections: [
      { id: 'salah-paham', title: 'Salah paham tentang threat modeling', body: p(
        'Banyak tim membayangkan threat modeling sebagai dokumen tebal yang ditulis konsultan keamanan, penuh diagram rumit dan matriks risiko. Bayangan itu membuat tim kecil langsung mundur: tidak ada waktu, tidak ada ahlinya.',
        'Padahal intinya sederhana: memikirkan apa yang bisa salah sebelum kodenya ditulis. Tim kecil justru paling diuntungkan, karena mereka paling tidak sanggup membayar kesalahan desain yang baru ketahuan setelah rilis. Mengubah desain di papan tulis jauh lebih murah daripada menambal di production.'
      ) },
      { id: 'empat-pertanyaan', title: 'Empat pertanyaan', body: p(
        'Adam Shostack merangkum threat modeling menjadi empat pertanyaan, yang juga menjadi dasar Threat Modeling Manifesto:'
      ) + ul(
        'Apa yang sedang kita bangun?',
        'Apa yang bisa salah?',
        'Apa yang akan kita lakukan terhadapnya?',
        'Apakah kita sudah melakukannya dengan cukup baik?'
      ) + p('Pertanyaan pertama dijawab dengan diagram aliran data: siapa aktornya, proses apa yang berjalan, di mana data disimpan, dan di mana data melewati batas kepercayaan. Trust boundary seperti antara internet dan API, atau antara aplikasimu dan layanan pihak ketiga, adalah tempat yang paling layak dicurigai.') },
      { id: 'stride', title: 'STRIDE sebagai checklist', body: p(
        'Pertanyaan kedua sulit dijawab dengan intuisi saja, karena orang cenderung hanya memikirkan ancaman yang pernah mereka alami. STRIDE, yang dikembangkan di Microsoft pada akhir 1990-an, memberi enam kategori supaya tidak ada yang terlupa:'
      ) + ul(
        `${b('Spoofing:')} menyamar sebagai user atau sistem lain.`,
        `${b('Tampering:')} mengubah data di jalan atau di penyimpanan.`,
        `${b('Repudiation:')} menyangkal sebuah aksi karena tidak ada jejak.`,
        `${b('Information disclosure:')} data terbaca oleh yang tidak berhak.`,
        `${b('Denial of service:')} layanan dibuat tidak tersedia.`,
        `${b('Elevation of privilege:')} mendapat hak lebih tinggi dari seharusnya.`
      ) + p('Untuk setiap elemen di diagram, terutama yang menyeberangi trust boundary, tim bertanya: dari keenam huruf ini, mana yang mungkin terjadi di sini?') },
      { id: 'satu-sesi', title: 'Format satu jam', body: p(
        'Untuk tim kecil, format yang realistis kira-kira seperti ini. Sepuluh menit pertama, gambar aliran data fitur yang akan dibangun. Tiga puluh menit berikutnya, telusuri setiap panah yang melewati trust boundary dengan STRIDE. Sisa waktunya untuk memutuskan: setiap ancaman diperbaiki lewat desain, diterima sebagai risiko dengan alasan tertulis, atau dicatat sebagai tidak relevan.',
        'Misalnya, sebuah tim membahas fitur upload foto profil. Dalam satu sesi mereka bisa menemukan bahwa ukuran file tidak dibatasi (denial of service), tipe file hanya dicek di klien (tampering), dan URL foto bisa ditebak (information disclosure). Ketiganya menjadi tiket sebelum satu baris kode ditulis.'
      ) },
      { id: 'jebakan', title: 'Jebakan yang perlu dihindari', body: p(
        'Jebakan paling umum adalah hasil yang tidak pernah menjadi pekerjaan. Daftar ancaman yang hanya tersimpan di dokumen akan terlupakan dalam dua sprint. Pastikan setiap temuan masuk ke backlog yang sama dengan fitur lain.',
        'Jebakan kedua adalah mencoba memodelkan seluruh sistem sekaligus. Mulai dari fitur baru atau perubahan besar, karena di situlah desain masih bisa diubah dengan murah. Perbarui modelnya saat arsitektur berubah. Threat modeling adalah kebiasaan, bukan dokumen yang selesai sekali.'
      ) }
    ]
  }
};
