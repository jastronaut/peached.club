import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ComposerComponent, ComposerProps } from './Composer';
import { Page } from '../Theme/Layout';

import { darkTheme, lightTheme } from '../Theme/theme';
import { ThemeProvider } from 'styled-components';

import { TextMessage, ImageMessage } from '../api/interfaces';

const ComposerStory = (
	props: ComposerProps & { curUserId: string } & { variant: string }
) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<ComposerComponent {...rest} />
			</Page>
		</ThemeProvider>
	);
};

export default {
	title: 'NewPost/Composer',
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
	curUserId: '4',
	onSubmit: (messages: (TextMessage | ImageMessage)[]) => null,
	toggleComposer: () => null,
};
