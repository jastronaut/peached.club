import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { Preview } from './Preview';
import { DEFAULT_AVATAR_SRC } from '../../constants';
import { POST_TYPE, TextMessage } from '../../api/interfaces';

import { darkTheme, PeachThemeProvider } from '../../Theme/theme';
import { sortMainFeedPosts } from '../../utils/sortMainFeedPosts';

const DEFAULT_TEXT_POST: TextMessage = {
	type: POST_TYPE.TEXT,
	text: 'hey',
};

const DEFAULT_POST_PROPS = {
	message: [DEFAULT_TEXT_POST],
	commentCount: 0,
	likeCount: 0,
	likedByMe: false,
};

const DEFAULT_USER_PROPS = {
	youFollow: true,
	followsYou: true,
	lastRead: 1,
	lastOnline: 1,
	bio: '',
	friendsSharing: false,
	isPublic: false,
	avatarSrc: DEFAULT_AVATAR_SRC,
	textPreview: DEFAULT_TEXT_POST.text,
};

const CONNECTIONS = [
	{
		...DEFAULT_USER_PROPS,
		id: '1',
		name: 'futuresounds',
		displayName: 'Hatsune Miku',
		isFavorite: true,
		unreadPostCount: 0,
		posts: [],
	},
	{
		...DEFAULT_USER_PROPS,
		id: '2',
		name: 'kagaminerin',
		displayName: 'rin',
		isFavorite: false,
		unreadPostCount: 0,
		posts: [],
	},
	{
		...DEFAULT_USER_PROPS,
		id: '3',
		name: 'kagaminelen',
		displayName: 'len',
		isFavorite: true,
		unreadPostCount: 0,
		posts: [
			{
				...DEFAULT_POST_PROPS,
				id: '1',
				isUnread: false,
				createdTime: -5,
				updatedTime: -5,
			},
		],
		createdTime: -5,
	},
	{
		...DEFAULT_USER_PROPS,
		id: '4',
		name: 'kaito',
		displayName: 'kaiiiito',
		isFavorite: false,
		unreadPostCount: 0,
		posts: [
			{
				...DEFAULT_POST_PROPS,
				id: '1',
				isUnread: false,
				createdTime: -5,
				updatedTime: -5,
			},
		],
		createdTime: -5,
	},
	{
		...DEFAULT_USER_PROPS,
		id: '5',
		name: 'meiko',
		displayName: 'MEIKO',
		isFavorite: true,
		unreadPostCount: 1,
		posts: [
			{
				...DEFAULT_POST_PROPS,
				id: '1',
				isUnread: true,
				createdTime: 5,
				updatedTime: 5,
			},
		],
		createdTime: 5,
	},
	{
		...DEFAULT_USER_PROPS,
		id: '6',
		name: 'freak',
		displayName: 'Will Graham',
		isFavorite: true,
		unreadPostCount: 1,
		posts: [
			{
				...DEFAULT_POST_PROPS,
				id: '0',
				isUnread: false,
				createdTime: 5,
				updatedTime: 5,
			},
			{
				...DEFAULT_POST_PROPS,
				id: '1',
				isUnread: true,
				createdTime: 10,
				updatedTime: 10,
			},
		],
		createdTime: 10,
	},
	{
		...DEFAULT_USER_PROPS,
		id: '7',
		name: 'meateater',
		displayName: 'Hannibal Lecter',
		isFavorite: false,
		unreadPostCount: 1,
		posts: [
			{
				...DEFAULT_POST_PROPS,
				id: '0',
				isUnread: false,
				createdTime: 5,
				updatedTime: 5,
			},
			{
				...DEFAULT_POST_PROPS,
				id: '1',
				isUnread: true,
				createdTime: 10,
				updatedTime: 10,
			},
		],
		createdTime: 10,
	},
	{
		...DEFAULT_USER_PROPS,
		id: '8',
		name: 'emoslob',
		displayName: 'Shadow the hedgehog',
		isFavorite: false,
		unreadPostCount: 1,
		posts: [
			{
				...DEFAULT_POST_PROPS,
				id: '0',
				isUnread: false,
				createdTime: 5,
				updatedTime: 5,
			},
			{
				...DEFAULT_POST_PROPS,
				id: '1',
				isUnread: true,
				createdTime: 15,
				updatedTime: 15,
			},
		],
		createdTime: 15,
	},
];

const sortedConnections = CONNECTIONS.sort(sortMainFeedPosts);

const Story = () => {
	return (
		<BrowserRouter>
			<PeachThemeProvider theme={darkTheme}>
				{sortedConnections.map(c => (
					<Preview {...c} />
				))}
			</PeachThemeProvider>
		</BrowserRouter>
	);
};

export default {
	component: Story,
	title: 'Feed/Previews',
} as ComponentMeta<typeof Story>;

export const Primary = () => <Story />;
Primary.storyName = 'Sorted previews';
