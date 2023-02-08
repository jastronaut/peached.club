import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentsComponent, CommentsComponentProps } from './Comments';

import { darkTheme, lightTheme, PeachThemeProvider } from '../../Theme/theme';
import { BrowserRouter } from 'react-router-dom';

const avatars = [
	'https://upload.wikimedia.org/wikipedia/commons/9/99/Basset_hound_history.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg',
];

const CommentsStory = (props: CommentsComponentProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<BrowserRouter>
			<PeachThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
				<CommentsComponent {...rest} />
			</PeachThemeProvider>
		</BrowserRouter>
	);
};

export default {
	title: 'Comments/CommentsComponent',
	component: CommentsStory,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof CommentsStory>;

const Template: ComponentStory<typeof CommentsStory> = ({
	variant,
	...rest
}) => {
	return (
		<BrowserRouter>
			<PeachThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
				<CommentsComponent {...rest} />
			</PeachThemeProvider>
		</BrowserRouter>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	deleteComment: (id: string) => null,

	comments: [
		{
			id: '5',
			body: 'sdlkfjsldkf kdsf sdlkf djfks fld fsd faf kdfj sd',
			author: {
				id: '0',
				name: 'futuresounds',
				displayName: 'Hatsune Miku',
				bio: 'voice synthesizing superstar',
				isPublic: false,
				posts: [],
				unreadPostCount: 0,
				lastRead: 1,
				avatarSrc: avatars[1],
			},
		},
		{
			id: '6',
			body: 'siejhr hdsfg shdf https://news.ycombinator.com/ hdf dhfasdgf29q 39474i ffypfg; dlkfjsldkf kdsf sdlkf djfks fld fsd faf kdfj sd',
			author: {
				id: '1',
				name: 'jastronaut',
				displayName: 'Jas Jas Jas',
				bio: 'voice synthesizing superstar',
				isPublic: false,
				posts: [],
				unreadPostCount: 0,
				lastRead: 1,
				avatarSrc: avatars[0],
			},
		},
	],
	mutualFriends: [],
	peachFeedIds: ['1', '5'],
	getAvatar: (id: string) => {
		return avatars[Number(id)];
	},
	requesterId: '1',
};
