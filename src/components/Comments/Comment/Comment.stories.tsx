import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Comment, CommentProps } from './Comment';
import {
	darkTheme,
	lightTheme,
	PeachThemeProvider,
} from '../../../Theme/theme';

const CommentStory = (props: CommentProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<PeachThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Comment {...rest} />
		</PeachThemeProvider>
	);
};

export default {
	title: 'Comments/Comment',
	component: CommentStory,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof CommentStory>;

const Template: ComponentStory<typeof CommentStory> = props => {
	return (
		<BrowserRouter>
			<CommentStory {...props} />
		</BrowserRouter>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	deleteComment: (id: string) => null,
	addReplyHandle: (txt: string) => null,

	id: '5',
	body: `What’s the strongest part of Chuck Norris? His opinion. Bigfoot claims he once saw Chuck Norris. Chuck Norris makes onions cry. Chuck Norris can dribble a bowling ball. If Chuck Norris were to travel to an alternate dimension in which there was another Chuck Norris and they both fought, they would both win.
`,
	author: {
		id: '5',
		name: 'futuresounds',
		displayName: 'Hatsune Miku',
		bio: 'voice synthesizing superstar',
		isPublic: false,
		posts: [],
		unreadPostCount: 0,
		lastRead: 1,
		avatarSrc:
			'https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg',
	},
	isFriend: true,
	mutualFriends: [],
	avatarSrc:
		'https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg',
	requesterId: '1',
};
