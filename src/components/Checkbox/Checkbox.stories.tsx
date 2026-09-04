import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The input is the box — `appearance: none` on the real element rather than a ' +
          'hidden input behind a fake square, so keyboard, focus and screen-reader ' +
          'behaviour stay native. Checked fills with the action colour: small enough that a full ' +
          'column of them stays well inside the five percent voltage budget.',
      },
    },
  },
  args: { label: 'Cache the response' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const WithHelp: Story = {
  name: 'With help',
  args: {
    label: 'Cache the response',
    help: 'Reuses the last result for an hour instead of calling Statbank again.',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: { label: 'All regions', indeterminate: true },
  parameters: {
    docs: {
      description: {
        story:
          'A third state, not a weaker checked — so it is drawn as a bar rather than a ' +
          'faded tick. Use it on a "select all" governing a partly-selected list.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { label: 'Cache the response', defaultChecked: true, disabled: true, help: 'The graph sets this while it runs.' },
};

/** A group takes a legend at label weight; each choice stays at body weight. */
export const Group: Story = {
  render: () => {
    const regions = ['Hovedstaden', 'Midtjylland', 'Syddanmark', 'Sjælland', 'Nordjylland'];
    const [picked, setPicked] = useState<string[]>(['Hovedstaden', 'Sjælland']);

    const toggle = (r: string) =>
      setPicked((p) => (p.includes(r) ? p.filter((x) => x !== r) : [...p, r]));

    return (
      <fieldset className="hub-checkbox-group">
        <legend>Regions</legend>
        <Checkbox
          label="All regions"
          checked={picked.length === regions.length}
          indeterminate={picked.length > 0 && picked.length < regions.length}
          onChange={(e) => setPicked(e.target.checked ? [...regions] : [])}
        />
        {regions.map((r) => (
          <Checkbox
            key={r}
            label={r}
            checked={picked.includes(r)}
            onChange={() => toggle(r)}
            style={{ marginLeft: 'var(--hub-space-5)' }}
          />
        ))}
      </fieldset>
    );
  },
};
