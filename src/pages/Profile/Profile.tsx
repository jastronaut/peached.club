import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Button, Center } from '@mantine/core';
import { useParams } from 'react-router-dom';

import api from '../../api';
import Loading from '../../Theme/Loading';

import { Page } from '../../Theme/Layout';
import {
	User,
	FriendsOfFriendsResponse,
	MutualFriend,
	CurUser,
	Post,
	DefaultResponse,
} from '../../api/interfaces';
import ACTIONS from '../../api/constants';

import { FriendPostContent, EmptyStateWrapper, EndText } from './style';
import { PeachContext } from '../../PeachContext';
import { ProfilePost } from './ProfilePost';
import NewPost from '../../components/NewPost';
import { RiseAndFadeAnimationContainer } from '../../Theme/Animations';

import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';
import { makeApiCall } from '../../api/api';
import { PrivateProfile } from './PrivateProfile';
import { sortMainFeedPosts } from '../../utils/sortMainFeedPosts';

const EmptyState = () => (
	<EmptyStateWrapper>
		<FriendPostContent>No posts yet!</FriendPostContent>
	</EmptyStateWrapper>
);

const ProfileBottom = (props: {
	cursor: string | null;
	loadMorePosts: () => void;
	morePostsLoading: boolean;
}) => {
	return (
		<Center>
			{!props.morePostsLoading && props.cursor ? (
				<Button radius='md' color='green' onClick={() => props.loadMorePosts()}>
					See more posts 📖
				</Button>
			) : props.morePostsLoading ? (
				<Loading />
			) : (
				<EndText>You've reached the end!</EndText>
			)}
		</Center>
	);
};

type ProfileContentProps = {
	viewingUser: User | null;
	postsLoading: boolean;
	setViewingUserProfile: (user: User | null) => void;
	deletePost: (id: string) => void;
	otherFriends: MutualFriend[];
	morePostsLoading: boolean;
	loadMorePosts: () => void;
	hideProfileBottom?: boolean;
};

const ProfileContent = (props: ProfileContentProps) => {
	const {
		viewingUser,
		postsLoading,
		loadMorePosts,
		setViewingUserProfile,
		morePostsLoading,
		otherFriends,
		deletePost,
		hideProfileBottom = false,
	} = props;
	return (
		<>
			<ProfileHeader
				viewingUser={viewingUser}
				loading={postsLoading}
				setViewingUser={setViewingUserProfile}
			/>
			{postsLoading || !viewingUser ? (
				<Loading />
			) : viewingUser && viewingUser.posts && viewingUser.posts.length > 0 ? (
				<>
					<div style={{ margin: '0' }}>
						{viewingUser.posts.map(post => (
							<ProfilePost
								{...post}
								key={post.id}
								deletePost={deletePost}
								author={viewingUser.id}
								otherFriends={otherFriends}
								postAuthorAvatarSrc={viewingUser.avatarSrc}
							/>
						))}
					</div>
					{!hideProfileBottom && (
						<ProfileBottom
							morePostsLoading={morePostsLoading}
							cursor={viewingUser.cursor || null}
							loadMorePosts={loadMorePosts}
						/>
					)}
				</>
			) : (
				<EmptyState />
			)}
		</>
	);
};

type ProfilePageProps = {
	isIndividualPostProfilePage?: boolean;
};

