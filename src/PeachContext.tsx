import React from 'react';
import {
	LoginStream,
	User,
	CurUser,
	DummyCurUser,
	PendingFriendRequest,
} from './api/interfaces';

export type BlockedUsersMap = {
	[id: string]: CurUser;
};

interface PeachContextTypes {
	jwt: string;
	setJwt: (newJwt: string) => void;
	peachFeed: User[];
	setPeachFeed: (newPeachFeed: User[]) => void;
	curUser: LoginStream | null;
	setCurUser: (newUser: LoginStream) => void;
	curFeedIndex: number;
	setCurFeedIndex: (newIndex: number) => void;
	darkMode: boolean;
	toggleDarkMode: () => void;
	curUserData: CurUser;
	setCurUserData: (newCurUser: CurUser) => void;
	connections: User[];
	setConnections: (newConnections: User[]) => void;
	isPeachLoading: boolean;
	inboundFriendRequests: PendingFriendRequest[];
	outboundFriendRequests: PendingFriendRequest[];
	setInboundFriendRequests: (reqs: PendingFriendRequest[]) => void;
	setOutboundFriendRequests: (reqs: PendingFriendRequest[]) => void;
	blockedUsersMap: BlockedUsersMap;
	setBlockedUsersMap: (users: BlockedUsersMap) => void;
	betaEnabled: boolean;
	setBetaEnabled: (b: boolean) => void;
}

const defaults = {
	jwt: '',
	setJwt: (_newJwt: string) => {},
	peachFeed: [],
	setPeachFeed: (_newPeachFeed: User[]) => {},
	curUser: null,
	setCurUser: (_newUser: LoginStream) => {},
	curFeedIndex: 0,
	setCurFeedIndex: (_newIndex: number) => {},
	darkMode: true,
	toggleDarkMode: () => {},
	curUserData: DummyCurUser,
	setCurUserData: (_newCurUser: CurUser) => {},
	connections: [],
	setConnections: (_newConnections: User[]) => {},
	isPeachLoading: false,
	inboundFriendRequests: [],
	outboundFriendRequests: [],
	setInboundFriendRequests: (_req: PendingFriendRequest[]) => {},
	setOutboundFriendRequests: (_req: PendingFriendRequest[]) => {},
	blockedUsersMap: {},
	setBlockedUsersMap: (_u: BlockedUsersMap) => {},
	betaEnabled: false,
	setBetaEnabled: (_b: boolean) => {},
};

export const PeachContext = React.createContext<PeachContextTypes>(defaults);
