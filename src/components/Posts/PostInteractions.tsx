import React from 'react';

import getPostTime, { formatPostTime } from '../../utils/getPostTime';

import LikeIcon from '../../Theme/Icons/LikeIcon';
import CommentIcon from '../../Theme/Icons/CommentIcon';
import ClockIcon from '../../Theme/Icons/ClockIcon';
import DeleteIcon from '../../Theme/Icons/DeleteIcon';

import {
	PostInteraction,
	InteractionInfo,
	InteractionArea,
	PostTime,
} from '../../Friend/style';

type Props = {
	isCurUsersPost: boolean;
	isLiked: boolean;
	likeCount: number;
	commentsLength: number;
	createdTime: number;
	onClickLike: Function;
	onClickComments: Function;
	onClickDelete: Function;
};

export const PostInteractions = (props: Props) => {
	return (
		<PostInteraction>
			<InteractionArea onClick={_e => props.onClickLike()}>
				<LikeIcon isLiked={props.isLiked} />{' '}
				<InteractionInfo>{props.likeCount}</InteractionInfo>
			</InteractionArea>
			<InteractionArea onClick={_e => props.onClickComments()}>
				<CommentIcon />
				<InteractionInfo>{props.commentsLength}</InteractionInfo>
			</InteractionArea>
			<PostTime>
				<ClockIcon title={formatPostTime(props.createdTime)} />
				<InteractionInfo>{getPostTime(props.createdTime)}</InteractionInfo>
			</PostTime>
			{props.isCurUsersPost && (
				<InteractionArea onClick={() => props.onClickDelete()}>
					<DeleteIcon />
				</InteractionArea>
			)}
		</PostInteraction>
	);
};
