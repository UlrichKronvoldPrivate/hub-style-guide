import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatRow } from './StatRow';

const nf = new Intl.NumberFormat('da-DK');

const meta = {
  title: 'Components/Stat row',
  component: StatRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The summary at the top of a dashboard: one instrument, N tonal cells. Each cell ' +
          'keeps a stop of the sky at tint-alpha over the glass, so the pastels live in the ' +
          'UI rather than on an 8px square — and a seed re-tints the row with the page. ' +
          'Still not "N cards": same height, same padding, same radius, one row. At most ' +
          'one figure takes flare, and only when it asks someone to do something. Every ' +
          'figure carries a note saying what it is measured against; a number with no ' +
          'frame is trivia.',
      },
    },
  },
  args: {
    stats: [
      { label: 'Runs today', value: '34', note: '4 still running' },
      { label: 'Rows ingested', value: nf.format(1284902), note: 'since midnight' },
      { label: 'Sources connected', value: '12', note: '2 added this week' },
      { label: 'Runs failed', value: '2', note: 'both on Statbank BYGV80', attention: true },
    ],
  },
} satisfies Meta<typeof StatRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Any count works; the cells take the sky in order and share the row. */
export const ThreeStats: Story = {
  name: 'Three stats',
  args: {
    stats: [
      { label: 'Sources connected', value: '12', note: '2 added this week' },
      { label: 'Hierarchies', value: '7', note: '1 awaiting confirm' },
      { label: 'Rows ingested', value: nf.format(1284902), note: 'since midnight' },
    ],
  },
};

/** The figure a page leads with gets the hero radius and the display-1 size. */
export const WithAHero: Story = {
  name: 'With a hero',
  args: {
    stats: [
      { label: 'Runs today', value: '34', note: '4 still running', hero: true },
      { label: 'Rows ingested', value: nf.format(1284902), note: 'since midnight' },
      { label: 'Sources connected', value: '12', note: '2 added this week' },
      { label: 'Runs failed', value: '0', note: 'none since 30 August' },
    ],
  },
};

/** When no figure asks for action, none of them takes flare. */
export const NothingToFlag: Story = {
  name: 'Nothing to flag',
  args: {
    stats: [
      { label: 'Runs today', value: '34', note: 'all finished' },
      { label: 'Rows ingested', value: nf.format(1284902), note: 'since midnight' },
      { label: 'Sources connected', value: '12', note: '2 added this week' },
      { label: 'Runs failed', value: '0', note: 'none since 30 August' },
    ],
  },
};
