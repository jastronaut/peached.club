import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
	FriendRequestsPreview,
	FriendRequestsPreviewProps,
} from './FriendRequestsPreview';

import { DEFAULT_AVATAR_SRC } from '../../constants';

import { darkTheme, PeachThemeProvider } from '../../Theme/theme';

const avatars = [
	'https://upload.wikimedia.org/wikipedia/commons/9/99/Basset_hound_history.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg',
];

const Story = (props: FriendRequestsPreviewProps) => {
	return (
		<PeachThemeProvider theme={darkTheme}>
			<FriendRequestsPreview {...props} />
		</PeachThemeProvider>
	);
};

const Template: ComponentStory<typeof Story> = props => {
	return <Story {...props} />;
};

export default {
	component: Story,
	title: 'FriendRequest/FriendRequestsPreview',
} as ComponentMeta<typeof Story>;

export const Primary = Template.bind({});
Primary.args = {
	numRequests: 5,
};
