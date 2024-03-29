import styled from 'styled-components';
import { rem } from 'polished';

import { getRandomBackgroundUrl } from './utils';

export const ProfileHeaderContainer = styled.div`
	padding-top: ${rem(50)};
	border: 1px solid ${props => props.theme.border.secondary};
	background-image: url(${getRandomBackgroundUrl()});
	color: ${props => props.theme.text.primary};
	background-size: cover;

	@media screen and (max-width: 700px) {
		margin: 0;
	}
`;

export const ProfileHeaderContent = styled.div`
	background-color: ${props => props.theme.background.primary};
	display: flex;
	padding: ${rem(10)} ${rem(15)} ${rem(16)};
	margin-top: ${rem(50)};
	border-top: ${rem(10)} solid ${props => props.theme.background.primary};
	border-top-left-radius: ${rem(20)};
	border-top-right-radius: ${rem(20)};

	@media screen and (max-width: 500px) {
		padding-bottom: ${rem(6)};
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: ${rem(24)};
		text-align: center;
	}
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

	@media screen and (max-width: 900px) {
		> img {
			translate: translateY(-50%);
			width: ${rem(75)};
			height: ${rem(75)};
		}
	}

	> img {
		transition: 0.5s transform ease;
	}

	> img:hover {
		transition: 0.5s transform ease;
		transform: rotateX(180deg);
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

	a,
	a:visited {
		color: ${props => props.theme.link};
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	> h2 {
		margin: 0;
	}

	> p:last-child {
		margin: 0 auto;
		word-break: break-word;
	}
`;
