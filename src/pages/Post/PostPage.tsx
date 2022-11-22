import React, { useState } from 'react';

import { Post as PostType } from '../../api/interfaces';
import { DEFAULT_AVATAR_SRC } from '../../constants';
import { ProfilePost } from '../Profile/ProfilePost';
import { CommentsComponent } from '../../components/Comments/Comments';

export const PostPage = (props: PostType) => {
	const deletePost = (id: string) => console.log(id);
	const deleteComment = (id: string) => console.log(id);
	const getAvatar = (id: string) => '';
	const [commentText, setNewCommentText] = useState('');

	return (
		<div>
			<ProfilePost
				deletePost={deletePost}
				otherFriends={[]}
				postAuthorAvatarSrc={DEFAULT_AVATAR_SRC}
				author={'futuresounds'}
				{...props}
			/>
			{props.comments && (
				<CommentsComponent
					peachFeedIds={[]}
					getAvatar={getAvatar}
					requesterId={'5'}
					comments={props.comments}
					mutualFriends={[]}
					deleteComment={deleteComment}
					postAuthorId={'5'}
					setNewCommentText={setNewCommentText}
					newCommentText={commentText}
					addReplyHandle={deletePost}
				/>
			)}
		</div>
	);
};
