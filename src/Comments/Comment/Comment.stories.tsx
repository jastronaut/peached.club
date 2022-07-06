import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Comment } from './Comment';
import { Page } from '../../Theme/Layout';

import { darkTheme, lightTheme } from '../../Theme/theme';
import { ThemeProvider } from 'styled-components';

export default {
	title: 'Friend/Comment',
	component: Comment,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = ({ variant, ...rest }) => {
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<Comment {...rest} />
			</Page>
		</ThemeProvider>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	deleteComment: (id: string) => null,

	id: '5',
	body: 'sdlkfjsldkf kdsf sdlkf djfks fld fsd faf kdfj sd',
	author: {
		id: '5',
		name: 'futuresounds',
		displayName: 'Hatsune Miku',
		bio: 'voice synthesizing superstar',
		isPublic: false,
		posts: [],
		unreadPostCount: 0,
		lastRead: 1,
	},
	isFriend: true,
	mutualFriends: [],
	peachFeedIds: ['1', '5'],
	avatarSrc:
		'https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg',
	requesterId: '1',
};
