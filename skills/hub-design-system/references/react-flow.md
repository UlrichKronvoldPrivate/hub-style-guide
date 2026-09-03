# Canvas — React Flow

Node graphs are the thing built most often here, so they get first-class rules
instead of default styling. Everything below assumes `references/tokens.css` is
loaded and React Flow's own stylesheet is imported first, so our overrides win.

```js
import '@xyflow/react/dist/style.css';
import './tokens.css';
import './canvas.css';
```

## Variable map

React Flow exposes `--xy-*` custom properties. Map them onto semantic tokens —
never onto primitives.

```css
.react-flow {
  --xy-background-color: var(--hub-color-ground);

  /* edges: idle edges recede, only live ones earn cobalt */
  --xy-edge-stroke-default:          var(--hub-color-line-strong);
  --xy-edge-stroke-selected-default: var(--hub-color-action);
  --xy-edge-stroke-width-default:    1.5;
  --xy-connectionline-stroke-default:      var(--hub-color-action);
  --xy-connectionline-stroke-width-default: 1.5;

  /* nodes are plates, not white boxes */
  --xy-node-background-color-default: var(--hub-color-surface);
  --xy-node-border-default:  1px solid var(--hub-color-line-strong);
  --xy-node-color-default:   var(--hub-color-ink);
  --xy-node-group-background-color-default: var(--hub-color-surface-sunken);
  --xy-node-boxshadow-hover-default:    var(--hub-shadow-plate);
  --xy-node-boxshadow-selected-default: 0 0 0 2px var(--hub-color-action-soft);

  /* handles are hit targets, so maximum contrast */
  --xy-handle-background-color-default: var(--hub-color-ink);
  --xy-handle-border-color-default:     var(--hub-color-surface);

  /* chrome matches every other plate */
  --xy-controls-button-background-color-default: var(--hub-color-surface);
  --xy-controls-button-border-color-default:     var(--hub-color-line);
  --xy-minimap-background-color-default:         var(--hub-color-surface-sunken);
  --xy-resize-background-color-default:          var(--hub-color-action);
  --xy-selection-background-color-default:       var(--hub-color-action-soft);
  --xy-selection-border-default: 1px solid var(--hub-color-action);
}
```

Set `colorMode="system"` on `<ReactFlow>`. It stamps `.dark` / `.light` on the
root, and `tokens.css` already treats `.dark` as an alias for the night theme,
so the canvas follows the app with no extra wiring.

## Node anatomy

Every node is a **header** and a **body**.

```
┌──────────────────────────────┐
│ ▪  Fetch table               │  header: category square + name at label size
├──────────────────────────────┤
│ statbank / FOLK1A            │  body: one line of real config, in mono
└──────────────────────────────┘
```

- The header holds a category square (8px, `--hub-radius-control` minus 2) in a
  glaze, plus the node's name at `label` size.
- The body holds **one line of the node's actual configuration** in mono at
  `caption` size, so a graph is readable without opening anything.
- Node width is fixed per graph, on the 8px module. 208px suits most.

```css
.hub-node {
  background: var(--hub-color-surface);
  border: 1px solid var(--hub-color-line-strong);
  border-radius: var(--hub-radius-plate);
  box-shadow: var(--hub-shadow-plate);
  width: 208px;
}
.hub-node__head {
  display: flex; align-items: center; gap: var(--hub-space-2);
  padding: 10px var(--hub-space-3);
  border-bottom: 1px solid var(--hub-color-line);
  font: var(--hub-text-label);
  letter-spacing: var(--hub-tracking-label);
}
.hub-node__kind { width: 8px; height: 8px; border-radius: 2px; flex: none; }
.hub-node__body {
  padding: 10px var(--hub-space-3);
  font: var(--hub-text-code);
  color: var(--hub-color-ink-muted);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.react-flow__node.selected .hub-node { border-color: var(--hub-color-action); }
```

## Glaze means category

The category square is **the only place a glaze appears inside a graph**. Never
fill a whole node with a glaze; the graph turns into confetti.

| Category | Glaze | Token |
|---|---|---|
| Source / input | glacier | `--hub-color-glaze-1` |
| Transform | lichen | `--hub-color-glaze-2` |
| Logic / branch | dusk | `--hub-color-glaze-3` |
| Model / agent | rhubarb | `--hub-color-glaze-4` |
| Storage | rye | `--hub-color-glaze-5` |
| Note / group | clay | `--hub-color-glaze-6` |
| Output / terminal | flare | `--hub-color-voltage` |
| Failing | danger | `--hub-color-danger` |

Output uses flare because a graph has one destination, which keeps the node
inside the five percent budget. If a graph has many outputs, they are not
outputs — they are storage.

## Edges

- Idle edges take `--hub-color-line-strong`. They are structure, not signal.
- The selected edge takes cobalt. Selection *is* the current.
- Stroke width 1.5. A true 1px hairline disappears on high-density displays.
- **Animate only real flow.** A marching dashed edge means data is moving right
  now. If it animates while nothing runs, it is decoration and it goes.
- Default to `type="smoothstep"` for orthogonal pipelines and `"bezier"` for
  free-form canvases. Pick one per graph and keep it.

## Background and chrome

```jsx
<Background variant="dots" gap={24} size={1} color="var(--hub-color-dot)" />
```

Gap 24 matches the page's dot grid, so a canvas embedded in a page lines up with
the page behind it.

`<Controls />` and `<MiniMap />` are plates: surface background, hairline
border, `--hub-radius-plate`. The minimap mask uses
`--hub-color-surface-sunken`; minimap node colour follows the category glaze.

## A canvas is still a document

Not polish — requirements:

- Nodes are reachable and operable by keyboard; focus rings are visible.
- Selected state reads without colour alone (border weight changes too).
- Labels survive 50% zoom. If a node is unreadable zoomed out, its body line is
  too long — truncate it in the data, not with CSS alone.
- An empty canvas gets an empty state with one action, not a blank grid.
