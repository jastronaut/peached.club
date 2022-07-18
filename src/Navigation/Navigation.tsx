import React, { useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { PeachContext } from '../PeachContext';

import { NavWrap, Link, Nav, FeedsNav, PageIconWrapper } from './style';
import ArrowLeftIcon from '../Theme/Icons/ArrowLeftIcon';
import ArrowRightIcon from '../Theme/Icons/ArrowRightIcon';
import HomeIcon from '../Theme/Icons/HomeIcon';
import UserIcon from '../Theme/Icons/UserIcon';
import ActivityIcon from '../Theme/Icons/PulseIcon';
import GearIcon from '../Theme/Icons/GearIcon';

interface NavigationProps {
	curFeed?: string;
	onCurUsersProfile?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
	curFeed,
	onCurUsersProfile,
}) => {
	const { curUser, peachFeed } = useContext(PeachContext);
	const { pathname } = useLocation();

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
								<ArrowLeftIcon />
							</FeedsNav>
						</RouterLink>
					) : null}
					{showRightArrow ? (
						<RouterLink to={`/friend/${nextUser}`}>
							<FeedsNav right>
								<ArrowRightIcon />
							</FeedsNav>
						</RouterLink>
					) : null}
				</>
			) : null}

			<NavWrap>
				<Nav>
					<Link>
						<RouterLink to='/feed'>
							<PageIconWrapper isActive={pathname.includes('feed') ?? false}>
								<HomeIcon />
							</PageIconWrapper>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to={`/friend/${curUser ? curUser.id : ''}`}>
							<PageIconWrapper isActive={onCurUsersProfile ?? false}>
								<UserIcon />
							</PageIconWrapper>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to='/activity'>
							<PageIconWrapper
								isActive={pathname.includes('activity') ?? false}
							>
								<ActivityIcon />
							</PageIconWrapper>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to='/settings'>
							<PageIconWrapper
								isActive={pathname.includes('settings') ?? false}
							>
								<GearIcon />
							</PageIconWrapper>
						</RouterLink>
					</Link>
				</Nav>
			</NavWrap>
		</>
	);
};

export default Navigation;
