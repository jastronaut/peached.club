import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		name: string;
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
		accent: string;
		border: {
			primary: string;
			secondary: string;
		};
	}
}
