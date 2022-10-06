import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../../api';
import Loading from '../../Theme/Loading';

import { Page } from '../../Theme/Layout';
import {
	Post,
	User,
	FriendsOfFriendsResponse,
	MutualFriend,
	CurUser,
} from '../../api/interfaces';
import ACTIONS from '../../api/constants';

import { FriendPostContent, EmptyStateWrapper } from './style';
import { PeachContext } from '../../PeachContext';
import { ProfilePost } from './ProfilePost';
import NewPost from '../../components/NewPost';

import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';

const SCROLL_OPTIONS = {
	top: 0,
	left: 0,
	// behavior: 'smooth'
};

const EmptyState = () => (
	<EmptyStateWrapper>
		<FriendPostContent>No posts yet!</FriendPostContent>
	</EmptyStateWrapper>
);

export const ProfilePage = () => {
	const {
		jwt,
		curUser: userLoginData,
		peachFeed,
		curUserData,
		setCurUserData,
	} = useContext(PeachContext);
	const navigate = useNavigate();

	const [posts, setPosts] = useState<Post[]>([]);
	const [profileUser, setProfileUser] = useState<User | null>(null);
	const [otherFriends, setOtherFriends] = useState<MutualFriend[]>([]);
	const [postsLoaded, setPostsLoaded] = useState<boolean>(false);

	const { id } = useParams();

	const loadProfile = useCallback(
		(id: string | undefined) => {
			if (!jwt || !userLoginData || !id) {
				navigate('/login', { replace: true });
				return;
			}

			const ggetUserProfile = async () => {
				setPostsLoaded(false);
				const resp: { data: User } = await api(
					ACTIONS.connectionStream,
					jwt,
					{},
					id,
					'',
					'ProfilePage getUserProfile useffect2'
				);
				setProfileUser(resp.data);

				// get posts by this profileUser
				if (resp.data.posts) {
					resp.data.posts = resp.data.posts.reverse();

					setPosts(resp.data.posts);

					// get this profileUser's friends
					const otherFriendsResponse: {
						data: FriendsOfFriendsResponse;
					} = await api(ACTIONS.getFriendsOfFriends, jwt, {}, resp.data.name);
					if (
						otherFriendsResponse.data &&
						otherFriendsResponse.data.connections
					) {
						setOtherFriends(
							otherFriendsResponse.data.connections.concat(peachFeed)
						);
					}
				}

				// api(
				// 	ACTIONS.connectionStream,
				// 	jwt,
				// 	{},
				// 	resp.data.id,
				// 	'',
				// 	'ProfilePage useeffect1'
				// ).then((response: { data: CurUser }) => {
				// 	if (response.data) {
				// 		setCurUserData(response.data);
				// 	}
				// });
			};

			ggetUserProfile();
			setPostsLoaded(true);
		},
		[jwt, userLoginData, navigate]
	);

	useEffect(() => {
		window.scroll(SCROLL_OPTIONS);
		loadProfile(id);
	}, [id, loadProfile]);

	/*
	useEffect(() => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		if (!jwt || !curUser) {
			navigate('/login', { replace: true });
		}

		if (!curUser) {
			return;
		}

		api(
			ACTIONS.connectionStream,
			jwt,
			{},
			curUser.id,
			'',
			'ProfilePage useeffect1'
		).then((response: { data: CurUser }) => {
			if (response.data) {
				setCurUserData(response.data);
			}
		});
		// eslint-disable-next-line
	}, [curUserData.id, curUser, jwt]);

	useEffect(() => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (!profileUser && peachFeed) {
			setProfileUser(peachFeed.filter(profileUser => profileUser.id === id)[0]);
		}
	}, [peachFeed, profileUser]);

	useEffect(() => {
		if (!id || !jwt) {
			return;
		}

		const getUserProfile = async () => {
			setPostsLoaded(false);
			const resp: { data: User } = await api(
				ACTIONS.connectionStream,
				jwt,
				{},
				id,
				'',
				'ProfilePage getUserProfile useffect2'
			);

			// get posts by this profileUser
			if (resp.data.posts) {
				resp.data.posts = resp.data.posts.reverse();
				setProfileUser(resp.data);
				setPosts(resp.data.posts);
				setPostsLoaded(true);

				// get this profileUser's friends
				const otherFriendsResponse: {
					data: FriendsOfFriendsResponse;
				} = await api(ACTIONS.getFriendsOfFriends, jwt, {}, resp.data.name);
				if (
					otherFriendsResponse.data &&
					otherFriendsResponse.data.connections
				) {
					setOtherFriends(
						otherFriendsResponse.data.connections.concat(peachFeed)
					);
				}
			}

			// used to show prev/next arrows on nav to go through feeds
			setCurFeedId(id);
		};
		getUserProfile();
	}, [id, jwt, peachFeed]);

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
*/
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

	console.log({ profileUser });
	console.log('==');
	console.log({ curUserData });
	console.log('==');
	console.log({ userLoginData });

	return (
		<>
			<Page>
				{profileUser && curUserData ? (
					<>
						<ProfileHeader user={profileUser} postsLoaded={postsLoaded} />
						{!postsLoaded ? (
							<Loading />
						) : posts.length > 0 ? (
							<div style={{ margin: '0' }}>
								{posts.map(post => (
									<ProfilePost
										{...post}
										key={post.id}
										deletePost={deletePost}
										author={profileUser.id}
										otherFriends={otherFriends}
										postAuthorAvatarSrc={profileUser.avatarSrc}
										canDelete={profileUser.id === curUserData.id}
									/>
								))}
							</div>
						) : (
							<EmptyState />
						)}
						{userLoginData !== null && userLoginData.id === id && <NewPost />}
					</>
				) : (
					<Loading />
				)}
			</Page>
		</>
	);
};
