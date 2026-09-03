import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import { Field } from '../Field/Field';
import { Checkbox } from '../Checkbox/Checkbox';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A native `<dialog>` opened with `showModal()`, so the focus trap, Esc, the top ' +
          'layer and an inert background all come from the platform rather than from us. ' +
          'The scrim is spruce-tinted and never blurred — a dimmed room, not fog, for the ' +
          'same reason a glaze never carries a gradient. Titles name the decision and the ' +
          'thing; buttons name the outcome.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

// Every story drives the dialog from its own trigger and state rather than from
// args, so they are typed without meta's arg shape. `component` above still
// feeds the props table.
type Story = StoryObj;

/** Opening is an action, so it earns the one bit of motion here. */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="ghost" onClick={() => setOpen(true)}>Rename graph</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Rename graph"
          actions={
            <>
              <Button variant="primary" onClick={() => setOpen(false)}>Save name</Button>
              <Button variant="ghost" onClick={() => setOpen(false)}>Keep the old one</Button>
            </>
          }
        >
          <Field label="Name" defaultValue="Population by region" />
        </Dialog>
      </>
    );
  },
};

/**
 * Destructive decisions name the thing being destroyed and say what it costs.
 * No "Are you sure?", no OK and Cancel — and no dismissing by clicking away.
 */
export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="ghost" onClick={() => setOpen(true)}>Delete graph</Button>
        <Dialog
          open={open}
          dismissible={false}
          onClose={() => setOpen(false)}
          title={'Delete "Population by region"?'}
          actions={
            <>
              <Button variant="danger" onClick={() => setOpen(false)}>Delete graph</Button>
              <Button variant="ghost" onClick={() => setOpen(false)}>Keep it</Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            The graph and its run history go with it. Anything reading from it will stop
            returning data. This cannot be undone.
          </p>
        </Dialog>
      </>
    );
  },
};

/** A dialog can hold a short form. Anything longer belongs on its own page. */
export const WithAForm: Story = {
  name: 'With a form',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Add a source</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Add a source"
          actions={
            <>
              <Button variant="primary" onClick={() => setOpen(false)}>Add source</Button>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            </>
          }
        >
          <Field label="Table" placeholder="FOLK1A" help="The Statbank table ID, for example FOLK1A or BEV3A." />
          <Checkbox
            label="Cache the response"
            help="Reuses the last result for an hour instead of calling Statbank again."
            defaultChecked
          />
        </Dialog>
      </>
    );
  },
};
