import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { MantineProvider } from '@mantine/core';

export const lightTheme = {
	name: 'light',
	text: {
		primary: '#333333',
		muted: '#696969',
		lightest: '#aaaaaa',
	},
	background: {
		primary: '#ffffff',
		secondary: '#E7E8EC',
		hover: '#cacaca90',
		accented: '#ffe8e5',
	},
	accent: '#fe4f72',

	border: {
		primary: '#555',
		secondary: '#ddd',
	},
};

export const darkTheme = {
	name: 'dark',
	accent: '#fe4f72',
	text: {
		primary: '#C1C2C5',
		muted: '#cccc',
		lightest: '#aaaaaa',
	},
	background: {
		primary: '#25262b',
		secondary: '#262628',
		hover: '#cacaca50',
		accented: '#000000',
	},
	border: {
		primary: '#1f2024',
		secondary: '#2C2E33',
	},
};

export const PeachThemeProvider = (props: {
	children: React.ReactNode;
	theme: DefaultTheme;
}) => {
	return (
		<>
			<MantineProvider
				theme={{
					colors: {
						pink: [
							'#ffe3ea',
							'#ffb1c2',
							'#ff7f99',
							'#fe4e71',
							'#fd1e48',
							'#e30730',
							'#b10124',
							'#80001a',
							'#4e000f',
							'#1f0004',
						],
					},
					primaryColor: 'pink',
					fontFamily: 'Lato, sans-serif',
					headings: { fontFamily: 'Montserrat, sans-serif' },
				}}
			>
				<ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
			</MantineProvider>
		</>
	);
};
