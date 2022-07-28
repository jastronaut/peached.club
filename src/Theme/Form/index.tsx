import styled from 'styled-components';
import { rem } from 'polished';

export const TextArea = styled.textarea`
	/* flex: 9; */
	margin-right: 1rem;
	resize: none;
	border-radius: ${rem(6)};
	border: 1px solid ${props => props.theme.background.secondary};
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const Label = styled.label`
	color: ${props => props.theme.text.primary};
	display: block;
	margin-bottom: ${rem(5)};
`;

export const Input = styled.input`
	background: ${props => props.theme.background.secondary};
	font-size: 1rem;
	border: 1px solid ${props => props.theme.border.secondary};
	border-radius: ${rem(6)};
	padding: 0.25rem;
	color: ${props => props.theme.text.primary};
`;

export const Fieldset = styled.fieldset`
	margin: 1rem 0 0.5rem;
	padding: 0;
	border: none;

	:first-of-type {
		margin: 1.5rem 0 0.5rem;
	}
`;
