import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentsComponent, CommentsComponentProps } from './Comments';
import { Page } from '../Theme/Layout';

import { darkTheme, lightTheme } from '../Theme/theme';
import { ThemeProvider } from 'styled-components';

const avatars = [
	'https://upload.wikimedia.org/wikipedia/commons/9/99/Basset_hound_history.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg',
];

const CommentsStory = (props: CommentsComponentProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<CommentsComponent {...rest} />
			</Page>
		</ThemeProvider>
	);
};

export default {
	title: 'Friend/CommentsComponent',
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
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<CommentsComponent {...rest} />
			</Page>
		</ThemeProvider>
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
			},
		},
		{
			id: '6',
			body: 'siejhr hdsfg shdf hdf dhfasdgf29q 39474i ffypfg; dlkfjsldkf kdsf sdlkf djfks fld fsd faf kdfj sd',
			author: {
				id: '1',
				name: 'jastronaut',
				displayName: 'Jas Jas Jas',
				bio: 'voice synthesizing superstar',
				isPublic: false,
				posts: [],
				unreadPostCount: 0,
				lastRead: 1,
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
