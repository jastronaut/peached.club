import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileHeader } from './ProfileHeader';
import { POST_TYPE } from '../api/interfaces';
import { Page } from '../Theme/Layout';

import { darkTheme, lightTheme } from '../Theme/theme';
import { ThemeProvider } from 'styled-components';

export default {
  title: 'Friend/ProfileHeader',
  component: ProfileHeader,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof ProfileHeader>;

const Template: ComponentStory<typeof ProfileHeader> = ({variant, ...rest}) => { return(

		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
<ProfileHeader {...rest} /></Page> </ThemeProvider>);
}

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	viewingUser: {
	id: '1235',
	name: 'futuresounds',
	displayName: 'Hatsune Miku',
	avatarSrc: 'http://peach.cool/images/icon-peach-header-big@2x.png',
	bio: 'Hey there shdf sdjhf sjdkfh sdjf sdjf d k',
	isPublic: false,
	friendsSharing: false,
	youFollow: true,
	followsYou: true,
	posts: [],
	unreadPostCount: 0,
	lastRead: 0,
	lastOnline: 0,
	isFavorite: true
	}
};
