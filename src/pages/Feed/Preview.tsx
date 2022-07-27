import React from 'react';
import { createPostPreview } from '../../utils';
import getPostTime from '../../utils/getPostTime';
import {
	FeedPostWrapper,
	ProfilePic,
	PicFrame,
	InfoContainer,
	PostPreview,
	DisplayName,
} from './style';

import { PostContent } from '../../api/interfaces';

interface PreviewProps {
	id: string;
	avatarSrc: string;
	name: string;
	displayName: string;
	message: PostContent | string;
	children?: React.ReactNode;
	unread?: boolean;
	createdTime: number | null;
}

const Preview: React.FC<PreviewProps> = props => {
	return (
		<FeedPostWrapper isUnread={false}>
			<PicFrame>
				{props.avatarSrc ? (
					<ProfilePic
						unread={props.unread}
						src={props.avatarSrc}
						alt={props.name}
					/>
				) : (
					<span role='img' aria-label={props.name}>
						🍑
					</span>
				)}
			</PicFrame>
			<InfoContainer>
				<DisplayName>{props.displayName}</DisplayName>
				{props.children}
				<PostPreview>
					<p>
						{typeof props.message === 'string'
							? props.message
							: createPostPreview(props.message)}
					</p>

					{props.createdTime && <p>{getPostTime(props.createdTime)}</p>}
				</PostPreview>
			</InfoContainer>
		</FeedPostWrapper>
	);
};

export default Preview;
