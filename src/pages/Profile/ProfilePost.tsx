import React, { useCallback, useContext, useState } from 'react';
import Linkify from 'linkify-react';

import api from '../../api';
import {
	LikePostResponse,
	Comment,
	CommentResponse,
	PostContent,
	MutualFriend,
	POST_TYPE,
	Post,
} from '../../api/interfaces';
import ACTIONS from '../../api/constants';
import { PeachContext } from '../../PeachContext';
import { LINKIFY_OPTIONS } from '../../constants';

import { PostInteractions } from '../../components/Posts/PostInteractions';
import Comments from '../../components/Comments';
import { DeletePrompt } from '../../components/Comments/style';
import { PostWrapper, FriendPostContent, Image } from './style';

import LocationPost from '../../components/Posts/LocationPost';
import LinkPost from '../../components/Posts/LinkPost';
import { MusicPost } from '../../components/Posts/MusicPost';
import { VideoPost } from '../../components/Posts/VideoPost';
import { makeApiCall } from '../../api/api';

const createComment = (
	commentId: string,
	commentBody: string,
	authorId: string,
	name: string,
	displayName: string
): Comment => {
	return {
		id: commentId,
		body: commentBody,
		author: {
			id: authorId,
			name,
			displayName,
			bio: '',
			isPublic: false,
			posts: [],
			unreadPostCount: 0,
			lastRead: 0,
		},
	};
};

const addNewlines = (txt: string, id: string) =>
	txt.indexOf('\n') < 0
		? txt
		: txt.split('\n').map((item, index) => (
				<span key={`${id}-${index}`}>
					{item}
					<br />
				</span>
		  ));

type DisplayedPostProps = {
	obj: PostContent;
	id: string;
	index: number;
};

const DisplayedPost = ({ obj, id, index }: DisplayedPostProps) => {
	switch (obj.type) {
		case POST_TYPE.TEXT:
			return (
				<p key={`${id}-txt-${index}`}>
					<Linkify tagName='span' options={LINKIFY_OPTIONS}>
						{addNewlines(obj.text, id)}
					</Linkify>
				</p>
			);
		case POST_TYPE.IMAGE:
			return (
				<Image
					key={`${id}-img-${index}`}
					src={obj.src}
					alt={`image for post ${id}`}
					loading='lazy'
				/>
			);
		case POST_TYPE.GIF:
			return (
				<Image
					key={`${id}-gif-${index}`}
					src={obj.src}
					alt={`GIF`}
					loading='lazy'
				/>
			);
		case POST_TYPE.LINK:
			// @ts-ignore
			return <LinkPost key={`${id}-link-${index}`} {...obj} />;

		case POST_TYPE.VIDEO:
			return (
				<VideoPost key={`${id}-vid-${index}`} src={obj.src} width={obj.width} />
			);

		case POST_TYPE.LOCATION:
			// @ts-ignore
			return <LocationPost key={`${id}-loc-${index}`} {...obj} />;

		case POST_TYPE.MUSIC:
			return <MusicPost key={`${id}-music-${index}`} {...obj} />;

		default:
			return null;
	}
};

export interface Props extends Post {
	deletePost: (id: string) => void;
	author: string;
	otherFriends: MutualFriend[];
	postAuthorAvatarSrc: string;
}

export const ProfilePost = (props: Props) => {
	const [comments, setComments] = useState<Comment[]>(props.comments || []);
	const [liked, setLiked] = useState<boolean>(props.likedByMe);
	const [showComments, toggleComments] = useState<boolean>(false);
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(props.likeCount);
	const { curUserData, jwt } = useContext(PeachContext);
	const [newCommentText, setNewCommentText] = useState('');

	const msgs = props.message.map((obj, index) => (
		<DisplayedPost
			obj={obj}
			index={index}
			id={props.id}
			key={props.id + index}
		/>
	));

	const onClickLike = useCallback(
		async (postId: string) => {
			if (liked) {
				setLikeCount(likeCount => likeCount - 1);
			} else {
				setLikeCount(likeCount => likeCount + 1);
			}

			// this is redundant and should be fixed
			if (liked) {
				api(ACTIONS.unlike, jwt).then((response: LikePostResponse) => {
					if (response.success !== 1) {
						setLiked(false);
					}
				});
				const resp = await makeApiCall<LikePostResponse>({
					uri: 'like/postID/',
				});
			} else {
				api(ACTIONS.like, jwt, { postId: props.id }, props.id).then(
					(response: LikePostResponse) => {
						if (response.success !== 1) {
							setLiked(true);
						}
					}
				);
			}
		},
		[liked]
	);

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
					curUserData.displayName
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
				<DeletePrompt
					onDelete={() => onDeletePost(props.id)}
					onCancel={() => setDeletePromptShowing(false)}
					isShowing={deletePromptShowing}
				>
					Are you sure you want to delete your post?
				</DeletePrompt>
				<FriendPostContent>{msgs}</FriendPostContent>
			</>
			<PostInteractions
				commentsLength={comments.length}
				onClickLike={() => onClickLike(props.id)}
				onClickComments={onClickComments}
				isLiked={liked}
				likeCount={likeCount}
				createdTime={props.createdTime}
				onClickDelete={() => setDeletePromptShowing(true)}
				isCurUsersPost={curUserData.id === props.author}
			/>
			{showComments ? (
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
			) : null}
		</PostWrapper>
	);
};
