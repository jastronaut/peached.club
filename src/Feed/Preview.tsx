import React from 'react';
import { FeedPostWrapper, ProfilePic, InfoContainer } from './style';

import { PicFrame, PreviewContent } from '../Theme/Preview';

import { PostContent } from '../api/interfaces';

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
			<PreviewContent
				avatarSrc={props.avatarSrc}
				name={props.name}
				displayName={props.displayName}
			>
				{props.children}
			</PreviewContent>
		</FeedPostWrapper>
	);
};

export default Preview;
