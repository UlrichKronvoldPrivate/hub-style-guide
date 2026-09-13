# Adopting the hub design system in a project

The system is called **Skumring**. It ships as three things, and a project can
take any of them independently:

| Thing | What it is | Where |
|---|---|---|
| **The skill** | Guidance Claude Code loads automatically when it touches UI, so it builds on-identity without being told | `skills/hub-design-system/` |
| **The CSS** | `tokens.css` (every colour, size, shape, theme and seed) and `layout.css` (shell and page archetypes) | `skills/hub-design-system/references/` |
| **The components** | Twelve React components, each a `.tsx` plus a `.css` that reads only tokens | `src/components/` |

The Storybook (`npm run storybook`) is the reference for all three. It is not
something a project depends on.

---

## First: does the project already have a design system?

**If yes, stop here and read the precedence rule in `SKILL.md`.** A project
with its own tokens, a theme file, design guidance in `CLAUDE.md`, or its own
design agent keeps its look. The skill defers to it and only supplies the parts
that travel — layout archetypes, writing rules, the accessibility floor, the
behavioural rules and the tells to avoid — expressed through *that project's*
tokens. Do not introduce `--hub-*` tokens into a project that has its own.

Everything below is for a project that has **no** design system, or one that
has decided to adopt this one wholesale.

---

## Path A — let Claude do it (the skill)

This is the mechanism that actually delivers consistency across apps. Once the
skill is linked, any project on the machine gets it.

**Link it once per machine.** The skill directory is linked, not copied, so a
`git pull` here updates every project at once.

```powershell
# Windows — a junction, no admin needed
New-Item -ItemType Junction -Path "$HOME\.claude\skills\hub-design-system" -Target "<path-to-this-repo>\skills\hub-design-system"
```

```bash
# macOS / Linux
ln -s "<path-to-this-repo>/skills/hub-design-system" ~/.claude/skills/hub-design-system
```

Then, in the target project, start a Claude Code session and ask for UI work.
The skill triggers on its own for anything that touches HTML, CSS, React,
layout, colour, type or copy. You can also invoke it by name:
`/hub-design-system`.

**What to tell Claude on the first screen** (it will not know these):

- which **seed** the app uses (see *Seeds* below) — pick one, once
- which **archetype** the screen is — canvas, table, dashboard or reading
- anything the project's own `CLAUDE.md` should carry forward

Put the seed and any app-specific decisions in the project's `CLAUDE.md` so
later sessions inherit them:

```markdown
## Design
This app uses the hub design system (Skumring). Seed: `rye`.
Tokens come from `src/styles/tokens.css`; never hard-code a hex.
```

---

## Path B — wire it in by hand (the CSS)

### 1. Get the two files

**Simplest:** copy `tokens.css` and `layout.css` from
`skills/hub-design-system/references/` into the project's styles folder.
Note the commit you copied from.

**Cleaner:** install the repo as a git dependency and import by package path.
The repo is private, so this needs GitHub access on the machine that runs
`npm install`.

```bash
npm install github:UlrichKronvoldPrivate/hub-style-guide#<commit-or-tag>
```

```css
@import "hub-style-guide/tokens.css";
@import "hub-style-guide/layout.css";
```

Pin a commit. There is no semantic versioning yet; the token names are stable
but their values change when the identity does.

### 2. Load the fonts

