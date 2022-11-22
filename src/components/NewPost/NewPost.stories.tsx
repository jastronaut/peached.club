import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NewPost, { NewPostProps } from './NewPost';

import { darkTheme, lightTheme } from '../../Theme/theme';
import { ThemeProvider } from 'styled-components';
import { Post } from '../../api/interfaces';

const ComposerStory = (props: { variant: string } & NewPostProps) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<NewPost {...rest} />
		</ThemeProvider>
	);
};

export default {
	title: 'NewPost/NewPostComponent',
	component: ComposerStory,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof ComposerStory>;

const Template: ComponentStory<typeof ComposerStory> = props => {
	return <ComposerStory {...props} />;
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	showNewPost: (post: Post) => null,
};
