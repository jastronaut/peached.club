import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { PrivateProfile } from './PrivateProfile';

import { darkTheme, PeachThemeProvider } from '../../Theme/theme';

export const Story = () => {
	return (
		<PeachThemeProvider theme={darkTheme}>
			<PrivateProfile
				onDismissPrivateProfile={() => null}
				username={'futuresounds'}
				displayName='Hatsune Miku'
				bio='Virtual pop star'
				avatarSrc='https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg'
			/>
		</PeachThemeProvider>
	);
};

export default {
	component: Story,
	title: 'Profile/PrivateProfile',
} as ComponentMeta<typeof Story>;
