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
		text-decoration: none;
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
		background: (theme: DefaultTheme) => '#f01e1e',
		text: (theme: DefaultTheme) => '#fff',
		hoverBackground: (theme: DefaultTheme) => 'rgba(0,0,0,0)',
		hoverText: (theme: DefaultTheme) => '#f01e1e',
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
	padding: ${rem(5)} ${rem(10)};
	border-radius: ${rem(6)};
	text-align: center;
	color: white;
	margin: ${rem(5)} 0;

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
				? 'white'
				: props.mode
				? ButtonMapping[props.mode].hoverText(props.theme)
				: ButtonMapping.default.hoverText(props.theme)};
	}

	> svg {
		/* height: 1.1rem; */
		margin-right: 0.25rem;
	}

	:hover svg {
		fill: ${props => props.theme.accent};
		stroke: ${props => props.theme.accent};
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
