import styled from 'styled-components';
import { rem } from 'polished';
import { Link as RRLink } from 'react-router-dom';

export const TabsWrapper = styled.div`
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
	padding: ${rem(16)} ${rem(24)};
	margin: ${rem(16)};
	border-radius: ${rem(8)};

	.mantine-Tabs-tabLabel {
		font-family: Montserrat;
	}

	@media screen and (max-width: 800px) {
		padding: ${rem(16)} ${rem(16)};
	}
`;

export const Link = styled(RRLink)`
	:hover {
		text-decoration: none;
	}
`;
