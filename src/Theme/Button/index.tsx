import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

const ButtonLink = styled.a<{ centered?: boolean }>`
	text-decoration: none;
	${props => (props.centered ? '' : 'align-self: start;')}
	color: white;
	:visited {
		color: white;
	}
	:hover {
		color: white;
	}
`;

interface ButtonStyleProps {
	color?: string;
	lg?: boolean;
	disabled?: boolean;
	isSmall?: boolean;
	colorHover?: string;
}
// background: ${props => (props.disabled ? '#b0b0b0' : '#e6395b')};

const ButtonStyle = styled.button<ButtonStyleProps>`
	background: ${props =>
		props.disabled ? '#cacaca' : props.color || '#fe4f72'};
	border: 1px solid
		${props => (props.disabled ? '#cacaca' : props.color || '#fe4f72')};
	padding: ${rem(10)};
	border-radius: ${rem(6)};
	text-align: center;
	color: white;
	:hover {
		background: ${props =>
			props.disabled
				? '#cacaca'
				: props.colorHover
				? props.colorHover
				: '#ffa79b'};
		border-color: ${props =>
			props.disabled
				? '#cacaca'
				: props.colorHover
				? props.colorHover
				: '#ffa79b'};
		cursor: ${props => (props.disabled ? 'default' : 'pointer')};
	}
	transition: 0.25s all ease;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;

	> img {
		height: 1.1rem;
		margin-right: 0.25rem;
	}
`;

interface ButtonProps extends ButtonStyleProps {
	children: React.ReactNode;
	link?: string;
	onClick?: () => void;
	centered?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
	<ButtonLink
		href={props.link || '#'}
		onClick={e => (props.onClick ? props.onClick() : {})}
		centered={props.centered}
	>
		<ButtonStyle
			type='submit'
			color={props.color}
			lg={props.lg}
			disabled={props.disabled}
			isSmall={props.isSmall}
			colorHover={props.colorHover}
		>
			{props.children}
		</ButtonStyle>
	</ButtonLink>
);

export default Button;
