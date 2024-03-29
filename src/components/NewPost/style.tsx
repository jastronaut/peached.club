import styled from 'styled-components';
import { rem, lighten } from 'polished';
import { Group } from '@mantine/core';

export const MagicPostActionsGroup = styled(Group)`
	margin: ${rem(10)};
	margin-left: 0;

	svg {
		stroke: ${props => props.theme.accent};
	}

	svg:hover {
		transform: scale(0.9);
	}

	.mantine-Group-child {
		margin-right: ${rem(5)};
		margin-bottom: ${rem(5)};
	}
`;

export const NewPostButtonContainer = styled.div`
	position: fixed;
	bottom: ${rem(16)};
	right: ${rem(16)};
	background: #ffa79b;
	border-radius: 50%;
	width: ${rem(48)};
	height: ${rem(48)};
	text-align: center;
	box-shadow: ${rem(5)} ${rem(5)} ${rem(5)} #00000050;
	transition: all cubic-bezier(0.23, 1, 0.32, 1) 0.1s;
	border: ${rem(2)} solid #ffa79b;

	display: flex;
	justify-content: center;
	align-items: center;

	:hover {
		cursor: pointer;
		border-color: white;
	}

	@media screen and (max-width: 700px) {
		bottom: ${rem(64)};
		right: ${rem(16)};
	}
`;

export const Header = styled.h2`
	margin-bottom: ${rem(16)};
	margin-top: 0;
	color: ${props => props.theme.text.primary};
`;

export const HiddenInput = styled.input`
	opacity: 0;
	width: 0.1px;
	height: 0.1px;
	position: absolute;
	overflow: hidden;
`;

export const ActionButton = styled.div`
	position: relative;
	overflow: hidden;
	align-self: start;
	cursor: pointer;
	margin: 0 ${rem(8)} ${rem(16)};
	display: flex;
	justify-content: center;
	align-items: center;

	> input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		display: block;
		font-size: 1.5rem;
		min-width: 100%;
		min-height: 100%;
	}

	:hover svg {
		stroke: ${props => lighten(props.theme.accent).toString()};
	}
`;

export const MagicPostActionsContainer = styled.div`
	overflow: hidden;
	margin-bottom: ${rem(16)};

	svg {
		stroke: ${props => props.theme.accent};
	}
`;

export const PictureInputStyled = styled.input`
	max-width: ${rem(24)};
	cursor: pointer;
`;
