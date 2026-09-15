import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatRow } from './StatRow';

const meta = {
  title: 'Components/Stat row',
  component: StatRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The summary at the top of a dashboard: one instrument, N cells that touch and are ' +
          'divided by hairlines — not N cards. Each cell says what is measured, how it moved and ' +
          'against what, shows an icon in a disc, and draws a gauge with the figure beneath it at ' +
          'medium weight. The row is monochrome; only a figure that asks for action takes colour.',
      },
    },
  },
  args: {
    stats: [
      { label: 'Runs today', value: '34', note: '+6 vs yesterday', icon: 'time-five', gauge: 0.85 },
      { label: 'Rows ingested', value: '1.28M', note: '+18.2% vs last week', icon: 'list-ul', gauge: 0.64 },
      { label: 'Sources connected', value: '12', note: '+2 this week', icon: 'plus-circle', gauge: 0.8 },
      { label: 'Failure rate', value: '5.9%', note: '−0.8% vs last month', icon: 'error', gauge: 0.06, attention: true },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--hub-color-surface)', border: '1px solid var(--hub-color-line)', borderRadius: 'var(--hub-radius-sheet)', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Without gauges the figure sits under the label; the cells still touch. */
export const Plain: Story = {
  args: {
    stats: [
      { label: 'Runs today', value: '34', note: '4 still running' },
      { label: 'Rows ingested', value: '1.284.902', note: 'since midnight' },
      { label: 'Sources connected', value: '12', note: '2 added this week' },
      { label: 'Runs failed', value: '2', note: 'both on Statbank BYGV80', attention: true },
    ],
  },
};

/** Any count works. */
export const ThreeStats: Story = {
  name: 'Three stats',
  args: {
    stats: [
      { label: 'Sources connected', value: '12', note: '+2 this week', icon: 'plus-circle', gauge: 0.8 },
      { label: 'Hierarchies', value: '7', note: '1 awaiting confirm', icon: 'sitemap', gauge: 0.47 },
      { label: 'Rows ingested', value: '1.28M', note: '+18.2%', icon: 'list-ul', gauge: 0.64 },
    ],
  },
};

/** When no figure asks for action, none of them takes colour. */
export const NothingToFlag: Story = {
  name: 'Nothing to flag',
  args: {
    stats: [
      { label: 'Runs today', value: '34', note: 'all finished', icon: 'time-five', gauge: 0.85 },
      { label: 'Rows ingested', value: '1.28M', note: '+18.2% vs last week', icon: 'list-ul', gauge: 0.64 },
      { label: 'Sources connected', value: '12', note: '+2 this week', icon: 'plus-circle', gauge: 0.8 },
      { label: 'Failure rate', value: '0%', note: 'none since 30 August', icon: 'check', gauge: 0 },
    ],
  },
};
