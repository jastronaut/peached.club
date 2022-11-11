import styled from 'styled-components';
import { rem } from 'polished';

export const Heading = styled.h1`
	font-weight: 900;
	text-align: center;
	letter-spacing: -${rem(0.75)};
	color: ${props => props.theme.text.primary};
`;
