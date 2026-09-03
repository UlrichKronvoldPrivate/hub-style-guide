# hub-style-guide

The house style shared by every hub app — tokens, components, canvas rules and
UI copy — so a handful of separate projects read as one studio's work.

The identity is called **Porcelain & Voltage**: Klint by default, Panton on
purpose. Nordic restraint holds the structure, and saturated colour is rationed
to the places where it changes what someone does.

## What's here

| Path | What it is |
|---|---|
| [`docs/identity.html`](docs/identity.html) | The visual identity, as a page you can look at. Palette, type, space, canvas rules, and the tells that make a UI look generated. |
| [`skills/hub-design-system/`](skills/hub-design-system/) | A Claude Code skill carrying the whole system, so any project builds on-identity without pasting values. |
| [`skills/hub-design-system/references/tokens.css`](skills/hub-design-system/references/tokens.css) | The token file. Source of truth for every colour, size and shape in the system. |

## Using the tokens in an app

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
--hub-cobalt-50   →   --hub-color-action   →   --hub-button-primary-bg
   primitive             semantic                   component
```

A component never names a primitive. That indirection is what makes a theme
swap possible.

## The skill

`skills/hub-design-system/` is linked into `~/.claude/skills/`, so Claude Code
loads it in any project when the work touches UI. Edits here take effect
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

The reasoning behind each is in [`docs/identity.html`](docs/identity.html).
