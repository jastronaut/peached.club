import styled from 'styled-components';

export const NavWrap = styled.div<{ darkMode: boolean }>`
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: none;
	z-index: 100;
	@media screen and (max-width: 700px) {
		top: initial;
		bottom: 0;
		border-top: 1px solid #cacaca;
		background: ${props => (props.darkMode ? 'black' : 'white')};
	}
`;

export const FeedsNav = styled.div<{ darkMode: boolean; right?: boolean }>`
	background: ${props => (props.darkMode ? 'black' : 'white')};
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
		// margin: 0.5rem 1rem;
		// padding: 0 2rem;
		width: 100%;
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

export const FeedControls = styled.div``;
