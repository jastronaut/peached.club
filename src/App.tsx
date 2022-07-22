import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { PeachContext } from './PeachContext';
import { LoginStream, User, CurUser, DummyCurUser } from './api/interfaces';
import { STORAGE_IS_DARK_MODE, STORAGE_TOKEN_KEY } from './constants';
import { getUserFromStorage } from './utils';

import { LoginPage } from './Login';
import { Logout } from './Login/Logout';
import { FeedPage } from './Feed';
import { FriendFeedPage } from './Friend';
import { ActivityPage } from './Activity';
import { SettingsPage } from './Settings';
import { darkTheme, lightTheme } from './Theme/theme';
import { GlobalStyle } from './style';

const App: React.FC = () => {
	const [jwt, setJwt] = useState<string>(
		localStorage.getItem(STORAGE_TOKEN_KEY) || ''
	);

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
			localStorage.setItem(STORAGE_IS_DARK_MODE, darkMode ? 'true' : 'false');
			return !darkMode;
		});
	};

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
				}}
			>
				<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<MainPeachApp />
				</ThemeProvider>
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
			<Route path=':id' element={<FriendFeedPage />} />
		</Route>
		<Route path='/activity' element={<ActivityPage />} />
		<Route path='/settings' element={<SettingsPage />} />
		<Route path='/logout' element={<Logout />} />
	</Routes>
);

export default App;
