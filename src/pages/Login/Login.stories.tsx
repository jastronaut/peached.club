import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoginComponent, LoginComponentProps } from '.';
import { Page } from '../../Theme/Layout';

import { darkTheme, lightTheme } from '../../Theme/theme';
import { ThemeProvider } from 'styled-components';

const LoginStory = (props: LoginComponentProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<LoginComponent {...rest} />
			</Page>
		</ThemeProvider>
	);
};

export default {
	title: 'Auth/Login',
	component: LoginStory,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof LoginStory>;

const Template: ComponentStory<typeof LoginStory> = props => {
	return <LoginStory {...props} />;
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	setEmail: () => null,
	setPassword: () => null,
	onClickSubmit: () => null,
};
