import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Linkify from 'linkify-react';

import api from '../api';
import Loading from '../Theme/Loading';
import { PostInteractions } from '../components/Posts/PostInteractions';

import Comments from '../components/Comments';

import { DeletePrompt } from '../components/Comments/style';

import NewPost from '../components/NewPost';

import { Page } from '../Theme/Layout';
import {
	Post,
	LikePostResponse,
	User,
	Comment,
	CommentResponse,
	MutualFriend,
	FriendsOfFriendsResponse,
	POST_TYPE,
} from '../api/interfaces';
import ACTIONS from '../api/constants';
import { LINKIFY_OPTIONS } from '../constants';

import {
	PostWrapper,
	FriendPostContent,
	Image,
	EmptyStateWrapper,
} from './style';
import { PeachContext } from '../PeachContext';

import LocationPost from '../components/Posts/LocationPost';
import LinkPost from '../components/Posts/LinkPost';

import { ProfileHeader } from '../components/ProfileHeader/ProfileHeader';

const addNewlines = (txt: string, id: string) =>
	txt.indexOf('\n') < 0
		? txt
		: txt.split('\n').map((item, index) => (
				<span key={`${id}-${index}`}>
					{item}
					<br />
				</span>
		  ));

export interface FriendFeedProps extends Post {
	deletePost: (id: string) => void;
	author: string;
	otherFriends: MutualFriend[];
	postAuthorAvatarSrc: string;
}
/*
export const FriendFeedContainer = (props: FriendFeedProps) => {
	const [comments, setComments] = useState<Comment[]>(props.comments || []);
	const [liked, toggleLiked] = useState<boolean>(props.likedByMe);
	const [showComments, toggleComments] = useState<boolean>(false);
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(props.likeCount);
	const { curUserData, jwt } = useContext(PeachContext);
	const [newCommentText, setNewCommentText] = useState('');

	const msgs = props.message.map((obj, index) => {
		switch (obj.type) {
			case POST_TYPE.TEXT:
				return (
					<p key={`${props.id}-txt-${index}`}>
						<Linkify tagName='span' options={LINKIFY_OPTIONS}>
							{addNewlines(obj.text, props.id)}
						</Linkify>
					</p>
				);
			case POST_TYPE.IMAGE:
				return (
					<Image
						key={`${props.id}-img-${index}`}
						src={obj.src}
						alt={`image for post ${props.id}`}
						loading='lazy'
					/>
				);
			case POST_TYPE.GIF:
				return (
					<Image
						key={`${props.id}-gif-${index}`}
						src={obj.src}
						alt={`GIF`}
						loading='lazy'
					/>
				);
			case POST_TYPE.LINK:
				// @ts-ignore
				return <LinkPost key={`${props.id}-link-${index}`} {...obj} />;

			case POST_TYPE.LOCATION:
				// @ts-ignore
				return <LocationPost key={`${props.id}-loc-${index}`} {...obj} />;

			default:
				return '';
		}
	});

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

const EmptyState = () => (
	<EmptyStateWrapper>
		<FriendPostContent>No posts yet!</FriendPostContent>
	</EmptyStateWrapper>
);

export const FriendFeedPage = () => {
	const { jwt, curUser, peachFeed, curUserData } = useContext(PeachContext);
	const [posts, setPosts] = useState<Post[]>([]);

	const [viewingUser, setCurUserProfile] = useState<User | null>(null);
	const [curFeedId, setCurFeedId] = useState<string>('');
	const [otherFriends, setOtherFriends] = useState<MutualFriend[]>([]);
	const [postsLoaded, setPostsLoaded] = useState<boolean>(false);

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (!viewingUser && peachFeed) {
			setCurUserProfile(peachFeed.filter(user => user.id === id)[0]);
		}
	}, [peachFeed, viewingUser]);

	useEffect(() => {
		if (!id) {
			return;
		}

		const getUserProfile = async () => {
			setPostsLoaded(false);
			const resp: { data: User } = await api(
				ACTIONS.connectionStream,
				jwt,
				{},
				id
			);

			// get posts by this user
			if (resp.data.posts) {
				resp.data.posts = resp.data.posts.reverse();
				setCurUserProfile(resp.data);
				setPosts(resp.data.posts);
				setPostsLoaded(true);

				// get this user's friends
				const otherFriendsResponse: {
					data: FriendsOfFriendsResponse;
				} = await api(ACTIONS.getFriendsOfFriends, jwt, {}, resp.data.name);
				if (
					otherFriendsResponse.data &&
					otherFriendsResponse.data.connections
				) {
					setOtherFriends(otherFriendsResponse.data.connections);
				}
			}

			// used to show prev/next arrows on nav to go through feeds
			setCurFeedId(id);
		};
		getUserProfile();
	}, [id, jwt, peachFeed.length]);

	useEffect(() => {
		try {
			if (curUser !== null && curUser.id !== id) {
				const markRead = async () => {
					api(ACTIONS.markFeedRead, jwt, {}, id);
				};
				markRead();
			}
		} catch (_error) {}
	}, [curUser, jwt, peachFeed, id]);

	const deletePost = (id: string) => {
		const windowPositionY = window.scrollY;
		api(ACTIONS.deletePost, jwt, {}, id).then(
			(response: { success: number }) => {
				if (response.success === 1) {
					setPosts(posts.filter(p => p.id !== id));
					window.scrollTo(0, windowPositionY);
				}
			}
		);
	};

	return (
		<>
			<Page>
				{viewingUser && curUserData ? (
					<>
						<ProfileHeader
							viewingUser={viewingUser}
							postsLoaded={postsLoaded}
						/>
						{!postsLoaded ? (
							<Loading />
						) : posts.length > 0 ? (
							<div style={{ margin: '0' }}>
								{posts.map(post => (
									<FriendFeedContainer
										{...post}
										key={post.id}
										deletePost={deletePost}
										author={viewingUser.id}
										otherFriends={otherFriends}
										postAuthorAvatarSrc={viewingUser.avatarSrc}
									/>
								))}
							</div>
						) : (
							<EmptyState />
						)}
						{curUser !== null && curUser.id === id ? <NewPost /> : null}
					</>
				) : (
					<Loading />
				)}
			</Page>
		</>
	);
};


*/
