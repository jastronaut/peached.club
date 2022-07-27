// @ts-nocheck
import ACTIONS, {
	LOGIN,
	LIKE,
	UNLIKE,
	CONNECTIONS,
	CONNECTION_STREAM,
	COMMENT,
	DELETE_COMMENT,
	DELETE_POST,
	CREATE_POST,
	MARK_FEED_READ,
	ACTIVITY_FEED,
	FRIENDS_OF_FRIENDS,
	CHANGE_USER_NAME,
	CHANGE_DISPLAY_NAME,
	ADD_FRIEND,
	CHANGE_BIO,
} from './constants';

const api = (action: ACTIONS, jwt: string, body = {}, id = '') => {
	const req = {
		method: '',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: '',
		},
	};
	let uri = '';

	/**
	 * TODO: clean this shit up
	 */

	switch (action) {
		case ACTIONS.login:
			uri = LOGIN;
			req.method = 'POST';
			break;
		case ACTIONS.getConnections:
			uri = CONNECTIONS;
			req.method = 'GET';
			req.headers.Authorization = `Bearer ${jwt}`;
			delete req.body;
			break;
		case ACTIONS.like:
			uri = LIKE;
			req.method = 'POST';
			req.headers.Authorization = `Bearer ${jwt}`;
			break;
		case ACTIONS.unlike:
			uri = UNLIKE(id);
			req.method = 'DELETE';
			req.headers.Authorization = `Bearer ${jwt}`;
			break;
		case ACTIONS.connectionStream:
			uri = CONNECTION_STREAM(id);
			req.method = 'GET';
			req.headers.Authorization = `Bearer ${jwt}`;
			delete req.body;
			break;
		case ACTIONS.comment:
			uri = COMMENT;
			req.method = 'POST';
			req.headers.Authorization = `Bearer ${jwt}`;
			break;
		case ACTIONS.deleteComment:
			uri = DELETE_COMMENT(id);
			req.method = 'DELETE';
			req.headers.Authorization = `Bearer ${jwt}`;
			delete req.body;
			break;
		case ACTIONS.deletePost:
			uri = DELETE_POST(id);
			req.method = 'DELETE';
			req.headers.Authorization = `Bearer ${jwt}`;
			delete req.body;
			break;
		case ACTIONS.createPost:
			uri = CREATE_POST;
			req.method = 'POST';
			req.headers.Authorization = `Bearer ${jwt}`;
			break;
		case ACTIONS.markFeedRead:
			uri = MARK_FEED_READ(id);
			req.method = 'PUT';
			req.headers.Authorization = `Bearer ${jwt}`;
			break;
		case ACTIONS.getActivityFeed:
			uri = ACTIVITY_FEED;
			req.method = 'GET';
			req.headers.Authorization = `Bearer ${jwt}`;
			delete req.body;
			break;
		case ACTIONS.getFriendsOfFriends:
			uri = FRIENDS_OF_FRIENDS(id);
			req.method = 'GET';
			req.headers.Authorization = `Bearer ${jwt}`;
			delete req.body;
			break;
		case ACTIONS.changeUserName:
			uri = CHANGE_USER_NAME;
			req.method = 'PUT';
			req.headers.Authorization = `Bearer ${jwt}`;
			break;
		case ACTIONS.changeDisplayName:
			uri = CHANGE_DISPLAY_NAME;
			req.method = 'PUT';
			req.headers.Authorization = `Bearer ${jwt}`;
			break;
		case ACTIONS.changeBio:
			uri = CHANGE_BIO;
			req.method = 'PUT';
			req.headers.Authorization = `Bearer ${jwt}`;
			break;
		case ACTIONS.addFriend:
			uri = ADD_FRIEND(id);
			req.method = 'POST';
			req.headers.Authorization = `Bearer ${jwt}`;
			break;
	}

	return fetch(uri, req)
		.catch(err => {
			console.error(err);
			throw new Error(`cant make call for ${action}`);
		})
		.then(response => response.json());
};

export default api;
