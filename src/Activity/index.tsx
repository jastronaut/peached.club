import React, { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { PeachContext } from '../PeachContext';
import api from '../api';
import ACTIONS from '../api/constants';
import {
	ActivityResponse,
	ActivityItem,
	NOTIFICATION_TYPE,
	Post,
	POST_TYPE,
} from '../api/interfaces';

import Loading from '../Loading';
import Navigation from '../Navigation';
import { Page } from '../Theme/Layout';
import { Title } from '../Theme/Type';
import Preview from '../Feed/Preview';

function shortenPost(text: string): string {
	return text.length > 300 ? text.slice(0, 300) + '...' : text;
}

function getPostPreviewMessage(postMessage: Post['message']): string {
	const message = postMessage[0];
	switch (message.type) {
		case POST_TYPE.TEXT:
			return shortenPost(message.text);
		case POST_TYPE.IMAGE:
			return 'Image';
		case POST_TYPE.LINK:
			return 'Link';
		case POST_TYPE.LOCATION:
			return 'Location';
		default:
			return '';
	}
}

function getActivityPreviewMessage(item: ActivityItem): string {
	switch (item.type) {
		case NOTIFICATION_TYPE.COMMENT:
		case NOTIFICATION_TYPE.MENTION:
			return item.body.commentBody;
		case NOTIFICATION_TYPE.LIKE:
			return getPostPreviewMessage(item.body.postMessage);
		case NOTIFICATION_TYPE.WAVE:
			return item.body.message;
		default:
			return '';
	}
}

function getActivityDescription(item: ActivityItem): string {
	switch (item.type) {
		case NOTIFICATION_TYPE.COMMENT:
			return 'left a comment';
		case NOTIFICATION_TYPE.MENTION:
			return 'mentioned you in a comment';
		case NOTIFICATION_TYPE.LIKE:
			return 'liked your post';
		default:
			return '';
	}
}

export const Activity = () => {
	const [activityFeed, setActivityFeed] = useState<ActivityItem[] | null>(
		null
	);
	const { darkMode, peachFeed, jwt } = useContext(PeachContext);

	useEffect(() => {
		try {
			api(ACTIONS.getActivityFeed, jwt).then(
				(response: { data: ActivityResponse }) => {
					if (response.data.streamID) {
						setActivityFeed(response.data.activityItems);
					} else {
						console.log('welp!');
					}
				}
			);
		} catch (err) {
			console.log(err);
		}
	}, [jwt]);

	if (!peachFeed || !jwt) return <Navigate to='/feed' />;

	return (
		<>
			<Navigation />
			<Page>
				<Title>Activity</Title>
				{activityFeed ? (
					activityFeed.map((item: ActivityItem) => (
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
					))
				) : (
					<Loading />
				)}
			</Page>
		</>
	);
};
