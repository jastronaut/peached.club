import React, { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { PeachContext } from '../PeachContext';
import api from '../api';
import ACTIONS from '../api/constants';
import { ActivityResponse, ActivityItem } from '../api/interfaces';

import Loading from '../Loading';
import Navigation from '../Navigation';
import { Page } from '../Theme/Layout';
import { Title } from '../Theme/Type';
import Preview from '../Feed/Preview';
import { getActivityDescription, getActivityPreviewMessage } from './utils';

export const Activity = () => {
	const [activityFeed, setActivityFeed] = useState<ActivityItem[] | null>(null);
	const { peachFeed, jwt } = useContext(PeachContext);

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
