import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Status only — a pill is never a button or a filter toggle. The dot changes shape ' +
          'with the status as well as colour, so the state survives a greyscale print and ' +
          'colour-blind vision. Status colour comes from the semantic tokens and never ' +
          'borrows the accent.',
      },
    },
  },
  args: { status: 'neutral', children: 'Draft' },
  argTypes: { status: { control: 'inline-radio', options: ['neutral', 'ok', 'info', 'warn', 'fail'] } },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Ok: Story = { args: { status: 'ok', children: 'Finished' } };
export const Info: Story = { args: { status: 'info', children: 'Running' } };
export const Warning: Story = { args: { status: 'warn', children: 'Stale data' } };
export const Failed: Story = { args: { status: 'fail', children: 'Timed out' } };

export const EveryStatus: Story = {
  name: 'Every status',
  render: () => (
    <div className="hub-row">
      <Chip>Draft</Chip>
      <Chip status="ok">Finished</Chip>
      <Chip status="info">Running</Chip>
      <Chip status="warn">Stale data</Chip>
      <Chip status="fail">Timed out</Chip>
    </div>
  ),
};
