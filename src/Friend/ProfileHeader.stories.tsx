import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileHeader } from './ProfileHeader';
import { POST_TYPE } from '../api/interfaces';

import { darkTheme } from '../Theme/theme';
import { ThemeProvider } from 'styled-components';

export default {
  title: 'Friend/ProfileHeader',
  component: ProfileHeader,
} as ComponentMeta<typeof ProfileHeader>;

const Template: ComponentStory<typeof ProfileHeader> = (args) => (

		<ThemeProvider theme={darkTheme}>
<ProfileHeader {...args} /> </ThemeProvider>);

export const Primary = Template.bind({});
Primary.args = {
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
