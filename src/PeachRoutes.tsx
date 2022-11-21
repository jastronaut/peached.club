import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { LoginPage } from './pages/Login';
import { Logout } from './pages/Login/Logout';
import { FeedPage } from './pages/Feed';
import { ProfilePage } from './pages/Profile/Profile';
import { ActivityPage } from './pages/Activity';
import { SettingsPage } from './pages/Settings';
import { FriendRequestsPage } from './pages/Activity/FriendRequests/FriendRequests';

const RedirectToDownloadGuide = () => {
	window.location.replace(
		'https://www.notion.so/Download-Peach-Posts-Manually-a2e5ad1dbd644d05a9defc6a8fbfed22'
	);
	return null;
};

export const PeachRoutes = () => (
	<Routes>
		<Route path='/' element={<LoginPage />} />
		<Route path='/login' element={<LoginPage />} />
		<Route path='/feed' element={<FeedPage />} />
		<Route path='/friend'>
			<Route path=':id' element={<ProfilePage />} />
		</Route>
		<Route path='/activity' element={<ActivityPage />} />
		<Route path='/activity/friend-requests' element={<FriendRequestsPage />} />
		<Route path='/settings' element={<SettingsPage />} />
		<Route path='/logout' element={<Logout />} />
		<Route
			path='/peach-posts-download-guide'
			element={<RedirectToDownloadGuide />}
		/>
	</Routes>
);