export const ProfilePage = (props: ProfilePageProps) => {
	const {
		jwt,
		curUser,
		peachFeed,
		curUserData,
		setCurUserData,
		connections,
		setConnections,
	} = useContext(PeachContext);
	const { id } = useParams();
	const { isIndividualPostProfilePage = false } = props;

	const [viewingUser, setViewingUserProfile] = useState<User | null>(null);
	const [otherFriends, setOtherFriends] = useState<MutualFriend[]>([]);
	const [postsLoading, setPostsLoading] = useState<boolean>(false);
	const [morePostsLoading, setMorePostsLoading] = useState<boolean>(false);

	const isNewPostButtonShowing = curUser !== null && curUser.id === id;

	const getUserProfile = useCallback(async () => {
		const uri = `stream/id/${curUser?.id}${
			curUserData.cursor ? `?cursor=${curUserData.cursor}` : ''
		}`;

		try {
			const response = await makeApiCall<{ data: CurUser }>({
				uri,
				jwt,
			});
			if (response.data) {
				setCurUserData(response.data);
			}
		} catch {
			console.error(
				`Error getting profile information for user @${curUserData.name}. Please contact peached.app@gmail.com.`
			);
		}
	}, [curUserData, setCurUserData, jwt, curUser]);

	const getViewingUserFriends = useCallback(async () => {
		if (!jwt || !id || !viewingUser) {
			return;
		}

		const uri = `stream/n/${viewingUser.name}/connections`;
		const response = await makeApiCall<{ data: FriendsOfFriendsResponse }>({
			uri,
			jwt,
		});

		if (response && response.data.connections) {
			setOtherFriends(response.data.connections.concat(peachFeed));
		}
	}, [viewingUser, jwt, id, peachFeed]);

	const getViewingUserProfile = useCallback(
		async (useCursor = false) => {
			if (!jwt || !id || id === undefined) {
				return;
			}
			try {
				let uri = isIndividualPostProfilePage
					? `post/${id}`
					: `stream/id/${id}`;
				if (useCursor && viewingUser?.cursor && !isIndividualPostProfilePage) {
					uri += `?cursor=${viewingUser.cursor}`;
				}

				const response = await makeApiCall<{
					data: User & DefaultResponse & { success: number };
				}>({
					uri,
					jwt,
				});

				if (response.data.success === 0) {
					return;
				}

				if (response.data.posts) {
					const postsResult = response.data.posts.reverse();

					if (useCursor && viewingUser && viewingUser.id === id) {
						setViewingUserProfile({
							...viewingUser,
							cursor: response.data.cursor,
							posts: [...viewingUser.posts, ...postsResult],
						});
					} else {
						setViewingUserProfile({ ...response.data, posts: postsResult });
					}
				} else {
					setViewingUserProfile(response.data);
				}
			} catch (error) {
				console.error(
					`Error getting profile information for user @${curUserData.name} [${error}]`
				);
			}
		},
		[id, jwt, curUserData.name, viewingUser, isIndividualPostProfilePage]
	);

	const markFeedRead = useCallback(async () => {
		try {
			if (curUser !== null && curUser.id !== id) {
				const resp = await makeApiCall<DefaultResponse>({
					uri: `stream/id/${id}/read`,
					jwt,
					method: 'PUT',
				});
				if (!resp.success) {
					throw Error(`Couldn't mark feed read for user ${id}`);
				}
				setConnections(
					connections
						.map(c => {
							if (c.id === id) {
								return {
									...c,
									unreadPostCount: 0,
								};
							}
							return c;
						})
						.sort(sortMainFeedPosts)
				);
			}
		} catch (e) {
			console.error(e);
		}
	}, [jwt, id, curUser, connections]);

	const deletePost = (id: string) => {
		const windowPositionY = window.scrollY;
		if (!viewingUser) {
			return;
		}
		api(ACTIONS.deletePost, jwt, {}, id).then(
			(response: { success: number }) => {
				if (response.success === 1) {
					const posts = viewingUser.posts.filter(p => p.id !== id);

					setViewingUserProfile({
						...viewingUser,
						posts,
					});

					window.scrollTo(0, windowPositionY);
				}
			}
		);
	};

	const showNewPost = (newPost: Post) => {
		setViewingUserProfile(user => {
			if (!user) {
				return null;
			}

			return {
				...user,
				posts: [newPost, ...user.posts],
			};
		});
	};

	const loadMorePosts = () => {
		setMorePostsLoading(true);
		getViewingUserProfile(true);
		setMorePostsLoading(false);
	};

	useEffect(() => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		setViewingUserProfile(null);
		markFeedRead();
		setPostsLoading(true);
		getUserProfile();
		getViewingUserProfile();
		getViewingUserFriends();
		setPostsLoading(false);
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		return () => {
			setViewingUserProfile(null);
			setPostsLoading(true);
			setMorePostsLoading(false);
		};
	}, []);

	const isPrivateProfile =
		viewingUser &&
		!viewingUser.isPublic &&
		!viewingUser.youFollow &&
		viewingUser.id !== curUser?.id;

	if (isPrivateProfile) {
		return (
			<Page>
				{curUserData ? (
					<PrivateProfile viewingUser={viewingUser} />
				) : (
					<Loading />
				)}
			</Page>
		);
	}

	return (
		<>
			{isNewPostButtonShowing && <NewPost showNewPost={showNewPost} />}
			<Page>
				<RiseAndFadeAnimationContainer>
					{curUserData ? (
						<>
							<ProfileContent
								loadMorePosts={loadMorePosts}
								morePostsLoading={morePostsLoading}
								deletePost={deletePost}
								viewingUser={viewingUser}
								setViewingUserProfile={setViewingUserProfile}
								postsLoading={postsLoading}
								otherFriends={otherFriends}
								hideProfileBottom={isIndividualPostProfilePage}
							/>
						</>
					) : (
						<Loading />
					)}
				</RiseAndFadeAnimationContainer>
			</Page>
		</>
	);
};
