// import original module declarations
import 'styled-components';

// and extend them!
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
		};
		accent: string;
		border: {
			primary: string;
			secondary: string;
		};
	}
}
