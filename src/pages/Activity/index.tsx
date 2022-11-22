import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { Center } from '@mantine/core';

import { PeachContext } from '../../PeachContext';
import api from '../../api';
import ACTIONS from '../../api/constants';
import {
	ActivityResponse,
	ActivityItem,
	isCommentNotification,
	isLikeNotification,
	isMentionNotification,
} from '../../api/interfaces';
import { getActivityPreviewMessage, getTextPreview } from './utils';

import { Page } from '../../Theme/Layout';
import { Title, Text } from '../../Theme/Type';
import { Preview } from '../Feed/Preview';
import { TabsWrapper, Link } from './style';
import { MTabs as Tabs } from '../../Theme/Mantine';
import Loading from '../../Theme/Loading';
import { FriendRequestsPreview } from '../../components/FriendRequest/FriendRequestsPreview';
import { RiseAndFadeAnimationContainer } from '../../Theme/Animations';

const EmptyTab = () => (
	<Center>
		<Text muted>Nothing here... yet!</Text>
	</Center>
);

export const ActivityPage = () => {
	const { peachFeed, jwt, inboundFriendRequests, outboundFriendRequests } =
		useContext(PeachContext);
	const [activityFeed, setActivityFeed] = useState<ActivityItem[] | null>(null);
	const [cursor, setCursor] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const getActivityFeed = useCallback(() => {
		setIsLoading(true);
		const cursorParams = cursor ? `?cursor=${cursor}` : '';
		try {
			api(
				ACTIONS.getActivityFeed,
				jwt,
				{},
				'',
				cursorParams,
				'ActivityPage'
			).then((response: { data: ActivityResponse }) => {
				if (response.data.streamID) {
					const resp = response.data.activityItems;
					setActivityFeed(resp);
				}
			});
		} catch (err) {
			console.error(err);
		}
		const loadingTimer = setTimeout(() => setIsLoading(false), 500);
		return () => clearTimeout(loadingTimer);
	}, [jwt, cursor]);

	useEffect(() => {
		getActivityFeed();
	}, []);

	const commentNotifications = activityFeed?.filter(item => {
		if (isCommentNotification(item)) {
			return item;
		}
	});
	const likeNotifications = activityFeed?.filter(item => {
		if (isLikeNotification(item)) {
			return item;
		}
	});
	const mentionNotifications = activityFeed?.filter(item => {
		if (isMentionNotification(item)) {
			return item;
		}
	});

	if (!peachFeed || !jwt) {
		return <Navigate to='/feed' />;
	}

	return (
		<Page>
			<RiseAndFadeAnimationContainer>
				<Title>Activity</Title>
				{outboundFriendRequests.length > 0 && (
					<Link to='/activity/friend-requests'>
						<FriendRequestsPreview
							numRequests={outboundFriendRequests.length}
						/>
					</Link>
				)}
				<TabsWrapper>
					<Tabs defaultValue='comments' variant='pills' color='pink'>
						<Tabs.List>
							<Tabs.Tab value='comments'>Comments</Tabs.Tab>
							<Tabs.Tab value='mentions'>Mentions</Tabs.Tab>
							<Tabs.Tab value='likes'>Likes</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value='comments' pt='xs'>
							{isLoading && <Loading />}
							{!isLoading &&
								commentNotifications &&
								commentNotifications.length < 1 && <EmptyTab />}
							{commentNotifications &&
								commentNotifications.map(item => (
									<Preview
										key={`${item.createdTime}${item.body.authorStream.id}`}
										avatarSrc={item.body.authorStream.avatarSrc}
										displayName={item.body.authorStream.displayName}
										name={item.body.authorStream.name}
										id={item.body.authorStream.id}
										createdTime={item.createdTime}
										message={getTextPreview(item)}
									>
										<p>{getActivityPreviewMessage(item)}</p>
									</Preview>
								))}
						</Tabs.Panel>

						<Tabs.Panel value='mentions'>
							{isLoading && <Loading />}
							{!isLoading &&
								mentionNotifications &&
								mentionNotifications.length < 1 && <EmptyTab />}
							{mentionNotifications &&
								mentionNotifications.map(item => (
									<Preview
										key={`${item.createdTime}${item.body.authorStream.id}`}
										avatarSrc={item.body.authorStream.avatarSrc}
										displayName={item.body.authorStream.displayName}
										name={item.body.authorStream.name}
										id={item.body.authorStream.id}
										createdTime={item.createdTime}
										message={getTextPreview(item)}
									>
										<p>{getActivityPreviewMessage(item)}</p>
									</Preview>
								))}
						</Tabs.Panel>

						<Tabs.Panel value='likes'>
							{isLoading && <Loading />}
							{!isLoading &&
								likeNotifications &&
								likeNotifications.length < 1 && <EmptyTab />}
							{likeNotifications &&
								likeNotifications.map(item => (
									<Preview
										key={`${item.createdTime}${item.body.authorStream.id}`}
										avatarSrc={item.body.authorStream.avatarSrc}
										displayName={item.body.authorStream.displayName}
										name={item.body.authorStream.name}
										id={item.body.authorStream.id}
										createdTime={item.createdTime}
										message={getTextPreview(item)}
									></Preview>
								))}
						</Tabs.Panel>
					</Tabs>
				</TabsWrapper>
			</RiseAndFadeAnimationContainer>
		</Page>
	);
};
