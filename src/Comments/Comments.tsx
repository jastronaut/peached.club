import React, { useContext } from 'react';
import {
	Comment as CommentType,
	MutualFriend,
	CurUser,
} from '../api/interfaces';
import { PeachContext } from '../PeachContext';

import AddComment from './AddComment';
import { Comment, AllComments } from './style';
import Modal from '../Theme/Modal';

interface CommentsProps {
	comments?: CommentType[];
	onDismissComments: () => void;
	deleteComment: (id: string) => void;
	updateComments: (txt: string) => void;
	requester: CurUser;
	mutualFriends: MutualFriend[];
	postAuthorId: string;
	postAuthorAvatarSrc: string;
}

const Comments: React.FC<CommentsProps> = ({
	comments = [],
	onDismissComments,
	updateComments,
	requester,
	deleteComment,
	mutualFriends,
	postAuthorAvatarSrc,
	postAuthorId,
}) => {
	const { darkMode, peachFeed } = useContext(PeachContext);

	const getAvatar = (id: string) => {
		if (id === postAuthorId) return postAuthorAvatarSrc;
		const res = mutualFriends.filter(friend => friend.id === id);
		if (res.length === 0) return '/defaultavatar.jpg';
		if (!res[0].avatarSrc) return '/defaultavatar.jpg';
		return res[0].avatarSrc;
	};

	return (
		<Modal darkMode={darkMode} onKeyDown={onDismissComments}>
			<AllComments>
				{comments.map(c => (
					<Comment
						isFriend={
							peachFeed.filter(user => user.id === c.author.id)
								.length > 0
						}
						darkMode={darkMode}
						isRequester={
							requester !== null && c.author.id === requester.id
						}
						key={c.id}
						avatarSrc={getAvatar(c.author.id)}
						{...c}
						deleteComment={deleteComment}
						mutualFriends={mutualFriends}
					/>
				))}
			</AllComments>
			<AddComment darkMode={darkMode} onSubmit={updateComments} />
		</Modal>
	);
};

export default Comments;
