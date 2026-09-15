import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Boxicons, the free set, from the `boxicons` npm package (CC-BY-4.0 / OFL / MIT). ' +
          'Regular, outlined icons are the default; `solid` gives the filled variant. An icon ' +
          'next to text is decoration and gets `aria-hidden`; an icon that stands alone — an ' +
          'icon-only button — gets a `label`, because the icon is not the name.',
      },
    },
  },
  args: { name: 'bell', size: '1.5rem' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {};
export const Solid: Story = { args: { solid: true } };

const set = [
  'grid-alt', 'data', 'time-five', 'sitemap', 'bar-chart-alt-2', 'trending-up', 'file', 'cog',
  'search', 'bell', 'message-rounded', 'dots-horizontal-rounded', 'list-ul', 'plus-circle',
  'error', 'upload', 'link', 'refresh', 'check', 'x', 'chevron-right', 'filter', 'calendar', 'user',
];

/** The icons the archetypes use, so a screen picks from one vocabulary. */
export const TheSet: Story = {
  name: 'The set',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--hub-space-3)' }}>
      {set.map((n) => (
        <div key={n} className="hub-row" style={{ gap: 'var(--hub-space-3)' }}>
          <span className="hub-stat__icon" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--hub-icon-disc-bg)', border: '1px solid var(--hub-icon-disc-border)', display: 'grid', placeContent: 'center' }}>
            <Icon name={n} />
          </span>
          <span className="hub-caption hub-code">{n}</span>
        </div>
      ))}
    </div>
  ),
};

/** Icon-only controls carry a label; icons beside text do not. */
export const InControls: Story = {
  name: 'In controls',
  render: () => (
    <div className="hub-row">
      <Button variant="primary"><Icon name="upload" />New upload</Button>
      <Button variant="ghost"><Icon name="link" />Connect a source</Button>
      <Button variant="round" aria-label="Notifications"><Icon name="bell" /></Button>
      <Button variant="round" aria-label="More"><Icon name="dots-horizontal-rounded" /></Button>
    </div>
  ),
};
