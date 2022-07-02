import styled from 'styled-components';
import { TextArea as OldInput } from '../Theme/Form';

export const NewPostButton = styled.div`
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	background: #ffa79b;
	padding: 1.5rem;
	border-radius: 50%;
	width: 1rem;
	height: 1rem;
	text-align: center;
	box-shadow: 5px 5px 5px #00000050;
	transition: all cubic-bezier(0.23, 1, 0.32, 1) 0.1s;

	> img {
		width: 1rem;
		height: 1rem;
	}

	:hover {
		cursor: pointer;
		transform: scale(0.9);
	}

	@media screen and (max-width: 700px) {
		bottom: 3.5rem;
	}
`;

export const TextArea = styled(OldInput)`
	margin-right: 0;
	padding: 0.5rem;
	background: ${props => props.theme.background.secondary};
	color: ${props => props.theme.text.primary};
	font-size: 1rem;
	margin-bottom: 1rem;
`;

export const Header = styled.h2`
	margin-bottom: 1rem;
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
	margin: 0 0 1rem;
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
	margin-right: 1rem;
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
	margin-bottom: 1rem;
	margin-right: 1rem;
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
	margin-bottom: 1rem;

	svg {
		stroke: ${props => props.theme.accent};
	}
`;
