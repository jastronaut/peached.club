import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FriendFeedContainer } from '.';
import { POST_TYPE } from '../api/interfaces';

import { darkTheme } from '../Theme/theme';
import { ThemeProvider } from 'styled-components';

export default {
  title: 'Friend/FriendFeedContainer',
  component: FriendFeedContainer,
} as ComponentMeta<typeof FriendFeedContainer>;

const Template: ComponentStory<typeof FriendFeedContainer> = (args) => (

		<ThemeProvider theme={darkTheme}>
<FriendFeedContainer {...args} /> </ThemeProvider>);

export const TextPost = Template.bind({});
TextPost.args = {
	id: '12345',
	message: [
		{
			type: POST_TYPE.TEXT,
			text: "By introducing args into your component's stories, you're not only reducing the amount of code you need to write, but you're also decreasing data duplication, as shown by spreading the Primary story's args into the other stories."
		}
	],
	
	commentCount: 0,
	likeCount: 15,
	likedByMe: true,
	
	isUnread: false,
	createdTime: 1635786045,
	updatedTime:1650742632,
	comments: []
	
	,deletePost: (id: string) => null,
	author: 'hatsune miku',
	otherFriends: [],	
	postAuthorAvatarSrc: 'http://peach.cool/images/icon-peach-header-big@2x.png'
};
