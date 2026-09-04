import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactFlow, Background, BackgroundVariant, Controls, MiniMap } from '@xyflow/react';
import type { Edge } from '@xyflow/react';
import { nodeTypes } from '../components/Canvas/HubNode';
import type { HubFlowNode } from '../components/Canvas/HubNode';
import { Button } from '../components/Button/Button';
import { Select } from '../components/Select/Select';
import { Field } from '../components/Field/Field';
import { Chip } from '../components/Chip/Chip';
import { DataTable } from '../components/DataTable/DataTable';
import { StatRow } from '../components/StatRow/StatRow';
import { BarChart } from '../components/BarChart/BarChart';
import { Plate } from '../components/Plate/Plate';
import '../components/Canvas/canvas.css';

const nf = new Intl.NumberFormat('da-DK');

function Shell({ children, current }: { children: ReactNode; current: string }) {
  const items = ['Graphs', 'Sources', 'Dashboards', 'Schedules', 'Settings'];
  return (
    <div className="hub-shell">
      <div className="hub-shell__bar">
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, letterSpacing: '-.03em' }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--hub-color-action)' }} />
          hub
        </span>
        <Chip status="ok">Statbank reachable</Chip>
      </div>
      <nav className="hub-shell__nav" aria-label="Sections">
        {items.map((i) => (
          <a
            key={i}
            className="hub-nav-item"
            href="#top"
            aria-current={i === current ? 'page' : undefined}
          >
            {i}
          </a>
        ))}
      </nav>
      <main className="hub-shell__main">{children}</main>
    </div>
  );
}

