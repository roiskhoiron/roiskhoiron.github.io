# khoirlabs design system

The text version of <https://roiskhoiron.github.io/designsystem/>. Read this before
changing anything a visitor can see. Token values live in [`TOKENS.md`](TOKENS.md)
(generated) and their source, [`src/design/tokens.json`](../../src/design/tokens.json).

## 1. Principles

1. **Loud, but readable.** Colour and tilted shapes are allowed; text must pass WCAG AA
   on every palette. The noise lives in shape and motion, never in the text.
2. **Accents carry ink.** Accent fills (`--a1 --a2 --a3`) always hold `--ink` text.
   Never put `--fg` on an accent: on dark palettes it becomes unreadable.
3. **One source of truth.** Every value comes from `tokens.json`. A hex colour, font
   name or easing written in a component is rejected by `bun run design:check`.
4. **Motion is feedback.** Everything you can touch answers with the spring
   (`--spring`). Animate `transform`, `opacity`, `translate`, `scale`, `rotate` only.
5. **Everyone is invited.** `prefers-reduced-motion` turns all motion off; every control
   is reachable by keyboard; touch targets are at least 40 px (primary 48 px+).
6. **Content first.** Decoration (stickers, blobs, marquee) lives in empty space, never
   on top of text.

## 2. Colour

Six palettes; one is dealt at random per visit and the remix button (or `C`) cycles them.
Components never know which palette is active, they only use **roles**:

| Role | Use |
|---|---|
| `--bg` | page background |
| `--fg` | main text, thick outlines, default lift colour |
| `--card` | raised surfaces (cards, sheets, header) |
| `--a1` | primary accent: primary buttons, active pager, highlighter |
| `--a2` | secondary accent: decorative lift, `.no` badges |
| `--a3` | tertiary accent: hover fills |
| `--ink` | text on any accent |
| `--soft` | secondary text (derived) |
| `--line` | hairlines and quiet borders (derived) |
| `--scrim` | backdrop behind dialogs |

Do: ink on accents, accents as lift colours (`box-shadow: var(--lift-4) var(--a2)`),
accents for hover. Don't: hex in components, `--fg` on accents, long accent-coloured
text on `--bg`.

## 3. Type

| Token / class | Family | Use |
|---|---|---|
| `--text-display` `.display` | Anybody 800, uppercase | home hero only |
| `--text-h1` `.h1` | Anybody 800, uppercase | one per page |
| `--text-h2` `.h2` | Anybody 800 | section heads (with `.no`) |
| `--text-h3` `.h3` | Anybody 750 | card and item titles |
| `--text-lead` `.lead` | Onest | intro under the h1, ≤ 54ch |
| `--text-body` | Onest | body |
| `--text-small` `.small` | Onest | notes |
| `--text-label` `.label` | Onest 700, uppercase, 0.1em | metadata |
| `--mono` | JetBrains Mono | code only |

Headlines use `use:split` (letters spring in and stretch on hover). Emphasis uses the
highlighter `.hl`; links use `.link`.

## 4. Shape and lift

- Outline: `var(--border-base) solid var(--fg)` (2 px). Quiet borders: `var(--line)`.
- Radius scale: `--radius-xs 4 · sm 8 · md 12 · lg 16 · xl 20 · card 26 · stage 32 · pill 999`,
  plus `--radius-mark` (highlighter) and the hover shapes `--radius-blob-a|b|c`.
- Lift = hard shadow, no blur: `--lift-1 … --lift-7` (3 → 14 px). Colour is `--fg` or an accent.
  Hover grows the lift one or two steps; press removes it and translates by the same amount.

## 5. Space and layout

`--space-1 … --space-16` (4 → 64 px) for new components; 1–3 px optical nudges may stay
raw. Spacing is not machine-checked yet, so reviewers check it by eye. Max width `--wrap`, side
padding `--gutter`. Below 900 px the nav becomes the floating tab bar.

## 6. Motion

