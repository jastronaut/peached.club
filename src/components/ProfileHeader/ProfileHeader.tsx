import React, { useCallback, useContext, useState } from 'react';
import Linkify from 'linkify-react';
import {
	ActionIcon,
	Modal,
	Center,
	Button,
	Stack,
	Flex,
	Space,
	Skeleton,
	Indicator,
} from '@mantine/core';
import { IconMoodSmileBeam, IconStar } from '@tabler/icons';

import { PeachContext } from '../../PeachContext';
import {
	DefaultResponse,
	NewFriendRequestResponse,
	User,
} from '../../api/interfaces';
import { LINKIFY_OPTIONS, DEFAULT_AVATAR_SRC } from '../../constants';
import { makeApiCall } from '../../api/api';
import { httpTize } from '../../utils/httpTize';
import { getRandomBackgroundUrl } from './utils';
import { FRIEND_STATUS } from '../../interfaces';

import { Text } from '../../Theme/Type';
import {
	Avatar,
	ProfileHeaderContainer,
	ProfileHeaderText,
	ProfileHeaderHandle,
	ProfileHeaderContent,
} from './style';

const FriendsButton = (props: {
	onClickFollowingButton: () => void;
	isShowing: boolean;
	iconVariant: 'filled' | 'outline';
}) => {
	return (
		<ActionIcon
			variant={props.iconVariant}
			color={props.isShowing ? 'pink' : 'gray'}
			onClick={props.isShowing ? props.onClickFollowingButton : () => null}
		>
			<IconMoodSmileBeam size={16} color={props.isShowing ? 'white' : 'gray'} />
		</ActionIcon>
	);
};

type BaseProfileHeaderProps = {
	viewingUser: User | null;
	loading: boolean;
};
interface ProfileHeaderProps extends BaseProfileHeaderProps {
	setViewingUser: (user: User | null) => void;
}
export interface ProfileHeaderComponentProps extends BaseProfileHeaderProps {
	onClickFollowingButton: () => void;
	onClickFavoriteButton: () => void;
	isLoggedInUser: boolean;
	friendStatus: FRIEND_STATUS;
}

export const ProfileHeaderComponent = (props: ProfileHeaderComponentProps) => {
	const {
		loading,
		viewingUser,
		onClickFollowingButton,
		onClickFavoriteButton,
		friendStatus,
	} = props;
	const avatarSrc =
		loading || !viewingUser || !viewingUser.avatarSrc
			? DEFAULT_AVATAR_SRC
			: viewingUser.avatarSrc;
	const avatarAlt = `${viewingUser?.name}'s avatar`;
	const displayName = loading || !viewingUser ? '...' : viewingUser.displayName;
	const username = loading || !viewingUser ? '...' : viewingUser.name;
	const followingIconVariant = viewingUser
		? viewingUser.youFollow
			? 'filled'
			: 'outline'
		: 'filled';
	const favoriteIconVariant = viewingUser
		? viewingUser.isFavorite
			? 'filled'
			: 'outline'
		: 'filled';

	const friendInteractionsShowing =
		!(friendStatus === 'SELF') && viewingUser && !loading;

	return (
		<ProfileHeaderContainer>
			<ProfileHeaderContent>
				{loading || !viewingUser ? (
					<Skeleton height={100} circle mb='xl' />
				) : (
					<Avatar>
						<img
							src={httpTize(avatarSrc)}
							style={{ opacity: loading ? '0.5' : '1' }}
							alt={avatarAlt}
						/>
					</Avatar>
				)}

				<ProfileHeaderText>
					{loading || !viewingUser ? (
						<Skeleton height={28} width='60%' />
					) : (
						<h2>{displayName}</h2>
					)}

					{loading || !viewingUser ? (
						<Skeleton height={16} mt={6} width='20%' />
					) : (
						<ProfileHeaderHandle>@{username}</ProfileHeaderHandle>
					)}

					{loading || !viewingUser ? (
						<Skeleton height={16} mt={6} />
					) : (
						<p>
							{loading || !viewingUser ? (
								'...'
							) : (
								<Linkify tagName='span' options={LINKIFY_OPTIONS}>
									{viewingUser.bio}
								</Linkify>
							)}
						</p>
					)}
				</ProfileHeaderText>
				<>
					<Flex>
						<>
							{friendInteractionsShowing &&
								(friendStatus === 'OUTBOUND_REQUEST' ||
								friendStatus === 'INBOUND_REQUEST' ||
								friendStatus === 'NOT_FOLLOWING' ? (
									<Indicator
										inline
										label={friendStatus === 'NOT_FOLLOWING' ? '+' : '...'}
										size={16}
										color='green'
									>
										<FriendsButton
											onClickFollowingButton={onClickFollowingButton}
											isShowing={friendInteractionsShowing}
											iconVariant={followingIconVariant}
										/>
									</Indicator>
								) : (
									<FriendsButton
										onClickFollowingButton={onClickFollowingButton}
										isShowing={friendInteractionsShowing}
										iconVariant={followingIconVariant}
									/>
								))}

							{friendInteractionsShowing && viewingUser.youFollow && (
								<>
									<Space w='sm' />
									<ActionIcon
										variant={favoriteIconVariant}
										color='yellow'
										onClick={
											friendInteractionsShowing
												? onClickFavoriteButton
												: () => null
										}
									>
										<IconStar size={16} />
									</ActionIcon>
								</>
							)}
						</>
					</Flex>
				</>
			</ProfileHeaderContent>
		</ProfileHeaderContainer>
	);
};

