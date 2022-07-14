import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { rem } from 'polished';

export const ButtonLink = styled.a<{ centered?: boolean }>`
	text-decoration: none;
	${props => (props.centered ? '' : 'align-self: start;')}
	color: white;

	:visited {
		color: white;
	}

	:hover {
		text-decoration: none;
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
	isInverted?: boolean;
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

const getButtonBgColor = (
	theme: DefaultTheme,
	mode: ButtonOptions,
	isDisabled: boolean,
	isInverted: boolean,

	isHover: boolean
) => {
	if (isInverted) {
		if (isHover) {
			return ButtonMapping[mode ?? 'default'].background(theme);
		}

		return 'transparent';
	}

	if (isHover) {
		return 'transparent';
	}

	if (isDisabled) {
		return theme.text.muted;
	}

	return ButtonMapping[mode ?? 'default'].background(theme);
};

const getButtonTextColor = (
	theme: DefaultTheme,
	mode: ButtonOptions,
	isDisabled: boolean,
	isInverted: boolean,
	isHover: boolean
) => {
	if (isInverted) {
		if (isHover) {
			return '#fff';
		}

		return ButtonMapping[mode ?? 'default'].background(theme);
	}

	if (isHover) {
		return ButtonMapping[mode ?? 'default'].background(theme);
	}

	return '#fff';
};

const ButtonStyle = styled.button<ButtonStyleProps>`
	background: ${props =>
		getButtonBgColor(
			props.theme,
			props.mode ?? 'default',
			props.disabled ?? false,
			props.isInverted ?? false,
			false
		)};
	border: 1px solid
		${props =>
			getButtonTextColor(
				props.theme,
				props.mode ?? 'default',
				props.disabled ?? false,
				props.isInverted ?? false,
				false
			)};
	padding: ${rem(5)} ${rem(10)};
	border-radius: ${rem(6)};
	text-align: center;
	color: ${props =>
		getButtonTextColor(
			props.theme,
			props.mode ?? 'default',
			props.disabled ?? false,
			props.isInverted ?? false,
			false
		)};
	margin: ${rem(5)} 0;

	transition: 0.25s all ease;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;

	:hover {
		background: ${props =>
			getButtonBgColor(
				props.theme,
				props.mode ?? 'default',
				props.disabled ?? false,
				props.isInverted ?? false,
				true
			)};
		border-color: ${props =>
			getButtonBgColor(
				props.theme,
				props.mode ?? 'default',
				props.disabled ?? false,
				props.isInverted ?? false,
				false
			)};

		cursor: ${props => (props.disabled ? 'default' : 'pointer')};

		color: ${props =>
			getButtonTextColor(
				props.theme,
				props.mode ?? 'default',
				props.disabled ?? false,
				props.isInverted ?? false,
				true
			)};
	}

	> svg {
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
		onClick={_e => (props.onClick ? props.onClick() : {})}
		centered={props.centered}
		role='button'
	>
		<ButtonStyle
			type='submit'
			color={props.color}
			lg={props.lg}
			disabled={props.disabled ?? false}
			colorHover={props.colorHover}
			mode={props.mode ?? 'default'}
			isInverted={props.isInverted}
		>
			{props.children}
		</ButtonStyle>
	</ButtonLink>
);

export default Button;
