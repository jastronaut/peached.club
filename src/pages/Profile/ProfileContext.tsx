import React from 'react';
import { MutualFriend, Comment } from '../../api/interfaces';

interface ProfileContextTypes {
	updateComments: (txt: string) => void;
	onDismissComments: () => void;
	postAuthorId: string;
	postAuthorAvatarSrc: string;

	deleteComment: (id: string) => void;
	comments: Comment[];
	mutualFriends: MutualFriend[];
	requesterId: string;

	setNewCommentText: (s: string) => void;
	newCommentText: string;
}

const defaults = {
	updateComments: (txt: string) => null,
	onDismissComments: () => null,
	postAuthorId: '',
	postAuthorAvatarSrc: '',
	deleteComment: (id: string) => null,
	comments: [],
	mutualFriends: [],

	requesterId: '',
	setNewCommentText: (s: string) => null,
	newCommentText: '',
};

export const PeachContext = React.createContext<ProfileContextTypes>(defaults);

export const PeachProvider = (props: React.PropsWithChildren) => {
	return null;
};
