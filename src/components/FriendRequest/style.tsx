import styled from 'styled-components';
import { rem } from 'polished';

import { ItemContainer } from '../../Theme/Layout';

export const FriendRequestContainer = styled(ItemContainer)`
	display: flex;

	button {
		margin-left: ${rem(16)};
	}
`;
