import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@mantine/core';

import { PeachContext } from '../../PeachContext';
import api from '../../api';
import ACTIONS from '../../api/constants';
import { ActivityResponse, ActivityItem } from '../../api/interfaces';

import Loading from '../../Theme/Loading';
import { Page } from '../../Theme/Layout';
import { Title } from '../../Theme/Type';
import Preview from '../Feed/Preview';
import { getActivityDescription, getActivityPreviewMessage } from './utils';

export const ActivityPage = () => {
	const [activityFeed, setActivityFeed] = useState<ActivityItem[] | null>(null);
	const [cursor, setCursor] = useState(0);
	const { peachFeed, jwt } = useContext(PeachContext);

	const getActivityFeed = useCallback(() => {
		const cursorParams = cursor ? `?cursor=${cursor}` : '';
		try {
			api(ACTIONS.getActivityFeed, jwt, {}, '', cursorParams).then(
				(response: { data: ActivityResponse }) => {
					if (response.data.streamID) {
						const activityItems = response.data.activityItems;

						setActivityFeed(response.data.activityItems);
					}
				}
			);
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
			{activityFeed ? (
				<>
					(
					{activityFeed.map((item: ActivityItem) => (
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
					<Button>See more</Button>) );
				</>
			) : (
				<Loading />
			)}
		</Page>
	);
};
