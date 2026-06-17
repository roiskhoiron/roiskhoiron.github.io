---
theme: default
title: Python Developer – Panduan Lengkap
transition: slide-left
fonts:
  sans: 'Nunito, Plus Jakarta Sans, Inter'
  mono: 'JetBrains Mono'
---

# Python Developer

## Untuk Semua Tingkat

**CodingSkuy** — Platform Belajar Python untuk Anak & Remaja Indonesia

---
layout: section
---

# Kenapa Python?

---
layout: fact
---

# Simpel, Kuat, Populer

---
layout: default
---

# 5 Kompetensi Utama

| | Skill | Dampak |
|---|---|---|
| 🐍 | **Syntax Friendly** | Mudah dipelajari, cocok untuk pemula |
| 📦 | **Package Ecosystem** | Ribuan library untuk AI, web, data |
| 🧪 | **Testing** | `pytest` memudahkan kualitas kode |
| 🛠️ | **Tooling** | IDE, lint, formatter otomatis |
| 🤖 | **AI Integration** | Copilot, OpenAI, HuggingFace |

---
layout: section
---

## Pendekatan Berdasarkan Usia

---
layout: default
---

### 👶 Anak SD (6‑10 th)

- **Visual Blocks** → ScratchPython (Blockly)
- **Logic Games** → Code.org Maze
- **Result**: Algoritma dasar, urutan langkah

---
layout: default
---

### 👦 SMP (11‑13 th)

- **Text Coding** → Python REPL di Replit
- **Mini‑project** → Tebak Angka, Quiz Bot sederhana
- **AI** → Prompt Copilot untuk fungsi

---
layout: default
---

### 🧑‍💻 Remaja (14‑18 th)

- **Full Stack** → Flask API, SQLite
- **Data Science** → Pandas, Matplotlib
- **AI** → HuggingFace Transformers, OpenAI API

---
layout: section
---

# Studi Kasus: Quiz Bot dengan OpenAI

---
layout: default
---

## Langkah 1 — Siapkan API Key

```bash
export OPENAI_API_KEY=YOUR_KEY_HERE
```

---
layout: default
---

## Langkah 2 — Kode Python

```python
import os, openai
openai.api_key = os.getenv('OPENAI_API_KEY')

def buat_soal(topik):
    resp = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{'role':'system','content':'Buat soal pilihan ganda Python.'},
                  {'role':'user','content':topik}]
    )
    return resp['choices'][0]['message']['content']

print(buat_soal('Loop while di Python'))
```

---
layout: default
---

## Langkah 3 — Jalankan & Uji

```bash
python quiz_bot.py
```

---
layout: default
---

# Roadmap 3 Bulan

| Bulan | Fokus | Tools | Artefak |
|---|---|---|---|
| **1** | Logika & Visual | ScratchPython, Blockly | Storyboard |
| **2** | Text Coding & AI | Replit, Copilot | Quiz Bot Mini |
| **3** | Full Stack & Data | Flask, Pandas, HuggingFace | Web API + Dashboard |

---
layout: default
---

# Tips untuk Orang Tua & Guru

| ✅ Lakukan | ❌ Hindari |
|---|---|
| Coding bersama | Menyerahkan semua ke AI |
| Rayakan tiap langkah kecil | Membandingkan dengan teman |
| Fokus pada konsep, bukan tool | Terlalu cepat pakai library kompleks |

---
layout: quote
---

"*Programming isn't about typing code, it's about solving problems.*"

— **Grace Hopper**

---
layout: default
---

# Mulai Sekarang!

[Klik di sini untuk mulai belajar Python](/articles/python/article)

---
layout: default
---

**CodingSkuy** — Belajar Coding untuk Anak Indonesia 🇮🇩
