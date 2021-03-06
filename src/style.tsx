import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ darkMode: boolean }>`
    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		background: ${props => (props.darkMode ? 'black' : '#ffe8e5')};
		transition: 0.5s all ease;
    }
`;
