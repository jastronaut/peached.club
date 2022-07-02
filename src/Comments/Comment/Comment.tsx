import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import {
	Comment as PostCommentProps,
	MutualFriend,
} from '../../api/interfaces';
import {
	Avatar,
	ProfileHeaderHandle as Handle,
} from '../../Friend/ProfileHeader/style';
import { MiniMenu } from '../../Friend/style';

import Button from '../../Theme/Button';
import { ModalContainer, ModalBackdrop } from '../../Theme/Modal';

import PrivateProfile from '../../PrivateProfile';

import DeleteIcon from '../DeleteIcon.svg';

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
	border-bottom: 1px solid ${props => props.theme.border.secondary};

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
	margin-bottom: 0;

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
		color: ${props => props.theme.text.primary};
	}
`;

const AvatarStyled = styled(Avatar)`
	flex: 1;
	cursor: pointer;

	> img {
		object-fit: cover;
		border-radius: 50%;
		width: ${rem(50)};
		height: ${rem(50)};
	}

	> span {
		width: ${rem(50)};
		height: ${rem(50)};
		font-size: 45px;
	}

	@media screen and (max-width: 800px) {
		> img {
			width: ${rem(50)};
			height: ${rem(50)};
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
	margin-bottom: ${rem(5)};
	font-size: ${rem(12)};
	@media screen and (max-width: 700px) {
		margin-bottom: 0.5rem;
	}
`;

const AuthorName = styled.p`
	font-weight: bold;
	margin: 0;
	font-size: ${rem(15)};
	@media screen and (max-width: 700px) {
		color: ${props => props.theme.text.primary};
	}
`;

interface CommentProps extends PostCommentProps {
	avatarSrc: string;
	deleteComment: (id: string) => void;
	isFriend: boolean;
	mutualFriends: MutualFriend[];
	requesterId: string;
}

export const Comment: React.FC<CommentProps> = (props: CommentProps) => {
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);
	const [profilePreviewShowing, setProfilePreviewShowing] =
		useState<boolean>(false);
	const isRequester = props.requesterId === props.author.id;

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
				{props.author.isPublic || props.isFriend || isRequester ? (
					<a href={`/friend/${props.author.id}`}>{Avatar}</a>
				) : (
					<BasicContainer onClick={() => setProfilePreviewShowing(true)}>
						{Avatar}
					</BasicContainer>
				)}
			</ProfileLink>
			<CommentText>
				<ProfileLink>
					{props.author.isPublic || props.isFriend || isRequester ? (
						<a href={`/friend/${props.author.id}`}>{Name}</a>
					) : (
						<BasicContainer onClick={() => setProfilePreviewShowing(true)}>
							{Name}
						</BasicContainer>
					)}
				</ProfileLink>
				<p>{props.body}</p>
			</CommentText>
			{isRequester ? (
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
					onDismissPrivateProfile={() => setProfilePreviewShowing(false)}
					avatarSrc={props.avatarSrc}
					user={authorData ? authorData : props.author}
				/>
			) : null}
		</CommentContainer>
	);
};
