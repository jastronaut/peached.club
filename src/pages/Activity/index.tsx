import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import { PeachContext } from '../../PeachContext';
import api from '../../api';
import ACTIONS from '../../api/constants';
import {
	ActivityResponse,
	ActivityItem,
	isCommentNotification,
	isLikeNotification,
	isWaveNotification,
	isMentionNotification,
} from '../../api/interfaces';
import {
	getActivityDescription,
	getActivityPreviewMessage,
	getTextPreview,
} from './utils';

import { Page } from '../../Theme/Layout';
import { Title } from '../../Theme/Type';
import { Preview } from '../Feed/Preview';
import { TabsWrapper } from './style';
import { MTabs as Tabs } from '../../Theme/Mantine';

export const ActivityPage = () => {
	const [activityFeed, setActivityFeed] = useState<ActivityItem[] | null>(null);
	const [cursor, setCursor] = useState(0);
	const { peachFeed, jwt } = useContext(PeachContext);

	const getActivityFeed = useCallback(() => {
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
					// const activityItems = response.data.activityItems;

					const resp = response.data.activityItems;
					setActivityFeed(resp);
				}
			});
		} catch (err) {
			console.error(err);
		}
	}, [jwt, cursor]);

	useEffect(() => {
		getActivityFeed();
	}, []);

	if (!peachFeed || !jwt) {
		return <Navigate to='/feed' />;
	}

	return (
		<Page>
			<Title>Activity</Title>
			<TabsWrapper>
				<Tabs defaultValue='comments' variant='pills' color='pink'>
					<Tabs.List>
						<Tabs.Tab value='comments'>Comments</Tabs.Tab>
						<Tabs.Tab value='mentions'>Mentions</Tabs.Tab>
						<Tabs.Tab value='likes'>Likes</Tabs.Tab>
						{/* <Tabs.Tab value='waves'>Waves</Tabs.Tab> */}
					</Tabs.List>

					<Tabs.Panel value='comments' pt='xs'>
						{activityFeed
							?.filter(item => {
								if (isCommentNotification(item)) {
									return item;
								}
							})
							.map(item => (
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
						{activityFeed
							?.filter(item => {
								if (isMentionNotification(item)) {
									return item;
								}
							})
							.map(item => (
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
						{activityFeed
							?.filter(item => {
								if (isLikeNotification(item)) {
									return item;
								}
							})
							.map(item => (
								<Preview
									key={`${item.createdTime}${item.body.authorStream.id}`}
									avatarSrc={item.body.authorStream.avatarSrc}
									displayName={item.body.authorStream.displayName}
									name={item.body.authorStream.name}
									id={item.body.authorStream.id}
									createdTime={item.createdTime}
									message={getTextPreview(item)}
								>
									{/* <p>{getActivityPreviewMessage(item)}</p> */}
								</Preview>
							))}
					</Tabs.Panel>

					{/*
					<Tabs.Panel value='waves'>
						{activityFeed
							?.filter(item => {
								if (isWaveNotification(item)) {
									return item;
								}
							})
							.map(item => (
								<Preview
									key={`${item.createdTime}${item.body.authorStream.id}`}
									avatarSrc={item.body.authorStream.avatarSrc}
									displayName={item.body.authorStream.displayName}
									name={item.body.authorStream.name}
									id={item.body.authorStream.id}
									message={getActivityPreviewMessage(item)}
									createdTime={item.createdTime}
								>
									<p>{getActivityDescription(item)}</p>
								</Preview>
							))}
					</Tabs.Panel>
							*/}
				</Tabs>
			</TabsWrapper>
		</Page>
	);
};
