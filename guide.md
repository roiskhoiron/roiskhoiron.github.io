Saya ingin **identitas tetap terkonsolidasi di `roiskhoiron.github.io`**, aku justru menyarankan **jangan lakukan migrasi besar-besaran dulu**.



**Bikin evolusi bertahap.**



Soalnya tujuanmu bukan:



> "Memakai Astro dan Slidev."



tetapi:



> **"Membangun CodingSkuy sebagai media belajar Software Engineering."**



Kalau fondasinya salah, nanti malah sibuk mindahin file daripada nulis.

kerjakan di branch bernama `content`


---



# Fase 1 — Rapikan konsep konten (1-2 hari)



Sebelum install apa pun, tentukan dulu jenis kontennya.



Aku menyarankan:



```text

roiskhoiron.github.io/



/



├── About

├── Experience

├── Projects

│

├── Learn

│   ├── Articles

│   ├── Tutorials

│   └── Slides

│

└── Playground

```



Lalu isi:



### Articles



Artikel pendek.



Contoh:



* Flutter Null Safety

* MCP untuk Software Engineer

* Mobile Developer di Era AI



---



### Tutorials



Materi panjang.



Contoh:



```text

Flutter Complete Guide



1. Widget

2. State Management

3. Networking

4. Firebase

5. Deployment

```



---



### Slides



Presentasi singkat.



Contoh:



* Flutter State Management in 10 Minutes

* MCP Server Explained



---



## Kenapa ini penting?



Karena nanti kamu tidak berpikir:



> "Aku mau bikin slide."



Tetapi:



> "Materi ini lebih cocok jadi artikel, tutorial, atau slide?"



---



# Fase 2 — Tambahkan Astro + Starlight dulu (1 minggu)



**Belum usah Slidev.**



Aku tahu kamu semangat.



Tapi artikel dan tutorial adalah fondasi.



Buat folder baru di root:



```text

roiskhoiron.github.io/



src/

  apps/

    main/

    codingskuy/

    chefgenie/



articles/

```



Masuk:



```bash

cd articles



npm create astro@latest



# pilih



Starlight

TypeScript

MDX

```



Hasil:



```text

articles/



src/content/docs/



├── articles/

│   ├── flutter-null-safety.mdx

│   └── mobile-ai.mdx



├── tutorials/



│   ├── flutter/

│   │   ├── index.mdx

│   │   ├── widgets.mdx

│   │   ├── provider.mdx

│   │   └── firebase.mdx



│   └── ai-agent/

```



---



## Kenapa Astro dulu?



Karena 80% kebutuhanmu ada di sini:



✅ Markdown



✅ Syntax Highlight



✅ Sidebar



✅ Dark mode



✅ Search



✅ SEO



✅ Table of Contents



✅ Tutorial berurutan



---



# Fase 3 — Integrasi ke GitHub Pages



Nanti target akhirnya:



```text

roiskhoiron.github.io/



→ React Portfolio



roiskhoiron.github.io/articles/



→ Astro



roiskhoiron.github.io/tutorials/



→ Astro



roiskhoiron.github.io/slides/



→ Slidev

```



Ini sangat mungkin.



GitHub Pages tidak peduli framework.



Dia cuma melihat:



```text

dist/



├── index.html



├── articles/



├── tutorials/



└── slides/

```



---



# Fase 4 — Tambahkan Slidev



Nah baru sekarang.



Buat:



```text

slides/



├── flutter-null-safety/

│   └── slides.md



├── mcp-server/

│   └── slides.md



└── ai-agent/

    └── slides.md

```



Contoh:



```text

slides/



flutter-null-safety/



slides.md

```



Isi:



```md

# Flutter Null Safety



---



# Masalah sebelum Null Safety



- NullPointerException

- Crash

- Sulit ditelusuri



---



# Setelah Null Safety



String?



String



late

```



Lalu build:



```bash

slidev build

```



Output:



```text

slides/flutter-null-safety/dist/

```



yang nanti dipindahkan ke:



```text

dist/slides/flutter-null-safety/

```



---



# Fase 5 — Hubungkan semuanya



Ini yang menurutku menarik.



Misal artikel:



```text

/articles/flutter-null-safety

```



Di akhir:



```text

🎞️ Lihat Presentasi



→ /slides/flutter-null-safety



🎓 Ikuti Tutorial Lengkap



→ /tutorials/flutter

```



Jadi satu topik punya banyak bentuk.



---



# Fase 6 — Mulai membuat "Learning Path"



Nah ini sudah mulai mirip CodingSkuy Academy.



Misalnya:



```text

Learn



Flutter



├── Article

│   └── Apa itu Null Safety



├── Slide

│   └── Null Safety in 10 Minutes



├── Tutorial

│   └── Flutter Complete Guide



└── Project

    └── Todo App

```



Atau:



```text

AI Agent



├── Article

├── Slide

├── Tutorial

└── Playground

```



---



# Yang TIDAK aku sarankan sekarang



❌ Memindahkan seluruh `src/apps` ke Astro.



❌ Mengubah MainApp menjadi Astro.



❌ Langsung pakai monorepo kompleks seperti:



* Turborepo

* Nx



❌ Mencoba membuat Astro dan Slidev menjadi bagian dari React SPA.



---





Menurutku ini arah yang paling sehat.



Karena repo `roiskhoiron.github.io` yang awalnya cuma portfolio, perlahan berubah menjadi:



> **Portfolio + Knowledge Base + Tutorial Platform + Presentasi + Playground**



Dan yang menarik, semuanya masih bisa hidup di **satu domain GitHub Pages**, gratis, tanpa backend, dan tetap menjaga identitasmu sebagai **Software Engineer sekaligus Tech Educator di CodingSkuy**.