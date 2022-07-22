import { PostContent, POST_TYPE } from './api/interfaces';
import { STORAGE_USER_KEY } from './constants';

export const createPostPreview = (post: PostContent) => {
	switch (post.type) {
		case POST_TYPE.TEXT:
			return post.text.length > 300
				? post.text.slice(0, 140) + '...'
				: post.text;
		case POST_TYPE.IMAGE:
			return 'Image post';
		case POST_TYPE.LINK:
			return 'Link post';
		case POST_TYPE.LOCATION:
			return 'Location post';
		default:
			return '';
	}
};

export function getUserFromStorage() {
	const user = localStorage.getItem(STORAGE_USER_KEY);
	if (user) {
		return JSON.parse(user);
	} else {
		return null;
	}
}
