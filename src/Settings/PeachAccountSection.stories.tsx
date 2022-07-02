import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PeachAccountSection, PeachAccountSectionProps } from '.';
import { Page } from '../Theme/Layout';
import { darkTheme, lightTheme } from '../Theme/theme';

const PAS = (props: PeachAccountSectionProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<Page>
				<PeachAccountSection {...rest} />
			</Page>
		</ThemeProvider>
	);
};

// type ThemeWrapperProps<T extends JSXElementConstructor<any> | keyof IntrinsicElements> = {
// 	variant: string; Elm: T;
// }

// // type PP = JSXElementConstructor<any> | keyof IntrinsicElements;
// type DisplayComponent<T extends {}> = (props: T) => JSX.Element;

// type ThemeWrapperType<T extends DisplayComponent<Q>, Q extends {}> = {
// 	variant: string;
// Elm: T
// } & Q ;

// function AThemeWrapper<Q extends DisplayComponent<R>, R extends >(props: ThemeWrapperType<Q, R> ) {
// 	const {Elm, variant, ...rest } = props;
// 	return (
// 		<>
// 		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
// 			<Page>
// 				<Elm  {...rest} />
// 			</Page>
// 		</ThemeProvider>
// 		</>
// 	);
// }

// const ooo = AThemeWrapper<typeof PeachAccountSection, PeachAccountSectionProps>({
// 	variant: 'dark',
// 	elm: PeachAccountSection,
// 	logout: () => null,
// })
// type xxxx =typeof ooo;

// type aa = typeof AThemeWrapper<typeof PeachAccountSection>

// const x = PeachAccountSection;
// type ppppp = typeof x;
// const PAS2  = (props: React.ComponentProps<typeof T> & { variant: string }): <T> => {
// 	const { variant, ...rest } = props;
// 	return (
// 		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
// 			<Page>
// 				<PeachAccountSection {...rest} />
// 			</Page>
// 		</ThemeProvider>
// 	);
// };

export default {
	title: 'Settings/PeachAccountSection',
	component: PAS,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof PAS>;

const Template: ComponentStory<typeof PAS> = props => {
	return <PAS {...props} />;
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	logout: () => null,
};
