# hub-style-guide

The house style shared by every hub app — tokens, components, canvas rules and
UI copy — so a handful of separate projects read as one studio's work.

The identity is called **Skumring** — Danish for dusk. The page ground is a
dusk sky built from five pastel glazes; everything on it is tonal glass that
takes the sky's hue, elevation is a step in tone rather than a shadow, and each
app sets a `data-seed` that reorders the sky. Klint holds the structure; the
Panton is in the atmosphere.

## Run it

```bash
npm install
npm run storybook
```

Storybook opens on <http://localhost:6006>. The **Theme** control in the toolbar
switches every story — canvases included — between daylight and winter night.

| Script | What it does |
|---|---|
| `npm run storybook` | Dev server on port 6006 |
| `npm run build` | Static build into `storybook-static/` |
| `npm run typecheck` | `tsc --noEmit` over `src` and `.storybook` |

Requires Node 22.12+ (Storybook 10 is ESM-only).

## What's here

| Path | What it is |
|---|---|
| [`skills/hub-design-system/`](skills/hub-design-system/) | The design system as a Claude Code skill. Linked into `~/.claude/skills/`, so every project builds on-identity. |
| [`skills/hub-design-system/references/tokens.css`](skills/hub-design-system/references/tokens.css) | **Source of truth.** Every colour, size and shape in the system. |
| [`src/components/`](src/components/) | Button, Field, Plate, Chip, DataTable, EmptyState, and the React Flow canvas node. |
| [`src/docs/`](src/docs/) | Storybook docs pages — colour, typography, space and shape, writing. |
| [`docs/skumring.html`](docs/skumring.html) | The identity as a standalone page — day/night and the seeds side by side, plus a Material 3 scorecard. |
| [`docs/identity.html`](docs/identity.html) | The earlier identity, Porcelain & Voltage. Kept for the reasoning; superseded by Skumring. |

The token file lives with the skill rather than under `src/`, and the Storybook
imports it from there. One copy, so the guidance Claude loads and the components
rendered here cannot drift apart.

## Adopting it in a project

The full instructions — skill vs. hand-wired, seeds, themes, archetypes,
components, and the definition of done — are in [ADOPTING.md](ADOPTING.md).
The short version follows.

## Using the tokens in another app

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="tokens.css">
```

Then style from the custom properties — never a literal hex:

```css
.thing {
  background: var(--hub-color-surface);
  border: 1px solid var(--hub-color-line);
  border-radius: var(--hub-radius-plate);
  color: var(--hub-color-ink);
}
```

Tokens layer in three tiers, the way Material 3 layers reference, system and
component tokens:

```
--hub-skagen-40   →   --hub-color-action   →   --hub-button-primary-bg
   primitive              semantic                  component
```

A component never names a primitive. That indirection is what makes a theme
swap possible, and it is why one toolbar control re-themes every story without
any component knowing about it.

## React Flow

`tokens.css` treats `.dark` as an alias for the night theme, so a canvas with
`colorMode="system"` follows the app with no extra wiring. The full `--xy-*`
map is in
[`references/react-flow.md`](skills/hub-design-system/references/react-flow.md)
and applied in [`src/components/Canvas/canvas.css`](src/components/Canvas/canvas.css).

## The skill

`skills/hub-design-system/` is junctioned into `~/.claude/skills/`, so Claude
Code loads it in any project when the work touches UI. Edits here take effect
everywhere immediately.

To link it on another machine:

```powershell
New-Item -ItemType Junction -Path "$HOME\.claude\skills\hub-design-system" -Target "<repo>\skills\hub-design-system"
```

## Six rules

1. Voltage stays under five percent.
2. Glazes stay flat.
3. Lines mean connection.
4. One family, weight does the work.
5. Radius is a role, not a habit.
6. Semantic colour is separate.

The reasoning behind each is in
[`SKILL.md`](skills/hub-design-system/SKILL.md) and, at more length, in the
Introduction page of the Storybook.

## Version pins

TypeScript is pinned to 5.x rather than 7.x: it does nothing here but
typecheck stories, and Storybook 10's own type definitions have not been
validated against the new compiler. Worth revisiting once that settles.
