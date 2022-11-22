import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../Theme/Loading';
import { PeachContext } from '../../PeachContext';
import { User, CurUser } from '../../api/interfaces';
import ACTIONS from '../../api/constants';
import api from '../../api';
import { LinkStyled } from './style';
import { Preview } from './Preview';
import { Page } from '../../Theme/Layout';
import { Title } from '../../Theme/Type';
import { RiseAndFadeAnimationContainer } from '../../Theme/Animations';

const Feed = (props: { connections: User[] }) => {
	return (
		<>
			{props.connections.map(user => (
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
						isFavorite={user.isFavorite}
					/>
				</LinkStyled>
			))}
		</>
	);
};

export const FeedPage = () => {
	const {
		jwt,
		curUser,
		curUserData,
		setCurUserData,
		connections,
		isPeachLoading,
	} = useContext(PeachContext);
	const [isCurUserDataLoading, setIsCurUserDataLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

	useEffect(() => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		if (!jwt || !curUser) {
			navigate('/login', { replace: true });
		}

		setIsCurUserDataLoading(true);

		api(ACTIONS.connectionStream, jwt, {}, curUser?.id, 'FeedPage').then(
			(response: { data: CurUser }) => {
				if (response.data) {
					setCurUserData(response.data);
				}
			}
		);
		setIsCurUserDataLoading(false);
		// eslint-disable-next-line
	}, [curUserData.id, curUser, jwt]);

	return (
		<>
			<Page>
				<RiseAndFadeAnimationContainer>
					<Title>All Feeds</Title>
					{isPeachLoading || isCurUserDataLoading ? (
						<Loading />
					) : (
						<Feed connections={connections} />
					)}
				</RiseAndFadeAnimationContainer>
			</Page>
		</>
	);
};
