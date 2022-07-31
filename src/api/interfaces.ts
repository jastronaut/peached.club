interface ResponseError {
	Code: number;
	Message: string;
}

/**
 * POSTS
 */

export enum POST_TYPE {
	TEXT = 'text',
	IMAGE = 'image',
	LINK = 'link',
	LOCATION = 'location',
	GIF = 'gif',
}

export type TextMessage = {
	type: typeof POST_TYPE.TEXT;
	text: string;
};

export type ImageMessage = {
	type: typeof POST_TYPE.IMAGE;
	src: string;
	height: number;
	width: number;
};

export type GifMessage = {
	type: typeof POST_TYPE.GIF;
	src: string;
	height: number;
	width: number;
};

export type LinkMessage = {
	type: typeof POST_TYPE.LINK;
	description: string;
	imageURL?: string;
	title: string;
	url: string;
};

export interface LocationMessage {
	type: typeof POST_TYPE.LOCATION;
	formattedAddress: string[];
	foursquareId: string;
	iconSrc: string;
	lat: number;
	long: number;
	name: string;
}

export type PostContent =
	| TextMessage
	| ImageMessage
	| LinkMessage
	| LocationMessage
	| GifMessage;

export type UploadableMessageTypes = TextMessage | ImageMessage | GifMessage;

/*eslint-disable */
export function isLink(object: any): object is LinkMessage {
	return 'imageURL' in object;
}

export function isText(object: any): object is TextMessage {
	return 'text' in object;
}

export function isImage(object: any): object is ImageMessage {
	return 'src' in object;
}

export function isGif(object: any): object is GifMessage {
	return 'src' in object;
}

export function isLocation(object: any): object is LocationMessage {
	return 'formattedAddress' in object;
}
/*eslint-enable*/

export interface LikePostResponse {
	data?: {
		id: string;
		authorStreamID: string;
		postID: string;
	};
	error?: ResponseError;
	success: number;
}

export interface CommentResponse {
	id: string;
	authorStreamID: string;
	postID: string;
	body: string;
	author: {
		bio: string;
		isPublic: boolean;
		posts: Post[] | null;
		unreadPostCount: number;
		lastRead: number;
	};
	success: number;
}

export interface Comment {
	id: string;
	body: string;
	author: {
		id: string;
		name: string;
		displayName: string;
		bio: string;
		isPublic: boolean;
		posts: Post[] | null;
		unreadPostCount: number;
		lastRead: number;
	};
}

export interface DeleteCommentResponse {
	success: number;
}

export interface Post {
	id: string;
	message: PostContent[];
	commentCount: number;
	likeCount: number;
	likedByMe: boolean;
	isUnread: boolean;
	createdTime: number;
	updatedTime: number;
	comments?: Comment[];
}

// unlike
export interface UnlikeResponse {
	success: number;
}

/**
 * LOGIN
 */

export interface LoginStream {
	id: string;
	token: string; // for viewing streams
}

export interface LoginResponse {
	data?: {
		token: string; // jwt
		streams: [
			{
				id: string;
				token: string; // for viewing streams
			}
		];
	};
	success: number;
	error?: ResponseError;
}

/**
 * STREAM
 */

export interface CurUser {
	id: string;
	name: string;
	displayName: string;
	avatarSrc: string;
	bio: string;
	isPublic: boolean;
	friendsSharing: boolean;
}

export const DummyCurUser: CurUser = {
	id: '',
	name: '',
	displayName: '',
	avatarSrc: '',
	bio: '',
	isPublic: false,
	friendsSharing: false,
};

export interface User extends CurUser {
	youFollow: boolean;
	followsYou: boolean;
	posts: Post[];
	unreadPostCount: number;
	lastRead: number;
	lastOnline: number;
	isFavorite: boolean;
}

export interface PendingFriendRequest {
	id: string;
	stream: {
		id: string;
		name: string;
		displayName: string;
		bio: string;
		isPublic: boolean;
		unreadPostCount: number;
		lastRead: number;
	};

