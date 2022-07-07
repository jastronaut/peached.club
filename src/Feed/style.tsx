import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PicFrame = styled.div`
	flex: 1;
	> span {
		border-radius: 50%;
		width: 100%;
		width: 75px;
		height: 75px;
		font-size: 60px;
		@media screen and (max-width: 500px) {
			width: 50px;
			height: 50px;
			font-size: 40px;
		}
	}
`;

export const ProfilePic = styled.img<{ unread?: boolean }>`
	border-radius: 50%;
	width: 100%;
	border: ${props => (props.unread ? '2px solid #1bb76e' : 'none')};
	width: 75px;
	height: 75px;
	object-fit: cover;
	@media screen and (max-width: 500px) {
		width: 50px;
		height: 50px;
	}
`;

export const InfoContainer = styled.div`
	flex: 7;
	height: 100%;
	margin-left: 1.5rem;
	> h3 {
		margin: 0 0 0.5rem 0;
	}
	> p {
		margin: 0;
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
		cursor: pointer;
	}

	@media screen and (max-width: 700px) {
		padding: 1rem 1.25rem;
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
