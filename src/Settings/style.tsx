import styled from 'styled-components';

export const SettingsWrapper = styled.div<{ darkMode: boolean }>`
	background: ${props => (props.darkMode ? '#262628' : 'white')};
	color: ${props => (props.darkMode ? 'white' : 'black')};
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
`;

export const LogoutButtonWrapper = styled.div`
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: end;

	> a {
		text-decoration: none;
	}
`;
