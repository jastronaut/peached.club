import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import { UploadableMessageTypes } from '../../../api/interfaces';
import { ComposerComponent, ComposerProps } from './Composer';
import { darkTheme, lightTheme } from '../../../Theme/theme';

const ComposerStory = (
	props: ComposerProps & { curUserId: string } & { variant: string }
) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<ComposerComponent {...rest} />
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
	onSubmit: (messages: UploadableMessageTypes[]) => null,
	setIsComposerShowing: (showing: boolean) => null,
	isOpen: true,
};
