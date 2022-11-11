import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		name: string;
		link: string;
		accent: string;
		green: string;
		text: {
			primary: string;
			muted: string;
			lightest: string;
		};
		background: {
			primary: string;
			secondary: string;
			hover: string;
			accented: string;
		};
		border: {
			primary: string;
			secondary: string;
		};
	}
}
