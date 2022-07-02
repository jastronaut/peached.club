import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FriendFeedContainer, FriendFeedProps } from '.';
import { POST_TYPE } from '../api/interfaces';

import { darkTheme, lightTheme } from '../Theme/theme';
import { ThemeProvider } from 'styled-components';

const FriendFeedStory = (props: FriendFeedProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<FriendFeedContainer {...rest} />
		</ThemeProvider>
	);
};

export default {
	title: 'Friend/FriendFeedContainer',
	component: FriendFeedStory,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof FriendFeedStory>;

const Template: ComponentStory<typeof FriendFeedStory> = props => {
	return <FriendFeedStory {...props} />;
};

export const TextPost = Template.bind({});
TextPost.args = {
	variant: 'dark',
	id: '12345',
	message: [
		{
			type: POST_TYPE.TEXT,
			text: "By introducing args into your component's stories, you're not only reducing the amount of code you need to write, but you're also decreasing data duplication, as shown by spreading the Primary story's args into the other stories.",
		},
	],

	commentCount: 0,
	likeCount: 15,
	likedByMe: true,

	isUnread: false,
	createdTime: 1635786045,
	updatedTime: 1650742632,
	comments: [],

	deletePost: (id: string) => null,
	author: 'hatsune miku',
	otherFriends: [],
	postAuthorAvatarSrc: 'http://peach.cool/images/icon-peach-header-big@2x.png',
};
