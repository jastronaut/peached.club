import styled from 'styled-components';

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
	height: 100%;
	visibility: hidden;
	position: relative;
	transform: translateY(2rem);
	float: right;
	> img:hover {
		cursor: pointer;
	}
	@media screen and (max-width: 700px) {
		float: initial;
		top: -1.5rem;
	}
`;

export const DeletePost = styled(MiniMenu)`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`;

export const PostWrapper = styled.div`
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
	word-wrap: break-word;
	padding: 2rem 3rem 0;
	:last-child {
		padding: 2rem 3rem;
	}

	:hover {
		> ${MiniMenu} {
			visibility: visible;
		}
	}
	@media screen and (max-width: 500px) {
		padding: 1rem 1.5rem 0;
		:last-of-type {
			padding: 1rem 1.5rem 1rem;
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
	:last-child {
		margin-left: 0.75rem;
	}
	:hover {
		cursor: pointer;
		background: ${props => props.theme.background.hover};
	}
	height: 0.8rem;
`;

export const PostTime = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 0.5rem 0.5rem;
	border-radius: 1rem;
	transition: 0.25s all ease;
	height: 0.8rem;
`;

/**
 * profile header stuff
 */

export const ProfileHeaderContainer = styled.div`
	display: flex;
	margin-bottom: 1rem;
	color: ${props => props.theme.text.primary};

	@media screen and (max-width: 700px) {
		margin: 3rem 1rem 1rem;
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
`;

export const ProfileHeaderHandle = styled.p`
	margin-top: 0;
	margin-bottom: 1rem;
	color: #cacaca;
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
