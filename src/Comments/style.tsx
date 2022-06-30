import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

import { Comment as PostCommentProps, MutualFriend } from '../api/interfaces';
import {
	Avatar,
	ProfileHeaderHandle as Handle,
	MiniMenu,
} from '../Friend/style';

import Button from '../Theme/Button';
import { ModalContainer, ModalBackdrop } from '../Theme/Modal';

import PrivateProfile from '../PrivateProfile';

import DeleteIcon from './DeleteIcon.svg';

export const DisableBodyScroll = createGlobalStyle`
	body {
		overflow: hidden;
	}
`;

const DeletePromptContainer = styled(ModalContainer)`
	width: 30%;
	height: auto;
	text-align: center;
	@media screen and (max-width: 800px) {
		width: 50%;
	}

	@media screen and (max-width: 600px) {
		width: 80%;
	}
`;

const DeleteOptions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-top: 1rem;
`;

export const AllComments = styled.div`
	overflow: scroll;
	margin-top: 1.5rem;
`;

interface DeletePromptProps {
	onDelete: () => void;
	onCancel: () => void;
	children: React.ReactNode;
}

export const DeletePrompt = (props: DeletePromptProps) => (
	<ModalBackdrop entering>
		<DeletePromptContainer alignTop={false} isMini={true}>
			{props.children}
			<DeleteOptions>
				<Button onClick={() => props.onDelete()}>Delete</Button>
				<Button onClick={() => props.onCancel()}>Cancel</Button>
			</DeleteOptions>
		</DeletePromptContainer>
	</ModalBackdrop>
);

const CommentContainer = styled.div`
	transition: 0.25s background ease;
	display: flex;
	margin: 0 auto;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;

	:hover {
		background: #cacaca30;
		> ${MiniMenu} {
			visibility: visible;
		}
	}
	@media screen and (max-width: 500px) {
		padding: 0;
		padding-left: 0.5rem;
	}
`;

const CommentText = styled.div`
	flex: 9;
	margin-left: 1rem;
	> a > h3 {
		margin-bottom: 0;
	}
	@media screen and (max-width: 500px) {
		> a > h3 {
			margin-top: 0;
		}
	}

	> p {
		word-wrap: break-word;
		font-size: 0.9rem;
		margin-top: 0;
	}
`;

export const AddCommentContainer = styled.div`
	padding-bottom: 0;
	width: 100%;
	background: ${props => props.theme.background.primary};
	flex: 0 1 auto;
`;

export const Input = styled.textarea`
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
	flex: 9;
	resize: none;
	border-radius: 0.5rem;
	border: 1px solid #cacaca;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: 1rem;
	min-height: 2.5rem;
	height: 2rem;
	margin-bottom: 0.25rem;

	width: 100%;
	padding: 0.25rem;
	@media screen and (max-height: 700px) {
		@media screen and (max-width: 700px) {
			height: 3rem;
		}
	}
`;

/*
 * aligned with ../Theme/Modal
 */
export const ButtonWrapper = styled.div`
	margin: 0;
	flex: 1;
	/* position: absolute; */
	z-index: 9999;
	/* transform: translate(calc(50% - 4.5rem), 0.5rem); */

	/* @media screen and (max-width: 800px) {
		transform: translate(calc(70% - 4.5rem), 0.5rem);
	} */
	width: inherit;
`;

/*
 * also aligned with ../Theme/Modal
 */
export const DismissCommentsButtonContainer = styled.div`
	cursor: pointer;
	margin: 0;
	max-height: 2rem;
	position: absolute;
	width: 50%;
	display: flex;
	justify-content: flex-end;
	z-index: 999;
	@media screen and (max-width: 800px) {
		width: 70%;
		transform: translateY(-40%);
	}
`;

const AvatarStyled = styled(Avatar)`
	flex: 1;
	cursor: pointer;

	> img {
		object-fit: cover;
		border-radius: 50%;
		width: 5rem;
		height: 5rem;
	}

	> span {
		width: 5rem;
		height: 5rem;
		font-size: 45px;
	}

	@media screen and (max-width: 800px) {
		> img {
			width: 50px;
			height: auto;
		}

		> span {
			width: 50px;
			font-size: 45px;
		}
		margin-top: 0.5rem;
	}
`;

const ProfileLink = styled.span`
	@media screen and (max-width: 800px) {
		> a > h3 {
			margin-top: 0.5rem;
		}
	}

	> a {
		text-decoration: none;
		color: unset;
		cursor: pointer;
		:visited {
			text-decoration: none;
		}
		:hover {
			text-decoration: none;
		}
	}

	> a > h3 {
		border-radius: 0.25rem;
	}
`;

const BasicContainer = styled.div`
	margin: 0;
	padding: 0;
	cursor: pointer;
`;

const HandleStyled = styled(Handle)`
	@media screen and (max-width: 700px) {
		margin-bottom: 0.5rem;
	}
`;

const AuthorName = styled(HandleStyled)`
	font-weight: bold;
	margin-bottom: 0.25rem;
	@media screen and (max-width: 700px) {
		color: ${props => props.theme.text.primary};
	}
`;

interface CommentProps extends PostCommentProps {
	avatarSrc: string;
	isRequester: boolean;
	deleteComment: (id: string) => void;
	isFriend: boolean;
	mutualFriends: MutualFriend[];
}

export const Comment: React.FC<CommentProps> = (props: CommentProps) => {
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);
	const [profilePreviewShowing, setProfilePreviewShowing] =
		useState<boolean>(false);

	const authorData = props.mutualFriends.filter(
		f => f.id === props.author.id
	)[0];

	const Avatar = (
		<AvatarStyled>
			{props.avatarSrc ? (
				<img src={props.avatarSrc} alt={props.author.displayName} />
			) : (
				<span role='img' aria-label={props.author.displayName}>
					🍑
				</span>
			)}
		</AvatarStyled>
	);
	const Name = (
		<>
			<AuthorName>{props.author.displayName}</AuthorName>
			<HandleStyled>@{props.author.name}</HandleStyled>
		</>
	);
	return (
		<CommentContainer>
			<ProfileLink>
				{props.author.isPublic ||
				props.isFriend ||
				props.isRequester ? (
					<Link to={`/friend/${props.author.id}`}>{Avatar}</Link>
				) : (
					<BasicContainer
						onClick={() => setProfilePreviewShowing(true)}
					>
						{Avatar}
					</BasicContainer>
				)}
			</ProfileLink>
			<CommentText>
				<ProfileLink>
					{props.author.isPublic ||
					props.isFriend ||
					props.isRequester ? (
						<Link to={`/friend/${props.author.id}`}>{Name}</Link>
					) : (
						<BasicContainer
							onClick={() => setProfilePreviewShowing(true)}
						>
							{Name}
						</BasicContainer>
					)}
				</ProfileLink>
				<p>{props.body}</p>
			</CommentText>
			{props.isRequester ? (
				<>
					<MiniMenu onClick={() => setDeletePromptShowing(true)}>
						<img src={DeleteIcon} alt='Delete' />
					</MiniMenu>
					{deletePromptShowing ? (
						<DeletePrompt
							onDelete={() => props.deleteComment(props.id)}
							onCancel={() => setDeletePromptShowing(false)}
						>
							Are you sure you want to delete your comment?
						</DeletePrompt>
					) : null}
				</>
			) : null}

			{profilePreviewShowing ? (
				<PrivateProfile
					onDismissPrivateProfile={() =>
						setProfilePreviewShowing(false)
					}
					avatarSrc={props.avatarSrc}
					user={authorData ? authorData : props.author}
				/>
			) : null}
		</CommentContainer>
	);
};
