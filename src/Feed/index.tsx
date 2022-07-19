import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mantine/core';

import Navigation from '../Navigation';
import Loading from '../Loading';
import NewPost from '../NewPost';

import { PeachContext } from '../PeachContext';
import { Connections, User, CurUser } from '../api/interfaces';
import ACTIONS from '../api/constants';
import api from '../api';

import { LinkStyled } from './style';
import Preview from './Preview';
import { Page } from '../Theme/Layout';
import { Title } from '../Theme/Type';

export const Feed = () => {
	const [connections, setConnections] = useState<User[] | null>(null);
	const { jwt, setPeachFeed, curUser, curUserData, setCurUserData } =
		useContext(PeachContext);

	const navigate = useNavigate();

	useEffect(() => {
		window.scroll(0, 0);
		if (jwt && curUser) {
			api(ACTIONS.getConnections, jwt).then(
				(response: { data: Connections; success: number }) => {
					if (response.success === 1) {
						const connectionsUnread = response.data.connections.filter(
							user => user.unreadPostCount
						);
						const connectionsRead = response.data.connections.filter(
							user => !user.unreadPostCount
						);
						setConnections(connectionsUnread.concat(connectionsRead));
						setPeachFeed(
							response.data.connections.map(user => {
								user.posts = user.posts.reverse();
								return user;
							})
						);
					} else {
						console.log('handle error here :)');
					}
				}
			);

			if (!curUserData.id) {
				api(ACTIONS.connectionStream, jwt, {}, curUser.id).then(
					(response: { data: CurUser }) => {
						if (response.data) {
							setCurUserData(response.data);
						}
					}
				);
			}
		}
		// eslint-disable-next-line
	}, []);

	if (!jwt || !curUser) {
		navigate('/login', { replace: true });
	}

	return (
		<>
			<Navigation />
			<Page>
				<Title>All Feeds</Title>
				<Alert title='Bummer!' color='red'>
					This domain will be down for a couple of days, effective tomorrow.
					Please visit{' '}
					<a href='https://peached-club.vercel.app/'>
						https://peached-club.vercel.app/
					</a>{' '}
					instead.
				</Alert>
				{connections ? (
					connections.map(user => (
						<LinkStyled key={user.id} to={`/friend/${user.id}`}>
							<Preview
								key={user.id}
								avatarSrc={user.avatarSrc}
								displayName={user.displayName}
								name={user.name}
								id={user.id}
								message={
									user.posts && user.posts[0] ? user.posts[0].message[0] : ''
								}
								unread={user.unreadPostCount > 0}
								createdTime={
									user.posts && user.posts[0] ? user.posts[0].createdTime : null
								}
							/>
						</LinkStyled>
					))
				) : (
					<Loading />
				)}
				<NewPost />
			</Page>
		</>
	);
};
