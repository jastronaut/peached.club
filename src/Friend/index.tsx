import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import Loading from '../Loading';
import getPostTime from '../utils/getPostTime';

import Comments from '../Comments';

import { DeletePrompt } from '../Comments/style';
import DeleteIcon from '../Comments/DeleteIcon.svg';
import LikeIcon from '../Theme/Icons/LikeIcon';

import NewPost from '../NewPost';

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
import {
	DeletePost,
	PostWrapper,
	PostInteraction,
	FriendPostContent,
	Image,
	InteractionInfo,
	InteractionArea,
	EmptyStateWrapper,
	PostTime,
} from './style';
import CommentIcon from '../Theme/Icons/CommentIcon';
import Clock from '../Theme/Icons/Clock';
import { PeachContext } from '../PeachContext';

import LocationPost from './Posts/LocationPost';
import LinkPost from './Posts/LinkPost';

import Navigation from '../Navigation';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';

const addNewlines = (txt: string) =>
	txt.indexOf('\n') < 0
		? txt
		: txt.split('\n').map(item => (
				<span>
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

export const FriendFeedContainer = (props: FriendFeedProps) => {
	const [comments, setComments] = useState<Comment[]>(props.comments || []);
	const [liked, toggleLiked] = useState<boolean>(props.likedByMe);
	const [showComments, toggleComments] = useState<boolean>(false);
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(props.likeCount);
	const { curUserData, jwt } = useContext(PeachContext);

	let msgKey = 0;
	const msgs = props.message.map(obj => {
		msgKey++;
		switch (obj.type) {
			case POST_TYPE.TEXT:
				return <p key={msgKey}>{addNewlines(obj.text)}</p>;
			case POST_TYPE.IMAGE:
				return (
					<Image
						key={msgKey}
						src={obj.src}
						alt={`image for post ${props.id}`}
						loading='lazy'
					/>
				);
			case POST_TYPE.GIF:
				return <Image key={msgKey} src={obj.src} alt={`GIF`} loading='lazy' />;
			case POST_TYPE.LINK:
				// @ts-ignore
				return <LinkPost {...obj} />;

			case POST_TYPE.LOCATION:
				// @ts-ignore
				return <LocationPost {...obj} />;

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
				{curUserData.id === props.author ? (
					<>
						<DeletePost>
							<img
								onClick={() => setDeletePromptShowing(true)}
								src={DeleteIcon}
								alt='Delete'
							/>
						</DeletePost>
						{deletePromptShowing ? (
							<DeletePrompt
								onDelete={() => props.deletePost(props.id)}
								onCancel={() => setDeletePromptShowing(false)}
							>
								Are you sure you want to delete your post?
							</DeletePrompt>
						) : null}
					</>
				) : null}
				<FriendPostContent>{msgs}</FriendPostContent>
			</>
			<PostInteraction>
				<InteractionArea onClick={e => onClickLike()}>
					<LikeIcon isLiked={liked} />{' '}
					<InteractionInfo>{likeCount}</InteractionInfo>
				</InteractionArea>
				<InteractionArea onClick={e => onClickComments()}>
					<CommentIcon />
					<InteractionInfo>{comments.length}</InteractionInfo>
				</InteractionArea>
				<PostTime>
					<Clock titleId={`post-${props.id}-posted-time`} title='Posted time' />
					<InteractionInfo>{getPostTime(props.createdTime)}</InteractionInfo>
				</PostTime>
			</PostInteraction>
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

export const FriendFeed = () => {
	const { jwt, curUser, peachFeed, curUserData } = useContext(PeachContext);
	const [posts, setPosts] = useState<Post[]>([]);

	const [viewingUser, setCurUserProfile] = useState<User | null>(null);
	const [curFeedId, setCurFeedId] = useState<string>('');
	const [otherFriends, setOtherFriends] = useState<MutualFriend[]>([]);
	const [postsLoaded, setPostsLoaded] = useState<boolean>(false);

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		window.scroll(0, 0);
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (!viewingUser && peachFeed) {
			setCurUserProfile(peachFeed.filter(user => user.id === id)[0]);
		}
	}, [peachFeed, viewingUser]);

	useEffect(() => {
		if (!jwt || peachFeed.length === 0 || !id) {
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
				} else {
					console.log('ugh');
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

	if (!jwt || peachFeed.length === 0) {
		navigate('/feed', { replace: true });
	}

	return (
		<>
			<Navigation
				curFeed={curFeedId}
				onCurUsersProfile={(curUser && curUser.id === id) || false}
			/>
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
