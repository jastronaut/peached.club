import styled from 'styled-components';
import { rem } from 'polished';

export const Page = styled.main`
	background-color: ${props => props.theme.background.accented};
	margin: 5rem 15rem;

	@media screen and (max-width: 1080px) {
		margin: 5rem 10rem;
	}
	@media screen and (max-width: 900px) {
		margin: 5rem 5rem;
	}

	@media screen and (max-width: 700px) {
		margin: 2rem 0;
	}
`;

export const Container = styled.div`
	display: flex;
	border: 1px solid ${props => props.theme.background.primary};
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
	padding: 2rem 2.5rem;

	margin: 1rem;
	border-radius: 0.5rem;

	@media screen and (max-width: 700px) {
		padding: ${rem(8)} ${rem(16)};
		margin: 0.5rem;
		border-radius: 0.25rem;
	}
`;
