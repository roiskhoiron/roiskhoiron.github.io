// More field notes: the Agent Workflow series in long form, plus explainers that
// pair with the decks and carousels. Explainers stay impersonal on purpose —
// first person is used only for things Khoiron actually built.
import type { BlogPost } from './data';
import { p, ul, pre, c, b, type Full } from './blog-html';

const DATE = '2026-11-28';
const note = (slug: string, title: string, mins: number, tags: string[], excerpt: string, featured = false): BlogPost =>
  ({ slug, title, date: DATE, mins, tags, excerpt, ...(featured ? { featured } : {}) });

export const morePosts: BlogPost[] = [
  note('agent-workflow-papan-kanban', 'Saya Memberi AI Agent Papan Kanban, Bukan Prompt Panjang', 4, ['ai-agent', 'workflow', 'kanban'],
    'Prompt sepanjang apa pun tidak menjawab satu pertanyaan: siapa yang memutuskan pekerjaan ini selesai? Papan kanban menjawabnya.', true),
  note('agent-workflow-gerbang-spec', 'Tiket yang Kabur Menghasilkan Kode yang Ngawur', 3, ['ai-agent', 'workflow', 'spec'],
    'Agent mengerjakan persis apa yang tertulis. Karena itu, sebelum ada kode, setiap dokumen harus lolos gerbang lebih dulu.'),
  note('agent-workflow-qa-buta', 'Kenapa Penguji Tidak Boleh Melihat Kodenya', 3, ['ai-agent', 'workflow', 'testing'],
    'Kalau penguji membaca diff, ia menguji apa yang ditulis programmer. Padahal yang perlu diuji adalah apa yang diminta pengguna.'),
  note('agent-workflow-tanpa-production', 'Agent Boleh Mengetik Perintah. Production Tetap Terkunci.', 3, ['ai-agent', 'workflow', 'devops'],
    'Aturan paling penting saat memberi AI akses terminal ternyata bukan soal apa yang boleh, tapi soal apa yang tidak pernah boleh.'),
  note('programmer-selalu-akan-digantikan', 'Programmer Sudah "Akan Digantikan" Sejak 1957', 3, ['sejarah', 'ai', 'karier'],
    'Compiler, bahasa tingkat tinggi, framework, low-code, sekarang AI. Setiap lompatan diramalkan mengakhiri profesi ini. Yang terjadi justru sebaliknya.'),
  note('waterfall-salah-paham', 'Waterfall Adalah Salah Paham Berumur 50 Tahun', 3, ['sejarah', 'proses', 'agile'],
    'Paper yang dianggap melahirkan Waterfall justru memperingatkan bahayanya. Lalu bagaimana model itu jadi standar industri?'),
  note('hukum-conway-tim', 'Arsitektur Aplikasimu Adalah Cerminan Struktur Timmu', 3, ['teori', 'arsitektur', 'tim'],
    'Mau tahu kenapa modul A dan modul B tidak pernah akur? Lihat siapa yang jarang ngobrol di kantor.'),
  note('kenapa-ai-halusinasi', 'AI-mu Tidak Berbohong. Ia Memang Tidak Tahu Bedanya.', 3, ['ai', 'llm', 'teori'],
    'Fungsi yang tidak ada, versi library yang dikarang, kutipan palsu. Semuanya masuk akal begitu kamu tahu apa yang sebenarnya dilakukan sebuah LLM.'),
  note('commit-adalah-foto', 'Berhenti Menghafal Git. Pahami Satu Hal Ini Saja.', 3, ['git', 'dasar', 'tutorial'],
    'Git terasa rumit karena kita menghafal perintah tanpa tahu modelnya. Modelnya sederhana: commit adalah foto, branch adalah penunjuk.'),
  note('tes-yang-gagal-dulu', 'Tes Pertamamu Harus Gagal', 3, ['testing', 'bun', 'tutorial'],
    'Tes yang langsung hijau belum membuktikan apa-apa. Tutorial singkat menulis tes dengan Bun, dimulai dari merah.'),
  note('rest-api-tanpa-framework', 'Bikin REST API Tanpa Framework dalam 15 Menit', 4, ['bun', 'api', 'backend', 'tutorial'],
    'Sebelum memilih framework, ada baiknya tahu apa yang sebenarnya ia kerjakan untukmu. Jawabannya muat dalam satu file.'),
  note('debugging-bukan-bakat', 'Debugging Bukan Bakat, Tapi Prosedur', 3, ['debugging', 'dasar', 'tutorial'],
    'Programmer senior tidak lebih jarang kena bug. Mereka hanya berhenti menebak lebih cepat daripada kamu.'),
  note('satu-aturan-clean-architecture', 'Clean Architecture Sebenarnya Cuma Satu Aturan', 3, ['arsitektur', 'teori', 'mobile'],
    'Lupakan diagram lingkaran dan belasan folder. Seluruh idenya bisa diringkas dalam satu kalimat tentang arah ketergantungan.'),
  note('y2k-dan-utang-teknis', 'Y2K: Tagihan dari Jalan Pintas 30 Tahun Sebelumnya', 3, ['sejarah', 'utang-teknis'],
    'Dua digit yang dihemat di tahun 1960-an menjadi tagihan ratusan miliar dolar di tahun 1999. Dan tagihan berikutnya sudah punya tanggal.')
];

