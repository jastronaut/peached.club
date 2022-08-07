import styled from 'styled-components';
import { rem, lighten } from 'polished';
import { MModal } from '../../../Theme/Mantine/Modal';

export const Modal = styled(MModal)`
	.mantine-Modal-inner {
		display: flex;
		justify-content: center;
		align-items: center;
		.mantine-Modal-modal {
			width: 40%;
		}
		@media screen and (max-width: 600px) {
			.mantine-Modal-modal {
				width: 95%;
			}
		}
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
