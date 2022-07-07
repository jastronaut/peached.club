import styled from 'styled-components';
import { rem } from 'polished';
const backgrounds = [
	'https://imgur.com/upR9smx.jpg',
	'https://imgur.com/FYvdKAb.jpg',
	'https://imgur.com/GRyoWfj.jpg',
	'https://imgur.com/aqfkgt5.jpg',
	'https://imgur.com/xyAcBRG.jpg',
];
const numBackgrounds = backgrounds.length;

const getRandomBackgroundUrl = () =>
	`${backgrounds[Math.floor(Math.random() * numBackgrounds)]}`;

export const ProfileHeaderContainer = styled.div`
	padding-top: ${rem(50)};
	border: 1px solid ${props => props.theme.border.secondary};
	background-image: url(${getRandomBackgroundUrl()});
	color: ${props => props.theme.text.primary};
	background-size: cover;

	@media screen and (max-width: 700px) {
		margin: 3rem 1rem 0;
	}
`;

export const ProfileHeaderContent = styled.div`
	background-color: ${props => props.theme.background.primary};
	display: flex;
	padding: ${rem(10)} ${rem(15)};
	margin-top: ${rem(50)};
	padding-bottom: ${rem(16)};
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
		word-break: break-word;
	}
`;
