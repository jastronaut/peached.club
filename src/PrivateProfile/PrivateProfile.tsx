import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import api from '../api/api';
import { Comment, AddFriendResponse, MutualFriend } from '../api/interfaces';
import ACTIONS from '../api/constants';
import { PeachContext } from '../PeachContext';
import Modal from '../Theme/Modal';
import { Title, Handle } from '../Theme/Type';
import Button from '../Theme/Button';
import Toasty from '../Theme/Toasty';

interface PrivateProfileProps {
	onDismissPrivateProfile: () => void;
	user: Comment['author'] | MutualFriend;
	avatarSrc: string;
}

const PrivateProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;

	> h1 {
		margin: 0.25rem 0;
	}

	> p {
		color: ${props => props.theme.text.primary};
		margin-bottom: 0.25rem;
	}
`;

const Bio = styled.p`
	margin: 0 0 1rem;
`;

const AvatarPreview = styled.img`
	border-radius: 50%;
	object-fit: cover;
	width: 75px;
	height: 75px;
`;

const PrivateProfile: React.FC<PrivateProfileProps> = ({
	onDismissPrivateProfile,
	user,
	avatarSrc,
}) => {
	const { jwt } = useContext(PeachContext);
	const [requestSending, setRequestSending] = useState<boolean>(false);
	const [hasMadeRequest, setHasMadeRequest] = useState<boolean>(false);
	const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

	const sendFriendRequest = () => {
		setHasMadeRequest(true);
		setRequestSending(true);
		api(ACTIONS.addFriend, jwt, {}, user.name).then(
			(response: AddFriendResponse) => {
				if (response.success === 1) {
					setRequestSuccess(true);
				}
				setRequestSending(false);
			}
		);
	};
	return (
		<Modal onKeyDown={onDismissPrivateProfile} isMini noSpaceBetween>
			<PrivateProfileContainer>
				<AvatarPreview src={avatarSrc} alt='a profile pic' />
				<Title>{user.displayName}</Title>
				<Handle>@{user.name}</Handle>
				<Bio>{user.bio}</Bio>
				<Button
					isSmall
					centered
					onClick={hasMadeRequest ? () => {} : sendFriendRequest}
				>
					{hasMadeRequest ? 'Pending' : 'Add Friend'}
				</Button>
			</PrivateProfileContainer>
			{hasMadeRequest ? (
				<Toasty onClick={() => {}}>
					{requestSending
						? 'Sending friend request...'
						: requestSuccess
						? 'Friend request sent!'
						: "Couldn't send friend request, please try again later!"}
				</Toasty>
			) : null}
		</Modal>
	);
};

export default PrivateProfile;
