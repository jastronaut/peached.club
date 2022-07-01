import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoginComponent } from '.';
import { Page } from '../Theme/Layout';

import { darkTheme, lightTheme } from '../Theme/theme';
import { ThemeProvider } from 'styled-components';

export default {
	title: 'Auth/Login',
	component: LoginComponent,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof LoginComponent>;

const Template: ComponentStory<typeof LoginComponent> = ({
	variant,
	...rest
}) => {
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<LoginComponent {...rest} />
			</Page>
		</ThemeProvider>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	setEmail: () => null,
	setPassword: () => null,
	onClickSubmit: () => null,
};
