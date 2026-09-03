import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactFlow, Background, BackgroundVariant, Controls, MiniMap } from '@xyflow/react';
import type { Edge } from '@xyflow/react';
import { nodeTypes } from './HubNode';
import type { HubFlowNode } from './HubNode';
import './canvas.css';

const nodes: HubFlowNode[] = [
  { id: 'src',  type: 'hub', position: { x: 0,   y: 40 },  data: { name: 'Fetch table',  detail: 'statbank / FOLK1A',        kind: 'source',    inputs: false } },
  { id: 'flt',  type: 'hub', position: { x: 280, y: 0 },   data: { name: 'Filter rows',  detail: 'region = "Hovedstaden"',   kind: 'transform' } },
  { id: 'sum',  type: 'hub', position: { x: 280, y: 150 }, data: { name: 'Summarise',    detail: 'claude-opus-5',            kind: 'model' } },
  { id: 'out',  type: 'hub', position: { x: 560, y: 75 },  data: { name: 'Dashboard',    detail: '/reports/population',      kind: 'output',    outputs: false } },
];

const edges: Edge[] = [
  { id: 'e1', source: 'src', target: 'flt' },
  { id: 'e2', source: 'src', target: 'sum' },
  { id: 'e3', source: 'flt', target: 'out' },
  // Animated because this edge is carrying data right now. Nothing animates for decoration.
  { id: 'e4', source: 'sum', target: 'out', animated: true },
];

const meta = {
  title: 'Canvas/Graph',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Every `--xy-*` variable points at a semantic token, so the canvas follows the ' +
          'app theme with no extra wiring — switch the Theme control in the toolbar. Idle ' +
          'edges take the strong hairline and recede; only the edge actually carrying data ' +
          'is animated. The category square in each node header is the only place a glaze ' +
          'appears in a graph.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Graph: Story = {
  render: () => (
    <div className="hub-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        colorMode="system"
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: false }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="var(--hub-color-dot)" />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>
    </div>
  ),
};

/** The category scheme, so a glaze can be read back to a kind. */
export const Categories: Story = {
  render: () => {
    const kinds = [
      ['source', 'Source or input', 'glacier'],
      ['transform', 'Transform', 'lichen'],
      ['logic', 'Logic or branch', 'dusk'],
      ['model', 'Model or agent', 'rhubarb'],
      ['storage', 'Storage', 'rye'],
      ['note', 'Note or group', 'clay'],
      ['output', 'Output or terminal', 'flare'],
      ['failing', 'Failing', 'danger'],
    ] as const;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--hub-space-3)' }}>
        {kinds.map(([kind, label, glaze]) => (
          <div key={kind} className="hub-row" style={{ gap: 'var(--hub-space-2)' }}>
            <span className="hub-node__kind" data-kind={kind} />
            <span className="hub-body-sm">{label}</span>
            <span className="hub-caption hub-code">{glaze}</span>
          </div>
        ))}
      </div>
    );
  },
};
