import { createGlobalStyle } from 'styled-components';
import { rem } from 'polished';

export const GlobalStyle = createGlobalStyle`
    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: ${props => props.theme.background.accented};
        font-family: 'Lato', sans-serif;
    }
    
    h1, h2, h3 {
        font-family: 'Montserrat', sans-serif;
    }
    
    a, a:visited {
        text-decoration: none;
        color: ${props => props.theme.link};
    }
    
    a:hover {
        text-decoration: underline;
    }

	@keyframes riseandfade {
		from {
			opacity: 0;
			transform: translateY(${rem(10)});
		}

		to {
			transform: translateY(0);
            opacity: 1;
		}
	}

`;
