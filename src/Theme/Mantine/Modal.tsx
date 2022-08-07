import styled, { createGlobalStyle } from 'styled-components';
import { Modal } from '@mantine/core';

export const DisableBodyScroll = createGlobalStyle`
	body {
		overflow: hidden !important;
	}
`;

export const MModal = styled(Modal)`
	.mantine-Modal-title {
		color: ${props => props.theme.text.muted};
	}

	.mantine-Modal-header {
		margin-bottom: 0 !important;
	}

	.mantine-Modal-inner {
		align-items: center;
		/* max-height: 50%; */
	}

	/* .mantine-Paper-root .mantine-Modal-modal {
		max-height: 50% !important;
	} */

	.mantine-Modal-modal {
		background-color: ${props => props.theme.background.primary};
	}
	.mantine-ActionIcon-hover:hover {
		background-color: ${props => props.theme.background.secondary};
	}

	.mantine-ActionIcon-hover:focus {
		outline: none;
	}

	.mantine-ActionIcon-hover:hover svg {
		stroke: ${props => props.theme.accent};
	}
`;
