import styled from 'styled-components';
import { rem } from 'polished';

export const FriendPostContent = styled.div`
	height: 100%;

	> p:first-of-type {
		margin-top: 0;
	}
`;

interface MiniMenuProps {
	onClick?: () => void;
}

export const MiniMenu = styled.div<MiniMenuProps>`
	visibility: hidden;
	background-color: initial;

	@media screen and (max-width: 700px) {
		float: initial;
		top: ${rem(24)};
		margin-top: ${rem(12)};
	}
`;

export const DeletePost = styled(MiniMenu)`
	cursor: pointer;
	width: 100%;
	display: flex;
	justify-content: flex-end;

	:hover svg {
		stroke: ${props => props.theme.accent};
	}
`;

export const PostWrapper = styled.div`
	background: ${props => props.theme.background.primary};

	border: ${rem(1)} solid ${props => props.theme.border.secondary};
	border-top: none;

	color: ${props => props.theme.text.primary};
	word-wrap: break-word;
	padding: ${rem(32)} ${rem(48)};

	:last-child {
		border-bottom-left-radius: ${rem(10)};
		border-bottom-right-radius: ${rem(10)};
	}

	:hover {
		> ${MiniMenu} {
			visibility: visible;
		}
	}

	@media screen and (max-width: 800px) {
		margin: 0;
		padding: ${rem(24)} ${rem(16)} ${rem(16)};
		:last-of-type {
			padding-bottom: ${rem(24)};
			margin-bottom: ${rem(64)};
		}
	}
`;

export const EmptyStateWrapper = styled(PostWrapper)`
	height: ${rem(120)};
	text-align: center;
`;

export const PostInteraction = styled.div`
	color: ${props => props.theme.text.lightest};
	width: 100%;
	text-align: left;
	transform: translateX(-0.5rem);
`;

export const Image = styled.img`
	max-width: 50%;
	display: block;
	margin-bottom: ${rem(16)};
	background-color: ${props => props.theme.background.primary};

	@media screen and (max-width: 1000px) {
		max-width: 100%;
	}
`;

export const InteractionInfo = styled.p`
	display: inline;
	margin: 0;
	margin-left: ${rem(8)};
`;

export const InteractionArea = styled.div`
	display: inline-flex;
	align-items: center;
	padding: ${rem(8)};
	border-radius: ${rem(16)};
	transition: 0.25s all ease;
	height: ${rem(13)};

	:last-child {
		margin-left: ${rem(12)};
	}

	:hover {
		cursor: pointer;
		background: ${props => props.theme.background.hover};
	}
`;

export const PostTime = styled.div`
	display: inline-flex;
	align-items: center;
	padding: ${rem(8)};
	border-radius: ${rem(16)};
	transition: 0.25s all ease;
	height: ${rem(13)};
`;
