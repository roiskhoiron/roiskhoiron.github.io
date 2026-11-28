---
name: uiux-workflow
description: End-to-end workflow for any UI/UX change on the khoirlabs site (new component, section, page, restyle, motion). Plans in design tokens, builds with the uiux-designer agent, verifies with design:check and screenshots, and gets an independent review from uiux-reviewer. Use whenever a visitor-visible change is requested.
---

# UI/UX workflow

Goal: every visual change looks like it was designed by the same person, because it
was built from the same tokens and checked the same way.

## 1. Understand the request

- Restate the change in one sentence and list the routes it touches.
- Read `docs/design/DESIGN_SYSTEM.md` (rules) and `docs/design/TOKENS.md` (values).
- Look at the current UI: `bun run build && bun run design:shots <routes>` for a baseline.

## 2. Plan in tokens (before any code)

Write a short plan with:
- Existing classes/components to reuse (grep `src/styles.css`, `src/views/`).
- For each new visual value: the token it maps to. Unmapped values are a decision:
  nearest token, or a new token in `src/design/tokens.json` with a `$description`.
- The micro-interaction for every interactive element.
- Accessibility: focus, aria state, keyboard path, reduced motion.

Show the plan to the user when the change is large or adds tokens.

## 3. Build

Delegate to the `uiux-designer` agent with the plan, or follow its instructions
(`.claude/agents/uiux-designer.md`) yourself for small changes.

## 4. Verify (all must pass)

```bash
bun run tokens            # only if tokens.json changed
bun run check
bun run design:check --strict
bun run build
bun run design:shots <routes>
```

Open the screenshots: three palettes × desktop and phone. Fix overflow, clipping and
unreadable text before review.

## 5. Independent review

Run the `uiux-reviewer` agent on the diff and the screenshot folder. Address every
"changes needed" finding, re-run step 4, and repeat until it approves.

## 6. Document and ship

- New component or token → `src/views/DesignSystem.svelte` and
  `docs/design/DESIGN_SYSTEM.md`, same commit.
- Commit with a message that names the tokens added or changed.
- Push to the working branch; deploy to `master` only with the owner's go-ahead.
