import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';
import { MantineProvider } from '@mantine/core';
import './Theme/fonts.css';

import { PeachContext, BlockedUsersMap } from './PeachContext';
import {
	LoginStream,
	User,
	DummyCurUser,
	Connections,
	PendingFriendRequest,
	BlockListResponse,
} from './api/interfaces';
import {
	STORAGE_IS_DARK_MODE,
	STORAGE_TOKEN_KEY,
	STORAGE_CUR_USER_DATA_KEY,
	STORAGE_IS_BETA_ENABLED,
} from './constants';
import { getUserFromStorage } from './utils';
import { sortMainFeedPosts } from './utils/sortMainFeedPosts';

import { PeachRoutes } from './PeachRoutes';
import { darkTheme, lightTheme, PeachThemeProvider } from './Theme/theme';
import { GlobalStyle } from './Theme/GlobalStyle';
import { makeApiCall } from './api/api';

import { AppLoadError } from './components/AppLoadError';

const App: React.FC = () => {
	const [jwt, setJwt] = useState<string>(
		localStorage.getItem(STORAGE_TOKEN_KEY) || ''
	);

	const [connections, setConnections] = useState<User[]>([]);
	const [inboundFriendRequests, setInboundFriendRequests] = useState<
		PendingFriendRequest[]
	>([]);
	const [outboundFriendRequests, setOutboundFriendRequests] = useState<
		PendingFriendRequest[]
	>([]);
	const [peachFeed, setPeachFeed] = useState<User[]>([]);
	const [curUser, setCurUser] = useState<LoginStream | null>(
		getUserFromStorage()
	);
	const [curFeedIndex, setCurFeedIndex] = useState<number>(0);
	const [darkMode, setDarkMode] = useState<boolean>(
		localStorage.getItem(STORAGE_IS_DARK_MODE) === 'true'
	);
	const [curUserData, setCurUserData] = useLocalStorage({
		key: STORAGE_CUR_USER_DATA_KEY,
		defaultValue: DummyCurUser,
	});
	const [isPeachLoading, setIsPeachLoading] = useState(false);
	const [blockedUsersMap, setBlockedUsersMap] = useState<BlockedUsersMap>({});
	const [isPeachBroken, setIsPeachBroken] = useState(false);

	const [betaEnabled, changeBetaEnabled] = useState(
		localStorage.getItem(STORAGE_IS_BETA_ENABLED) === 'true'
	);

	const updateCurFeedIndex = (newIndex: number) => {
		if (!peachFeed) {
			setCurFeedIndex(0);
			return;
		}

		setCurFeedIndex(curFeedIndex => {
			const allFeedIds = Object.keys(peachFeed);
			if (curFeedIndex + 1 === allFeedIds.length) {
				return -1;
			} else {
				return curFeedIndex + 1;
			}
		});
	};

	const setBetaEnabled = (enabled: boolean) => {
		changeBetaEnabled(enabled);
		localStorage.setItem(STORAGE_IS_BETA_ENABLED, enabled ? 'true' : 'false');
	};

	const toggleDarkMode = () => {
		setDarkMode(darkMode => {
			localStorage.setItem(STORAGE_IS_DARK_MODE, darkMode ? 'false' : 'true');
			return !darkMode;
		});
	};

	useEffect(() => {
		const storedJwt = localStorage.getItem(STORAGE_TOKEN_KEY);
		const storedUser = getUserFromStorage();
		if (!storedJwt || !storedUser) {
			return;
		}

		setJwt(storedJwt);
		setCurUser(storedUser);

		const storedDarkMode = localStorage.getItem(STORAGE_IS_DARK_MODE);
		if (!storedDarkMode || storedDarkMode === 'true') {
			setDarkMode(true);
		} else {
			setDarkMode(false);
		}
	}, []);

	useEffect(() => {
		if (!jwt || !curUser) {
			return;
		}

		setIsPeachLoading(true);
		setIsPeachBroken(false);

		const fetchPeachInfo = async () => {
			try {
				const connectionsResp = await makeApiCall<{
					data: Connections;
					success: number;
				}>({
					uri: `connections`,
					jwt,
				});

				setInboundFriendRequests(connectionsResp.data.inboundFriendRequests);
				setOutboundFriendRequests(connectionsResp.data.outboundFriendRequests);
				const connections = connectionsResp.data.connections.map(user => {
					user.posts = user.posts.reverse();
					return user;
				});

				const sortedConnections = connections.sort(sortMainFeedPosts);

				setPeachFeed(sortedConnections);
				setConnections(sortedConnections);

				setIsPeachLoading(false);

				const blockListResp = await makeApiCall<BlockListResponse>({
					uri: `stream/block-list`,
					jwt,
				});
				if (!blockListResp.success) {
					throw Error(`Couldn't fetch block list.`);
				}
				const { blockList } = blockListResp.data;
				if (blockList) {
					const blockedUsersMap: BlockedUsersMap = {};
					blockList.map(user => {
						blockedUsersMap[user.id] = user;
					});
					setBlockedUsersMap(blockedUsersMap);
				}
			} catch (e) {
				console.error(e);
				setIsPeachBroken(true);
				throw Error(`Couldn't fetch connections.`);
			} finally {
				setIsPeachLoading(false);
			}
		};

		fetchPeachInfo();
	}, [jwt, curUser]);

	return (
		<BrowserRouter>
			<PeachContext.Provider
				value={{
					isPeachLoading,
					jwt,
					setJwt,
					peachFeed,
					setPeachFeed,
					curUser,
					setCurUser,
					curFeedIndex,
					setCurFeedIndex: updateCurFeedIndex,
					darkMode,
					toggleDarkMode,
					curUserData,
					setCurUserData,
					connections,
					setConnections,
					outboundFriendRequests,
					inboundFriendRequests,
					setInboundFriendRequests,
					setOutboundFriendRequests,
					blockedUsersMap,
					setBlockedUsersMap,
					betaEnabled,
					setBetaEnabled,
				}}
			>
				<PeachThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{ colorScheme: darkMode ? 'dark' : 'light' }}
					>
						<AppLoadError isShowing={isPeachBroken} />
						<MainPeachApp />
					</MantineProvider>
				</PeachThemeProvider>
			</PeachContext.Provider>
		</BrowserRouter>
	);
};

const MainPeachApp = () => (
	<>
		<GlobalStyle />
		<PeachRoutes />
	</>
);

export default App;
