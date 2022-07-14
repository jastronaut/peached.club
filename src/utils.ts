import { PostContent, POST_TYPE } from './api/interfaces';

export const createPostPreview = (post: PostContent | string) => {
	if (typeof post === 'string') {
		return '';
	}

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
