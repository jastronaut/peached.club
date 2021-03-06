import React, { useContext, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import api from '../api';
import Loading from '../Loading';
import getPostTime from '../utils/getPostTime';

import Comments from '../Comments';

import { DeletePrompt } from '../Comments/style';
import DeleteIcon from '../Comments/DeleteIcon.svg';

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
	Avatar,
	ProfileHeaderContainer,
	ProfileHeaderText,
	ProfileHeaderHandle,
	EmptyStateWrapper,
	PostTime,
} from './style';
import Liked from './Liked.svg';
import Unliked from './Unliked.svg';
import UnlikedDarkMode from './UnlikedDarkMode.svg';
import CommentIcon from './CommentIcon.svg';
import CommentIconDarkMode from './CommentIconDarkMode.svg';
import Clock from '../Theme/Icons/Clock';
import { PeachContext } from '../PeachContext';

import LocationPost from './Posts/LocationPost';
import LinkPost from './Posts/LinkPost';

import Navigation from '../Navigation';

const addNewlines = (txt: string) =>
	txt.indexOf('\n') < 0
		? txt
		: txt.split('\n').map(item => (
				<span>
					{item}
					<br />
				</span>
		  ));

const LikeButton = (props: { liked: boolean; darkMode: boolean }) => (
	<img
		src={props.liked ? Liked : props.darkMode ? UnlikedDarkMode : Unliked}
		alt='Like'
	/>
);

interface FriendFeedProps extends Post {
	deletePost: (id: string) => void;
	author: string;
	otherFriends: MutualFriend[];
	postAuthorAvatarSrc: string;
}

export const FriendFeedContainer = (props: FriendFeedProps) => {
	const [comments, setComments] = useState<Comment[]>(props.comments || []);
	const [liked, toggleLiked] = useState<boolean>(props.likedByMe);
	const [showComments, toggleComments] = useState<boolean>(false);
	const [deletePromptShowing, setDeletePromptShowing] = useState<boolean>(
		false
	);
	const [likeCount, setLikeCount] = useState<number>(props.likeCount);
	const { curUserData, darkMode, jwt } = useContext(PeachContext);

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
					/>
				);
			case POST_TYPE.LINK:
				// @ts-ignore
				return <LinkPost {...obj} darkMode={darkMode} />;

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
		<PostWrapper darkMode={darkMode}>
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
								darkMode={darkMode}
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
				<InteractionArea
					onClick={e => onClickLike()}
					darkMode={darkMode}
				>
					<LikeButton liked={liked} darkMode={darkMode} />{' '}
					<InteractionInfo>{likeCount}</InteractionInfo>
				</InteractionArea>
				<InteractionArea
					onClick={e => onClickComments()}
					darkMode={darkMode}
				>
					<img
						src={darkMode ? CommentIconDarkMode : CommentIcon}
						alt='Comment'
					/>
					<InteractionInfo>{comments.length}</InteractionInfo>
				</InteractionArea>
				<PostTime>
					<Clock
						darkMode={darkMode}
						titleId={`post-${props.id}-posted-time`}
						title='Posted time'
					/>
					<InteractionInfo>
						{getPostTime(props.createdTime)}
					</InteractionInfo>
				</PostTime>
			</PostInteraction>
			{showComments ? (
				<Comments
					postAuthorAvatarSrc={props.postAuthorAvatarSrc}
					postAuthorId={props.author}
					onDismissComments={onClickComments}
					comments={comments}
					updateComments={updateComments}
					requester={curUserData}
					deleteComment={deleteComment}
					mutualFriends={props.otherFriends}
				/>
			) : null}
		</PostWrapper>
	);
};

const EmptyState = ({ darkMode }: { darkMode: boolean }) => (
	<EmptyStateWrapper darkMode={darkMode}>
		<FriendPostContent>No posts yet!</FriendPostContent>
	</EmptyStateWrapper>
);

const FriendFeed = (props: RouteComponentProps<{ id: string }>) => {
	const { jwt, curUser, peachFeed, darkMode, curUserData } = useContext(
		PeachContext
	);
	const [posts, setPosts] = useState<Post[]>([]);

	const [viewingUser, setCurUserProfile] = useState<User | null>(
		peachFeed.filter(user => user.id === props.match.params['id'])[0] ||
			null
	);
	const [curFeedId, setCurFeedId] = useState<string>('');
	const [otherFriends, setOtherFriends] = useState<MutualFriend[]>([]);
	const [postsLoaded, setPostsLoaded] = useState<boolean>(false);

	useEffect(() => {
		window.scroll(0, 0);
		// eslint-disable-next-line
	}, [props.match.params['id']]);

	useEffect(() => {
		if (!jwt || peachFeed.length === 0) {
			return;
		}
		const getUserProfile = async () => {
			setPostsLoaded(false);
			const resp: { data: User } = await api(
				ACTIONS.connectionStream,
				jwt,
				{},
				props.match.params['id']
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
				} = await api(
					ACTIONS.getFriendsOfFriends,
					jwt,
					{},
					resp.data.name
				);
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
			setCurFeedId(props.match.params['id']);
		};
		getUserProfile();
	}, [props.match.params, jwt, peachFeed.length]);

	useEffect(() => {
		try {
			if (curUser !== null && curUser.id !== props.match.params['id']) {
				const markRead = async () => {
					api(
						ACTIONS.markFeedRead,
						jwt,
						{},
						props.match.params['id']
					);
				};
				markRead();
			}
		} catch (_error) {}
	}, [curUser, jwt, peachFeed, props.match.params]);

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
		return <Redirect push to='/feed' />;
	}

	return (
		<>
			<Navigation
				curFeed={curFeedId}
				onCurUsersProfile={
					(curUser && curUser.id === props.match.params['id']) ||
					false
				}
			/>
			<Page>
				{viewingUser && curUserData ? (
					<>
						<ProfileHeaderContainer darkMode={darkMode}>
							<Avatar>
								<img
									src={
										viewingUser.avatarSrc ||
										'/defaultavatar.jpg'
									}
									alt={`${viewingUser.name}'s avatar`}
								/>
							</Avatar>
							<ProfileHeaderText>
								<h2>{viewingUser.displayName}</h2>
								<ProfileHeaderHandle>
									@{viewingUser.name}
								</ProfileHeaderHandle>
								<p>{viewingUser.bio}</p>
							</ProfileHeaderText>
						</ProfileHeaderContainer>
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
										postAuthorAvatarSrc={
											viewingUser.avatarSrc
										}
									/>
								))}
							</div>
						) : (
							<EmptyState darkMode={darkMode} />
						)}
						{curUser !== null &&
						curUser.id === props.match.params['id'] ? (
							<NewPost />
						) : null}
					</>
				) : (
					<Loading />
				)}
			</Page>
		</>
	);
};

export default withRouter(FriendFeed);
