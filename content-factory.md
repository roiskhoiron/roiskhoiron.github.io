# Content Factory Template

Factory template untuk membuat konten baru di CodingSkuy. Ikuti workflow ini untuk tiap topik.

---

## 1. Struktur Folder

```
content/
├── {kategori}/                 # flutter, python, ai, backend, dsb
│   ├── article/
│   │   └── article.mdx         # Artikel utama
│   ├── playground/
│   │   └── index.mdx           # Playground interaktif
│   ├── quiz/
│   │   └── questions.mdx       # Quiz pilihan ganda
│   └── tutorial/
│       └── {judul}/            # nama topik, contoh: null-safety
│           ├── intro.mdx       # Pendahuluan tutorial
│           ├── part1.mdx       # Materi part 1
│           ├── part2.mdx       # Materi part 2 (optional)
│           ├── exercise.mdx    # Latihan soal
│           ├── project.mdx     # Project mini
│           └── summary.mdx     # Ringkasan & next steps
```

---

## 2. Astro Content (Hub Wrapper)

File: `articles/src/content/docs/{kategori}/{judul}.mdx`

```mdx
---
title: {Judul}
description: {Deskripsi singkat konten}
---

import Hub from '../../../components/Hub.astro'

<Hub category="{kategori}" topic="{judul}" />
```

---

## 3. Template Artikel (article.mdx)

```mdx
---
title: {Judul Utama}
description: {Deskripsi konten}
---

# {Judul Utama}

> **{Opening hook dalam 1 kalimat}**

---

## Masalahnya

{Deskripsi masalah yang relevan dengan pembaca}

```code
{contoh kode yang bermasalah}
```

| Masalah | Dampak |
|---|---|
| {masalah 1} | {dampak 1} |
| {masalah 2} | {dampak 2} |

---

## Kenapa Ini Penting?

| Skill | Manfaat |
|---|---|
| {skill 1} | {manfaat 1} |
| {skill 2} | {manfaat 2} |

---

## Konsep Inti

### 1. {Konsep 1}

```code
{contoh kode}
```

### 2. {Konsep 2}

```code
{contoh kode}
```

### 3. {Konsep 3}

```code
{contoh kode}
```

---

## Contoh Lengkap

```code
{kode lengkap yang dapat dijalankan}
```

---

## Common Mistakes

### ❌ Salah: {Kesalahan 1}

```code
{kode salah}
```

**✅ Bener:** {solusi}

```code
{kode benar}
```

### ❌ Salah: {Kesalahan 2}

```code
{kode salah}
```

**✅ Bener:** {solusi}

---

## 🧪 Main Langsung

Coba sendiri di playground: [{Nama Playground}](/articles/{kategori}/{judul}/playground)

---

## Lanjutan

| Format | Link |
|---|---|
| 🎞 **Slide Presentasi** | [{Slide URL}]({slide_url}) |
| 🎓 **Tutorial Lengkap** | [Mulai Tutorial →](/articles/{kategori}/{judul}/tutorial) |
| ❓ **Quiz** | [Uji Pemahaman →](/articles/{kategori}/{judul}/quiz) |
```

---

## 4. Template Playground (playground/index.mdx)

```mdx
---
title: {Judul} Playground
description: {Deskripsi playground}
---

# 🧪 Playground {Judul}

{Petunjuk penggunaan playground}

<iframe src="{embed_url}" 
  width="100%" height="650px"
  style="border: 2px solid #3d8bff; border-radius: 12px;"
  allowfullscreen>
</iframe>

---

## 🎯 Tantangan

Coba kerjakan tantangan ini:

1. {tantangan 1}
2. {tantangan 2}
3. {tantangan 3}

Kalau udah selesai, lanjut ke **[Tutorial →](/articles/{kategori}/{judul}/tutorial)**

Atau uji pemahaman kamu dengan **[Quiz →](/articles/{kategori}/{judul}/quiz)**
```

---

## 5. Template Quiz (quiz/questions.mdx)

```mdx
---
title: Quiz {Judul}
description: {jumlah} pertanyaan untuk uji pemahaman {judul} kamu.
---

# ❓ Quiz {Judul}

Uji pemahaman kamu tentang {judul} di {kategori}.

---

## Soal 1

{pertanyaan}

```code
{kode yang ditanya}
```

- A) {opsi A} ✅
- B) {opsi B}
- C) {opsi C}
- D) {opsi D}

---

## Soal 2

{pertanyaan selanjutnya}

- A) ...
- B) ...
- C) ...

---

## {Soal terakhir}

---

**Skor kamu:** ... / {jumlah}

> **Nilai:**
> - {jumlah}/5 → 🏆 Mantap! Kamu udah paham!
> - 3-4/5 → 👍 Lumayan, pelajari lagi yang kurang
> - 0-2/5 → 🔄 Coba baca [artikelnya](/articles/{kategori}/{judul}/) dulu ya!

Kembali ke [Artikel {Judul} →](/articles/{kategori}/{judul}/)
```

