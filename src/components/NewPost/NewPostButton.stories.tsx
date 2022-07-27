import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { NewPostButton } from './NewPostButton';

import { darkTheme } from '../../Theme/theme';
import { ThemeProvider } from 'styled-components';

export const Story = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<NewPostButton setShowComposer={() => null} />
		</ThemeProvider>
	);
};

export default {
	component: Story,
} as ComponentMeta<typeof Story>;
