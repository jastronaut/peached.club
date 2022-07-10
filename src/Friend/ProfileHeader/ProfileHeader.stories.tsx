import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';

import { ProfileHeader, ProfileHeaderProps } from './ProfileHeader';

import { darkTheme, lightTheme } from '../../Theme/theme';
import { ThemeProvider } from 'styled-components';

const Story = (props: ProfileHeaderProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<ProfileHeader {...rest} />
			</Page>
		</ThemeProvider>
	);
};

export default {
	title: 'Friend/ProfileHeader',
	component: Story,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof Story>;

const Template: ComponentStory<typeof Story> = props => {
	return <Story {...props} />;
};

const Page = styled.div`
	height: 100vh;
	background-color: ${props => props.theme.background.primary};
	padding: 50px;
`;

export const Primary = Template.bind({});
Primary.args = {
	postsLoaded: true,
	variant: 'dark',
	viewingUser: {
		id: '1235',
		name: 'futuresounds',
		displayName: 'Hatsune Miku',
		avatarSrc: 'http://peach.cool/images/icon-peach-header-big@2x.png',
		bio: 'Hey there shdf sdjhf https://news.ycombinator.com/ sjdkfh sdjf sdjf d k',
		isPublic: false,
		friendsSharing: false,
		youFollow: true,
		followsYou: true,
		posts: [],
		unreadPostCount: 0,
		lastRead: 0,
		lastOnline: 0,
		isFavorite: true,
	},
};
