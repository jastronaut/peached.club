import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
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
	mode?: ButtonOptions;
}

type ButtonOptions = 'default' | 'bad' | 'success' | 'muted';

// background: ${props => (props.disabled ? '#b0b0b0' : '#e6395b')};
type BtnMappingType = {
	[K in ButtonOptions]: {
		background: (theme: DefaultTheme) => string;

		text: (theme: DefaultTheme) => string;
		hoverBackground: (theme: DefaultTheme) => string;
		hoverText: (theme: DefaultTheme) => string;
	};
};
const ButtonMapping: BtnMappingType = {
	default: {
		background: (theme: DefaultTheme) => theme.accent,
		text: (theme: DefaultTheme) => '#fff',
		hoverBackground: (theme: DefaultTheme) => 'rgba(0,0,0,0)',
		hoverText: (theme: DefaultTheme) => theme.accent,
	},
	bad: {
		background: (theme: DefaultTheme) => '#ae203c',
		text: (theme: DefaultTheme) => '#fff',
		hoverBackground: (theme: DefaultTheme) => 'rgba(0,0,0,0)',
		hoverText: (theme: DefaultTheme) => '#ae203c',
	},
	success: {
		background: (theme: DefaultTheme) => '#00a67e',
		text: (theme: DefaultTheme) => '#fff',
		hoverBackground: (theme: DefaultTheme) => 'rgba(0,0,0,0)',
		hoverText: (theme: DefaultTheme) => '#00a67e',
	},

	muted: {
		background: (theme: DefaultTheme) => theme.text.muted,
		text: (theme: DefaultTheme) => '#fff',
		hoverBackground: (theme: DefaultTheme) => 'rgba(0,0,0,0)',
		hoverText: (theme: DefaultTheme) => theme.text.muted,
	},
};

const ButtonStyle = styled.button<ButtonStyleProps>`
	background: ${props =>
		props.disabled
			? '#cacaca'
			: props.mode
			? ButtonMapping[props.mode].background(props.theme)
			: ButtonMapping.default.background(props.theme)};
	border: 1px solid
		${props => (props.disabled ? '#cacaca' : props.color || props.theme.accent)};
	padding: ${rem(10)};
	border-radius: ${rem(6)};
	text-align: center;
	color: white;

	transition: 0.25s all ease;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;

	:hover {
		background: ${props => (props.disabled ? '#cacaca' : 'rgba(0,0,0,0)')};
		border-color: ${props =>
			props.disabled
				? '#cacaca'
				: props.colorHover
				? props.colorHover
				: props.theme.accent};
		cursor: ${props => (props.disabled ? 'default' : 'pointer')};

		color: ${props =>
			props.disabled
				? '#cacaca'
				: props.mode
				? ButtonMapping[props.mode].hoverText(props.theme)
				: ButtonMapping.default.hoverText(props.theme)};
	}

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
			colorHover={props.colorHover}
		>
			{props.children}
		</ButtonStyle>
	</ButtonLink>
);

export default Button;
