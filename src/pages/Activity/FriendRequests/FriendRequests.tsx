import React, { useContext, useState, useCallback } from 'react';
import {
	Center,
	Modal,
	Button,
	Stack,
	Flex,
	Space,
	TextInput,
	Notification,
} from '@mantine/core';
import styled from 'styled-components';
import { IconAt } from '@tabler/icons';
import { rem } from 'polished';

import { PeachContext } from '../../../PeachContext';
import { PendingFriendRequest, DefaultResponse } from '../../../api/interfaces';
import { makeApiCall } from '../../../api/api';

import { Page } from '../../../Theme/Layout';
import { Title, Text, Header3 } from '../../../Theme/Type';
import { FriendRequestItem } from '../../../components/FriendRequest/FriendRequestItem';
import { TabsWrapper } from '../style';
import { MTabs as Tabs } from '../../../Theme/Mantine';
import { RiseAndFadeAnimationContainer } from '../../../Theme/Animations';

const StyledHeader3 = styled(Header3)`
	margin: auto ${rem(16)};
`;

const NewFriendFormContainer = styled.div`
	margin: auto ${rem(16)};
	display: flex;
	align-items: center;
`;

type FriendRequestsProps = {
	inboundFriendRequests: PendingFriendRequest[];
	outboundFriendRequests: PendingFriendRequest[];
	onClickAccept: (id: string) => void;
	onClickDecline: (id: string) => void;
	onClickCancel: (id: string) => void;
};

export const FriendRequests = (props: FriendRequestsProps) => {
	return (
		<>
			<TabsWrapper>
				<Tabs defaultValue='received' variant='pills' color='pink'>
					<Tabs.List>
						<Tabs.Tab value='received'>Received</Tabs.Tab>
						<Tabs.Tab value='sent'>Sent</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel value='received' pt='xs'>
						{props.inboundFriendRequests.length < 1 && (
							<Center>
								<Text muted>
									No incoming friend requests for you to review!
								</Text>
							</Center>
						)}
						{props.inboundFriendRequests.map(req => (
							<FriendRequestItem
								key={req.id}
								name={req.stream.name}
								displayName={req.stream.displayName}
								avatarSrc={req.stream.avatarSrc}
								onClickAccept={() => props.onClickAccept(req.id)}
								onClickDecline={() => props.onClickDecline(req.id)}
								bio={req.stream.bio}
							/>
						))}
					</Tabs.Panel>
					<Tabs.Panel value='sent' pt='xs'>
						{props.outboundFriendRequests.length < 1 && (
							<Center>
								<Text muted>
									No outgoing friend requests for you to review!
								</Text>
							</Center>
						)}
						{props.outboundFriendRequests.map(req => (
							<FriendRequestItem
								key={req.id}
								name={req.stream.name}
								displayName={req.stream.displayName}
								avatarSrc={req.stream.avatarSrc}
								onClickDecline={() => props.onClickCancel(req.id)}
								bio={req.stream.bio}
							/>
						))}
					</Tabs.Panel>
				</Tabs>
			</TabsWrapper>
		</>
	);
};

export const FriendRequestsPage = () => {
	const {
		inboundFriendRequests,
		outboundFriendRequests,
		jwt,
		setInboundFriendRequests,
		setOutboundFriendRequests,
	} = useContext(PeachContext);

	const [isModalShowing, setIsModalShowing] = useState(false);
	const [errorMesssage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const acceptFriendRequest = useCallback(
		async (id: string) => {
			const uri = `friend-request/${id}/accept`;
			try {
				const response = await makeApiCall<DefaultResponse>({
					uri,
					jwt,
					method: 'POST',
				});
				//@ts-ignore
				if (!response || !response.success) {
					throw Error('No');
				} else {
					setInboundFriendRequests(
						inboundFriendRequests.filter(r => r.id !== id)
					);
				}
			} catch {
				setErrorMessage('Oops! Please try again in a bit.');
				console.error(
					`Error accepting friend request from user ${id}. Please contact peached.app@gmail.com.`
				);
			}
		},
		[jwt, inboundFriendRequests]
	);

	const onClickAccept = (id: string) => {
		acceptFriendRequest(id);
		setIsModalShowing(false);
	};

	const deleteFriendRequest = useCallback(
		async (id: string) => {
			const uri = `friend-request/${id}/decline`;
			try {
				const response = await makeApiCall<DefaultResponse>({
					uri,
					jwt,
					method: 'POST',
				});
				if (!response || !response.data.success) {
					throw Error('No');
				} else {
					console.log('wat');
					setInboundFriendRequests(
						inboundFriendRequests.filter(r => r.id !== id)
					);
					setSuccessMessage('Friend request was declined!');
				}
			} catch {
				setErrorMessage('Oops! Please try again in a bit.');
				console.error(
					`Error removing friend request from user ${id}. Please contact peached.app@gmail.com.`
				);
			}
		},
		[jwt, inboundFriendRequests, outboundFriendRequests]
	);

	const onClickDecline = (id: string) => {
		deleteFriendRequest(id);
		setIsModalShowing(false);
	};

	const cancelFriendRequest = useCallback(
		async (id: string) => {
			const uri = `friend-request/${id}`;
			try {
				const response = await makeApiCall<DefaultResponse>({
					uri,
					jwt,
					method: 'DELETE',
				});

				//@ts-ignore
				if (!response || !response.success) {
					throw Error('No');
				} else {
					setOutboundFriendRequests(
						outboundFriendRequests.filter(r => r.id !== id)
					);
					setSuccessMessage('Friend request was cancelled!');
				}
			} catch {
				setErrorMessage('Oops! Please try again in a bit.');
				console.error(
					`Error cancelling friend request to user ${id}. Please contact peached.app@gmail.com.`
				);
			}
		},
		[jwt, inboundFriendRequests, outboundFriendRequests]
	);

	const onClickCancelOutboundRequest = (id: string) => {
		cancelFriendRequest(id);
		setIsModalShowing(false);
	};

	return (
		<>
			<Modal
				centered
				opened={isModalShowing}
				onClose={() => setIsModalShowing(false)}
				withCloseButton={false}
			>
				<Center>
					<Stack>
						<Text>Delete friend request? 🥲</Text>
						<Flex>
							<Button color='red'>Delete</Button>
							<Space w='md' />
							<Button color='gray' onClick={() => setIsModalShowing(false)}>
								Cancel
							</Button>
						</Flex>
					</Stack>
				</Center>
			</Modal>
			<Page>
				<RiseAndFadeAnimationContainer>
					<Title>Friend requests</Title>
					<FriendRequests
						onClickAccept={onClickAccept}
						onClickDecline={onClickDecline}
						onClickCancel={onClickCancelOutboundRequest}
						inboundFriendRequests={inboundFriendRequests}
						outboundFriendRequests={outboundFriendRequests}
					/>
					{successMessage && (
						<Notification onClose={() => setSuccessMessage('')}>
							{successMessage}
						</Notification>
					)}
					{errorMesssage && (
						<Notification onClose={() => setErrorMessage('')}>
							{errorMesssage}
						</Notification>
					)}
				</RiseAndFadeAnimationContainer>
				{/*
				<StyledHeader3>Add a new friend</StyledHeader3>
				<NewFriendFormContainer>
					<TextInput
						variant='filled'
						placeholder='Enter a username...'
						icon={<IconAt size={16} />}
					/>
					<Space w='md' />
					<div>
						<Button color='green'>Add</Button>
					</div>
				</NewFriendFormContainer>
	*/}
			</Page>
		</>
	);
};
