import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { LinkMessage } from '../../api/interfaces';

import LinkIcon from '../../Theme/Icons/LinkIcon';

export const Image = styled.img`
	max-width: 50%;
	display: block;
	margin-bottom: ${rem(16)};
	background-color: ${props => props.theme.background.primary};

	@media screen and (max-width: ${rem(1000)}) {
		max-width: 100%;
	}
`;

export const LinkText = styled.a`
	text-decoration: none;
	color: #fe4f72;

	:visited {
		text-decoration: none;
		color: #fe4f72;
	}

	> a:first-child {
		height: 1rem;
	}
`;

const LinkInfo = styled.div`
	margin: 0 0;
	padding: 0 0;
	padding-top: ${rem(8)};
	padding-left: ${rem(16)};
	padding-bottom: ${rem(8)};
	margin-left: ${rem(4)};
	border-left: ${rem(4)} solid #cacaca;

	> img {
		margin-top: ${rem(8)};
	}
`;

type Props = {
	darkMode: boolean;
} & LinkMessage;

const LinkPost = (props: Props) => {
	return (
		<div>
			<LinkText href={props.url}>
				<LinkIcon /> {props.title}
				<LinkInfo>
					<i>{props.description}</i>
					{props.imageURL ? (
						<Image src={props.imageURL} alt={`Link preview thumbnail`} />
					) : null}
				</LinkInfo>
			</LinkText>
		</div>
	);
};

export default LinkPost;
