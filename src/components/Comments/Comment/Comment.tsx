import React, { useContext, useState } from 'react';
import Linkify from 'linkify-react';
import { Avatar as MAvatar, Menu } from '@mantine/core';

import {
	Comment as PostCommentProps,
	MutualFriend,
	User,
} from '../../../api/interfaces';
import { httpTize } from '../../../utils/httpTize';

import Button from '../../../Theme/Button';
import { ModalBackdrop } from '../../../Theme/Modal';
import {
	DeletePromptContainer,
	DeleteOptions,
	AuthorName,
	HandleStyled,
	CommentText,
	CommentContent,
	AvatarArea,
	DeleteCommentContainer,
	DeleteCommentButton,
	ContainerStyled,
	ProfileLinkStyled,
} from './style';

import { LINKIFY_OPTIONS } from '../../../constants';
import { PeachContext } from '../../../PeachContext';

const Avatar = (props: { src: string; displayName: string }) => {
	if (props.src) {
		return <MAvatar size='sm' src={props.src} alt='Profile Picture' />;
	}

	return (
		<MAvatar size='sm' alt='Profile Picture'>
			🍑
		</MAvatar>
	);
};

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
	postAuthorId: string;
}

export const Comment: React.FC<CommentProps> = (props: CommentProps) => {
	const { connections } = useContext(PeachContext);
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);

	const allFriends: (User | MutualFriend)[] = [
		...connections,
		...props.mutualFriends,
	];

	const canDeleteComment =
		props.requesterId === props.postAuthorId ||
		props.author.id === props.requesterId;

	return (
		<ContainerStyled>
			{deletePromptShowing ? (
				<DeletePrompt
					onDelete={() => props.deleteComment(props.id)}
					onCancel={() => setDeletePromptShowing(false)}
				>
					Are you sure you want to delete this comment?
				</DeletePrompt>
			) : null}
			{canDeleteComment && (
				<DeleteCommentContainer>
					<Menu>
						<Menu.Target>
							<DeleteCommentButton>...</DeleteCommentButton>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item
								sx={{ fontFamily: 'Lato' }}
								onClick={() => setDeletePromptShowing(p => !p)}
							>
								Delete comment
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</DeleteCommentContainer>
			)}
			<CommentContent>
				<AvatarArea>
					<a href={`/friend/${props.author.id}`}>
						<Avatar
							src={
								props.author.avatarSrc
									? httpTize(props.author.avatarSrc)
									: props.avatarSrc
							}
							displayName={props.author.displayName}
						/>
					</a>
				</AvatarArea>
				<CommentText>
					<ProfileLinkStyled to={`/friend/${props.author.id}`}>
						<AuthorName>{props.author.displayName}</AuthorName>
						<HandleStyled> @{props.author.name}</HandleStyled>
					</ProfileLinkStyled>

					<p onClick={() => props.addReplyHandle(props.author.name)}>
						<Linkify tagName='span' options={LINKIFY_OPTIONS}>
							{props.body}
						</Linkify>
					</p>
				</CommentText>
			</CommentContent>
		</ContainerStyled>
	);
};
