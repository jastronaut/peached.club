import React, { useContext, useState, useCallback } from 'react';
import { Modal, Center, Space, Button, Stack, Flex } from '@mantine/core';

import api from '../../api';
import {
	LikePostResponse,
	Comment,
	CommentResponse,
	MutualFriend,
	Post,
} from '../../api/interfaces';
import ACTIONS from '../../api/constants';
import { PeachContext } from '../../PeachContext';

import { PostInteractions } from '../../components/Posts/PostInteractions';
import Comments from '../../components/Comments';
import { PostWrapper, FriendPostContent } from './style';
import { Text } from '../../Theme/Type';
import { DisplayedPostMessage } from './DisplayedPostMessage';
import { createComment } from './utils';

export interface Props extends Post {
	deletePost: (id: string) => void;
	author: string;
	otherFriends: MutualFriend[];
	postAuthorAvatarSrc: string;
}

export const ProfilePost = (props: Props) => {
	const { id } = props;
	const [comments, setComments] = useState<Comment[]>(props.comments || []);
	const [liked, toggleLiked] = useState<boolean>(props.likedByMe);
	const [showComments, toggleComments] = useState<boolean>(false);
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(props.likeCount);
	const { curUserData, jwt } = useContext(PeachContext);
	const [newCommentText, setNewCommentText] = useState('');

	const msgs = props.message.map((obj, index) => (
		<DisplayedPostMessage obj={obj} index={index} id={id} key={id + index} />
	));

	const onClickLike = useCallback(() => {
		if (liked) {
			api(ACTIONS.unlike, jwt, { postId: id }, id).then(
				(response: LikePostResponse) => {
					if (response.success === 1) {
						toggleLiked(liked => !liked);
						setLikeCount(likeCount => likeCount - 1);
					}
				}
			);
		} else {
			api(ACTIONS.like, jwt, { postId: id }, id).then(
				(response: LikePostResponse) => {
					if (response.success === 1) {
						toggleLiked(liked => !liked);
						setLikeCount(likeCount => likeCount + 1);
					}
				}
			);
		}
	}, [liked, jwt, id]);

	const onClickComments = () => {
		toggleComments(showComments => !showComments);
	};

	const updateComments = (txt: string) => {
		const windowPositionY = window.scrollY;
		api(ACTIONS.comment, jwt, {
			body: txt,
			postId: props.id,
		}).then((response: { data: CommentResponse }) => {
			const resp = response.data;
			if (resp) {
				const newComment = createComment(
					resp.id,
					txt,
					resp.authorStreamID,
					curUserData.name,
					curUserData.displayName,
					curUserData.avatarSrc
				);

				setComments(comments => comments.concat([newComment]));
				window.scrollTo(0, windowPositionY);
			}
		});
	};

	const deleteComment = (id: string) => {
		api(ACTIONS.deleteComment, jwt, {}, id).then(
			(response: { success: number }) => {
				if (response.success === 1) {
					setComments(comments.filter(c => c.id !== id));
				}
			}
		);
	};

	const onDeletePost = (id: string) => {
		setDeletePromptShowing(false);
		props.deletePost(props.id);
	};

	return (
		<PostWrapper key={props.id}>
			<>
				<Modal
					opened={deletePromptShowing}
					onClose={() => setDeletePromptShowing(false)}
					withCloseButton={false}
					centered
					size={350}
				>
					<Center>
						<Stack>
							<Text style={{ marginBottom: '0' }} centered>
								Are you sure you want to delete this post?
							</Text>
							<Center>
								<Flex>
									<Button
										radius='md'
										color='pink'
										onClick={() => onDeletePost(props.id)}
									>
										Yep
									</Button>
									<Space w='md' />
									<Button
										radius='md'
										color='gray'
										onClick={() => setDeletePromptShowing(false)}
									>
										Nope
									</Button>
								</Flex>
							</Center>
						</Stack>
					</Center>
				</Modal>
				<FriendPostContent>{msgs}</FriendPostContent>
			</>
			<PostInteractions
				commentsLength={comments.length}
				onClickLike={onClickLike}
				onClickComments={onClickComments}
				isLiked={liked}
				likeCount={likeCount}
				createdTime={props.createdTime}
				onClickDelete={() => setDeletePromptShowing(true)}
				isCurUsersPost={curUserData.id === props.author}
			/>
			<Comments
				postAuthorAvatarSrc={props.postAuthorAvatarSrc}
				postAuthorId={props.author}
				onDismissComments={onClickComments}
				comments={comments}
				updateComments={updateComments}
				requesterId={curUserData.id}
				deleteComment={deleteComment}
				mutualFriends={props.otherFriends}
				newCommentText={newCommentText}
				setNewCommentText={setNewCommentText}
				isShowing={showComments}
			/>
		</PostWrapper>
	);
};
