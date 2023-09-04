import { FRIEND_STATUS } from '../../interfaces';

const backgrounds = [
	'https://imgur.com/upR9smx.jpg',
	'https://imgur.com/FYvdKAb.jpg',
	'https://imgur.com/GRyoWfj.jpg',
	'https://imgur.com/aqfkgt5.jpg',
	'https://imgur.com/xyAcBRG.jpg',
];

const numBackgrounds = backgrounds.length;

export const getRandomBackgroundUrl = () =>
	`${backgrounds[Math.floor(Math.random() * numBackgrounds)]}`;

export function getConfirmationModalMessage(friendStatus: FRIEND_STATUS) {
	switch (friendStatus) {
		case 'FOLLOWING':
			return `Unfriend this peach?`;
		case 'OUTBOUND_REQUEST':
			return `Cancel friend request to this peach?`;
		case 'INBOUND_REQUEST':
			return `Accept friend request from this peach?`;
		case 'NOT_FOLLOWING':
			return `Send friend request to this peach?`;
		default:
			return `You shouldn't be seeing this message 🫣 Contact peached.app@gmail.com!`;
	}
}
