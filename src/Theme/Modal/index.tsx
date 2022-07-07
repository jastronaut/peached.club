import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { rem } from 'polished';

type ModalBackdropProps = {
	entering: boolean;
	isMini?: boolean;
};

export const ModalBackdrop = styled.div<ModalBackdropProps>`
	top: 0;
	left: 0;
	width: 100vw;
	position: fixed;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	height: 100%;
	padding: 0;
	margin: 0;

	overflow: hidden;

	animation: 0.5s ${props => (props.entering ? '' : 'reverse')} EnterBackdrop;
	background: rgba(0, 0, 0, 0.4);
	z-index: ${props => (props.isMini ? '999' : '99')};
`;

const DisableBodyScroll = createGlobalStyle`
	body {
		overflow: hidden;
	}

	@keyframes EnterBackdrop {
		from {
			background: rgba(0, 0, 0, 0);
		}

		to {
			background: rgba(0, 0, 0, 0.3);
		}
	}

`;

type ModalContainerProps = {
	isMini: boolean;
	alignTop: boolean;
	noSpaceBetween?: boolean;
};

export const ModalContainer = styled.div<ModalContainerProps>`
	background: ${props => props.theme.background.primary};
	margin: 0;
	padding: ${rem(20)} ${rem(30)};
	width: ${props => (props.isMini ? '30%' : '50%')};
	height: ${props => (props.isMini ? '40%' : '60%')};
	max-height: 80%;
	overflow: scroll;
	border-radius: ${rem(6)};

	@media screen and (max-width: 800px) {
		width: ${props => (props.isMini ? '50%' : '70%')};
	}

	@media screen and (max-height: 700px) {
		height: ${props => (props.isMini ? '60%' : '80%')};
		max-height: calc(100% - 2rem);
	}

	display: flex;
	flex-direction: column;
	${props => (props.noSpaceBetween ? '' : 'justify-content: space-between;')}
`;

interface ModalProps {
	children: React.ReactNode;
	onKeyDown: () => void;
	isMini?: boolean;
	alignTop?: boolean;
	noSpaceBetween?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	children,
	onKeyDown,
	isMini = false,
	alignTop = false,
	noSpaceBetween = false,
}) => {
	const [entering, setEntering] = useState<boolean>(true);
	const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		onKeyDown();
	};

	useEffect(() => {
		return () => {
			setEntering(false);
		};
	}, []);

	return (
		<>
			<DisableBodyScroll />
			<ModalBackdrop
				isMini={isMini}
				tabIndex={0}
				onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
					if (e.key === 'Escape') {
						onKeyDown();
					}
				}}
				onClick={e => keepModalOpen(e)}
				entering={entering}
			>
				<ModalContainer
					noSpaceBetween={noSpaceBetween}
					alignTop={alignTop}
					isMini={isMini}
					onClick={e => e.stopPropagation()}
				>
					{children}
				</ModalContainer>
			</ModalBackdrop>
		</>
	);
};

export default Modal;
