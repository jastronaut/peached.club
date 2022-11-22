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

export const ProfilePage = () => {
	const { jwt, curUser, peachFeed, curUserData, setCurUserData } =
		useContext(PeachContext);
	const { id } = useParams();

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
			const response = await makeApiCall<CurUser>({
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
		const response = await makeApiCall<FriendsOfFriendsResponse>({
			uri,
			jwt,
		});

		if (response.data && response.data.connections) {
			setOtherFriends(response.data.connections.concat(peachFeed));
		}
	}, [viewingUser, jwt, id, peachFeed]);

	const getViewingUserProfile = useCallback(
		async (useCursor = false) => {
			if (!jwt || !id) {
				return;
			}

			try {
				let uri = `stream/id/${id}`;
				if (useCursor && viewingUser?.cursor) {
					uri += `?cursor=${viewingUser.cursor}`;
				}

				const response = await makeApiCall<User>({
					uri,
					jwt,
				});

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
		[id, jwt, curUserData.name, viewingUser]
	);

	const markFeedRead = useCallback(async () => {
		try {
			if (curUser !== null && curUser.id !== id) {
				makeApiCall<object>({
					uri: `stream/id/${id}/read`,
					jwt,
					method: 'PUT',
				});
			}
		} catch (_error) {}
	}, [jwt, id, curUser]);

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
							<ProfileHeader viewingUser={viewingUser} loading={postsLoading} />
							{postsLoading || !viewingUser ? (
								<Loading />
							) : viewingUser &&
							  viewingUser.posts &&
							  viewingUser.posts.length > 0 ? (
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
									<ProfileBottom
										morePostsLoading={morePostsLoading}
										cursor={viewingUser.cursor || null}
										loadMorePosts={loadMorePosts}
									/>
								</>
							) : (
								<EmptyState />
							)}
						</>
					) : (
						<Loading />
					)}
				</RiseAndFadeAnimationContainer>
			</Page>
		</>
	);
};
