import { User } from '../api/interfaces';

export function sortMainFeedPosts(a: User, b: User) {
	const aLatestPost = a.posts[0];
	const bLatestPost = b.posts[0];

	if (!aLatestPost && !bLatestPost) {
		if (a.isFavorite && b.isFavorite) {
			return 0;
		} else if (a.isFavorite && !b.isFavorite) {
			return -1;
		} else {
			return 1;
		}
	} else if (aLatestPost && !bLatestPost) {
		return -1;
	} else if (!aLatestPost && bLatestPost) {
		return 1;
	}

	const aLatestPostTime = aLatestPost.createdTime;
	const bLatestPostTime = bLatestPost.createdTime;

	// are there unread posts for both users?
	if (a.unreadPostCount && b.unreadPostCount) {
		// are both users favorites?
		if (a.isFavorite && b.isFavorite) {
			if (aLatestPostTime > bLatestPostTime) {
				return -1;
			} else {
				return 1;
			}
		} else if (a.isFavorite && !b.isFavorite) {
			return -1;
		} else if (!a.isFavorite && b.isFavorite) {
			return 1;
		} else {
			// users are both not favorites
			if (aLatestPostTime > bLatestPostTime) {
				return -1;
			} else {
				return 1;
			}
		}
	} else if (a.unreadPostCount && !b.unreadPostCount) {
		// only user a has unread posts
		return -1;
	} else if (!a.unreadPostCount && b.unreadPostCount) {
		// only user b has unread posts
		return 1;
	} else {
		// both users have no unread posts
		if (aLatestPostTime > bLatestPostTime) {
			return -1;
		} else {
			return 1;
		}
	}
}
