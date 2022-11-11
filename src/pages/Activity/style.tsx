import styled from 'styled-components';
import { rem } from 'polished';

export const TabsWrapper = styled.div`
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
	padding: ${rem(16)} ${rem(24)};
	margin: ${rem(16)};
	border-radius: ${rem(8)};

	@media screen and (max-width: 800px) {
		padding: ${rem(16)} ${rem(16)};
	}
`;
