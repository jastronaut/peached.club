import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Preview, PreviewProps } from './Preview';
import { DEFAULT_AVATAR_SRC } from '../../constants';

import { darkTheme, lightTheme, PeachThemeProvider } from '../../Theme/theme';

const Story = (props: PreviewProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<PeachThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Preview {...rest} />
		</PeachThemeProvider>
	);
};

export default {
	component: Story,
	title: 'Feed/Preview',
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
		isFavorite: {
			control: 'boolean',
		},
	},
} as ComponentMeta<typeof Story>;

const Template: ComponentStory<typeof Story> = props => {
	return <Story {...props} />;
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	id: '2',
	avatarSrc: DEFAULT_AVATAR_SRC,
	name: 'futuresounds',
	displayName: 'Hatsune Miku',
	message: 'hey there',
	unread: true,
	isFavorite: true,
};
