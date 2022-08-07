import styled, { createGlobalStyle } from 'styled-components';
import { Textarea, Container, Avatar, Popover } from '@mantine/core';

export const MTextArea = styled(Textarea)`
	.mantine-Textarea-input {
		background: ${props => props.theme.background.secondary};
		color: ${props => props.theme.text.primary};
		border-color: ${props => props.theme.border.secondary};
	}

	.mantine-Textarea-input:active,
	.mantine-Textarea-input:focus-within,
	.mantine-Textarea-defaultVariant:active {
		border-color: ${props => props.theme.border.primary};
	}
`;

export const MContainer = styled(Container)`
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
`;

export const MAvatar = styled(Avatar)`
	.mantine-Avatar-placeholder {
		border-radius: 50%;
	}
`;

export const MPopover = styled(Popover)`
	background: ${props => props.theme.background.secondary};
	color: ${props => props.theme.text.primary};
	border-color: ${props => props.theme.border.secondary};
`;
