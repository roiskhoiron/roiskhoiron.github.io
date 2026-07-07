# CodingSkuy Articles

Engineering knowledge base in Indonesian — from junior to senior. Built with Astro + Starlight.

## Features

- **Foundation** — Programming basics, roadmaps, professional mindset
- **Software Engineering** — Architecture, backend, mobile (Flutter), quality, devops
- **AI Engineering** — ML, generative AI, prompt engineering, RAG, agents, MCP
- **Engineering Decisions** — Trade-off analysis for tech & architecture choices
- **Governance** — Coding standards, code review, security, AI governance
- **Projects** — Step-by-step guides from beginner to advanced
- **Career** — Path, portfolio, interview, freelancing, personal branding
- **Handbooks** — Comprehensive engineering handbooks
- **Search** — Full-text search via Starlight
- **RSS Feed** — Auto-generated feed
- **Sitemap** — Auto-generated sitemap

## Tech Stack

- Astro 6 + Starlight
- MDX content with structured frontmatter
- Custom CSS theming
- GitHub Pages deployment

## Quick Start

```bash
git clone https://github.com/roiskhoiron/roiskhoiron.github.io.git
cd roiskhoiron.github.io/articles
npm install
```

## Development

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Production build
npm run preview   # Preview production build
```

## Content Structure

```
src/content/docs/
├── foundation/            # Programming, roadmaps, mindset
├── software-engineering/  # Architecture, backend, mobile, quality, devops
├── ai/                    # ML, gen AI, prompt, RAG, agent, MCP
├── decisions/             # Engineering decisions with trade-offs
├── governance/            # Standards, review, security, AI governance
├── projects/              # Beginner to advanced project guides
├── career/                # Path, portfolio, interview, freelancing
├── handbook/              # Engineering handbooks
└── about/                 # About CodingSkuy and author
```

Content organized by category subdirectories. Each article is a `.mdx` file with structured frontmatter.

## Customization

- **Theme** — Edit `src/styles/theme.css` for colors, fonts, spacing
- **Sidebar** — Add/remove categories in `astro.config.mjs` under `sidebar`
- **Content** — Add new `.mdx` files in the appropriate category folder
- **Config** — Update `astro.config.mjs` for base URL, social links, plugins

## License

MIT — Built for the Indonesian engineering community.
