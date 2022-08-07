import React, { useContext, useState } from 'react';
import { Comment as CommentType, MutualFriend } from '../../api/interfaces';
import { PeachContext } from '../../PeachContext';

import AddComment from './AddComment';
import { AllComments, DeletePrompt } from './style';
import { Comment } from './Comment/Comment';
// import Modal from '../../Theme/Modal';
import { MModal as Modal, DisableBodyScroll } from '../../Theme/Mantine/Modal';

interface SharedCommentsProps {
	deleteComment: (id: string) => void;
	comments: CommentType[];
	mutualFriends: MutualFriend[];
	requesterId: string;

	setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
	newCommentText: string;
}

interface CommentsProps extends SharedCommentsProps {
	updateComments: (txt: string) => void;
	onDismissComments: () => void;
	postAuthorId: string;
	postAuthorAvatarSrc: string;
	isShowing: boolean;
}

export interface CommentsComponentProps extends SharedCommentsProps {
	peachFeedIds: string[];
	getAvatar: (id: string) => string;
	addReplyHandle: (username: string) => void;
}

export const CommentsComponent = (props: CommentsComponentProps) => {
	return (
		<AllComments>
			{props.comments.map(c => (
				<Comment
					isFriend={
						props.peachFeedIds.filter(id => id === c.author.id).length > 0
					}
					key={c.id}
					avatarSrc={props.getAvatar(c.author.id)}
					{...c}
					deleteComment={props.deleteComment}
					mutualFriends={props.mutualFriends}
					requesterId={props.requesterId}
					addReplyHandle={props.addReplyHandle}
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
		setNewCommentText,
		newCommentText,
		isShowing,
	} = props;
	const { peachFeed } = useContext(PeachContext);
	const [isDismissWarningShowing, setIsDismissWarningShowing] = useState(false);
	const peachFeedIds = peachFeed.map(user => user.id);

	const getAvatar = (id: string) => {
		// commenter is author
		if (id === postAuthorId) {
			return postAuthorAvatarSrc;
		}
		//
		const res = mutualFriends.filter(friend => friend.id === id);
		if (res.length === 0 || !res[0].avatarSrc) {
			return '/defaultavatar.jpg';
		}

		return res[0].avatarSrc;
	};

	const addReplyHandle = (username: string) => {
		setNewCommentText((txt: string) => {
			if (txt.length) {
				return `${txt} @${username} `;
			}
			return '@' + username + ' ';
		});
	};

	const dismissComments = () => {
		setNewCommentText('');
		onDismissComments();
	};

	const onTryDismissComments = (newCommentText: string) => {
		if (newCommentText.length > 2) {
			setIsDismissWarningShowing(true);
		} else {
			dismissComments();
		}
	};

	return (
		<Modal
			opened={isShowing}
			onClose={() => onTryDismissComments(newCommentText)}
			title='Comments'
		>
			<DisableBodyScroll />
			<DeletePrompt
				isShowing={isDismissWarningShowing}
				onDelete={dismissComments}
				onCancel={() => setIsDismissWarningShowing(false)}
			>
				Are you sure you want to abandon this comment?
			</DeletePrompt>
			<CommentsComponent
				getAvatar={getAvatar}
				peachFeedIds={peachFeedIds}
				requesterId={requesterId}
				comments={comments}
				mutualFriends={mutualFriends}
				deleteComment={props.deleteComment}
				addReplyHandle={addReplyHandle}
				newCommentText={newCommentText}
				setNewCommentText={setNewCommentText}
			/>
			<AddComment
				onSubmit={props.updateComments}
				newCommentText={newCommentText}
				setNewCommentText={setNewCommentText}
			/>
		</Modal>
	);
};
