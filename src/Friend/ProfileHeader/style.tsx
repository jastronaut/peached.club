import styled from 'styled-components';
import { rem } from 'polished';
const backgrounds = [
	'aqua.png',
	'citrus.png',
	'dream.png',
	'dusk.png',
	'fantasy.png',
];
const numBackgrounds = backgrounds.length;

const getRandomBackgroundUrl = () =>
	`backgrounds/${backgrounds[Math.floor(Math.random() * numBackgrounds)]}`;

export const ProfileHeaderContainer = styled.div`
	margin-bottom: 1rem;
	padding-top: ${rem(50)};
	border-right: 1px solid ${props => props.theme.border.secondary};
	border-left: 1px solid ${props => props.theme.border.secondary};
	border-top: 1px solid ${props => props.theme.border.secondary};
	background-image: url(${getRandomBackgroundUrl()});
	color: ${props => props.theme.text.primary};
	background-size: cover;

	@media screen and (max-width: 700px) {
		margin: 3rem 1rem 1rem;
	}
`;

export const ProfileHeaderContent = styled.div`
	background-color: ${props => props.theme.background.primary};
	display: flex;
	margin-top: ${rem(50)};
	padding-bottom: ${rem(10)};
	border-bottom: 1px solid ${props => props.theme.border.secondary};
	border-top: ${rem(10)} solid ${props => props.theme.background.primary};
	border-top-left-radius: ${rem(20)};
	border-top-right-radius: ${rem(20)};
`;

export const Avatar = styled.div`
	flex: 1;
	align-items: center;
	display: flex;
	> img {
		border-radius: 50%;
		width: 100px;
		height: 100px;
		object-fit: cover;
	}
`;

export const ProfileHeaderHandle = styled.p`
	margin-top: 0;
	margin-bottom: 0.25rem;
	color: ${props => props.theme.text.muted};
`;

export const ProfileHeaderText = styled.div`
	flex: 9;
	margin: 1rem;

	> h2 {
		margin: 0;
	}

	> p:last-child {
		margin: 0 auto;
	}
`;