| Token | Value | Use |
|---|---|---|
| `--spring` | cubic-bezier(0.34, 1.56, 0.64, 1) | anything that moves |
| `--ease` | cubic-bezier(0.2, 0.8, 0.2, 1) | fades, colour changes, colour floods, scroll |
| `--sway` | cubic-bezier(0.42, 0, 0.58, 1) | ambient loops (drift, wave, pulse) |
| `--dur-1 … --dur-7` | 200 → 900 ms | colour → long glides |
| `--dur-loop-fast` · `--dur-loop` · `--dur-drift` | 1.6 s · 3 s · 28 s | ambient loops |

Every `transition`/`animation` takes its duration from `--dur-*` and its easing from
`--spring`, `--ease`, `--sway` (or `linear` for constant motion). `design:check` enforces
this for the `transition` and `animation` shorthands. It does not see longhand
properties (`animation-delay`, used for staggers) or a transition that names no easing
at all; reviewers check those by eye.

Named patterns (keyframes in `styles.css`): `pop` (active choice), `rise` (slide
content), `hop` (tab bar icon), `wave`, `flip-in` (new page of items), `slide-in` /
`slide-back` (slide direction), `view-in` (route change), plus `confetti()` and
`remix()` in `src/lib/fx.ts` / `palette.ts`. Global helpers: custom cursor with
contextual labels (`data-cursor="…"`), magnetic buttons, 3D tilt with glare,
staggered scroll reveal, count-up (`use:countUp`), stickers (`use:fling`).

## 7. Components

| Component | Markup / API | Notes |
|---|---|---|
| Button | `.btn .btn-ink` / `.btn .btn-line` | one primary per area, ≥ 50 px tall |
| Tab / filter | `.tabs > .tab[aria-pressed]` | state through `aria-pressed` |
| Field | `label.field > svg + input` | lift + icon spin on focus |
| Tag | `.tag` | lowercase keywords |
| Highlighter, link | `.hl`, `.link` | |
| Section head | `.section-head > .no + .h2` | numbered sections |
| Deck card | `article.card > .tabmark, .count, h3 a.stretch` | whole card clickable |
| Carousel tile | `article.tile` | 4:5, accent fill, slight tilt |
| List entry | `article.entry` | fill sweep + blob shape on hover |
| Door | `article.path` | A/B/C choices on home |
| Stats | `.stats > div > .n[use:countUp]` | |
| Sticker | `.sticker[use:fling]` | decoration only |
| Pager | `<Pager base page pages total size anchor>` | page in the URL |
| Share | `<ShareButton item variant>` + `ShareSheet` / `ShareStudio` | |
| Player | `DeckPlayer` (`.slide`), `PostPlayer` (`.frame`) | swipe + keys |

Rules: a stretched link (`a::after { inset: 0 }`) covers the card, so any button inside
needs its own layer (`position: relative; z-index: 2`) and its parent must not create
a lower stacking context (watch `opacity < 1`). Use `<div>` rather than `<footer>` inside
components (the site footer is styled globally).

## 8. Accessibility checklist

- [ ] Text passes AA on all six palettes (see the contrast tables on /designsystem).
- [ ] Visible focus (3 px `--a1` outline) on every control.
- [ ] Dialogs trap focus, close on Esc, restore focus.
- [ ] State via `aria-pressed`, `aria-current`, `aria-selected` — not colour alone.
- [ ] Targets ≥ 40 px; primary actions ≥ 48 px.
- [ ] Works with `prefers-reduced-motion: reduce`.
- [ ] Swipe always has a button and keyboard alternative.

## 9. Adding or changing UI — definition of done

1. Map every value to an existing token. Need a new one? Add it to `tokens.json`,
   run `bun run tokens`, and document why.
2. Build with existing classes and components first.
3. `bun run design:check --strict` passes (CI runs it on every build).
4. Screenshots on three palettes (Pasar Malam, Es Krim, Kobalt) at 1280 px and 390 px:
   `bun run design:shots`. No horizontal scroll, nothing clipped, contrast holds.
5. Keyboard and reduced-motion pass.
6. New components or tokens appear on `/designsystem` and in this file, in the same commit.
