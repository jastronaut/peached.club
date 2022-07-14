import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { FriendRequestComponent } from './FriendRequestComponent';

import { lightTheme } from '../../Theme/theme';
import { ThemeProvider } from 'styled-components';

export const Story = () => {
	return (
		<ThemeProvider theme={lightTheme}>
			<FriendRequestComponent
				bio='sdf fdkjsfj klsdfj sdklf https://en.wikipedia.org sdjfhskjdfhsdjfhslddfjdlfjdkfjkldjfldkjfjfh '
				name='futuresounds'
				displayName='🎧 hatsune miku is a vocaloid'
				avatarSrc=''
			>
				hello
			</FriendRequestComponent>
		</ThemeProvider>
	);
};

export default {
	component: Story,
	title: 'Activity/FriendRequestComponent',
} as ComponentMeta<typeof Story>;
