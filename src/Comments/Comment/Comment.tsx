import React, { useState } from 'react';
import Linkify from 'linkify-react';

import {
	Comment as PostCommentProps,
	MutualFriend,
} from '../../api/interfaces';

import { MiniMenu } from '../../Friend/style';
import Button from '../../Theme/Button';
import { ModalBackdrop } from '../../Theme/Modal';
import {
	DeletePromptContainer,
	DeleteOptions,
	AvatarStyled,
	AuthorName,
	HandleStyled,
	CommentContainer,
	CommentText,
	ProfileLink,
	BasicContainer,
	DeleteIconButton,
	ReplyButtonContainer,
	CommentInteractionsContainer,
} from './style';
import CommentIcon from '../../Theme/Icons/CommentIcon';

import { PrivateProfile } from '../../PrivateProfile/PrivateProfile';

import DeleteIcon from '../../Theme/Icons/DeleteIcon';
import { LINKIFY_OPTIONS } from '../../constants';

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
				<Button mode='bad' onClick={() => props.onDelete()}>
					Delete
				</Button>
				<Button mode='muted' onClick={() => props.onCancel()}>
					Cancel
				</Button>
			</DeleteOptions>
		</DeletePromptContainer>
	</ModalBackdrop>
);

export interface CommentProps extends PostCommentProps {
	avatarSrc: string;
	deleteComment: (id: string) => void;
	isFriend: boolean;
	mutualFriends: MutualFriend[];
	requesterId: string;
	addReplyHandle: (username: string) => void;
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
				<img
					src={props.avatarSrc}
					alt={props.author.displayName}
					loading='lazy'
				/>
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
				<p>
					<Linkify tagName='span' options={LINKIFY_OPTIONS}>
						{props.body}
					</Linkify>
				</p>
			</CommentText>
			<CommentInteractionsContainer>
				{isRequester ? (
					<>
						<MiniMenu onClick={() => setDeletePromptShowing(true)}>
							<DeleteIconButton>
								<DeleteIcon />
							</DeleteIconButton>
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
				<ReplyButtonContainer
					onClick={() => props.addReplyHandle(props.author.name)}
				>
					<CommentIcon />
				</ReplyButtonContainer>
			</CommentInteractionsContainer>
			{profilePreviewShowing ? (
				<PrivateProfile
					onDismissPrivateProfile={() => setProfilePreviewShowing(false)}
					avatarSrc={props.avatarSrc}
					username={authorData ? authorData.name : props.author.name}
					displayName={
						authorData ? authorData.displayName : props.author.displayName
					}
					bio={authorData ? authorData.bio : props.author.bio}
				/>
			) : null}
		</CommentContainer>
	);
};
