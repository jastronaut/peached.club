import React, { useContext, useState } from 'react';
import Linkify from 'linkify-react';

import api from '../../api';
import { PostInteractions } from '../../components/Posts/PostInteractions';

import Comments from '../../components/Comments';

import { DeletePrompt } from '../../components/Comments/style';

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

import { PostWrapper, FriendPostContent, Image } from './style';
import { PeachContext } from '../../PeachContext';
import { LINKIFY_OPTIONS } from '../../constants';

import LocationPost from '../../components/Posts/LocationPost';
import LinkPost from '../../components/Posts/LinkPost';

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

		case POST_TYPE.LOCATION:
			// @ts-ignore
			return <LocationPost key={`${id}-loc-${index}`} {...obj} />;

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

export const ProfilePosts = (props: Props) => {
	const [comments, setComments] = useState<Comment[]>(props.comments || []);
	const [liked, toggleLiked] = useState<boolean>(props.likedByMe);
	const [showComments, toggleComments] = useState<boolean>(false);
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(props.likeCount);
	const { curUserData, jwt } = useContext(PeachContext);
	const [newCommentText, setNewCommentText] = useState('');

	const msgs = props.message.map((obj, index) => (
		<DisplayedPost obj={obj} index={index} id={props.id} />
	));

	const onClickLike = () => {
		toggleLiked(liked => !liked);
		if (liked) {
			setLikeCount(likeCount => likeCount - 1);
		} else {
			setLikeCount(likeCount => likeCount + 1);
		}

		// this is redundant and should be fixed
		if (liked) {
			api(ACTIONS.unlike, jwt).then((response: LikePostResponse) => {
				if (response.success !== 1) {
					toggleLiked(liked => !liked);
					return;
				}
			});
		} else {
			api(ACTIONS.like, jwt, { postId: props.id }, props.id).then(
				(response: LikePostResponse) => {
					if (response.success !== 1) {
						toggleLiked(liked => !liked);
						return;
					}
				}
			);
		}
	};

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
				const newComment: Comment = {
					id: resp.id,
					body: txt,
					author: {
						id: resp.authorStreamID,
						name: curUserData.name,
						displayName: curUserData.displayName,
						bio: '',
						isPublic: false,
						posts: [],
						unreadPostCount: 0,
						lastRead: 0,
					},
				};
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

	return (
		<PostWrapper>
			<>
				<DeletePrompt
					onDelete={() => props.deletePost(props.id)}
					onCancel={() => setDeletePromptShowing(false)}
					isShowing={deletePromptShowing}
				>
					Are you sure you want to delete your post?
				</DeletePrompt>
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
				/>
			) : null}
		</PostWrapper>
	);
};
