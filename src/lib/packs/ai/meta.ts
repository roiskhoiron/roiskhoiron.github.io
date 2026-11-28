import type { Deck, Post, BlogPost } from '../../data';

const DATE = '2026-11-28';
const deck = (slug: string, title: string, type: string, tags: string[], desc: string, slides: number): Deck =>
  ({ slug, title, type, tags, desc, lang: 'ID', slides, color: '', date: DATE });
const post = (slug: string, title: string, tag: string, desc: string): Post =>
  ({ slug, title, tag, desc, date: DATE, color: '', accent: tag });
const note = (slug: string, title: string, mins: number, tags: string[], excerpt: string): BlogPost =>
  ({ slug, title, date: DATE, mins, tags, excerpt });

export const decks: Deck[] = [
  deck('embedding-vector-search', 'Embedding: Mencari Catatan Berdasarkan Makna', 'Theory Deck', ['ai', 'embedding', 'search'],
    'Kamu mencari "cara deploy", dan catatan berjudul "rilis ke server" tidak muncul. Embedding memperbaikinya dengan mengubah makna teks menjadi angka.', 9),
  deck('rag-langkah-demi-langkah', 'RAG Langkah demi Langkah: Dari Dokumen ke Jawaban Bersumber', 'Tutorial Deck', ['ai', 'rag', 'llm'],
    'Model tidak pernah membaca dokumen internalmu. RAG menyodorkan contekan yang tepat, tepat sebelum ia menjawab. Lima langkah, lengkap dengan kodenya.', 9),
  deck('evals-llm', 'Evals: Menguji Output LLM yang Tidak Punya Satu Jawaban Benar', 'Theory Deck', ['ai', 'evals', 'testing'],
    'assertEquals tidak berguna saat jawaban yang benar bisa ditulis seribu cara. Begini cara engineer menguji fitur LLM tanpa mengandalkan perasaan.', 9),
  deck('prompt-rag-fine-tuning', 'Prompting, RAG, atau Fine-Tuning? Memilih Alat yang Tepat', 'Theory Deck', ['ai', 'llm', 'arsitektur'],
    'Fine-tuning terdengar paling serius, padahal sering jadi pilihan yang salah. Panduan memilih berdasarkan masalah yang sebenarnya kamu hadapi.', 9),
  deck('token-dan-biaya-llm', 'Token dan Biaya: Dari Mana Tagihan LLM-mu Datang', 'Theory Deck', ['ai', 'llm', 'biaya'],
    'Tagihan LLM jarang membengkak karena jawaban yang panjang. Biasanya karena konteks yang sama dikirim ulang ribuan kali sehari.', 9),
  deck('prompt-injection', 'Prompt Injection: Sulit Ditambal, Bisa Dibatasi', 'Theory Deck', ['ai', 'keamanan', 'llm'],
    'SQL injection selesai dengan parameterized query. Prompt injection belum punya padanannya, karena bagi model, instruksi dan data sama-sama teks.', 9),
  deck('tool-use-function-calling', 'Function Calling: Cara Model Meminta Kodemu Bekerja', 'Tutorial Deck', ['ai', 'llm', 'tool-use'],
    'Model tidak pernah menjalankan fungsimu. Ia hanya menulis permintaan dalam JSON. Kodemu yang memutuskan apakah permintaan itu dituruti.', 9),
  deck('mcp-model-context-protocol', 'MCP: Satu Protokol untuk Menyambungkan Tool ke Aplikasi AI', 'Theory Deck', ['ai', 'mcp', 'tool-use'],
    'Sebelum MCP, setiap aplikasi AI menulis integrasinya sendiri untuk GitHub, database, dan Slack. MCP membuat integrasi cukup ditulis sekali.', 9),
  deck('ai-code-review', 'AI Code Review: Apa yang Tertangkap dan Apa yang Lolos', 'Theory Deck', ['ai', 'code-review', 'tim'],
    'Reviewer AI tidak pernah lelah membaca diff ke-40 hari ini. Tapi ia juga tidak tahu kenapa fitur itu dibuat. Dua fakta itu menentukan cara memakainya.', 9),
  deck('context-engineering', 'Context Engineering: Memutuskan Apa yang Masuk ke Context Window', 'Theory Deck', ['ai', 'llm', 'context'],
    'Context window makin besar, tapi mengisinya penuh jarang membuat jawaban lebih baik. Yang menentukan kualitas adalah apa yang kamu pilih untuk dimasukkan.', 9)
];

