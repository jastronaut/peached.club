import styled from 'styled-components';
import { rem, parseToRgb, rgba } from 'polished';

const getRgba = (color: string, opacity: number) => {
	const rgb = parseToRgb(color);
	return `${rgba(rgb.red, rgb.green, rgb.blue, opacity)}`;
};

export const NavWrap = styled.div`
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	/* background: none; */
	z-index: 100;
	/* background-color: ${props => props.theme.background.accented}; */
	background-color: ${props => getRgba(props.theme.background.accented, 0.2)};

	/* opacity: 0.6; */
	backdrop-filter: blur(50px);
	-webkit-backdrop-filter: blur(50px);
	-o-backdrop-filter: blur(50px);
	-moz-backdrop-filter: blur(50px);
	/* box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1); */

	@media screen and (max-width: 700px) {
		top: initial;
		bottom: 0;
	}
`;

export const FeedsNav = styled.div<{ right?: boolean }>`
	position: fixed;
	top: 0.5rem;
	${props => (props.right ? 'right: 1rem;' : 'left: 1rem;')};
	z-index: 100;
	padding: 0.25rem 0.5rem;
	border-radius: 1rem;
	box-shadow: 3px 3px 5px #00000050;
	transition: all ease 0.25s;

	:hover {
		cursor: pointer;
		transform: translateY(0.25rem);
		background: #cacaca;
	}

	@media screen and (min-width: 701px) {
		top: 4rem;
	}
`;

export const Nav = styled.nav`
	margin: 0.5rem;
	padding: 0;
	display: flex;
	justify-content: end;

	@media screen and (max-width: 700px) {
		justify-content: space-between;
		width: 100%;
		padding: ${rem(2)} 0;
	}
`;

export const Link = styled.span`
	transition: all ease-in 0.1s;
	text-align: center;

	@media screen and (max-width: 700px) {
		width: 25%;
	}

	@media screen and (min-width: 701px) {
		margin-right: 1rem;
	}

	> a {
		text-decoration: none;
		color: #fe4f72;
		@media screen and (max-width: 700px) {
			width: 100%;
			display: inline-block;
		}
	}

	> a:visited {
		color: #fe4f72;
	}

	:hover {
		cursor: pointer;
		transform: scale(0.9);
	}
`;

export const AppLinks = styled.div`
	display: flex;
	align-content: center;
`;

export const IconImage = styled.img`
	border-radius: 50%;
	:hover {
		background: #cacaca50;
	}
`;

export const PageIconWrapper = styled.div<{ isActive: boolean }>`
	svg {
		stroke: ${props =>
			props.isActive ? props.theme.text.primary : props.theme.text.muted};
	}
`;

export const FeedControls = styled.div``;
