# Design tokens

Generated from `src/design/tokens.json` by `bun run tokens`. Do not edit by hand.

## Palettes

| Palette | bg | fg | card | a1 | a2 | a3 |
|---|---|---|---|---|---|---|
| Pasar Malam | `#17102b` | `#f6f0ff` | `#241a40` | `#c6ff3d` | `#ff6fae` | `#5ee6ff` |
| Es Krim | `#fff4e0` | `#1d1433` | `#ffffff` | `#ff6b4a` | `#b79bff` | `#3ddbc0` |
| Tropis | `#06342f` | `#f3ffe9` | `#0b4a43` | `#ffd23f` | `#ff8a65` | `#9ef01a` |
| Kobalt | `#1230d9` | `#ffffff` | `#1f40f0` | `#ffe14a` | `#ff9ad6` | `#7dffb0` |
| Permen | `#ffd9ec` | `#2a0f3d` | `#fff3f9` | `#9d7bff` | `#ff6b88` | `#2fd3a6` |
| Senja | `#2b0f1f` | `#ffeede` | `#3d1a2e` | `#ff9f1c` | `#ff5c8a` | `#b8f2e6` |

Runtime variables set by the active palette: `--bg --fg --card --a1 --a2 --a3`. Accents always carry `--ink` text.

## color

| Variable | Value | Use |
|---|---|---|
| `--ink` | `#14101f` | Text on every accent fill (a1, a2, a3). Never use fg on an accent. |
| `--code-ink` | `#f6f0ff` | Text inside dark code blocks (background is ink). |
| `--white` | `#ffffff` | Pure white for the difference-blend cursor, text on photos and video, and print. |
| `--black` | `#000000` | Video letterbox and print text. |
| `--scrim` | `rgba(14, 16, 20, 0.55)` | Backdrop behind dialogs (search, share). |
| `--glare` | `rgba(255, 255, 255, 0.28)` | Pointer-following highlight on tilting cards. |

## derived

| Variable | Value | Use |
|---|---|---|
| `--line` | `color-mix(in srgb, var(--fg) 24%, transparent)` | Hairlines and quiet borders. |
| `--soft` | `color-mix(in srgb, var(--fg) 74%, var(--bg))` | Secondary text. |
| `--code-soft` | `color-mix(in srgb, var(--code-ink) 78%, transparent)` | Secondary text inside dark code areas. |

## font

| Variable | Value | Use |
|---|---|---|
| `--display` | `'Anybody Variable', Anybody, system-ui, sans-serif` | Headlines. Variable width axis (font-stretch 50–150%) is part of the personality. |
| `--sans` | `'Onest Variable', Onest, system-ui, sans-serif` | Body text and UI. |
| `--mono` | `'JetBrains Mono Variable', ui-monospace, monospace` | Code only. Not loaded on pages without code. |

## text

| Variable | Value | Use |
|---|---|---|
| `--text-display` | `clamp(2.7rem, 9.4vw, 7.2rem)` | Home hero only. |
| `--text-h1` | `clamp(2.2rem, 6.4vw, 4.6rem)` | One per page. |
| `--text-h2` | `clamp(1.5rem, 3.6vw, 2.5rem)` | Section heads. |
| `--text-h3` | `1.25rem` | Card and item titles. |
| `--text-lead` | `clamp(1.05rem, 1.7vw, 1.25rem)` | Intro paragraph under an h1. |
| `--text-body` | `1rem` |  |
| `--text-small` | `0.92rem` |  |
| `--text-label` | `0.72rem` | Uppercase metadata, letter-spacing 0.1em. |

## radius

| Variable | Value | Use |
|---|---|---|
| `--radius-xs` | `4px` |  |
| `--radius-sm` | `8px` |  |
| `--radius-md` | `12px` |  |
| `--radius-lg` | `16px` |  |
| `--radius-xl` | `20px` |  |
| `--radius-card` | `26px` | Cards, panels, tiles. Alias --r. |
| `--radius-stage` | `32px` | Slides and story frames. |
| `--radius-pill` | `999px` | Buttons, chips, tags, header. |
| `--radius-mark` | `0.16em` | Highlighter behind words (scales with the text). |
| `--radius-blob-a` | `46px 14px 46px 14px` | Hover shape of the A/B/C path cards. |
| `--radius-blob-b` | `40px 12px 40px 12px` | Hover shape of principle items. |
| `--radius-blob-c` | `14px 40px 14px 40px` | Hover shape of list entries. |

## border

| Variable | Value | Use |
|---|---|---|
| `--border-hair` | `1.5px` |  |
| `--border-base` | `2px` | The default outline of every sticker-like element. |

## lift

| Variable | Value | Use |
|---|---|---|
| `--lift-1` | `3px 3px 0` |  |
| `--lift-2` | `4px 4px 0` | Buttons, tab bar. |
| `--lift-3` | `5px 5px 0` | Header, primary button. |
| `--lift-4` | `8px 8px 0` | Feature cards, frames, mocks. |
| `--lift-5` | `10px 10px 0` | Hero card, share sheet. |
| `--lift-6` | `12px 12px 0` | Slides; card hover. |
| `--lift-7` | `14px 14px 0` | Hover state of large cards. |

## space

| Variable | Value | Use |
|---|---|---|
| `--space-1` | `4px` |  |
| `--space-2` | `8px` |  |
| `--space-3` | `12px` |  |
| `--space-4` | `16px` |  |
| `--space-5` | `20px` |  |
| `--space-6` | `24px` |  |
| `--space-8` | `32px` |  |
| `--space-10` | `40px` |  |
| `--space-12` | `48px` |  |
| `--space-16` | `64px` |  |

## layout

| Variable | Value | Use |
|---|---|---|
| `--wrap` | `1160px` | Max content width. |
| `--gutter` | `clamp(16px, 4vw, 36px)` | Page side padding. |

## ease

| Variable | Value | Use |
|---|---|---|
| `--spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | The signature overshoot. Default for anything that moves. |
| `--ease` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Fades, colour floods, scroll-linked motion. |

## duration

| Variable | Value | Use |
|---|---|---|
| `--dur-1` | `200ms` | Colour and background changes. |
| `--dur-2` | `300ms` | Hover lifts, chips. |
| `--dur-3` | `400ms` | Spins, pops. |
| `--dur-4` | `500ms` | Card shape changes, page items. |
| `--dur-5` | `600ms` | Reveals. |
| `--dur-6` | `700ms` | Big playful moves (stickers, A/B/C letters). |
| `--dur-7` | `900ms` | Long glides (pager scroll, colour flood). |
| `--dur-loop` | `3s` | Ambient attention loops (resume nudge). |
