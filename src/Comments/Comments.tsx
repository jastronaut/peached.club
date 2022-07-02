import React, { useContext, useState } from 'react';
import { Comment as CommentType, MutualFriend } from '../api/interfaces';
import { PeachContext } from '../PeachContext';

import AddComment from './AddComment';
import { AllComments } from './style';
import { Comment } from './Comment/Comment';
import Modal from '../Theme/Modal';

interface SharedCommentsProps {
	deleteComment: (id: string) => void;
	comments: CommentType[];
	mutualFriends: MutualFriend[];
	requesterId: string;
}

interface CommentsProps extends SharedCommentsProps {
	updateComments: (txt: string) => void;
	onDismissComments: () => void;
	postAuthorId: string;
	postAuthorAvatarSrc: string;
}

interface CommentsComponentProps extends SharedCommentsProps {
	peachFeedIds: string[];
	getAvatar: (id: string) => string;
}

export const CommentsComponent: React.FC<CommentsComponentProps> = ({
	comments = [],
	deleteComment,
	mutualFriends,
	peachFeedIds,
	getAvatar,
	requesterId,
}) => {
	return (
		<AllComments>
			{comments.map(c => (
				<Comment
					isFriend={peachFeedIds.filter(id => id === c.author.id).length > 0}
					key={c.id}
					avatarSrc={getAvatar(c.author.id)}
					{...c}
					deleteComment={deleteComment}
					mutualFriends={mutualFriends}
					requesterId={requesterId}
				/>
			))}
		</AllComments>
	);
};

export const Comments = (props: CommentsProps) => {
	const {
		postAuthorId,
		postAuthorAvatarSrc,
		mutualFriends,
		onDismissComments,
		requesterId,
		comments,
	} = props;
	const [newCommentText, setNewCommentText] = useState('');
	const { peachFeed } = useContext(PeachContext);
	const peachFeedIds = peachFeed.map(user => user.id);

	const getAvatar = (id: string) => {
		if (id === postAuthorId) return postAuthorAvatarSrc;
		const res = mutualFriends.filter(friend => friend.id === id);
		if (res.length === 0) return '/defaultavatar.jpg';
		if (!res[0].avatarSrc) return '/defaultavatar.jpg';
		return res[0].avatarSrc;
	};

	return (
		<Modal onKeyDown={onDismissComments}>
			<CommentsComponent
				getAvatar={getAvatar}
				peachFeedIds={peachFeedIds}
				requesterId={requesterId}
				comments={comments}
				mutualFriends={mutualFriends}
				deleteComment={props.deleteComment}
			/>
			<AddComment
				onSubmit={props.updateComments}
				newCommentText={newCommentText}
				setNewCommentText={setNewCommentText}
			/>
		</Modal>
	);
};
