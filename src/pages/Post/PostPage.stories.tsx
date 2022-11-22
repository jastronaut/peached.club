import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PostPage } from './PostPage';

import { POST_TYPE, Post as PostType } from '../../api/interfaces';

import { darkTheme, PeachThemeProvider } from '../../Theme/theme';

const avatars = [
	'https://upload.wikimedia.org/wikipedia/commons/9/99/Basset_hound_history.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg',
];

const Story = (props: PostType) => {
	return (
		<PeachThemeProvider theme={darkTheme}>
			<PostPage {...props} />
		</PeachThemeProvider>
	);
};

const Template: ComponentStory<typeof Story> = props => {
	return <Story {...props} />;
};

export default {
	component: Story,
	title: 'Post/PostPage',
} as ComponentMeta<typeof Story>;

export const Primary = Template.bind({});
Primary.args = {
	id: '1234',
	message: [
		{
			type: POST_TYPE.TEXT,
			text: `
			A wiki (/ˈwɪki/ (listen) WIK-ee) is a hypertext publication collaboratively edited and managed by its own audience, using a web browser. A typical wiki contains multiple pages for the subjects or scope of the project, and could be either open to the public or limited to use within an organization for maintaining its internal knowledge base.

			Wikis are enabled by wiki software, otherwise known as wiki engines. A wiki engine, being a form of a content management system, differs from other web-based systems such as blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[1] Wiki engines usually allow content to be written using a simplified markup language and sometimes edited with the help of a rich-text editor.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open-source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content. 
			`,
		},
		{
			type: POST_TYPE.IMAGE,
			src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/300px-Wikipedia-logo-v2.svg.png',
			height: 300,
			width: 300,
		},
		{
			type: POST_TYPE.LINK,
			url: 'https://en.wikipedia.org/wiki/Main_Page',
		},
	],
	commentCount: 2,
	likeCount: 3,
	likedByMe: true,
	isUnread: false,
	createdTime: 1665082221,
	updatedTime: 1665082221,
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
	],
};
