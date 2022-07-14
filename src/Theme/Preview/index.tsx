import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { Container } from '../Layout';

export const InfoContainer = styled.div`
	height: 100%;
	min-width: 40%;
	margin-left: 1.5rem;
	word-wrap: break-word;
	> h3 {
		margin: 0;
		width: 100%;
	}

	> div {
		margin: 0;
		width: 100%;
		display: flex;
	}

	p {
		margin: 0;
	}

	@media screen and (max-width: 500px) {
		margin-left: 0.5rem;
		display: block;
	}
`;

export const PicFrame = styled.div`
	> span,
	> img {
		margin-right: ${rem(8)};
	}

	> span {
		border-radius: 50%;
		width: 100%;
		width: 75px;
		height: 75px;
		font-size: 60px;

		@media screen and (max-width: 500px) {
			width: 50px;
			height: 50px;
			font-size: 40px;
		}
	}
`;

export const ProfilePic = styled.img`
	border-radius: 50%;
	width: 100%;
	width: 75px;
	height: 75px;
	object-fit: cover;

	@media screen and (max-width: 500px) {
		width: 50px;
		height: 50px;
	}
`;

export const DisplayName = styled.h3`
	> a {
		color: unset;
		text-decoration: none;

		:visited {
			color: unset;
			text-decoration: none;
		}
		:hover {
			color: unset;
			text-decoration: none;
		}
	}
`;

type Props = {
	avatarSrc: string;
	name: string;
	displayName: string;
	children: React.ReactNode;
};

export const PreviewContent = (props: Props) => {
	return (
		<>
			<PicFrame>
				{props.avatarSrc ? (
					<ProfilePic src={props.avatarSrc} alt={props.name} />
				) : (
					<span role='img' aria-label={props.name}>
						🍑
					</span>
				)}
			</PicFrame>
			<InfoContainer>
				<DisplayName>{props.displayName}</DisplayName>
				{props.children}
			</InfoContainer>
		</>
	);
};

export const Preview = (props: Props) => {
	return (
		<Container>
			<PreviewContent {...props} />
		</Container>
	);
};
