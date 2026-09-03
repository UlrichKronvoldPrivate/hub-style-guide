import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import { DataTable } from '../DataTable/DataTable';
import { Chip } from '../Chip/Chip';
import { EmptyState } from '../EmptyState/EmptyState';
import { Button } from '../Button/Button';

const nf = new Intl.NumberFormat('da-DK');

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'There is no native tabs element, so the ARIA pattern is implemented in full — ' +
          'roving tabindex, arrow keys, Home and End, with automatic activation because the ' +
          'panels are local and cheap. The indicator is an underline sitting **on** the ' +
          'tablist hairline rather than a pill, so the selected tab is visibly joined to its ' +
          'panel. Lines mean connection; that is the whole reason for the shape.',
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Graph detail',
    items: [
      {
        id: 'rows',
        label: 'Rows',
        content: (
          <DataTable
            caption="Example rows modelled on Statbank FOLK1A. Not live figures."
            columns={[
              { key: 'region', label: 'Region' },
              { key: 'people', label: 'People', numeric: true },
            ]}
            rows={[
              { region: 'Hovedstaden', people: nf.format(1895000) },
              { region: 'Midtjylland', people: nf.format(1364000) },
              { region: 'Syddanmark', people: nf.format(1230000) },
            ]}
          />
        ),
      },
      {
        id: 'runs',
        label: 'Runs',
        content: (
          <DataTable
            caption="Example rows. Not live figures."
            columns={[
              { key: 'started', label: 'Started', mono: true },
              { key: 'took', label: 'Took', numeric: true },
              { key: 'status', label: 'Status' },
            ]}
            rows={[
              { started: '2026-09-03 06:00', took: '4,2 s', status: <Chip status="ok">Finished</Chip> },
              { started: '2026-09-02 06:00', took: '4,0 s', status: <Chip status="ok">Finished</Chip> },
              { started: '2026-09-01 06:00', took: '30,0 s', status: <Chip status="fail">Timed out</Chip> },
            ]}
          />
        ),
      },
      {
        id: 'schedule',
        label: 'Schedule',
        content: (
          <EmptyState
            title="No schedule"
            body="This graph only runs when someone asks it to. Give it a schedule to keep the dashboard current."
            action={<Button variant="primary">Add a schedule</Button>}
          />
        ),
      },
      { id: 'sharing', label: 'Sharing', content: null, disabled: true },
    ],
  },
};

/** Arrow keys skip a disabled tab rather than landing on it. */
export const WithADisabledTab: Story = {
  name: 'With a disabled tab',
  args: {
    label: 'Settings',
    items: [
      { id: 'general', label: 'General', content: <p className="hub-body-sm">Name, description and owner.</p> },
      { id: 'access', label: 'Access', content: null, disabled: true },
      { id: 'danger', label: 'Deletion', content: <p className="hub-body-sm">Removing a graph takes its run history with it.</p> },
    ],
  },
};