	createdTime: number;
}

export interface Connections {
	connections: User[];
	requesterStream: CurUser;
	inboundFriendRequests: PendingFriendRequest;
	outboundFriendRequests: PendingFriendRequest;
}

/**
 * list of users
 * (this isn't actually from the api)
 */

export interface PeachFeed {
	[name: string]: User;
}

export interface CreatePostResponse {
	id: string;
	message: (TextMessage | LinkMessage | ImageMessage)[];
	commentCount: number;
	likeCount: number;
	likedByMe: boolean;
	isUnread: boolean;
	success: number;
}

interface AuthorStream {
	id: string;
	name: string;
	displayName: string;
	avatarSrc: string;
	bio: string;
	isPublic: boolean;
	unreadPostCount: number;
	lastRead: number;
}

export enum NOTIFICATION_TYPE {
	LIKE = 'like',
	COMMENT = 'comment',
	WAVE = 'wave',
	MENTION = 'mention',
}
export interface MentionNotification {
	type: typeof NOTIFICATION_TYPE.MENTION;
	body: {
		authorStream: AuthorStream;
		postAuthorStream: AuthorStream;
		postId: string;
		postMessage: Post['message'];
		commentBody: string;
	};
	isUnread: boolean;
	createdTime: number;
}
export interface LikeNotification {
	type: typeof NOTIFICATION_TYPE.LIKE;
	body: {
		authorStream: AuthorStream;
		postId: string;
		postMessage: Post['message'];
	};
	isUnread: boolean;
	createdTime: number;
}

export interface CommentNotification {
	type: typeof NOTIFICATION_TYPE.COMMENT;
	body: {
		authorStream: AuthorStream;
		postId: string;
		postMessage: Post['message'];
		commentBody: string;
	};
	isUnread: boolean;
	createdTime: number;
}

export interface WaveNotification {
	type: typeof NOTIFICATION_TYPE.WAVE;
	body: {
		authorStream: AuthorStream;
		message: string;
	};
	isUnread: boolean;
	createdTime: number;
}

export type ActivityItem =
	| CommentNotification
	| WaveNotification
	| LikeNotification
	| MentionNotification;

export interface ActivityResponse {
	streamID: string;
	activityItems: ActivityItem[];
	unreadActivityItemCount: number;
	lastRead: number;
}

export interface MutualFriend extends CurUser {
	youFollow: boolean;
	followsYou: boolean;
	lastRead: number;
}

export interface FriendsOfFriendsResponse {
	connections: MutualFriend[];
}

export interface NameChangeResponse {
	success: number;
	error?: {
		Code: number;
		Message: string;
	};
}

export interface AddFriendResponse {
	data: {
		status: string;
		id: string;
		stream: User;
	};
	success: number;
}

/*
 * IMGUR API
 */

export interface ImgurUploadResponse {
	data: {
		id: string;
		title: string | null;
		description: string | null;
		datetime: number;
		type: string;
		animated: boolean;
		width: number;
		height: number;
		size: number;
		views: number;
		bandwidth: number;
		vote: null;
		favorite: boolean;
		nsfw: null;
		section: string | null;
		account_url: string | null;
		account_id: number;
		is_ad: boolean;
		in_most_viral: boolean;
		tags: string[];
		ad_type: number;
		ad_url: string;
		in_gallery: boolean;
		deletehash: string;
		name: string;
		link: string;
	};
	success: boolean;
	status: 200;
}

export type GiphyItem = {
	type: string;
	id: string;
	url: string;
	images: {
		downsized_large: GiphyImage;
		fixed_width: GiphyImage;
		preview_gif: GiphyImage;
	};
};

export type GiphyImage = {
	height: string;
	width: string;
	url: string;
};

export type GiphyResponse = {
	data: GiphyItem[];
	meta: {
		status: number;
	};
};
