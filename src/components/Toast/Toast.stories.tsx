import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A toast confirms an outcome in the same words as the action that caused it: ' +
          '"Publish" produces "Published". Never "Success!". Neutral and success time out ' +
          'after five seconds; **warning and danger stay until dismissed**, because timing ' +
          'out the only account of what went wrong is how a problem gets missed. ' +
          'The default position is bottom-centre rather than the usual bottom-right, ' +
          'because React Flow puts its MiniMap in the bottom-right corner.',
      },
    },
  },
  args: { children: 'Graph published.' },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'success', 'warning', 'danger'] } },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { children: 'Draft saved.' } };

export const Success: Story = { args: { tone: 'success', children: 'Published. The dashboard is live.' } };

export const Warning: Story = {
  args: {
    tone: 'warning',
    children: 'Published with stale data. Statbank last answered on 28 August.',
    onDismiss: () => {},
  },
};

export const Danger: Story = {
  args: {
    tone: 'danger',
    children: 'Statbank did not respond, so nothing was published. Try a narrower region filter.',
    onDismiss: () => {},
  },
};

export const WithAnUndo: Story = {
  name: 'With an undo',
  args: {
    children: 'Graph deleted.',
    action: <Button variant="quiet">Undo</Button>,
    onDismiss: () => {},
  },
};

/** All four at rest, so the tone edges can be compared without waiting for a timeout. */
export const EveryTone: Story = {
  name: 'Every tone',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--hub-space-3)' }}>
      <Toast>Draft saved.</Toast>
      <Toast tone="success">Published. The dashboard is live.</Toast>
      <Toast tone="warning" onDismiss={() => {}}>
        Published with stale data. Statbank last answered on 28 August.
      </Toast>
      <Toast tone="danger" onDismiss={() => {}}>
        Statbank did not respond, so nothing was published.
      </Toast>
    </div>
  ),
};

function Bench() {
  const toast = useToast();
  return (
    <div className="hub-row">
      <Button variant="primary" onClick={() => toast({ tone: 'success', message: 'Published. The dashboard is live.' })}>
        Publish
      </Button>
      <Button variant="ghost" onClick={() => toast({ message: 'Draft saved.' })}>
        Save draft
      </Button>
      <Button variant="ghost" onClick={() => toast({ tone: 'warning', message: 'Published with stale data. Statbank last answered on 28 August.' })}>
        Publish stale
      </Button>
      <Button variant="danger" onClick={() => toast({ tone: 'danger', message: 'Statbank did not respond, so nothing was published.' })}>
        Break it
      </Button>
    </div>
  );
}

/**
 * The real thing. Confirmations clear themselves; the warning and the error
 * stay put until you dismiss them.
 */
export const Live: Story = {
  render: () => (
    <ToastProvider>
      <Bench />
    </ToastProvider>
  ),
};

/** Any corner works, but bottom-right collides with a React Flow minimap. */
export const TopRight: Story = {
  name: 'Top right',
  render: () => (
    <ToastProvider position="top-right">
      <Bench />
    </ToastProvider>
  ),
};
