import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PeachContext } from './PeachContext';
import {
	LoginStream,
	User,
	CurUser,
	DummyCurUser,
	Connections,
} from './api/interfaces';
import ACTIONS from './api/constants';
import { STORAGE_IS_DARK_MODE, STORAGE_TOKEN_KEY } from './constants';
import { getUserFromStorage } from './utils';
import api from './api';

import { LoginPage } from './pages/Login';
import { Logout } from './pages/Login/Logout';
import { FeedPage } from './pages/Feed';
import { ProfilePage } from './pages/Profile/Profile';
import { ActivityPage } from './pages/Activity';
import { SettingsPage } from './pages/Settings';
import { darkTheme, lightTheme, PeachThemeProvider } from './Theme/theme';
import { GlobalStyle } from './style';

const App: React.FC = () => {
	const [jwt, setJwt] = useState<string>(
		localStorage.getItem(STORAGE_TOKEN_KEY) || ''
	);

	const [connections, setConnections] = useState<User[]>([]);
	const [peachFeed, setPeachFeed] = useState<User[]>([]);
	const [curUser, setCurUser] = useState<LoginStream | null>(
		getUserFromStorage()
	);
	const [curFeedIndex, setCurFeedIndex] = useState<number>(0);
	const [darkMode, setDarkMode] = useState<boolean>(
		localStorage.getItem(STORAGE_IS_DARK_MODE) === 'true'
	);
	const [curUserData, setCurUserData] = useState<CurUser>(DummyCurUser);

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

		api(ACTIONS.getConnections, jwt).then(
			(response: { data: Connections; success: number }) => {
				if (response.success === 1) {
					const connectionsUnread = response.data.connections.filter(
						user => user.unreadPostCount
					);
					const connectionsRead = response.data.connections.filter(
						user => !user.unreadPostCount
					);
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
	}, [jwt, curUser, darkMode]);

	return (
		<BrowserRouter>
			<PeachContext.Provider
				value={{
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
				}}
			>
				<PeachThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<MainPeachApp />
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

const PeachRoutes = () => (
	<Routes>
		<Route path='/' element={<LoginPage />} />
		<Route path='/login' element={<LoginPage />} />
		<Route path='/feed' element={<FeedPage />} />
		<Route path='/friend'>
			<Route path=':id' element={<ProfilePage />} />
		</Route>
		<Route path='/activity' element={<ActivityPage />} />
		<Route path='/settings' element={<SettingsPage />} />
		<Route path='/logout' element={<Logout />} />
	</Routes>
);

export default App;
