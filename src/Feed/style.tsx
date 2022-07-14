import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from 'react-router-dom';

import { Container } from '../Theme/Layout';
import { ProfilePic as PP } from '../Theme/Preview';

export const ProfilePic = styled(PP)<{ unread?: boolean }>`
	border: ${props => (props.unread ? '2px solid #1bb76e' : 'none')};
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

	@media screen and (max-width: 500px) {
		margin-left: 0.5rem;
	}
`;

interface FeedPostWrapperProps {
	isUnread: boolean;
}

export const FeedPostWrapper = styled(Container)<FeedPostWrapperProps>`
	height: 100%;
	transition: 0.25s all ease-in;
	word-wrap: break-word;

	:hover {
		background: ${props => props.theme.background.hover};
		border-color: ${props => props.theme.background.hover};
		cursor: pointer;
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
