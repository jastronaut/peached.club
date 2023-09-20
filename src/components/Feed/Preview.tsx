import React from 'react';
import styled from 'styled-components';

import { DEFAULT_AVATAR_SRC } from '../../constants';
import { createPostPreview } from '../../utils';
import getPostTime from '../../utils/getPostTime';
import { PostContent } from '../../api/interfaces';

const PreviewText = styled.p`
	word-break: break-word;
`;

import {
	FeedPostWrapper,
	InfoContainer,
	PostPreview,
	DisplayName,
	Avatar,
	FavoriteIndicator,
} from './style';
import { LinkStyled } from '../../pages/Feed/style';

export interface PreviewProps {
	id: string;
	avatarSrc: string;
	name: string;
	displayName: string;
	message?: PostContent | string | null;
	children?: React.ReactNode;
	unread?: boolean;
	createdTime?: number | null;
	textPreview?: string | null;
	isFavorite?: boolean;
}

export const Preview: React.FC<PreviewProps> = props => {
	const { message = null } = props;
	const isUnread = props.unread ?? false;
	const avatar = props.avatarSrc ?? DEFAULT_AVATAR_SRC;

	return (
		<FeedPostWrapper isUnread={false}>
			<>
				<LinkStyled to={`/friend/${props.id}`}>
					{props.isFavorite ? (
						<FavoriteIndicator label='⭐️' inline size={16}>
							<Avatar src={avatar} size='lg' radius='xl' isUnread={isUnread} />
						</FavoriteIndicator>
					) : (
						<Avatar src={avatar} size='lg' radius='xl' isUnread={isUnread} />
					)}
				</LinkStyled>
				<InfoContainer>
					<DisplayName>
						<LinkStyled to={`/friend/${props.id}`}>
							{props.displayName}
						</LinkStyled>
					</DisplayName>
					{props.children}
					<PostPreview>
						<PreviewText>
							{!message
								? ' '
								: typeof message === 'string'
								? message
								: createPostPreview(message)}
						</PreviewText>
						{props.createdTime && <p>{getPostTime(props.createdTime)}</p>}
					</PostPreview>
					{props.textPreview && (
						<blockquote>
							<i>{props.textPreview}</i>
						</blockquote>
					)}
				</InfoContainer>
			</>
		</FeedPostWrapper>
	);
};
