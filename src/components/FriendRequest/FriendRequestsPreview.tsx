import React from 'react';
import styled from 'styled-components';
import { IconChevronRight } from '@tabler/icons';

import { ItemContainer } from '../../Theme/Layout';
import { Text } from '../../Theme/Type';

export type FriendRequestsPreviewProps = {
	numRequests: number;
};

const PreviewContainer = styled(ItemContainer)`
	justify-content: space-between;
	align-items: center;
`;

export const FriendRequestsPreview = (props: FriendRequestsPreviewProps) => {
	return (
		<PreviewContainer isHoverable flex>
			<Text>
				You have {props.numRequests} friend request
				{props.numRequests > 1 ? 's' : ''} to review! Aren't you popular? 😉
			</Text>
			<IconChevronRight size={32} />
		</PreviewContainer>
	);
};
