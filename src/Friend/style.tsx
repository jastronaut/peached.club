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
		top: -1.5rem;
		margin-top: ${rem(12)};
	}
`;

export const DeletePost = styled(MiniMenu)`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`;

export const PostWrapper = styled.div`
	background: ${props => props.theme.background.primary};

	border-right: 1px solid ${props => props.theme.border.secondary};
	border-left: 1px solid ${props => props.theme.border.secondary};
	color: ${props => props.theme.text.primary};
	word-wrap: break-word;
	padding: ${rem(32)} ${rem(48)} ${rem(16)};

	:last-child {
		/* padding: 2rem 3rem; */

		border-bottom-left-radius: ${rem(10)};
		border-bottom-right-radius: ${rem(10)};
	}

	:hover {
		> ${MiniMenu} {
			visibility: visible;
		}
	}

	@media screen and (max-width: 500px) {
		/* padding: 1rem 1.5rem 0; */
		margin: 0 ${rem(16)} 0;
		padding: ${rem(24)} ${rem(24)} ${rem(16)};
		:last-of-type {
			padding-bottom: ${rem(24)};
			margin-bottom: ${rem(64)};
		}
	}
`;

export const EmptyStateWrapper = styled(PostWrapper)`
	height: 20%;
	text-align: center;
`;

export const PostInteraction = styled.div`
	width: 100%;
	text-align: left;
	transform: translateX(-0.5rem);
`;

export const Image = styled.img`
	max-width: 50%;
	display: block;
	margin-bottom: 1rem;
	background-color: ${props => props.theme.background.primary};

	@media screen and (max-width: 1000px) {
		max-width: 100%;
	}
`;

export const InteractionInfo = styled.p`
	display: inline;
	margin: 0;
	margin-left: 0.5rem;
`;

export const InteractionArea = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 0.5rem 0.5rem;
	border-radius: 1rem;
	transition: 0.25s all ease;
	height: 0.8rem;

	:last-child {
		margin-left: 0.75rem;
	}

	:hover {
		cursor: pointer;
		background: ${props => props.theme.background.hover};
	}
`;

export const PostTime = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 0.5rem 0.5rem;
	border-radius: 1rem;
	transition: 0.25s all ease;
	height: 0.8rem;
`;
