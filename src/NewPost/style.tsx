import styled from 'styled-components';
import { rem } from 'polished';

import { TextArea as OldInput } from '../Theme/Form';

export const NewPostButtonContainer = styled.div`
	position: fixed;
	bottom: ${rem(16)};
	right: ${rem(16)};
	background: #ffa79b;
	padding: ${rem(12)};
	border-radius: 50%;
	width: ${rem(30)};
	height: ${rem(30)};
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
	}
`;

export const TextArea = styled(OldInput)`
	margin-right: 0;
	padding: 0.5rem;
	background: ${props => props.theme.background.secondary};
	color: ${props => props.theme.text.primary};
	font-size: ${rem(16)};
	margin-bottom: ${rem(16)};
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

export const DeleteImage = styled.img`
	visibility: hidden;

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
		visibility: visible;
		cursor: pointer;
	}

	position: relative;
`;

export const ImageUploadButton = styled.div`
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
`;

export const MagicPostActionsContainer = styled.div`
	overflow: hidden;
	margin-bottom: ${rem(16)};

	svg {
		stroke: ${props => props.theme.accent};
	}
`;
