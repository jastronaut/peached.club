import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PeachContext } from './PeachContext';
import { LoginStream, User, CurUser, DummyCurUser } from './api/interfaces';
import { STORAGE_IS_DARK_MODE, STORAGE_TOKEN_KEY } from './constants';
import { getUserFromStorage } from './utils';

import { LoginPage } from './pages/Login';
import { Logout } from './pages/Login/Logout';
import { FeedPage } from './pages/Feed';
import { FriendFeedPage } from './Friend';
import { ActivityPage } from './pages/Activity';
import { SettingsPage } from './pages/Settings';
import { darkTheme, lightTheme, PeachThemeProvider } from './Theme/theme';
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
			localStorage.setItem(STORAGE_IS_DARK_MODE, darkMode ? 'false' : 'true');
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
			<Route path=':id' element={<FriendFeedPage />} />
		</Route>
		<Route path='/activity' element={<ActivityPage />} />
		<Route path='/settings' element={<SettingsPage />} />
		<Route path='/logout' element={<Logout />} />
	</Routes>
);

export default App;