const meta = {
  title: 'Layout/Page archetypes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Almost every screen is one of three archetypes, so a page starts by picking one ' +
          'rather than composing from scratch. The CSS lives in the skill next to the tokens ' +
          '(`references/layout.css`), which is why these stories and the guidance Claude ' +
          'loads cannot drift apart. Resize the preview to see the two breakpoints: 720px ' +
          'turns the nav into a drawer, 1100px turns the inspector into an overlay.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Dense and scanned. The table header sticks under the app bar; the page header
 * deliberately does not, because two sticky bands eat a laptop screen.
 */
export const TablePage: Story = {
  name: 'Table page',
  render: () => (
    <Shell current="Graphs">
      <div className="hub-page--table" data-density="compact">
        <div className="hub-page__head">
          <h1 className="hub-page__title">Graphs</h1>
          <div className="hub-row">
            <Button variant="primary">New graph</Button>
            <Button variant="ghost">Import</Button>
          </div>
        </div>

        <div className="hub-toolbar">
          <Select
            label="Region"
            placeholder="All regions"
            options={[
              { value: '1084', label: 'Hovedstaden' },
              { value: '1082', label: 'Midtjylland' },
              { value: '1083', label: 'Syddanmark' },
            ]}
          />
          <Select
            label="Status"
            placeholder="Any"
            options={[
              { value: 'ok', label: 'Running' },
              { value: 'warn', label: 'Stale' },
              { value: 'fail', label: 'Failing' },
            ]}
          />
          <Field label="Search" placeholder="Name or table ID" />
        </div>

        <DataTable
          caption="Example rows. Not live figures."
          columns={[
            { key: 'name', label: 'Graph' },
            { key: 'table', label: 'Source', mono: true },
            { key: 'rows', label: 'Rows', numeric: true },
            { key: 'ran', label: 'Last run', mono: true },
            { key: 'status', label: 'Status' },
          ]}
          rows={Array.from({ length: 14 }, (_, i) => ({
            name: ['Population by region', 'Housing starts', 'Commuting flows', 'Energy mix'][i % 4],
            table: ['FOLK1A', 'BYGV80', 'PEND100', 'ENE2HA'][i % 4],
            rows: nf.format([5940000, 18422, 902311, 4410][i % 4]),
            ran: `2026-09-${String(3 - (i % 3)).padStart(2, '0')} 06:00`,
            status: [
              <Chip key="a" status="ok">Running</Chip>,
              <Chip key="b" status="warn">Stale data</Chip>,
              <Chip key="c" status="fail">Timed out</Chip>,
              <Chip key="d">Draft</Chip>,
            ][i % 4],
          }))}
        />
      </div>
    </Shell>
  ),
};

/**
 * Summary first, then detail. The stat row is one plate divided by hairlines
 * rather than four cards — identical lifted cards under identical shadows is
 * the tell this system names. `.hub-page__split` below it is deliberately
 * unequal, so the reader is not asked to choose where to start.
 */
export const DashboardPage: Story = {
  name: 'Dashboard page',
  render: () => (
    <Shell current="Overview">
      <div className="hub-page--dashboard" data-density="compact">
        <div className="hub-page__head">
          <h1 className="hub-page__title">Overview</h1>
          <div className="hub-row">
            <Button variant="primary">New upload</Button>
            <Button variant="ghost">Connect a source</Button>
          </div>
        </div>

        <StatRow
          stats={[
            { label: 'Runs today', value: '34', note: '4 still running' },
            { label: 'Rows ingested', value: nf.format(1284902), note: 'since midnight' },
            { label: 'Sources connected', value: '12', note: '2 added this week' },
            // The screen's single use of flare: the one figure asking for action.
            { label: 'Runs failed', value: '2', note: 'both on Statbank BYGV80', attention: true },
          ]}
        />

        <Plate variant="lifted" style={{ gap: 'var(--hub-space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--hub-space-4)', width: '100%' }}>
            <h2 className="hub-subtitle">Runs per day</h2>
            <span style={{ display: 'flex', gap: 'var(--hub-space-4)' }}>
              <span className="hub-caption">last 14 days</span>
              <span className="hub-caption">peak 36</span>
            </span>
          </div>

          <div style={{ width: '100%' }}>
            <BarChart
              data={[28, 31, 24, 0, 0, 33, 36, 29, 35, 27, 4, 0, 30, 34]}
              labels={{ 0: '21 Aug', 6: '27 Aug', 10: '30 Aug', 13: 'Today' }}
              accentIndex={13}
              ariaLabel="Runs per day over the last fourteen days. Between 24 and 36 runs on weekdays, none at weekends, and a dip to 4 on 30 August during the Statbank outage. Today stands at 34."
            />
          </div>

          <p className="hub-caption">
            Weekends carry no scheduled runs. The dip on 30 August is the Statbank outage.
          </p>
        </Plate>

        <div className="hub-page__split">
          <Plate variant="lifted">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--hub-space-4)', width: '100%' }}>
              <h2 className="hub-subtitle">Recent runs</h2>
              <Button variant="quiet">All runs</Button>
            </div>
            <DataTable
              caption="Example rows. Not live figures."
              columns={[
                { key: 'source', label: 'Source' },
                { key: 'run', label: 'Run', mono: true },
                { key: 'rows', label: 'Rows', numeric: true },
                { key: 'status', label: 'Status' },
              ]}
              rows={[
                { source: 'Befolkning, region', run: 'r_9f21c4', rows: nf.format(5940000), status: <Chip status="ok">Finished</Chip> },
                { source: 'Boligbyggeri', run: 'r_3a17bd', rows: nf.format(18422), status: <Chip status="fail">Timed out</Chip> },
                { source: 'Pendling', run: 'r_c48e02', rows: nf.format(902311), status: <Chip status="ok">Finished</Chip> },
                { source: 'Energimix', run: 'r_7b1d55', rows: nf.format(4410), status: <Chip status="warn">Stale data</Chip> },
                { source: 'Befolkning, kommune', run: 'r_e02a91', rows: nf.format(1284902), status: <Chip>Running</Chip> },
              ]}
            />
          </Plate>

          <Plate variant="lifted">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--hub-space-4)', width: '100%' }}>
              <h2 className="hub-subtitle">Needs attention</h2>
              <span className="hub-caption">3 sources</span>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, width: '100%' }}>
              {[
                ['Boligbyggeri', 'Timed out twice. Try a narrower region filter.'],
                ['Energimix', 'Statbank last answered 28 August.'],
                ['Ledige stillinger', 'Credentials expire in 6 days.'],
              ].map(([name, why], i, all) => (
                <li
                  key={name}
                  style={{
                    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                    gap: 'var(--hub-space-4)', padding: 'var(--hub-space-3) 0',
                    borderBottom: i === all.length - 1 ? 'none' : '1px solid var(--hub-color-line)',
                  }}
                >
                  <span className="hub-body-sm">{name}</span>
                  <span className="hub-caption" style={{ textAlign: 'right' }}>{why}</span>
                </li>
              ))}
            </ul>
            <Button variant="ghost">Review sources</Button>
          </Plate>
        </div>
      </div>
    </Shell>
  ),
};

/**
 * One column, generous. Text is held at 66ch no matter how wide the window
 * gets, and each section opens on a hairline and a heading row.
 */
