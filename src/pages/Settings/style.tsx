import styled from 'styled-components';
import { rem } from 'polished';

export const SettingsWrapper = styled.div`
	background: ${props => props.theme.background.accented};
	color: ${props => props.theme.text.primary};
	padding: 2rem 2.5rem;
	height: 100%;
	word-wrap: break-word;
	margin: 1rem;
	border-radius: 0.5rem;

	@media screen and (max-width: 700px) {
		padding: 1rem 1.25rem;
		margin: 0.5rem;
		border-radius: 0.25rem;
	}

	p:last-of-type {
		margin-bottom: 0;
	}
`;

export const ErrText = styled.span`
	color: red;
	margin-left: 1rem;
`;
export const SuccessText = styled.span`
	color: #25d87a;
	margin-left: 1rem;
`;

export const SettingsSection = styled.div`
	margin-bottom: 2rem;
	border: 1px solid ${props => props.theme.border.primary};
	border-radius: ${rem(5)};
	padding: ${rem(24)};
	background-color: ${props => props.theme.background.primary};
`;

export const LogoutButtonWrapper = styled.div`
	margin: 1rem 0;
	padding: 0;
	display: flex;
	justify-content: end;

	> a {
		text-decoration: none;
	}
`;
