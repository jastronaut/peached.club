import React from 'react';
import { Center, Space } from '@mantine/core';
import { IconLock } from '@tabler/icons';
import styled, { useTheme } from 'styled-components';
import { rem } from 'polished';

import { User } from '../../api/interfaces';

import { Text } from '../../Theme/Type';
import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 ${rem(32)};
	text-align: center;
`;

type PrivateProfileProps = {
	viewingUser: User;
};

const PrivateProfileComponent = (props: PrivateProfileProps) => {
	const theme = useTheme();
	return (
		<>
			<ProfileHeader
				viewingUser={props.viewingUser}
				loading={false}
				setViewingUser={(user: User | null) => null}
			/>
			<Space h='md' />
			<MessageContainer>
				<IconLock size={32} color={theme.accent} />
				<Text>
					You'll have to send a friend request to see this peach's posts!
				</Text>
			</MessageContainer>
		</>
	);
};

export const PrivateProfile = (props: PrivateProfileProps) => {
	return (
		<>
			<PrivateProfileComponent viewingUser={props.viewingUser} />
		</>
	);
};
