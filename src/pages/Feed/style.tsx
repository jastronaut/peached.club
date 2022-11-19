import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from 'react-router-dom';
import {
	Indicator as MIndicator,
	Avatar as MAvatar,
	AvatarProps,
} from '@mantine/core';

export const InfoContainer = styled.div`
	height: 100%;
	width: 100%;
	margin-left: 1.5rem;

	> h3 {
		margin: 0;
	}

	> div {
		margin: 0;
		width: 100%;
		display: flex;
	}

	p {
		margin: 0;
	}

	blockquote {
		margin-left: ${rem(16)};
		margin-top: ${rem(4)};
		color: ${props => props.theme.text.muted};
	}

	@media screen and (max-width: 500px) {
		margin-left: 0.5rem;
	}
`;

interface FeedPostWrapperProps {
	isUnread: boolean;
}

export const FeedPostWrapper = styled.div<FeedPostWrapperProps>`
	border: 1px solid
		${props => (props.isUnread ? '#25d87a' : props.theme.background.primary)};
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
	cursor: pointer;

	display: flex;
	padding: 2rem 2.5rem;
	height: 100%;
	transition: 0.25s all ease-in;
	word-wrap: break-word;
	margin: 1rem;
	border-radius: 0.5rem;

	:hover {
		background: ${props => props.theme.background.hover};
		border-color: ${props => props.theme.background.hover};
	}

	@media screen and (max-width: 700px) {
		padding: ${rem(8)} ${rem(16)};
		margin: 0.5rem;
		border-radius: 0.25rem;
	}
`;

export const ProfileLink = styled.a`
	text-decoration: none;
	color: unset;
	transition: 0.25s border ease-in;
	margin: 1rem;

	:hover {
		text-decoration: none;
	}
	:hover > ${FeedPostWrapper} {
		border: 1px solid #cacaca;
	}
	:visited {
		color: unset;
	}
	:last-of-type {
		margin-bottom: 0;
	}
`;

export const PostPreview = styled.div`
	color: #a8a8a8;
	display: flex;
	> p {
		line-break: normal;
		margin: 0;
	}

	> :first-child {
		flex-basis: 95%;
		margin-right: 1rem;
	}

	@media screen and (max-width: 700px) {
		margin: 3rem 1rem 1rem;
		> :first-child {
			flex-basis: 90%;
		}
	}
`;

export const DisplayName = styled.h3`
	> a {
		color: unset;
		text-decoration: none;

		:visited {
			color: unset;
			text-decoration: none;
		}
		:hover {
			color: unset;
			text-decoration: none;
		}
	}
`;

export const LinkStyled = styled(Link)`
	color: unset;
	text-decoration: none;
	:hover {
		color: unset;
		text-decoration: none;
	}
	:visited {
		color: unset;
		text-decoration: none;
	}
`;

export const Avatar = styled(MAvatar)<FeedPostWrapperProps & AvatarProps>`
	border: 2px solid
		${props => (props.isUnread ? props.theme.green : 'rgba(0,0,0,0)')};
`;

export const FavoriteIndicator = styled(MIndicator)`
	.mantine-Indicator-indicator,
	.mantine-Indicator-common {
		background-color: rgba(0, 0, 0, 0);
		font-size: ${rem(16)};
	}
`;
