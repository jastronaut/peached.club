import { themes } from '@storybook/theming';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
}

export const decorators = [
  (Story) => (
    <div style={{
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }}>
      <Story />
    
    </div>
  )
];