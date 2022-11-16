import React, { useContext } from 'react';
import { Button, Center, Space } from '@mantine/core';
import { IconHeartHandshake } from '@tabler/icons';

import { PeachContext } from '../../PeachContext';
import { User } from '../../api/interfaces';
import { makeApiCall } from '../../api/api';

import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';

type PrivateProfileProps = {
	viewingUser: User;
};

const PrivateProfileComponent = (props: PrivateProfileProps) => {
	return (
		<>
			<ProfileHeader viewingUser={props.viewingUser} loading={false} />
			<Space h='md' />
			<Center>
				<Button
					variant='gradient'
					gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
					leftIcon={<IconHeartHandshake />}
				>
					Add friend
				</Button>
			</Center>
		</>
	);
};

export const PrivateProfile = (props: PrivateProfileProps) => {
	const { jwt } = useContext(PeachContext);

	const onClickAddFriend = () => {
		const x = `/stream/n/${props.viewingUser.name}/connection`;
	};
	return (
		<>
			<PrivateProfileComponent viewingUser={props.viewingUser} />
		</>
	);
};
