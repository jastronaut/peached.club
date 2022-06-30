import React from 'react';
import styled from 'styled-components';
import { LinkMessage } from '../../api/interfaces';

import LinkIcon from './LinkIcon'
import { Image } from '../style';

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
	padding-top: 0.5rem;
	padding-left: 1rem;
	padding-bottom: 0.5rem;
	margin-left: 0.25rem;
	border-left: 0.25rem solid #cacaca;

	> img {
		margin-top: 0.5rem;
	}
`;

type Props = {
	darkMode: boolean;
} & LinkMessage;

const LinkPost = (props: Props) => {
	return (
		<div>
			<LinkText href={props.url}>
				<LinkIcon />{' '}
				{props.title}
				<LinkInfo>
					<i>{props.description}</i>
					{props.imageURL ? (
						<Image
							src={props.imageURL}
							alt={`Link preview thumbnail`}
						/>
					) : null}
				</LinkInfo>
			</LinkText>
		</div>
	);
};

export default LinkPost;