Both faces come from Google Fonts. Declare them before the tokens.

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap">
```

If the font host is blocked, the stacks fall back to Helvetica Neue and the
system monospace. Nothing breaks; it just looks less like itself.

### 3. Set the seed

One line, once per app, on the root element. It reorders the sky and touches
nothing else — ink, action, status and surfaces are identical across seeds,
which is what keeps five apps recognisably one studio's work.

```html
<html data-seed="rye">
```

| Seed | Leads with | Feels |
|---|---|---|
| `glacier` (default — omit the attribute) | cold cyan-green | winter daylight |
| `rye` | warm straw | late afternoon |
| `dusk` | lilac | evening |
| `lichen` | grey-green | overcast |
| `rhubarb` | pink | dawn |

Do not invent a sixth colour. If an app genuinely needs its own seed, add a
block to `tokens.css` here and pull it.

### 4. Theme

`tokens.css` handles all three theme states on its own: an explicit
`data-theme="light"`, an explicit `data-theme="dark"`, and the un-stamped
default that follows the OS. A theme toggle only has to set the attribute:

```js
document.documentElement.setAttribute('data-theme', 'dark'); // or 'light'
```

`.dark` on any ancestor is an alias for the night theme, so React Flow's
`colorMode="system"` works with no extra wiring.

### 5. Style from tokens, never from values

```css
.thing {
  background: var(--hub-color-surface);
  border: 1px solid var(--hub-edge);
  border-radius: var(--hub-radius-plate);
  color: var(--hub-color-ink);
  backdrop-filter: var(--hub-glass);   /* every surface is glass; this makes it read as glass */
}
```

Tokens layer in three tiers — primitive → semantic → component. A component
names semantic or component tokens, never a primitive. **If a value you need
has no token, that is a design decision: add the token to this repo, don't
inline the value.**

The two rules people break first:

- **The action colour has two values.** `--hub-color-action` is for fills,
  indicators and edges. `--hub-color-action-text` is for links and quiet
  buttons — small type needs it to pass contrast on glass, and at night the
  fill value fails AA as text.
- **No drop shadows.** Elevation is a step in surface level (`-lowest`, `-low`,
  `surface`, `-high`, `-highest`). The `--hub-shadow-*` tokens are the lit top
  edge of glass, not a shadow.

### 6. Pick an archetype for each screen

`layout.css` ships the shell and four page skeletons. Start from one rather
than composing a page from scratch: `.hub-page--canvas`, `.hub-page--table`,
`.hub-page--dashboard`, `.hub-page--reading`. The reasoning, the scroll rules
and the placement table are in `skills/hub-design-system/references/layout.md`.

Breakpoints are literal constants — a media query cannot read a custom
property — at **720px** (one column) and **1100px** (side panel becomes an
overlay).

### 7. Components

There is no npm package for the React components yet. Copy the folders you
need from `src/components/`. Each is self-contained — a `.tsx` and a `.css`
that reads only tokens — and has no dependencies except:

- `Canvas/` needs `@xyflow/react`
- everything else needs only React

Copy the folder, keep the file names, and diff against this repo when you
pull updates. If you are not using React, the same components are written as
plain CSS recipes in `skills/hub-design-system/references/components.md`.

For a React Flow canvas, apply the `--xy-*` map in `src/components/Canvas/canvas.css`
— it points every React Flow variable at a semantic token, so the graph
follows the theme and the seed for free.

---

## Before calling a screen done

This is the checklist the skill applies to its own work. Apply it to yours.

- Every colour comes from a token; no literal hex in component CSS.
- The page is one of the four archetypes — or you have said why it is not —
  with exactly one scroll container.
- Both themes checked: light, night, and the un-stamped system default.
- Coloured (Skagen + flare) area on surfaces is under a twentieth; the sky
  does not count.
- No drop shadows; anything raised is a higher surface level.
- Keyboard focus is visible on every interactive element.
- Running text is at most 66ch; headings balance.
- Any chart's labels are HTML, not SVG text.
- Nothing depends on hover alone to be discoverable.
- No item from the tells table in `SKILL.md` is present.

---

## Keeping in sync

The skill directory is the source of truth for everything — the Storybook
imports its CSS from there rather than keeping a copy, precisely so the
guidance and the rendered components cannot drift.

- **Skill users:** `git pull` in this repo. The junction means every project
  sees the change immediately.
- **Copied CSS:** re-copy the two files and diff. Token *names* are stable;
  values move when the identity does.
- **Git dependency:** bump the pinned commit.

Changes to the identity are made here, verified in the Storybook in both
themes, and committed. Never patch a token locally in a consuming project —
that is how five apps stop looking like one.
