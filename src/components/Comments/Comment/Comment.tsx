import React, { useContext, useState } from 'react';
import Linkify from 'linkify-react';
import { Text, Avatar as MAvatar, Popover, Menu } from '@mantine/core';

import {
	Comment as PostCommentProps,
	MutualFriend,
	User,
} from '../../../api/interfaces';

import Button from '../../../Theme/Button';
import { ModalBackdrop } from '../../../Theme/Modal';
import {
	DeletePromptContainer,
	DeleteOptions,
	AuthorName,
	HandleStyled,
	CommentText,
	CommentInteractionsContainer,
	CommentContent,
	Container,
	AvatarArea,
	DeleteCommentContainer,
} from './style';

import { PrivateProfile } from '../../PrivateProfile/PrivateProfile';

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
}

export const Comment: React.FC<CommentProps> = (props: CommentProps) => {
	const { connections } = useContext(PeachContext);
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);
	const [profilePreviewShowing, setProfilePreviewShowing] =
		useState<boolean>(false);
	const isRequester = props.requesterId === props.author.id;

	const allFriends: (User | MutualFriend)[] = [
		...connections,
		...props.mutualFriends,
	];

	const authorData = allFriends.filter(f => f.id === props.author.id)[0];

	return (
		<Container>
			{deletePromptShowing ? (
				<DeletePrompt
					onDelete={() => props.deleteComment(props.id)}
					onCancel={() => setDeletePromptShowing(false)}
				>
					Are you sure you want to delete your comment?
				</DeletePrompt>
			) : null}
			{isRequester && (
				<DeleteCommentContainer>
					<Menu>
						{/* <Menu.Target>
							<span
								role='img'
								aria-label='Delete comment'
								onClick={() => setDeletePromptShowing(p => !p)}
							>
								🗑
							</span>
						</Menu.Target> */}

						<Menu.Item
							color='red'
							onClick={() => setDeletePromptShowing(p => !p)}
						>
							Delete comment
						</Menu.Item>
					</Menu>
				</DeleteCommentContainer>
			)}
			<CommentContent>
				<AvatarArea>
					<a href={`/friend/${props.author.id}`}>
						<Avatar
							src={props.avatarSrc}
							displayName={props.author.displayName}
						/>
					</a>
				</AvatarArea>
				<CommentText>
					<Text size='sm'>
						<a href={`/friend/${props.author.id}`}>
							<AuthorName>{props.author.displayName}</AuthorName>
							<HandleStyled> @{props.author.name}</HandleStyled>
						</a>
					</Text>

					<p onClick={() => props.addReplyHandle(props.author.name)}>
						<Linkify tagName='span' options={LINKIFY_OPTIONS}>
							{props.body}
						</Linkify>
					</p>
				</CommentText>
				<CommentInteractionsContainer>
					{/* {isRequester ? (
						<>
							hey
							<MiniMenu onClick={() => setDeletePromptShowing(true)}>
								<DeleteIconButton>
									<DeleteIcon />
								</DeleteIconButton>
							</MiniMenu>
							
						</>
					) : null} */}
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
			</CommentContent>
		</Container>
	);
};
