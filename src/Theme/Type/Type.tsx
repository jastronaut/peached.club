import styled from 'styled-components';

export const Title = styled.h1<{ darkMode: boolean }>`
	color: ${props => (props.darkMode ? 'white' : 'black')};
	margin-left: 1rem;
`;

export const SubTitle = styled.h2<{ darkMode: boolean }>`
	color: ${props => (props.darkMode ? 'white' : 'black')};
	margin: 0 0 0.5rem;
`;

export const Handle = styled.p`
	margin-top: 0;
	margin-bottom: 1rem;
	color: #cacaca;
`;
