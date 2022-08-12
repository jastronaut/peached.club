import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { rem } from 'polished';

import Button from '../../Theme/Button';
import { ModalContainer } from '../../Theme/Modal';
import { MTextArea } from '../../Theme/Mantine';

export const DisableBodyScroll = createGlobalStyle`
	body {
		overflow: hidden;
	}
`;

export const DeletePromptWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 400 !important;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const DeletePromptContainer = styled(ModalContainer)`
	box-shadow: 2px 2px 5px 2px ${props => props.theme.background.secondary};
	width: ${rem(200)};
	height: auto;
	text-align: center;
	color: ${props => props.theme.text.primary};
	position: fixed;
	z-index: 400 !important;

	@media screen and (max-width: 800px) {
		width: 50%;
	}

	@media screen and (max-width: 600px) {
		width: 80%;
	}
`;

const DeleteOptions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-top: 1rem;
`;

export const AllComments = styled.div`
	overflow: scroll;
	margin-top: 1.5rem;
	max-height: ${rem(500)};
`;

interface DeletePromptProps {
	onDelete: () => void;
	onCancel: () => void;
	children: React.ReactNode;
	isShowing?: boolean;
}

export const DeletePrompt = (props: DeletePromptProps) => {
	if (!props.isShowing) {
		return null;
	}

	return (
		<DeletePromptWrapper>
			<DisableBodyScroll />
			<DeletePromptContainer alignTop={false} isMini={true}>
				{props.children}
				<DeleteOptions>
					<Button onClick={() => props.onDelete()}>Delete</Button>
					<Button onClick={() => props.onCancel()}>Cancel</Button>
				</DeleteOptions>
			</DeletePromptContainer>
		</DeletePromptWrapper>
	);
};

export const AddCommentContainer = styled.div`
	padding-bottom: 0;
	width: 100%;
	background: ${props => props.theme.background.primary};
	flex: 0 1 auto;
`;

export const Input = styled.textarea`
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
	flex: 9;
	resize: none;
	border-radius: 0.5rem;
	border: 1px solid ${props => props.theme.border.primary};
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: 1rem;
	min-height: 2.5rem;
	height: 2rem;
	margin-bottom: 0.25rem;

	width: 100%;
	padding: 0.25rem;
	@media screen and (max-height: 700px) {
		@media screen and (max-width: 700px) {
			height: 3rem;
		}
	}
`;

export const TextArea = styled(MTextArea)`
	margin-top: ${rem(16)};
`;

/*
 * aligned with ../Theme/Modal
 */
export const ButtonWrapper = styled.span`
	margin: 0;
	z-index: 9999;
`;

/*
 * also aligned with ../Theme/Modal
 */
export const DismissCommentsButtonContainer = styled.div`
	cursor: pointer;
	margin: 0;
	max-height: 2rem;
	position: absolute;
	width: 50%;
	display: flex;
	justify-content: flex-end;
	z-index: 999;
`;
