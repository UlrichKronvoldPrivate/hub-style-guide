import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart } from './BarChart';
import { Plate } from '../Plate/Plate';

const fortnight = [28, 31, 24, 0, 0, 33, 36, 29, 35, 27, 4, 0, 30, 34];
const fortnightLabels = { 0: '21 Aug', 6: '27 Aug', 10: '30 Aug', 13: 'Today' };

const meta = {
  title: 'Components/Bar chart',
  component: BarChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The floor for a chart, not a visualisation system. Marks are neutral by default ' +
          'and the accent goes to the one mark that carries the point, because fourteen ' +
          'bars in the action colour would spend the whole voltage budget on decoration. ' +
          'Labels are HTML in a grid with one column per bar — never SVG text, which a ' +
          'viewBox scales along with everything else. A zero draws as a stub so "nothing ' +
          'happened" is visibly different from "no data", which draws nothing. Anything ' +
          'past a simple bar or line belongs to the dataviz skill.',
      },
    },
  },
  args: {
    data: fortnight,
    labels: fortnightLabels,
    accentIndex: 13,
    ariaLabel:
      'Runs per day over the last fourteen days. Between 24 and 36 runs on weekdays, none at ' +
      'weekends, and a dip to 4 on 30 August during the Statbank outage. Today stands at 34.',
  },
  // A chart lives on a plate; the story shows it in its habitat.
  decorators: [
    (Story) => (
      <Plate style={{ width: '100%' }}>
        <div style={{ width: '100%' }}><Story /></div>
      </Plate>
    ),
  ],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Nulls are missing data and draw nothing; zeros are real and draw a stub. */
export const WithMissingData: Story = {
  name: 'With missing data',
  args: {
    data: [28, 31, null, null, 0, 33, 36, 29, null, 27, 4, 0, 30, 34],
    labels: { 0: '21 Aug', 4: 'Sat', 8: 'no data', 13: 'Today' },
    ariaLabel:
      'Runs per day over fourteen days with three days of missing data on 23, 24 and 29 August. ' +
      'Saturday 25 August had no runs. Today stands at 34.',
  },
};

/** When nothing carries the point, nothing takes the accent. */
export const NoAccent: Story = {
  name: 'No accent',
  args: { accentIndex: undefined },
};

/** Sparse labels are fine; the grid keeps each one under the bar it names. */
export const FirstAndLastOnly: Story = {
  name: 'First and last only',
  args: { labels: { 0: '21 Aug', 13: '3 Sep' } },
};
