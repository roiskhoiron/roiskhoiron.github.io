# AGENTS.md

Instructions for any AI coding agent (Claude Code, Codex, Gemini CLI, Cursor, OpenCode…)
working in this repository. Humans: the same rules apply to you.

## What this is

The personal site of Khoiron Rois (khoirlabs / CodingSkuy): Svelte 4 + Vite, hash
routing, deployed to GitHub Pages from `master` by `.github/workflows/deploy.yml`.
Content: 100 decks, 100 carousels, 100 notes, 19 videos.

## Commands

| Command | What it does |
|---|---|
| `bun install` | install (CI uses `bun install --frozen-lockfile`) |
| `bun run dev` | dev server |
| `bun run build` | design check (strict) → vite build → share pages + preview images |
| `bun run tokens` | regenerate token outputs from `src/design/tokens.json` |
| `bun run design:check` | reject raw colours/fonts/easings, report off-scale values |
| `bun run design:shots` | screenshots on 3 palettes × 2 widths (needs Playwright) |
| `bun run check` | Svelte + TypeScript type check |

## Map

- `src/design/tokens.json` — **design tokens, the single source of truth**
- `src/design/tokens.css` — generated, never edit
- `src/styles.css` — global styles and component classes (uses tokens only)
- `src/views/` — one component per page/feature; `DesignSystem.svelte` is the live docs
- `src/lib/` — router, content loading, motion (`fx.ts`), sharing, palettes
- `src/lib/packs/<id>/` — content packs (`meta.ts` eager, `content.ts` lazy)
- `scripts/` — tokens, design check, share pages, screenshots
- `docs/design/` — `DESIGN_SYSTEM.md` (rules) and `TOKENS.md` (generated)

## Rules for UI work

Read `docs/design/DESIGN_SYSTEM.md` first. In short:

1. Use tokens and existing classes. No hex colours, font names, `cubic-bezier()` or
   off-scale radius/shadow/duration in components. Deliberate exceptions (e.g. mock-ups
   of other platforms) go between `design-exception:start <reason>` / `design-exception:end`.
2. Accent fills carry `--ink` text. Text passes AA on all six palettes.
3. Motion: `transform`/`opacity` only, `--spring` or `--ease`, `--dur-*`. Must work with
   `prefers-reduced-motion`.
4. New component or token → update `/designsystem` (`src/views/DesignSystem.svelte`) and
   `docs/design/DESIGN_SYSTEM.md` in the same commit.
5. Done means: `bun run check` clean, `bun run build` passes, `design:shots` reviewed
   (no overflow, nothing clipped) on desktop and phone.

For a full UI/UX task, follow `.claude/skills/uiux-workflow/SKILL.md` (Claude Code:
`/uiux-workflow`), which uses the `uiux-designer` and `uiux-reviewer` agents.

## Rules for content

Content packs are validated for format and voice; keep Bahasa Indonesia, address the
reader as "kamu", no invented statistics, no first-person anecdotes except in the Agent
Workflow series (the owner's own projects).

## Never

- Commit secrets, or edit generated files by hand (`tokens.css`, `TOKENS.md`, the
  palette block in `index.html`).
- Push to `master` without the owner's go-ahead in the current conversation.