export const ReadingPage: Story = {
  name: 'Reading page',
  render: () => (
    <Shell current="Settings">
      <div className="hub-page--reading">
        <div className="hub-page__head">
          <h1 className="hub-page__title">Settings</h1>
          <Button variant="primary">Save changes</Button>
        </div>

        <section className="hub-section">
          <div className="hub-section__head">
            <h2 className="hub-subtitle">Workspace</h2>
            <span className="hub-caption hub-code">3 members</span>
          </div>
          <div className="hub-stack">
            <p className="hub-body">
              Everything in this workspace shares one set of credentials for Statbank
              and one schedule queue. Splitting a project out later means re-authorising
              its sources, so it is worth deciding now.
            </p>
            <Field label="Workspace name" defaultValue="Forte Advice" />
          </div>
        </section>

        <section className="hub-section">
          <div className="hub-section__head">
            <h2 className="hub-subtitle">Deletion</h2>
            <span className="hub-caption hub-code">irreversible</span>
          </div>
          <div className="hub-stack">
            <p className="hub-body">
              Deleting the workspace removes every graph, its run history and any
              dashboard reading from it. Exports already downloaded are unaffected.
            </p>
            <Button variant="danger">Delete workspace</Button>
          </div>
        </section>
      </div>
    </Shell>
  ),
};

const nodes: HubFlowNode[] = [
  { id: 'src', type: 'hub', position: { x: 0, y: 40 }, data: { name: 'Fetch table', detail: 'statbank / FOLK1A', kind: 'source', inputs: false } },
  { id: 'flt', type: 'hub', position: { x: 260, y: 0 }, data: { name: 'Filter rows', detail: 'region = "Hovedstaden"', kind: 'transform' } },
  { id: 'sum', type: 'hub', position: { x: 260, y: 150 }, data: { name: 'Summarise', detail: 'claude-opus-5', kind: 'model' } },
  { id: 'out', type: 'hub', position: { x: 520, y: 75 }, data: { name: 'Dashboard', detail: '/reports/population', kind: 'output', outputs: false } },
];

const edges: Edge[] = [
  { id: 'e1', source: 'src', target: 'flt' },
  { id: 'e2', source: 'src', target: 'sum' },
  { id: 'e3', source: 'flt', target: 'out' },
  { id: 'e4', source: 'sum', target: 'out', animated: true },
];

/**
 * The signature layout. The page never scrolls — the inspector owns the only
 * scrollbar and the canvas pans instead. The inspector sits on the right
 * because graphs flow left to right, so a left panel would cover the upstream
 * nodes you are tracing back from.
 */
function CanvasPageDemo() {
  // Below 1100px the panel covers the canvas, so it has to be dismissible —
  // a close control is the only way back to the graph. Above 1100px it is
  // docked and the same control simply hides a panel that was never in the way.
  const [open, setOpen] = useState(true);

  return (
    <div className="hub-page--canvas" data-density="compact">
      <div className="hub-page__bar">
        <span className="hub-subtitle">Population by region</span>
        <div className="hub-row">
          <Button variant="primary">Run</Button>
          <Button variant="ghost">Share</Button>
          {open ? null : <Button variant="ghost" onClick={() => setOpen(true)}>Inspect</Button>}
        </div>
      </div>

      <div className="hub-page__canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{ type: 'smoothstep' }}
          colorMode="system"
          fitView
          fitViewOptions={{ padding: 0.25 }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="var(--hub-color-dot)" />
          <Controls />
          <MiniMap pannable zoomable />
        </ReactFlow>
      </div>

      {open ? (
        <aside className="hub-page__panel" aria-label="Node inspector">
          <div className="hub-page__head">
            <h2 className="hub-subtitle">Summarise</h2>
            <span className="hub-row" style={{ gap: 'var(--hub-space-2)' }}>
              <Chip status="ok">Ready</Chip>
              <Button variant="quiet" onClick={() => setOpen(false)}>Close</Button>
            </span>
          </div>
          <Select
            label="Model"
            defaultValue="opus"
            options={[
              { value: 'opus', label: 'claude-opus-5' },
              { value: 'sonnet', label: 'claude-sonnet-5' },
              { value: 'haiku', label: 'claude-haiku-4-5' },
            ]}
          />
          <Field label="Instruction" defaultValue="One paragraph, plain Danish." />
          <Field label="Max rows" defaultValue="500" help="Above 500 the model starts summarising its own summary." />
          <p className="hub-caption">Reads from Filter rows. Writes to Dashboard.</p>
          <Button variant="ghost">Run this node only</Button>
        </aside>
      ) : null}

      {/* Optional third row: a provenance strip citing the whole run, not the
          selected node — which is why it spans the panel as well. */}
      <div className="hub-page__foot">
        <span>source version <span className="hub-code">sv_9f21c4</span></span>
        <span>upload <span className="hub-code">up_3a17bd</span></span>
        <span>evidence <span className="hub-code">ev_c48e02</span></span>
        <span>ran in <span className="hub-code">4,2 s</span></span>
      </div>
    </div>
  );
}

export const CanvasPage: Story = {
  name: 'Canvas page',
  render: () => <CanvasPageDemo />,
};
