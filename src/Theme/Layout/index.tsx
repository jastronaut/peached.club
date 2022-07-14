import styled from 'styled-components';

export const Page = styled.main`
	background-color: ${props => props.theme.background.accented};
	margin: 5rem 15rem;

	@media screen and (max-width: 1080px) {
		margin: 5rem 10rem;
	}
	@media screen and (max-width: 900px) {
		margin: 0 0;
	}
`;
