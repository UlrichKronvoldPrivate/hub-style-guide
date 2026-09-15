import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plate } from './Plate';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Plate',
  component: Plate,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A plate is a sheet: paper with a hairline, corners only when it stands alone. ' +
          'Inside a sheet, regions share lines instead. There are no shadows. Glazes are ' +
          'category fields for canvas nodes and ' +
          'do not lift at all. Choose one separation per object type on a screen.',
      },
    },
  },
  args: { variant: 'lifted', glaze: 1 },
  argTypes: {
    variant: { control: 'inline-radio', options: ['lifted', 'flat', 'glaze'] },
    glaze: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    tone: { control: 'inline-radio', options: [undefined, 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Plate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lifted: Story = {
  args: {
    children: (
      <>
        <p className="hub-subtitle">Population by region</p>
        <p className="hub-body-sm hub-muted">Updated 3 September 2026 from Statbank FOLK1A.</p>
      </>
    ),
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    children: (
      <>
        <p className="hub-subtitle">Population by region</p>
        <p className="hub-body-sm hub-muted">A hairline is enough separation in a dense list.</p>
      </>
    ),
  },
};

export const Glazed: Story = {
  args: {
    variant: 'glaze',
    glaze: 2,
    children: (
      <>
        <p className="hub-subtitle">No graphs yet</p>
        <p className="hub-body-sm">A graph connects a data source to whatever reads it.</p>
        <Button variant="primary">Add a source</Button>
      </>
    ),
  },
};

/** All six glazes, so a category scheme can be read at a glance. */
export const EveryGlaze: Story = {
  name: 'Every glaze',
  args: { children: null },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--hub-space-3)' }}>
      {([1, 2, 3, 4, 5, 6] as const).map((g, i) => (
        <Plate key={g} variant="glaze" glaze={g}>
          <p className="hub-label">{['glacier', 'lichen', 'dusk', 'rhubarb', 'rye', 'clay'][i]}</p>
          <p className="hub-caption" style={{ color: 'inherit', opacity: .7 }}>
            {['Source', 'Transform', 'Logic', 'Model', 'Storage', 'Note'][i]}
          </p>
        </Plate>
      ))}
    </div>
  ),
};

/** State rides on a semantic edge, never on the accent. */
export const ErrorState: Story = {
  name: 'Error state',
  args: {
    variant: 'flat',
    tone: 'danger',
    children: (
      <>
        <p className="hub-label">Statbank did not respond</p>
        <p className="hub-body-sm">
          The request timed out after 30 seconds. The table may be large — try a narrower
          region filter, or retry.
        </p>
        <Button variant="ghost">Retry</Button>
      </>
    ),
  },
};
