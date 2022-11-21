import styled from 'styled-components';
import { rem } from 'polished';
import React from 'react';
import Navigation from '../Navigation';

export const PageContainer = styled.main`
	background-color: ${props => props.theme.background.accented};
	margin: 5rem 15rem;

	@media screen and (max-width: 1080px) {
		margin: 5rem 10rem;
	}

	@media screen and (max-width: 900px) {
		margin: ${rem(48)} ${rem(32)};
	}

	@media screen and (max-width: 830px) {
		margin: 0 0 ${rem(64)};
	}
`;

export const Page = (props: { children: React.ReactNode }) => {
	return (
		<>
			<Navigation />
			<PageContainer>{props.children}</PageContainer>
		</>
	);
};

export const Container = styled.div`
	display: flex;
	border: 1px solid ${props => props.theme.background.primary};
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
	padding: 2rem 2.5rem;

	margin: 1rem;
	border-radius: 0.5rem;

	@media screen and (max-width: 700px) {
		padding: ${rem(8)} ${rem(16)};
		margin: 0.5rem;
		border-radius: 0.25rem;
	}
`;

type ItemContainerProps = {
	isHoverable?: boolean;
	flex?: boolean;
};

export const ItemContainer = styled.div<ItemContainerProps>`
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
	${props => (props.flex ? 'display: flex;' : '')}

	padding: ${rem(16)} ${rem(20)};
	height: 100%;
	transition: 0.25s all ease-in;
	word-wrap: break-word;
	margin: ${rem(16)};
	border-radius: ${rem(8)};

	:hover {
		cursor: ${props => (props.isHoverable ? 'pointer' : 'initial')};
		background-color: ${props => props.theme.background.hover};
		border-color: ${props => props.theme.background.hover};
	}

	@media screen and (max-width: 700px) {
		padding: ${rem(8)} ${rem(16)};
		margin: ${rem(8)};
	}
`;
