import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ComposerComponent } from './Composer';
import { Page } from '../Theme/Layout';

import { darkTheme, lightTheme } from '../Theme/theme';
import { ThemeProvider } from 'styled-components';

import { TextMessage, ImageMessage } from '../api/interfaces';

export default {
	title: 'NewPost/Composer',
	component: ComposerComponent,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof ComposerComponent>;

const Template: ComponentStory<typeof ComposerComponent> = ({
	variant,
	...rest
}) => {
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<ComposerComponent {...rest} />
			</Page>
		</ThemeProvider>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	curUserId: '4',
	onSubmit: (messages: (TextMessage | ImageMessage)[]) => null,
	toggleComposer: () => null,
};