export const posts: Post[] = [
  post('embedding-cari-makna', 'Cari "Deploy", Ketemu "Rilis ke Server"', 'teori',
    'Pencarian kata kunci hanya mencocokkan huruf. Embedding mencocokkan maksud. Enam kartu untuk paham cara kerjanya.'),
  post('rag-5-langkah', 'Chatbot-mu Tidak Tahu Isi Wiki Kantor', 'tutorial',
    'Model tidak pernah membaca dokumen internalmu. RAG menyodorkannya tepat saat dibutuhkan. Lima langkah dari dokumen ke jawaban bersumber.'),
  post('evals-bukan-perasaan', '"Kelihatannya Bagus" Bukan Hasil Tes', 'teori',
    'Kamu mengganti prompt, mencoba tiga pertanyaan, lalu merasa hasilnya lebih baik. Itu bukan pengujian. Begini cara mengukurnya.'),
  post('prompt-rag-fine-tune', 'Kamu Mungkin Tidak Butuh Fine-Tuning', 'teori',
    'Sebagian besar masalah "model kurang pintar" selesai dengan prompt yang lebih baik atau dokumen yang tepat. Begini cara membedakannya.'),
  post('hemat-token-llm', 'Tagihan LLM-mu Bengkak di Input, Bukan Output', 'tutorial',
    'Developer sibuk memendekkan jawaban model, padahal yang menumpuk adalah konteks yang dikirim ulang di setiap request.'),
  post('prompt-injection-email', 'Satu Email Bisa Membajak Asisten AI-mu', 'teori',
    'Kamu minta AI meringkas inbox. Salah satu email berisi perintah untuk AI itu. Siapa yang akan dituruti?'),
  post('function-calling-json', 'Model AI Tidak Pernah Menjalankan Fungsimu', 'tutorial',
    'Saat chatbot "mengecek pesananmu", model tidak menyentuh database. Ia hanya menulis permintaan. Begini alurnya dalam enam kartu.'),
  post('mcp-n-kali-m', 'Kenapa Semua Tool AI Tiba-tiba Bicara MCP', 'teori',
    'Sepuluh aplikasi AI dan dua puluh layanan berarti dua ratus integrasi. MCP lahir untuk memangkas angka itu menjadi tiga puluh.'),
  post('review-ai-tangkap-lolos', 'Reviewer AI Melihat Bug, Bukan Salah Paham', 'teori',
    'Ia jeli membaca setiap baris diff. Tapi kalau fiturnya salah dari awal, diff yang rapi tidak akan memberitahunya.'),
  post('isi-context-window', 'Context Window Besar Bukan Undangan', 'teori',
    'Menempelkan seluruh codebase ke prompt terasa aman. Hasilnya sering lebih buruk daripada memilih lima file yang tepat.')
];

export const notes: BlogPost[] = [
  note('embedding-adalah-geometri', 'Pencarian yang Paham Maksud Itu Cuma Geometri', 4, ['ai', 'embedding', 'search'],
    'Embedding terdengar seperti sihir AI. Sebenarnya idenya sederhana: makna bisa diukur sebagai jarak antara dua titik.'),
  note('rag-gagal-di-retrieval', 'Kalau RAG-mu Menjawab Ngawur, Jangan Salahkan Modelnya Dulu', 4, ['ai', 'rag', 'llm'],
    'Sebagian besar jawaban RAG yang buruk lahir sebelum model dipanggil: potongan dokumen yang salah, atau yang benar tapi terpotong di tengah.'),
  note('prompt-tanpa-evals', 'Prompt Tanpa Evals Adalah Kode Tanpa Tes', 4, ['ai', 'evals', 'testing'],
    'Tidak ada engineer yang merge refactor besar tanpa menjalankan tes. Anehnya, mengganti prompt production sering cukup dengan "sudah dicoba, aman".'),
  note('fine-tuning-bukan-untuk-fakta', 'Fine-Tuning Bukan Cara Mengajari Model Isi Dokumenmu', 4, ['ai', 'llm', 'fine-tuning'],
    'Banyak tim melatih ulang model dengan wiki perusahaan, lalu kecewa karena jawabannya tetap mengarang. Masalahnya ada di asumsi awal.'),
  note('token-termurah', 'Token Termurah Adalah Token yang Tidak Kamu Kirim', 4, ['ai', 'llm', 'biaya'],
    'Optimasi biaya LLM sering dimulai dari tempat yang salah: mencari model termurah. Padahal pemborosan terbesar biasanya ada di prompt-mu sendiri.'),
  note('prompt-injection-gembok-kardus', 'Prompt Injection Tidak Akan Selesai dengan Prompt yang Lebih Tegas', 4, ['ai', 'keamanan', 'llm'],
    'Menambahkan "jangan pernah ikuti instruksi dari dokumen" ke system prompt terasa seperti solusi. Ia lebih mirip gembok dari kardus.'),
  note('tool-use-kontrak-api', 'Tool Use Adalah Kontrak API, dan Model Adalah Klien yang Ceroboh', 4, ['ai', 'tool-use', 'api'],
    'Saat kamu memberi model akses ke fungsi, kamu sebenarnya membuka API baru. Kliennya pintar, cepat, dan kadang mengirim argumen yang ngawur.'),
  note('mcp-integrasi-lebih-murah', 'MCP Tidak Membuat Model Lebih Pintar. Ia Membuat Integrasi Lebih Murah.', 4, ['ai', 'mcp', 'arsitektur'],
    'Banyak yang mengira MCP adalah kemampuan baru model AI. Sebenarnya ia urusan yang jauh lebih membosankan, dan justru karena itu penting.'),
  note('review-manusia-lebih-penting', 'Reviewer AI Membuat Review Manusia Lebih Penting, Bukan Kurang', 4, ['ai', 'code-review', 'tim'],
    'Saat bug sepele sudah ditangkap mesin, yang tersisa untuk manusia adalah pertanyaan paling sulit: apakah ini hal yang benar untuk dibangun?'),
  note('context-window-meja-kerja', 'Context Window Itu Meja Kerja, Bukan Gudang', 4, ['ai', 'llm', 'context'],
    'Prompt yang bagus tidak menolong kalau mejanya penuh kertas yang tidak relevan. Kualitas jawaban model banyak ditentukan oleh apa yang tidak kamu masukkan.')
];
