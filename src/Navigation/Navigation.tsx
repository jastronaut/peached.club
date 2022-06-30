import React, { useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { PeachContext } from '../PeachContext';
import { NavWrap, Link, Nav, FeedsNav } from './style';
import ArrowLeft from './ArrowLeft.svg';
import ArrowRight from './ArrowRight.svg';
import ActivityIcon from './Activity.svg';
import ArrowLeftDarkMode from './ArrowLeftDarkMode.svg';
import ArrowRightDarkMode from './ArrowRightDarkMode.svg';
import ActivityIconDarkMode from './ActivityDarkMode.svg';
import SettingsIcon from './SettingsIcon.svg';
import SettingsIconDarkMode from './SettingsIconDarkMode.svg';
import UserIcon from './UserIcon.svg';
import UserIconDarkMode from './UserIconDarkMode.svg';
import HomeIcon from './HomeIcon.svg';
import HomeIconDarkMode from './HomeIconDarkMode.svg';

interface NavigationProps {
	curFeed?: string;
	onCurUsersProfile?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
	curFeed,
	onCurUsersProfile,
}) => {
	const { darkMode, curUser, peachFeed } = useContext(PeachContext);
	let feedListIDs: string[] = [];

	let showRightArrow = false;
	let showLeftArrow = false;
	let nextUser = '';
	let prevUser = '';

	if (curFeed && !onCurUsersProfile) {
		feedListIDs = peachFeed
			.filter(user => user.unreadPostCount > 0)
			.map(user => user.id);
		const curFeedIndex = feedListIDs.indexOf(curFeed);
		if (curFeedIndex > 0) {
			showLeftArrow = true;
			prevUser = feedListIDs[curFeedIndex - 1];
		}

		if (curFeedIndex < feedListIDs.length - 1) {
			showRightArrow = true;
			nextUser = feedListIDs[curFeedIndex + 1];
		}
	}

	return (
		<>
			{curFeed && !onCurUsersProfile ? (
				<>
					{showLeftArrow ? (
						<RouterLink to={`/friend/${prevUser}`}>
							<FeedsNav>
								<img
									src={
										darkMode ? ArrowLeftDarkMode : ArrowLeft
									}
									alt='Prev feed'
								/>
							</FeedsNav>
						</RouterLink>
					) : null}
					{showRightArrow ? (
						<RouterLink to={`/friend/${nextUser}`}>
							<FeedsNav right>
								<img
									src={
										darkMode
											? ArrowRightDarkMode
											: ArrowRight
									}
									alt='Next feed'
								/>
							</FeedsNav>
						</RouterLink>
					) : null}
				</>
			) : null}

			<NavWrap>
				<Nav>
					<Link>
						<RouterLink to='/feed'>
							<img
								src={darkMode ? HomeIconDarkMode : HomeIcon}
								alt='Home'
							/>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to={`/friend/${curUser ? curUser.id : ''}`}>
							<img
								src={darkMode ? UserIconDarkMode : UserIcon}
								alt='Me'
							/>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to='/activity'>
							<img
								src={
									darkMode
										? ActivityIconDarkMode
										: ActivityIcon
								}
								alt='Activity'
							/>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to='/settings'>
							<img
								src={
									darkMode
										? SettingsIconDarkMode
										: SettingsIcon
								}
								alt='Go to settings'
							/>
						</RouterLink>
					</Link>
				</Nav>
			</NavWrap>
		</>
	);
};

export default Navigation;
