import React, { useContext, useState } from 'react';

import api from '../api/api';
import { AddFriendResponse } from '../api/interfaces';
import ACTIONS from '../api/constants';
import { PeachContext } from '../PeachContext';

import Modal from '../Theme/Modal';
import { Title } from '../Theme/Type';
import Button from '../Theme/Button';
import Toasty from '../Theme/Toasty';
import { PrivateProfileContainer, Bio, AvatarPreview } from './style';
import { ProfileHeaderHandle } from '../Friend/ProfileHeader/style';

interface PrivateProfileProps {
	onDismissPrivateProfile: () => void;
	username: string;
	displayName: string;
	bio: string;
	avatarSrc: string;
}

export const PrivateProfile: React.FC<PrivateProfileProps> = ({
	onDismissPrivateProfile,
	username,
	displayName,
	bio,
	avatarSrc,
}) => {
	const { jwt } = useContext(PeachContext);
	const [requestSending, setRequestSending] = useState<boolean>(false);
	const [hasMadeRequest, setHasMadeRequest] = useState<boolean>(false);
	const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

	const sendFriendRequest = () => {
		setHasMadeRequest(true);
		setRequestSending(true);
		api(ACTIONS.addFriend, jwt, {}, username).then(
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
				<AvatarPreview src={avatarSrc} alt='a profile pic' loading='lazy' />
				<Title>{displayName}</Title>
				<ProfileHeaderHandle>@{username}</ProfileHeaderHandle>
				<Bio>{bio}</Bio>
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
