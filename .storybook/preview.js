import { themes } from '@storybook/theming';
import styled from 'styled-components';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		theme: themes.dark,
	},
};

const Wrapper = styled.div`
	font-family: 'Lato', sans-serif;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;

	h1,
	h2,
	h3 {
		font-family: 'Montserrat', sans-serif;
	}

	a,
	a:visited {
		text-decoration: none;
		color: #fe4f72;
	}

	a:hover {
		text-decoration: underline;
	}
`;

export const decorators = [
	Story => (
		<Wrapper>
			<Story />
		</Wrapper>
	),
];
