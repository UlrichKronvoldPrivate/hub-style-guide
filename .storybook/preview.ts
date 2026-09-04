import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colour', 'Typography', 'Space and shape', 'Writing'],
          'Layout',
          'Components',
          [
            'Button', 'Field', 'Select', 'Checkbox',
            'Tabs',
            'Plate', 'Dialog',
            'Toast', 'Chip',
            'Data table', 'Empty state',
          ],
          'Canvas',
        ],
      },
    },
  },

  globalTypes: {
    theme: {
      description: 'Which climate the story renders in',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Daylight' },
          { value: 'dark', title: 'Winter night' },
        ],
        dynamicTitle: true,
      },
    },
    seed: {
      description: 'Which glaze leads the sky — one hue family per app',
      toolbar: {
        title: 'Seed',
        icon: 'paintbrush',
        items: [
          { value: 'glacier', title: 'Glacier' },
          { value: 'rye', title: 'Rye' },
          { value: 'dusk', title: 'Dusk' },
          { value: 'lichen', title: 'Lichen' },
          { value: 'rhubarb', title: 'Rhubarb' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: { theme: 'light', seed: 'glacier' },

  decorators: [
    (Story, context) => {
      const theme = String(context.globals.theme ?? 'light');
      const seed = String(context.globals.seed ?? 'glacier');
      document.documentElement.setAttribute('data-theme', theme);
      // A seed reorders the sky and nothing else. Glacier is the default.
      document.documentElement.setAttribute('data-seed', seed);
      // React Flow reads .dark on an ancestor; tokens.css treats it as an alias.
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return Story();
    },
  ],
};

export default preview;
