import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Empty state',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An empty screen is an invitation to act, not a shrug. It says what will live ' +
          'here and offers one way to start. No illustration standing in for an ' +
          'explanation, no "Nothing to see here", no apology.',
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No graphs yet',
    body: 'A graph connects a data source to whatever reads it. Start with a source.',
    action: <Button variant="primary">Add a source</Button>,
  },
};

export const FilteredToNothing: Story = {
  name: 'Filtered to nothing',
  args: {
    glaze: 5,
    title: 'No rows match this filter',
    body: 'The region filter is set to Bornholm, which this table does not break out. Widen it to Hovedstaden to see results.',
    action: <Button variant="ghost">Clear filter</Button>,
  },
};
