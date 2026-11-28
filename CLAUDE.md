@AGENTS.md

## Claude Code specifics

- UI/UX tasks: run the `/uiux-workflow` skill. It plans in tokens, builds with the
  `uiux-designer` agent and gets an independent read-only review from `uiux-reviewer`.
- The live design docs are at `/designsystem` (`src/views/DesignSystem.svelte`).
