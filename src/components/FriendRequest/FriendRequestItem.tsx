import React from 'react';
import { ActionIcon, Flex, Avatar, Center, Space } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';

import {
	DisplayName,
	FeedPostWrapper as Wrapper,
	InfoContainer,
} from '../../pages/Feed/style';
import { ItemContainer } from '../../Theme/Layout';
import { Header3, Text } from '../../Theme/Type';
import { FriendRequestContainer } from './style';

export type FriendRequestItemProps = {
	avatarSrc: string;
	displayName: string;
	name: string;
	bio: string;
	onClickAccept?: (name: string) => void | null;
	onClickDecline: (name: string) => void;
};

export const FriendRequestItem = (props: FriendRequestItemProps) => {
	const { onClickAccept = null } = props;
	return (
		<FriendRequestContainer>
			<Avatar src={props.avatarSrc} radius='xl' />
			<InfoContainer>
				<Header3>{props.displayName}</Header3>
				<Text muted>@{props.name}</Text>
				<Text>{props.bio}</Text>
			</InfoContainer>
			<Flex>
				{onClickAccept && (
					<ActionIcon
						variant='filled'
						color='green'
						onClick={() => onClickAccept(props.name)}
					>
						<IconCheck size={16} />
					</ActionIcon>
				)}
				<ActionIcon
					variant='filled'
					color='red'
					onClick={() => props.onClickDecline(props.name)}
				>
					<IconX size={16} />
				</ActionIcon>
			</Flex>
		</FriendRequestContainer>
	);
};