export const moreFull: Record<string, Full> = {
  'agent-workflow-papan-kanban': {
    lead: 'Part 1 dari seri Agent Workflow.',
    sections: [
      { id: 'masalah', title: 'Masalahnya bukan di prompt', body: p(
        'AI coding agent sudah cukup pintar untuk menulis fitur dari sebuah tiket. Masalah yang tersisa bukan soal kecerdasan, tapi soal proses: tiket yang tidak jelas tetap dikerjakan, kode selesai tanpa pernah dites di perangkat, dan tiket ditutup oleh agent itu sendiri.',
        'Menambah panjang prompt tidak menyelesaikan itu. Yang hilang adalah kesepakatan tentang tahapan, bukti, dan siapa yang berhak memutuskan.'
      ) },
      { id: 'papan', title: 'Papan kanban sebagai kontrak', body: p(
        `Karena itu saya membangun satu set workflow yang berpusat pada papan kanban dengan empat kolom: ${b('Todo, In Progress, Ready To Review, Done')}. Agent bekerja dari Todo sampai Ready To Review. Kolom Done hanya boleh diisi manusia.`,
        'Papan itu menjadi kontrak. Posisi sebuah tiket memberi tahu persis sejauh mana pekerjaan sudah berjalan, dan apa yang masih menunggu keputusan.'
      ) },
      { id: 'lima-perintah', title: 'Lima perintah yang sama di semua bidang', body:
        ul(
          `${c('/validate-tiket')}: memeriksa tiket sebelum dikerjakan.`,
          `${c('/develop-tiket')}: rencana, kode, review, tes, lalu PR.`,
          `${c('/rilis-tiket')}: menindaklanjuti hasil review.`,
          `${c('/branch-manager')}: menyiapkan rilis per versi.`,
          `${c('/audit-issue')}: menyelidiki keluhan tanpa mengubah apa pun.`
        ) + p('Kelima perintah ini sama di tujuh kit: SDD, Mobile, Backend, Frontend, UI/UX, QA, dan DevOps. Yang berbeda adalah isi langkahnya, karena "selesai" untuk aplikasi mobile tidak sama dengan "selesai" untuk infrastruktur.') },
      { id: 'prinsip', title: 'Prinsipnya', body: p(
        `${b('Agent mengerjakan, manusia memutuskan.')} Memindahkan ke Done, merge PR rilis, dan apa pun yang menyentuh production tetap berada di tangan manusia.`,
        `Semua kit terbuka di <a href="https://github.com/roiskhoiron" target="_blank" rel="noopener">github.com/roiskhoiron</a> dan masih dalam tahap uji coba. Part berikutnya membahas cara tiketnya sendiri dibuat.`
      ) }
    ]
  },

  'agent-workflow-gerbang-spec': {
    lead: 'Part 2 dari seri Agent Workflow.',
    sections: [
      { id: 'sampah-masuk', title: 'Sampah masuk, sampah keluar', body: p(
        'Agent tidak menebak maksudmu. Ia mengerjakan apa yang tertulis. Tiket satu kalimat akan menghasilkan implementasi yang penuh asumsi, dan kontrak API yang berubah diam-diam akan merusak aplikasi yang memakainya.',
        'Memperbaiki sebuah dokumen butuh beberapa menit. Memperbaiki kode yang dibangun di atas dokumen yang salah bisa memakan hari.'
      ) },
      { id: 'empat-dokumen', title: 'Empat dokumen sebelum satu baris kode', body:
        p(`Kit SDD mengubah satu kebutuhan bisnis menjadi tiket siap kerja lewat perintah ${c('/initiate-epic-ticket')}. Untuk kebutuhan berukuran sedang dan besar, urutannya:`) +
        ul('PdM menulis PRD.', 'Product Designer menulis alur lengkap dengan state-nya.', 'HoE menulis kontrak API.', 'PjM memecahnya menjadi tiket.') +
        p('Kebutuhan kecil langsung menjadi tiket dan cukup melewati satu gerbang.') },
      { id: 'gerbang', title: 'Cara kerja gerbangnya', body:
        ul(
          'Reviewer independen mencatat temuan.',
          'Penulis menjawab setiap temuan: diperbaiki, ditolak, atau diteruskan.',
          `Gerbang lolos ${b('hanya jika tidak ada temuan terbuka')}.`,
          'Setelah dua kali revisi, proses berhenti dan manusia turun tangan.'
        ) + p('Batas dua revisi itu penting. Tanpa batas, dua agent bisa saling mengoreksi tanpa akhir.') },
      { id: 'script', title: 'Aturan dijaga script, bukan janji', body: p(
        'Aturan gerbang diperiksa oleh script. Dokumen yang berubah otomatis wajib di-review ulang, tiket Mobile harus memiliki sembilan bagian berurutan tanpa placeholder, dan persetujuan mengunci isi epic.',
        'Catatan jujur: template tiket yang sudah jadi baru untuk Mobile, kontrak, dan desain, dan alur ini belum pernah dijalankan dari awal sampai akhir di proyek nyata.'
      ) }
    ]
  },

  'agent-workflow-qa-buta': {
    lead: 'Part 3 dari seri Agent Workflow.',
    sections: [
      { id: 'bias', title: 'Bias yang tidak terlihat', body: p(
        'Bayangkan penguji yang membaca kode sebelum menguji. Tanpa sadar, test case-nya mengikuti jalur yang sudah ditulis programmer. Kasus yang dilupakan programmer ikut terlupa oleh penguji.',
        'Masalah ini makin besar ketika yang menulis dan yang menguji sama-sama AI.'
      ) },
      { id: 'mode-buta', title: 'Mode buta', body: p(
        `Di kit QA, agent menyusun test case dari ${b('acceptance criteria')}, bukan dari diff. Dalam mode buta, perintah untuk membuka diff benar-benar diblokir.`,
        'Agent QA juga tidak pernah menulis kode produk. Ia hanya boleh menulis kode otomasi tes.'
      ) },
      { id: 'rekomendasi', title: 'Rekomendasi, bukan keputusan', body:
        p('Hasil kerja agent QA adalah laporan dengan kosakata yang tetap:') +
        ul('Tiap test case: lulus, gagal, atau tertahan.', 'Rekomendasi akhir: lolos, gagal, atau tertahan.', 'Draf bug dengan tingkat keparahan S1 sampai S4.') +
        p('Draf bug baru menjadi tiket setelah diizinkan, dan keputusan Done tetap milik QA manusia.') },
      { id: 'pelajaran', title: 'Pelajaran yang lebih umum', body: p(
        'Prinsipnya berlaku di luar AI: pisahkan pihak yang mengerjakan dari pihak yang memeriksa, dan beri pemeriksa sudut pandang pengguna, bukan sudut pandang pembuat.',
        'Kit QA masih versi 0.1, jadi anggap ini rancangan yang sedang diuji, bukan resep jadi.'
      ) }
    ]
  },

  'agent-workflow-tanpa-production': {
    lead: 'Part 4 dari seri Agent Workflow.',
    sections: [
      { id: 'dokumen-dulu', title: 'Dokumen dulu, baru kode', body:
        p('Kit DevOps memaksa satu urutan yang tidak bisa dilompati:') +
        ul('Runbook ditulis sebelum playbook.', 'Playbook di-lint, lalu dijalankan dalam check mode.', 'Dijalankan dua kali di staging.', 'Pemilik infrastruktur menyetujui atau menolak dengan alasan.') +
        p(`Run kedua di staging harus melaporkan ${b('tanpa perubahan')}. Kalau masih ada yang berubah, playbook-nya tidak idempoten dan belum layak dipakai.`) },
      { id: 'production', title: 'Production bukan wilayah agent', body: p(
        'Agent hanya menguji di staging dan menyiapkan rilis. Penerapan ke production dilakukan manusia atau pipeline. PR tetap berstatus Draft sampai disetujui.',
        'Larangan yang sama berlaku di semua kit: agent tidak memindahkan tiket ke Done, tidak menutup issue, tidak merge PR rilis, dan tidak melakukan force-push.'
      ) },
      { id: 'batas-guard', title: 'Jujur soal batas pagar', body: p(
        'Setiap kit punya hook guard yang memblokir perintah berbahaya. Tapi guard hanya membaca teks perintah. Host production yang tersembunyi di file .env tidak terlihat olehnya, begitu juga koneksi SSH langsung.',
        `Kesimpulannya sederhana dan tidak nyaman: ${b('jangan simpan kunci production di mesin tempat agent bekerja.')} Pagar terbaik adalah akses yang memang tidak ada.`
      ) },
      { id: 'penutup', title: 'Penutup seri', body:
        ul('Beri agent proses, bukan hanya prompt.', 'Pisahkan yang mengerjakan dari yang memeriksa.', 'Simpan keputusan yang tidak bisa dibatalkan untuk manusia.') }
    ]
  },

  'programmer-selalu-akan-digantikan': {
    lead: 'Ramalan lama dengan kostum baru.',
    sections: [
      { id: 'ramalan', title: 'Ramalan yang terus berulang', body: p(
        'Ketika FORTRAN muncul pada 1957, tujuannya membuat ilmuwan bisa menulis program tanpa menguasai bahasa mesin. COBOL, dua tahun kemudian, dirancang agar mirip bahasa Inggris supaya orang bisnis bisa membacanya.',
        'Polanya sama setiap kali: alat baru menaikkan tingkat abstraksi, lalu muncul prediksi bahwa programmer tidak lagi diperlukan.'
      ) },
      { id: 'yang-terjadi', title: 'Yang sebenarnya terjadi', body:
        ul(
          'Bahasa tingkat tinggi membuat lebih banyak orang bisa memprogram.',
          'Framework membuat aplikasi lebih cepat dibangun, sehingga lebih banyak aplikasi diminta.',
          'Cloud menghapus pekerjaan memasang server, lalu melahirkan pekerjaan baru di sekitarnya.'
        ) + p('Setiap kali menulis kode menjadi lebih murah, permintaan akan software justru bertambah.') },
      { id: 'yang-berubah', title: 'Apa yang benar-benar tergantikan', body: p(
        `Yang hilang di setiap lompatan adalah ${b('pekerjaan mengetik')}: menerjemahkan niat menjadi instruksi tingkat rendah. Yang tidak hilang adalah memahami masalah, memilih trade-off, dan bertanggung jawab atas hasilnya.`,
        'AI menaikkan abstraksi satu tingkat lagi, ke bahasa manusia. Tidak ada jaminan sejarah berulang persis, tapi pola 70 tahun terakhir layak dijadikan pegangan.'
      ) },
      { id: 'sikap', title: 'Sikap yang masuk akal', body:
        ul('Perkuat kemampuan membaca dan menilai kode.', 'Pahami dasar yang tidak ikut berganti: data, jaringan, state.', 'Latih kebiasaan memverifikasi, bukan memercayai.') }
    ]
  },

  'waterfall-salah-paham': {
    lead: 'Tentang sebuah paper yang lebih sering dikutip daripada dibaca.',
    sections: [
      { id: 'paper', title: 'Paper tahun 1970', body: p(
        'Model Waterfall biasanya dikaitkan dengan tulisan Winston Royce, "Managing the Development of Large Software Systems". Di sana ada diagram tahap berurutan: requirement, desain, implementasi, pengujian, operasi.',
        `Yang jarang disebut: Royce menulis bahwa model satu arah itu ${b('berisiko')}, lalu menyarankan pengulangan antar tahap.`
      ) },
      { id: 'kenapa-populer', title: 'Kenapa versi yang salah yang populer', body:
        ul('Diagram berurutan mudah digambar dan dijelaskan.', 'Cocok dengan cara kontrak dan anggaran disusun.', 'Memberi rasa pasti: setiap tahap punya tanda tangan.') +
        p('Kenyamanan administratif itulah yang membuatnya bertahan, bukan hasilnya.') },
      { id: 'kapan-cocok', title: 'Bukan berarti selalu salah', body: p(
        'Waterfall masuk akal ketika requirement stabil dan biaya perubahan sangat tinggi, misalnya perangkat medis atau penerbangan.',
        'Ia bermasalah ketika kebutuhan pengguna belum pasti, karena umpan balik baru datang di akhir.'
      ) },
      { id: 'pelajaran', title: 'Pelajarannya', body: p(
        'Agile (2001) dan DevOps sesudahnya menjawab pertanyaan yang sama dengan cara berbeda: seberapa cepat kita tahu bahwa kita salah? Semakin murah sebuah perubahan, semakin pendek iterasi yang masuk akal.',
        'Dan satu pelajaran tambahan: baca sumber aslinya sebelum mengutipnya.'
      ) }
    ]
  },

  'hukum-conway-tim': {
    lead: 'Hukum Conway, lebih dari 50 tahun kemudian.',
    sections: [
      { id: 'hukumnya', title: 'Hukumnya', body: p(
        'Melvin Conway merumuskannya pada akhir 1960-an: organisasi yang merancang sistem akan menghasilkan rancangan yang meniru struktur komunikasinya sendiri.',
        'Tiga tim cenderung menghasilkan tiga modul. Dua tim yang jarang berbicara akan menghasilkan dua bagian yang antarmukanya canggung.'
      ) },
      { id: 'kenapa', title: 'Kenapa itu terjadi', body: p(
        'Antarmuka antar modul adalah hasil negosiasi antar manusia. Di dalam satu tim, perubahan dibicarakan sambil lalu. Antar tim, setiap perubahan butuh rapat.',
        'Akibatnya batas tim perlahan mengeras menjadi batas arsitektur.'
      ) },
      { id: 'di-mobile', title: 'Contoh yang akrab', body:
        ul('Tim Android dan tim iOS terpisah: fitur yang sama berperilaku sedikit berbeda.', 'Backend dan mobile jarang sinkron: kontrak API jadi sumber bug.', 'Satu tim memegang semuanya: batas modul cenderung kabur.') },
      { id: 'memakainya', title: 'Memakai hukum ini dengan sengaja', body: p(
        `Kalau struktur tim membentuk arsitektur, maka ${b('mengubah arsitektur sering berarti mengubah cara tim berkomunikasi')}.`,
        'Sebelum merombak kode, tanyakan dulu: siapa yang perlu berbicara lebih sering, dan dokumen apa yang menjadi kesepakatan mereka?'
      ) }
    ]
  },

  'kenapa-ai-halusinasi': {
    lead: 'Halusinasi bukan bug yang lupa diperbaiki. Ia akibat langsung dari cara kerjanya.',
    sections: [
      { id: 'prediksi', title: 'Mesin penerus teks', body: p(
        'Sebuah LLM memecah teks menjadi token, lalu memprediksi token berikutnya, berulang-ulang. Ia tidak membuka database jawaban.',
        `Artinya model menghasilkan teks yang ${b('paling mungkin')}, bukan teks yang sudah diperiksa kebenarannya. Sering kali keduanya sama. Kadang tidak.`
      ) },
      { id: 'bentuk', title: 'Bentuk halusinasi yang sering ditemui programmer', body:
        ul('Nama fungsi yang terdengar benar tapi tidak ada.', 'Parameter dari versi library yang berbeda.', 'Klaim "sudah saya tes" tanpa hasil yang ditunjukkan.') },
      { id: 'konteks', title: 'Konteks adalah obatnya', body: p(
        'Model hanya tahu apa yang ada di dalam context window: instruksi, percakapan, file, dan hasil tool. Di luar itu, ia mengisi kekosongan dengan tebakan.',
        'Karena itu memberikan kode asli atau dokumentasi yang relevan jauh lebih efektif daripada merangkai kalimat prompt yang cerdik.'
      ) },
      { id: 'kebiasaan', title: 'Tiga kebiasaan yang mengurangi risikonya', body:
        ul('Berikan sumbernya, jangan minta model mengingat.', 'Minta model menjalankan kode dan menunjukkan hasilnya.', 'Periksa sendiri hal yang mudah diverifikasi: nama fungsi, versi, angka.') +
        p('Singkatnya: percaya setelah diverifikasi.') }
    ]
  },

  'commit-adalah-foto': {
    lead: 'Model mental Git dalam empat bagian.',
    sections: [
      { id: 'foto', title: 'Commit adalah foto', body: p(
        'Setiap commit menyimpan kondisi seluruh proyekmu pada satu saat, seperti foto. Riwayat Git adalah album foto yang berurutan.',
        'Itu sebabnya kamu selalu bisa kembali: fotonya tidak diubah, kamu hanya melihat foto yang lain.'
      ) },
      { id: 'tiga-tempat', title: 'Tiga tempat', body:
        ul(`${b('Working directory')}: file yang sedang kamu ubah.`, `${b('Staging')}: perubahan yang kamu pilih untuk foto berikutnya.`, `${b('Repository')}: album foto yang sudah tersimpan.`) +
        pre('git add src/todo.ts     # pilih untuk difoto\ngit commit -m "fix: ..." # ambil fotonya') },
      { id: 'branch', title: 'Branch hanyalah penunjuk', body: p(
        'Branch bukan salinan proyek. Ia hanya label yang menunjuk ke satu commit, dan ikut maju setiap kali kamu membuat commit baru.',
        'Karena itu membuat branch sangat murah, dan kebiasaan "satu fitur, satu branch" tidak membebani apa pun.'
      ) + pre('git switch -c fitur-login\ngit switch main') },
      { id: 'praktik', title: 'Mulai dari sini', body:
        ul('Commit kecil dan sering, dengan pesan yang menjelaskan alasannya.', `Biasakan ${c('git status')} sebelum melakukan apa pun.`, `Jangan pernah commit file rahasia seperti ${c('.env')}.`) }
    ]
  },

  'tes-yang-gagal-dulu': {
    lead: 'Red, green, refactor dengan Bun.',
    sections: [
      { id: 'kenapa-gagal', title: 'Kenapa harus gagal dulu', body: p(
        'Tes yang langsung lolos bisa berarti dua hal: kodemu benar, atau tesnya tidak memeriksa apa pun. Kamu tidak bisa membedakannya.',
        'Tes yang gagal lebih dulu membuktikan bahwa ia benar-benar memeriksa sesuatu.'
      ) },
      { id: 'red', title: 'Merah', body:
        p(`Buat file ${c('sum.test.ts')}. Fungsi ${c('sum')} sengaja belum ada.`) +
        pre('import { test, expect } from "bun:test"\nimport { sum } from "./sum"\n\ntest("menjumlahkan dua angka", () => {\n  expect(sum(2, 3)).toBe(5)\n})') +
        p(`Jalankan ${c('bun test')}. Hasilnya gagal, dan memang itu tujuannya.`) },
      { id: 'green', title: 'Hijau', body:
        p('Tulis implementasi paling sederhana yang membuat tes lolos.') +
        pre('// sum.ts\nexport const sum = (a: number, b: number) => a + b') +
        p('Lalu tambahkan kasus yang lebih sulit, lihat ia gagal, dan perbaiki lagi.') +
        pre('test("menolak input bukan angka", () => {\n  expect(() => sum(NaN, 1)).toThrow()\n})') },
      { id: 'kebiasaan', title: 'Apa yang layak dites', body:
        ul('Logic dan perhitungan.', 'Kasus tepi: kosong, nol, negatif.', 'Bug yang pernah terjadi, supaya tidak kembali.') +
        p('Dan saat bekerja dengan AI agent, tes adalah cara tercepat memeriksa hasil kerjanya.') }
    ]
  },

  'rest-api-tanpa-framework': {
    lead: 'Satu file, tiga puluhan baris, satu API yang bisa dipanggil.',
    sections: [
      { id: 'server', title: 'Server paling sederhana', body:
        p(`Buat ${c('server.ts')}, lalu jalankan dengan ${c('bun run server.ts')}.`) +
        pre('const todos = [\n  { id: 1, title: "Belajar Bun", done: false }\n]\n\nBun.serve({\n  port: 3000,\n  fetch(req) {\n    return Response.json(todos)\n  }\n})') },
      { id: 'routing', title: 'Routing: path dan method', body:
        p('Framework melakukan ini untukmu. Tanpa framework, kamu memeriksanya sendiri.') +
        pre('async fetch(req) {\n  const url = new URL(req.url)\n\n  if (url.pathname === "/todos" && req.method === "GET") {\n    return Response.json(todos)\n  }\n\n  return new Response("Not found", { status: 404 })\n}') },
      { id: 'post', title: 'Menerima data', body:
        p('Validasi dulu, baru simpan. Balas dengan status code yang tepat.') +
        pre('if (url.pathname === "/todos" && req.method === "POST") {\n  const body = await req.json()\n\n  if (!body.title) {\n    return Response.json({ error: "title wajib" }, { status: 400 })\n  }\n\n  const todo = { id: todos.length + 1, title: body.title, done: false }\n  todos.push(todo)\n  return Response.json(todo, { status: 201 })\n}') },
      { id: 'belum-ada', title: 'Yang belum ada', body:
        ul('Penyimpanan permanen: data hilang saat server dimatikan.', 'Autentikasi.', 'Penanganan error dan logging.') +
        p('Setelah menulis ini sendiri, kamu tahu persis apa yang ditawarkan sebuah framework, dan bisa memilihnya dengan alasan.') }
    ]
  },

  'debugging-bukan-bakat': {
    lead: 'Enam langkah yang bisa dilatih.',
    sections: [
      { id: 'baca', title: 'Baca, lalu ulangi', body: p(
        'Langkah pertama adalah membaca pesan error sampai habis: jenisnya, nama file, dan nomor barisnya. Baris teratas di stack trace yang berasal dari kodemu biasanya kuncinya.',
        'Langkah kedua adalah membuat bug itu bisa diulang. Bug yang tidak bisa diulang tidak bisa dibuktikan sudah diperbaiki.'
      ) },
      { id: 'lihat', title: 'Lihat, jangan tebak', body:
        p('Cetak nilainya atau pasang breakpoint. Dugaan tentang isi variabel hampir selalu lebih optimistis daripada kenyataannya.') +
        pre('console.log("items:", items)\nconsole.log("total:", total)') },
      { id: 'belah', title: 'Belah dua', body: p(
        'Matikan separuh kode. Kalau bug masih ada, masalahnya di separuh yang tersisa. Ulangi sampai tinggal beberapa baris.',
        `Untuk mencari commit mana yang memunculkan bug, ${c('git bisect')} melakukan pembelahan ini secara otomatis.`
      ) },
      { id: 'kunci', title: 'Satu perubahan, lalu kunci', body:
        ul('Tulis dugaanmu dalam satu kalimat.', 'Ubah satu hal saja, lalu uji.', 'Kalau salah, kembalikan perubahan itu sebelum mencoba yang lain.', 'Setelah beres, tulis tes supaya bug-nya tidak kembali.') }
    ]
  },

  'satu-aturan-clean-architecture': {
    lead: 'The Dependency Rule, tanpa diagram.',
    sections: [
      { id: 'aturannya', title: 'Aturannya', body: p(
        `Clean Architecture diperkenalkan Robert C. Martin pada 2012. Intinya satu kalimat: ${b('ketergantungan kode hanya boleh mengarah ke dalam')}, dari detail menuju aturan bisnis.`,
        'Aturan bisnis tidak boleh tahu apa pun tentang UI, database, atau framework.'
      ) },
      { id: 'contoh', title: 'Bentuknya di kode', body:
        p('Use case mengenal sebuah interface, bukan implementasinya.') +
        pre('interface TodoRepository {\n  save(todo: Todo): Promise<void>\n}\n\nclass AddTodo {\n  constructor(private repo: TodoRepository) {}\n\n  async run(title: string) {\n    if (!title.trim()) throw new Error("kosong")\n    await this.repo.save({ title, done: false })\n  }\n}') +
        p('Implementasinya boleh file, SQLite, atau API. Saat tes, cukup repository palsu.') },
      { id: 'harga', title: 'Harganya', body:
        ul('Lebih banyak file dan interface.', 'Berlebihan untuk aplikasi kecil.', 'Butuh disiplin seluruh tim.') },
      { id: 'mulai', title: 'Mulai tanpa merombak semuanya', body:
        ul('Pindahkan logic keluar dari widget atau view.', 'Bungkus akses data di balik interface.', 'Tulis tes untuk use case yang paling penting.') +
        p('Tambahkan lapisan hanya ketika rasa sakitnya muncul. Tujuannya kemudahan berubah, bukan kerapian folder.') }
    ]
  },

  'y2k-dan-utang-teknis': {
    lead: 'Cerita tentang utang teknis dengan bunga paling terkenal.',
    sections: [
      { id: 'dua-digit', title: 'Dua digit yang dihemat', body: p(
        'Di era ketika memori sangat mahal, tahun disimpan dengan dua digit: 75, bukan 1975. Keputusan itu masuk akal pada zamannya.',
        'Tidak ada yang mengira program yang sama masih berjalan puluhan tahun kemudian.'
      ) },
      { id: 'tagihan', title: 'Tagihannya datang', body: p(
        'Menjelang tahun 2000, sistem yang membaca "00" sebagai 1900 terancam salah menghitung umur, bunga, dan jadwal. Jutaan baris kode lama harus diperiksa.',
        'Biaya perbaikannya di seluruh dunia diperkirakan mencapai ratusan miliar dolar.'
      ) },
      { id: 'paradoks', title: 'Paradoks pencegahan', body: p(
        'Pergantian tahun berjalan dengan gangguan kecil saja. Sebagian orang lalu menyimpulkan bahwa kepanikannya berlebihan.',
        `Padahal hasil itu ada karena perbaikannya dikerjakan. ${b('Pencegahan yang berhasil selalu terlihat seperti kekhawatiran yang sia-sia.')}`
      ) },
      { id: 'berikutnya', title: 'Tagihan berikutnya sudah bertanggal', body: p(
        'Sistem yang menyimpan waktu sebagai angka 32-bit akan kehabisan ruang pada 19 Januari 2038.',
        'Pelajarannya untuk pekerjaan sehari-hari: jalan pintas hari ini adalah tagihan untuk orang lain nanti, dan sering kali orang lain itu adalah kamu sendiri.'
      ) }
    ]
  }
};
