import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PeachAccountSection } from '.';
import { Page } from '../Theme/Layout';

import { darkTheme, lightTheme } from '../Theme/theme';

export default {
	title: 'Settings/PeachAccountSection',
	component: PeachAccountSection,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof PeachAccountSection>;

const Template: ComponentStory<typeof PeachAccountSection> = ({
	variant,
	...rest
}) => {
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<PeachAccountSection {...rest} />
			</Page>
		</ThemeProvider>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	logout: () => null,
};