function getConfirmationModalMessage(friendStatus: FRIEND_STATUS) {
	switch (friendStatus) {
		case 'FOLLOWING':
			return `Unfriend this peach?`;
		case 'OUTBOUND_REQUEST':
			return `Cancel friend request to this peach?`;
		case 'INBOUND_REQUEST':
			return `Accept friend request from this peach?`;
		case 'NOT_FOLLOWING':
			return `Send friend request to this peach?`;
		default:
			return `You shouldn't be seeing this message 🫣 Contact peached.app@gmail.com!`;
	}
}

export const ProfileHeader = (props: ProfileHeaderProps) => {
	const {
		jwt,
		connections,
		setConnections,
		outboundFriendRequests,
		setOutboundFriendRequests,
		inboundFriendRequests,
		curUser,
	} = useContext(PeachContext);

	const [isConfirmationModalShowing, setIsConfirmationModalShowing] =
		useState<boolean>(false);

	const { viewingUser, loading, setViewingUser } = props;
	let friendStatus: FRIEND_STATUS = 'LOADING';

	if (viewingUser && curUser) {
		if (viewingUser.id === curUser.id) {
			friendStatus = 'SELF';
		} else if (viewingUser.youFollow) {
			friendStatus = 'FOLLOWING';
		} else {
			const existingOutboundRequest = outboundFriendRequests.filter(
				req => req.stream.id === viewingUser.id
			)[0];
			if (existingOutboundRequest) {
				friendStatus = 'OUTBOUND_REQUEST';
			} else {
				const existingInboundRequest = inboundFriendRequests.filter(
					req => req.stream.id === viewingUser.id
				)[0];
				if (existingInboundRequest) {
					friendStatus = 'INBOUND_REQUEST';
				} else {
					friendStatus = 'NOT_FOLLOWING';
				}
			}
		}
	}

	const handleFriendRequests = useCallback(async () => {
		if (!jwt || !viewingUser) {
			return;
		}

		try {
			if (viewingUser.youFollow) {
				const uri = `stream/id/${viewingUser.id}/connection`;
				const resp = await makeApiCall<DefaultResponse>({
					uri,
					method: 'DELETE',
					jwt,
				});

				if (!resp.success) {
					throw Error(
						`Couldn't unfriend user ${viewingUser.id}. Please contact peached.app@gmail.com.`
					);
				}

				setViewingUser({
					...viewingUser,
					youFollow: false,
					followsYou: false, // change this for public profiles?
					posts: [],
				});
				setConnections(connections.filter(user => user.id !== viewingUser.id));
			} else {
				const existingRequest = outboundFriendRequests.filter(
					req => req.stream.id === viewingUser.id
				)[0];

				if (existingRequest) {
					// remove friend request; friend request has already been sent
					const uri = `friend-request/${existingRequest.id}`;
					const response = await makeApiCall<DefaultResponse>({
						uri,
						jwt,
						method: 'DELETE',
					});

					if (!response || !response.success) {
						throw Error(
							`Couldn't delete friend request (id: ${existingRequest.id}) to user ${viewingUser.id}`
						);
					} else {
						setOutboundFriendRequests(
							outboundFriendRequests.filter(r => r.id !== viewingUser.id)
						);
					}
				} else {
					// send a friend request
					const resp = await makeApiCall<NewFriendRequestResponse>({
						uri: `stream/n/${viewingUser.name}/connection`,
						method: 'POST',
						jwt,
					});

					if (!resp.success) {
						throw Error(
							`Couldn't send a friend request to user ${viewingUser.name}. Please contact peached.app@gmail.com`
						);
					}

					setOutboundFriendRequests(
						outboundFriendRequests.concat({ ...resp.data })
					);
				}
			}
		} catch (e) {
			console.error(e);
		}
		setIsConfirmationModalShowing(false);
	}, [jwt, connections, outboundFriendRequests, viewingUser]);

	const onClickFollowingButton = () => {
		setIsConfirmationModalShowing(true);
	};

	const onClickFavoriteButton = useCallback(async () => {
		if (!jwt || !viewingUser || !viewingUser.youFollow) {
			return;
		}

		try {
			const isFavorite = viewingUser.isFavorite;
			let method = 'POST';
			if (isFavorite) {
				method = 'DELETE';
			}

			const resp = await makeApiCall<DefaultResponse>({
				uri: `stream/id/${viewingUser.id}/favorite`,
				method,
				jwt,
			});

			if (!resp.success) {
				throw Error(
					`Couldnt add or remove user ${viewingUser.id} from favorites!`
				);
			}

			setViewingUser({
				...viewingUser,
				isFavorite: !isFavorite,
			});

			setConnections(
				connections.map(c => {
					if (c.id === viewingUser.id) {
						return {
							...c,
							isFavorite: !isFavorite,
						};
					}
					return c;
				})
			);
		} catch (e) {
			console.error(e);
		}
	}, [jwt, viewingUser, connections]);

	return (
		<>
			<Modal
				opened={isConfirmationModalShowing}
				onClose={() => setIsConfirmationModalShowing(false)}
				withCloseButton={false}
				centered
			>
				<Center>
					<Stack>
						<Text centered>{getConfirmationModalMessage(friendStatus)}</Text>
						<Center>
							<Flex>
								<Button color='pink' onClick={handleFriendRequests}>
									Confirm
								</Button>
								<Space w='md' />
								<Button
									color='gray'
									onClick={() => setIsConfirmationModalShowing(false)}
								>
									Cancel
								</Button>
							</Flex>
						</Center>
					</Stack>
				</Center>
			</Modal>
			<ProfileHeaderComponent
				viewingUser={viewingUser}
				loading={loading}
				onClickFollowingButton={onClickFollowingButton}
				onClickFavoriteButton={onClickFavoriteButton}
				isLoggedInUser={friendStatus === 'SELF'}
				friendStatus={friendStatus}
			/>
		</>
	);
};
