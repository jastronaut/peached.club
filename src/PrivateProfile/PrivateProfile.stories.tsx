import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { PrivateProfile } from './PrivateProfile';

import { darkTheme } from '../Theme/theme';
import { ThemeProvider } from 'styled-components';

export const Story = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<PrivateProfile
				onDismissPrivateProfile={() => null}
				username={'futuresounds'}
				displayName='Hatsune Miku'
				bio='Virtual pop star'
				avatarSrc='https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg'
			/>
		</ThemeProvider>
	);
};

export default {
	component: Story,
	title: 'Friend/PrivateProfile',
} as ComponentMeta<typeof Story>;
