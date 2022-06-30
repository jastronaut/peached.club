import styled from 'styled-components';

export const Title = styled.h1`
	color: ${props => (props.theme.text.primary)};
	margin-left: 1rem;
`;

export const SubTitle = styled.h2`
	color: ${props => (props.theme.text.primary)};
	margin: 0 0 0.5rem;
`;

export const Handle = styled.p`
	margin-top: 0;
	margin-bottom: 1rem;
	color: #cacaca;
`;
