import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FriendRequestItem, FriendRequestItemProps } from './FriendRequestItem';

import { DEFAULT_AVATAR_SRC } from '../../constants';

import { darkTheme, PeachThemeProvider } from '../../Theme/theme';

const avatars = [
	'https://upload.wikimedia.org/wikipedia/commons/9/99/Basset_hound_history.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg',
];

const Story = (props: FriendRequestItemProps) => {
	return (
		<PeachThemeProvider theme={darkTheme}>
			<FriendRequestItem {...props} />
		</PeachThemeProvider>
	);
};

const Template: ComponentStory<typeof Story> = props => {
	return <Story {...props} />;
};

export default {
	component: Story,
	title: 'FriendRequest/FriendRequestItem',
} as ComponentMeta<typeof Story>;

export const Primary = Template.bind({});
Primary.args = {
	avatarSrc: DEFAULT_AVATAR_SRC,
	displayName: 'Hatsune Miku',
	name: 'futuresounds',
	bio: 'International digital superstar | Japan',
	onClickAccept: (name: string) => console.log('accept request from' + name),
	onClickDecline: (name: string) => console.log('accept request from' + name),
};