---

## 6. Template Tutorial

### intro.mdx
```mdx
---
title: Tutorial {Judul} — Introduction
description: Mulai tutorial {Judul} — prasyarat dan setup.
---

# 🎓 Tutorial {Judul}

## Introduction

{Deskripsi tutorial dan apa yang akan dipelajari}

**Yang bakal kamu pelajari:**
- {point 1}
- {point 2}
- {point 3}

---

## Prasyarat

Sebelum mulai, pastikan:

- ✅ {prasyarat 1}
- ✅ {prasyarat 2}
- ✅ Udah baca [Artikel {Judul}](/articles/{kategori}/{judul}/)
- ✅ Udah coba [Playground](/articles/{kategori}/{judul}/playground)

Kalau udah siap, lanjut ke **Part 1** 👇
```

### part1.mdx
```mdx
---
title: Tutorial {Judul} — Part 1: {Judul Part}
description: {Deskripsi part 1}
---

# Part 1: {Judul Part}

{Isi materi part 1 dengan kode contoh}

## Yang Perlu Diingat

| Kode | Arti |
|---|---|
| ... | ... |

Lanjuuut ke **[Part 2](/articles/{kategori}/{judul}/tutorial/{judul}/part2)**
```

### part2.mdx
```mdx
---
title: Tutorial {Judul} — Part 2: {Judul Part}
description: {Deskripsi part 2}
---

# Part 2: {Judul Part}

{Isi materi part 2}

Selanjutnya: **[Latihan](/articles/{kategori}/{judul}/tutorial/{judul}/exercise)** 👇
```

### exercise.mdx
```mdx
---
title: Tutorial {Judul} — Exercises
description: Latihan {Judul} dari level mudah sampai expert.
---

# Latihan {Judul} 🏋️

## Level 1: Mudah 🟢

{instruksi latihan 1}

## Level 2: Sedang 🟡

{instruksi latihan 2}

## Level 3: Expert 🔴

{instruksi latihan 3}

---

Kalo udah selesai, lanjut ke **[Project Mini →](/articles/{kategori}/{judul}/tutorial/{judul}/project)** 💪
```

### project.mdx
```mdx
---
title: Tutorial {Judul} — Project Mini
description: Bikin {Nama Project} dengan {Judul}.
---

# 🏗️ Project Mini: {Nama Project}

{misin project}

## Spesifikasi

```code
{kode spesifikasi}
```

## Expected Output

```
{keluaran yang diharapkan}
```

## Challenge Tambahan 🔥

{tantangan tambahan}

---

Selamat! 🎉 Kamu udah menyelesaikan tutorial {Judul}!

Lanjut ke **[Quiz →](/articles/{kategori}/{judul}/quiz)** buat uji pemahaman.
```

### summary.mdx
```mdx
---
title: Tutorial {Judul} — Summary
description: Ringkasan tutorial {Judul} dan langkah selanjutnya.
---

# Summary 🎯

Selamat! Kamu udah menyelesaikan **Tutorial {Judul}** 🎉

## Yang Udah Kamu Pelajari

- ✅ {point 1}
- ✅ {point 2}
- ✅ {point 3}

## Skill Baru Kamu 💪

Sekarang kamu bisa:
- {skill 1}
- {skill 2}

## Next Steps 🚀

| Aktivitas | Link |
|---|---|
| 📖 Baca artikel | [Artikel {Judul}](/articles/{kategori}/{judul}/) |
| 🎞 Tonton slide | [Slide Presentasi](/articles/{kategori}/{judul}/slide) |
| 🧪 Main playground | [Playground](/articles/{kategori}/{judul}/playground) |
| ❓ Kerjain quiz | [Quiz](/articles/{kategori}/{judul}/quiz) |
| 📚 Topik selanjutnya | [{Topik Selanjutnya}](/articles/{kategori}/{topik-selanjutnya}/) |
```

---

## 7. Workflow Pembuatan Konten

1. **Buat folder struktur**
   ```bash
   mkdir -p content/{kategori}/{article,playground,quiz,tutorial/{judul}}
   ```

2. **Buat Astro hub wrapper**
   ```bash
   touch articles/src/content/docs/{kategori}/{judul}.mdx
   ```

3. **Isi konten** - ikuti template di atas

4. **Update astro.config.mjs sidebar** (jika perlu)

5. **Dev & test**
   ```bash
   cd articles && npm run dev
   ```

---

## 8. Checklist QA

- [ ] Frontmatter lengkap (title, description)
- [ ] Link internal ke kategori/artikel lain valid
- [ ] Kode contoh dapat dijalankan
- [ ] Quiz ada minimal 3 soal
- [ ] Playground embed URL valid
- [ ] Tutorial ada intro → part → exercise → project → summary