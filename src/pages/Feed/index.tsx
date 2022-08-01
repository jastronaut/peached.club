import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../Theme/Loading';
import NewPost from '../../components/NewPost';
import { PeachContext } from '../../PeachContext';
import { User, CurUser } from '../../api/interfaces';
import ACTIONS from '../../api/constants';
import api from '../../api';
import { LinkStyled } from './style';
import Preview from './Preview';
import { Page } from '../../Theme/Layout';
import { Title } from '../../Theme/Type';

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
		if (!jwt || !curUser) {
			navigate('/login', { replace: true });
		}

		if (curUserData.id || !curUser) {
			return;
		}

		setIsCurUserDataLoading(true);

		api(ACTIONS.connectionStream, jwt, {}, curUser.id).then(
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
				<Title>All Feeds</Title>
				{isPeachLoading || isCurUserDataLoading ? (
					<Loading />
				) : (
					<Feed connections={connections} />
				)}
				<NewPost />
			</Page>
		</>
	);
};
