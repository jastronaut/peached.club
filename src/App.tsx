import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';
import { MantineProvider } from '@mantine/core';

import { PeachContext } from './PeachContext';
import {
	LoginStream,
	User,
	DummyCurUser,
	Connections,
	PendingFriendRequest,
} from './api/interfaces';
import ACTIONS from './api/constants';
import {
	STORAGE_IS_DARK_MODE,
	STORAGE_TOKEN_KEY,
	STORAGE_CUR_USER_DATA_KEY,
} from './constants';
import { getUserFromStorage } from './utils';
import api from './api';

import { PeachRoutes } from './PeachRoutes';
import { darkTheme, lightTheme, PeachThemeProvider } from './Theme/theme';
import { GlobalStyle } from './Theme/GlobalStyle';

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

		api(ACTIONS.getConnections, jwt, {}, '', '', 'App').then(
			(response: { data: Connections; success: number }) => {
				if (response.success === 1) {
					const connectionsUnread = response.data.connections.filter(
						user => user.unreadPostCount
					);
					const connectionsRead = response.data.connections.filter(
						user => !user.unreadPostCount
					);
					setInboundFriendRequests(response.data.inboundFriendRequests);
					setOutboundFriendRequests(response.data.outboundFriendRequests);
					setConnections(connectionsUnread.concat(connectionsRead));
					setPeachFeed(
						response.data.connections.map(user => {
							user.posts = user.posts.reverse();
							return user;
						})
					);
				} else {
					console.error('😫 Error: Could not get peach feed!');
				}
			}
		);

		const storedDarkMode = localStorage.getItem(STORAGE_IS_DARK_MODE);
		if (!storedDarkMode || storedDarkMode === 'true') {
			setDarkMode(true);
		} else {
			setDarkMode(false);
		}

		setIsPeachLoading(false);
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
				}}
			>
				<PeachThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{ colorScheme: darkMode ? 'dark' : 'light' }}
					>
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
