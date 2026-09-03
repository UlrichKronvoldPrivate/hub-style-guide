import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const regions = [
  { value: '1084', label: 'Hovedstaden' },
  { value: '1082', label: 'Midtjylland' },
  { value: '1083', label: 'Syddanmark' },
  { value: '1085', label: 'Sjælland' },
  { value: '1081', label: 'Nordjylland' },
  { value: '1400', label: 'Bornholm', disabled: true },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A native `<select>` with our shell around it. The browser\'s own picker beats any ' +
          'custom listbox on touch, in a screen reader and with a keyboard, so the element ' +
          'stays native — only the box is ours. The chevron is a rotated border corner rather ' +
          'than an SVG, so it takes a token colour and follows the theme.',
      },
    },
  },
  args: { label: 'Region', options: regions },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  name: 'With placeholder',
  args: {
    placeholder: 'Choose a region',
    help: 'Bornholm is not broken out in this table.',
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Choose a region',
    invalid: true,
    help: 'Pick a region before running the graph.',
  },
};

export const Disabled: Story = {
  args: { defaultValue: '1084', disabled: true, help: 'The graph sets this while it runs.' },
};

/** Fields line up on the 8px module whether they hold an input or a select. */
export const NextToAField: Story = {
  name: 'Next to a field',
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--hub-space-4)', flexWrap: 'wrap' }}>
      <Select {...args} label="Region" placeholder="Choose a region" />
      <Select
        label="Year"
        options={[
          { value: '2026', label: '2026' },
          { value: '2025', label: '2025' },
          { value: '2024', label: '2024' },
        ]}
        defaultValue="2026"
      />
    </div>
  ),
};
