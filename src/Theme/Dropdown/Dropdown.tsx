import React from 'react';
import styled from 'styled-components';

const Dropdown = styled.div`
	margin: 0;
	width: 100%;
	max-height: 5rem;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	border-radius: 0.25rem;

	@media screen and (max-width: 700px) {
		max-height: 50%;
	}
`;

const DropdownUserItemContainer = styled.div`
	margin: 0;
	padding: 0.5rem;
	display: flex;
	color: ${props => props.theme.text.primary};
	font-size: smaller;
	border-top: 1px solid #cacaca;
	height: 100%;

	> img {
		border-radius: 50%;
		margin-right: 1rem;
		height: 38px;
		width: 38px;
		object-fit: cover;
	}
	> div {
		margin: 0;
		padding: 0;
		flex: 5;
		> p {
			margin: 0;
		}
		> p:first-of-type {
			font-weight: bold;
		}
	}

	:hover {
		background: ${props => props.theme.background.secondary};
	}
`;

interface DropdownUserItemProps {
	username: string;
	displayName: string;
	avatarSrc: string;
	onClick: () => void;
}

const truncate = (txt: string, max: number) =>
	txt.length < max ? txt : txt.slice(0, max - 3) + '...';

export const DropdownUserItem: React.FC<DropdownUserItemProps> = ({
	username,
	displayName,
	avatarSrc,
	onClick,
}) => (
	<DropdownUserItemContainer onClick={() => onClick()}>
		<img src={avatarSrc} alt={`${username}'s avatar'`} loading='lazy' />
		<div>
			<p>{truncate(displayName, 25)}</p>
			<p>@{truncate(username, 25)}</p>
		</div>
	</DropdownUserItemContainer>
);

export default Dropdown;
