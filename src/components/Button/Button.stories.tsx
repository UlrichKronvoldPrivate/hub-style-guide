import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Four variants and no more. Primary is the single action the screen exists for, ' +
          'so there is at most one per view — that is what keeps it inside the five percent ' +
          'voltage budget. Buttons name their outcome ("Save changes", not "Submit") and ' +
          'never carry a trailing arrow.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'ghost', 'quiet', 'danger'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { children: 'Save changes', variant: 'primary', disabled: false },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Discard' },
};

export const Quiet: Story = {
  args: { variant: 'quiet', children: 'Add a filter' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete graph' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** How a real action row is composed: one primary, everything else quieter. */
export const OnePrimaryPerView: Story = {
  name: 'One primary per view',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'The hierarchy does the work. If two buttons in a row are both primary, neither ' +
          'reads as the thing to do.',
      },
    },
  },
  render: () => (
    <div className="hub-row">
      <Button variant="primary">Save changes</Button>
      <Button variant="ghost">Discard</Button>
      <Button variant="quiet">Preview</Button>
    </div>
  ),
};
