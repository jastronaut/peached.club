import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

export const Page = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
	background-color: ${props => props.theme.background.accented};
`;

export const Heading = styled.h1`
	font-weight: 900;
	text-align: center;
	letter-spacing: -${rem(0.75)};
	color: ${props => props.theme.text.primary};
`;

export const Container = styled.div`
	border-radius: ${rem(6)};

	border: 1px solid ${props => props.theme.border.secondary};
	background: ${props => props.theme.background.primary};
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 50%;
	padding: ${rem(60)};

	@media screen and (min-width: 1280px) {
		width: 70%;
	}

	@media screen and (max-width: 900px) {
		width: 70%;
		padding: ${rem(40)};
	}
`;

export const AuthInput = styled.input`
	padding: ${rem(5)} ${rem(3)};
	display: block;
	margin: 0 0;
	font-size: ${rem(16)};
	margin-bottom: ${rem(5)};
	border-radius: ${rem(3)};
	border: ${rem(1)} solid ${props => props.theme.background.hover};
	width: 80%;
	color: ${props => props.theme.text.primary};
	background-color: ${props => props.theme.background.secondary};
	outline-style: none;
`;

export const DangerTxt = styled.p`
	color: red;
	text-align: center;
`;

const ButtonLink = styled.a`
	text-decoration: none;
	color: white;
	:visited {
		color: white;
	}
	:hover {
		color: white;
		cursor: pointer;
	}
`;

const ButtonStyle = styled.button<{ color?: string; lg?: boolean }>`
	background: ${props => props.color || props.theme.accent};
	border: 1px solid ${props => props.theme.accent};
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	text-align: center;
	color: white;
	font-size: ${props => (props.lg ? '1.1rem' : '1rem')};
	cursor: pointer;
	transition: 0.25s all ease;
	margin-top: 0.5rem;
	min-width: ${rem(50)};

	:hover {
		color: ${props => props.theme.accent};
		background-color: ${props => props.theme.background.primary};
		border-color: ${props => props.theme.accent};
	}
`;

interface ButtonProps {
	children: React.ReactNode;
	link?: string;
	onClick: () => void;
	color?: string;
	lg?: boolean;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
	<ButtonLink href={props.link || '#'} onClick={e => props.onClick()}>
		<ButtonStyle type='submit' color={props.color} lg={props.lg}>
			{props.children}
		</ButtonStyle>
	</ButtonLink>
);

export const ButtonCenter = styled.div`
	display: flex;
	justify-content: center;
`;

export const LoginFormContainer = styled.main`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
