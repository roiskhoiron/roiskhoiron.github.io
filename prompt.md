# PLAN.md

# RoisKhoiron.github.io Evolution Plan

## Vision

Transform `roiskhoiron.github.io` from a multi-page portfolio into a **learning and knowledge platform**.

The website should support multiple learning experiences:

* Portfolio
* Articles
* Tutorials / Bootcamps
* Slides / Presentations
* Project Showcase
* Interactive Playground (future)

The platform should remain:

* Fully static
* Hosted on GitHub Pages
* Single domain
* SEO friendly
* Markdown first
* Easy to maintain

---

# Guiding Principles

## 1. Framework follows content

Do NOT organize the project around frameworks.

Avoid:

* React section
* Astro section
* Slidev section

Instead organize around user experiences:

* Read
* Learn
* Watch
* Build

---

## 2. Existing apps remain stable

Current apps:

* MainApp
* CodingSkuyApp
* ChefGenieApp

must continue to work.

No migration is required initially.

---

## 3. Astro becomes the knowledge engine

Astro + Starlight will serve:

* Articles
* Tutorials
* Bootcamps

Routes:

/articles
/tutorials

---

## 4. Slidev becomes presentation engine

Slidev serves:

* Short presentations
* Workshop materials
* Conference slides

Routes:

/slides

---

# Proposed Repository Structure

roiskhoiron.github.io/

├── src/
│
│   ├── apps/
│   │
│   │   ├── main/
│   │   │
│   │   ├── codingskuy/
│   │   │
│   │   └── chefgenie/
│
│   ├── components/
│   ├── hooks/
│   ├── contexts/
│   ├── assets/
│   └── utils/
│
├── articles/                    # Astro + Starlight
│
│   ├── astro.config.mjs
│   ├── package.json
│   │
│   └── src/
│
│       └── content/
│
│           ├── articles/
│           │
│           │   ├── flutter/
│           │   ├── backend/
│           │   ├── ai/
│           │   └── software-engineering/
│
│           └── tutorials/
│
│               ├── flutter/
│               ├── backend/
│               └── ai/
│
├── slides/
│
│   ├── flutter-null-safety/
│   │   └── slides.md
│
│   ├── mcp-server/
│   │   └── slides.md
│
│   └── ai-agent/
│       └── slides.md
│
├── public/
│
├── scripts/
│
└── .github/
└── workflows/

---

# Target Routes

/

Portfolio

/articles

Knowledge articles

/tutorials

Bootcamps and complete guides

/slides

Interactive presentations

/chefgenie

ChefGenie showcase

/codingskuy

CodingSkuy showcase

---

# Content Taxonomy

Each topic may have:

Topic

├── Article
├── Slide
├── Tutorial
└── Playground

Example:

Flutter Null Safety

├── Article
├── Slide
├── Tutorial
└── Example Project

---

# Future Direction

The repository evolves into:

Portfolio
+
Knowledge Base
+
Tutorial Platform
+
Slide Presentations
+
Interactive Playground

without introducing a backend.

Everything remains static and deployable to GitHub Pages.
