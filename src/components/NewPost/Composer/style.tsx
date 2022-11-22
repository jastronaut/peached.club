import styled from 'styled-components';
import { rem, lighten } from 'polished';
import { MModal } from '../../../Theme/Mantine/Modal';
import TextareaAutosize from 'react-textarea-autosize';

export const Modal = styled(MModal)`
	.mantine-Modal-inner {
		/* display: flex; */
		/* justify-content: center; */
		/* align-items: center; */
	}

	.mantine-Paper-root {
		/* .mantine-Modal-modal { */
		min-height: 90%;
	}
`;

export const Header = styled.h2`
	margin-bottom: ${rem(16)};
	margin-top: 0;
	color: ${props => props.theme.text.primary};
`;

export const ImagesHolder = styled.div`
	display: flex;
	width: 100%;
	justify-content: start;
	height: 5rem;
	width: auto;
	margin: 0 0 ${rem(16)};
	overflow: hidden;
	flex-wrap: wrap;
`;

export const DeleteImage = styled.div`
	opacity: 0.7;

	float: right;
	top: 0;
	right: 0;
	position: absolute;
	z-index: 1111;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 80%;
`;

export const UploadedImage = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
	transition: 0.2s all ease-in;

	top: 0;
	position: absolute;

	:hover {
		transform: scale(1.2);
		transition: 0.2s all ease-in;
	}

	:last-of-type {
		margin-right: 0;
	}
`;

export const ImageWrapper = styled.div`
	flex-basis: 20%;
	margin-right: ${rem(16)};
	margin-top: 0.25rem;
	overflow: hidden;
	border-radius: 0.25rem;
	cursor: pointer;

	:hover > ${DeleteImage} {
		opacity: 1;
		cursor: pointer;
	}

	position: relative;
`;

export const ActionButton = styled.div`
	position: relative;
	overflow: hidden;
	align-self: start;
	cursor: pointer;
	margin-bottom: ${rem(16)};
	margin-right: ${rem(16)};
	display: inline;

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

export const GrowWrap = styled.div`
	/* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
	display: grid;
	::after {
		/* Note the weird space! Needed to preventy jumpy behavior */
		content: attr(data-replicated-value) ' ';

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}
	textarea {
		/* You could leave this, but after a user resizes, then it ruins the auto sizing */
		resize: none;

		/* Firefox shows scrollbar on growth, you can hide like this. */
		overflow: hidden;
	}
	textarea,
	::after {
		/* Identical styling required!! */
		border: 1px solid black;
		padding: 0.5rem;
		font: inherit;

		/* Place on top of each other */
		grid-area: 1 / 1 / 2 / 2;
	}
`;

export const TextareaAutosizeStyled = styled(TextareaAutosize)`
	resize: none;
	background-color: ${props => props.theme.background.primary};
	border: ${rem(8)} solid ${props => props.theme.background.primary};
	:focus-visible {
		outline: none;
	}
`;
