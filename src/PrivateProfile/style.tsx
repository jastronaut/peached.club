import styled from 'styled-components';
import { rem } from 'polished';

export const PrivateProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;

	> h1 {
		margin: ${rem(4)} 0;
	}

	> p {
		color: ${props => props.theme.text.primary};
		margin-bottom: ${rem(4)};
	}
`;

export const Bio = styled.p`
	margin: 0 0 ${rem(16)};
`;

export const AvatarPreview = styled.img`
	border: ${rem(1)} solid transparent;
	border-radius: 50%;
	object-fit: cover;
	width: ${rem(75)};
	height: ${rem(75)};

	:hover {
		border-color: ${props => props.theme.accent};
	}
`;
