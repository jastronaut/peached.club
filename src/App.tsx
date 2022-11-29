import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';
import { MantineProvider, Notification } from '@mantine/core';
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
} from './constants';
import { getUserFromStorage } from './utils';
import { sortMainFeedPosts } from './utils/sortMainFeedPosts';

import { PeachRoutes } from './PeachRoutes';
import { darkTheme, lightTheme, PeachThemeProvider } from './Theme/theme';
import { GlobalStyle } from './Theme/GlobalStyle';
import { makeApiCall } from './api/api';

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
	const [bigErrorMessage, setBigErrorMessage] = useState('');
	const [blockedUsersMap, setBlockedUsersMap] = useState<BlockedUsersMap>({});

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
	}, []);

	useEffect(() => {
		if (!jwt || !curUser) {
			return;
		}

		setIsPeachLoading(true);
		setBigErrorMessage('');

		const fetchPeachInfo = async () => {
			try {
				const connectionsResp = await makeApiCall<{
					data: Connections;
					success: number;
				}>({
					uri: `connections`,
					jwt,
				});

				if (!connectionsResp.success) {
					setBigErrorMessage('Peach might be down right now 😵‍💫\n\n');
					throw Error(`Couldn't fetch connections.`);
				}

				setInboundFriendRequests(connectionsResp.data.inboundFriendRequests);
				setOutboundFriendRequests(connectionsResp.data.outboundFriendRequests);
				setConnections(
					connectionsResp.data.connections.sort(sortMainFeedPosts)
				);
				setPeachFeed(
					connectionsResp.data.connections.map(user => {
						user.posts = user.posts.reverse();
						return user;
					})
				);

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
			} finally {
				setIsPeachLoading(false);
			}
		};

		fetchPeachInfo();

		const storedDarkMode = localStorage.getItem(STORAGE_IS_DARK_MODE);
		if (!storedDarkMode || storedDarkMode === 'true') {
			setDarkMode(true);
		} else {
			setDarkMode(false);
		}
	}, [jwt, curUser, darkMode]);

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
				}}
			>
				<PeachThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{ colorScheme: darkMode ? 'dark' : 'light' }}
					>
						<MainPeachApp />
						{bigErrorMessage && (
							<Notification color='red' onClose={() => setBigErrorMessage('')}>
								{bigErrorMessage}
								Contact the official peach twitter account at{' '}
								<a href='https://twitter.com/peachdotcool/'>@peachdotcool</a> on
								twitter, and check out the{' '}
								<a href='https://discord.gg/qqdv3A4xQY'>unofficial discord</a>.
							</Notification>
						)}
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
