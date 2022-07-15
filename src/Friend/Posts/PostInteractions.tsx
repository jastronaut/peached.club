import React from 'react';

import getPostTime from '../../utils/getPostTime';

import LikeIcon from '../../Theme/Icons/LikeIcon';
import CommentIcon from '../../Theme/Icons/CommentIcon';
import ClockIcon from '../../Theme/Icons/ClockIcon';
// import MoreIcon from '../../Theme/Icons/MoreIcon';
import {
	PostInteraction,
	InteractionInfo,
	InteractionArea,
	PostTime,
} from '../style';

type Props = {
	isLiked: boolean;
	likeCount: number;
	commentsLength: number;
	createdTime: number;
	onClickLike: Function;
	onClickComments: Function;
};

export const PostInteractions = (props: Props) => {
	// const [isDeletePromptShowing, setIsDeletePromptShowing] = useState(false);

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
				<ClockIcon />
				<InteractionInfo>{getPostTime(props.createdTime)}</InteractionInfo>
			</PostTime>
			<InteractionArea>
				{/* <MoreIcon onClick={() => setIsDeletePromptShowing(s => !s)} />
				{isDeletePromptShowing ? 'hello' : null} */}
			</InteractionArea>
		</PostInteraction>
	);
};
