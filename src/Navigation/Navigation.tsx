import React, { useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { PeachContext } from '../PeachContext';
import { getUserFromStorage } from '../utils';
import { STORAGE_TOKEN_KEY } from '../constants';
import { CurUser } from '../api/interfaces';
import api from '../api';
import ACTIONS from '../api/constants';

import { NavWrap, Link, Nav, FeedsNav, PageIconWrapper } from './style';
import ArrowLeftIcon from '../Theme/Icons/ArrowLeftIcon';
import ArrowRightIcon from '../Theme/Icons/ArrowRightIcon';
import HomeIcon from '../Theme/Icons/HomeIcon';
import UserIcon from '../Theme/Icons/UserIcon';
import ActivityIcon from '../Theme/Icons/PulseIcon';
import GearIcon from '../Theme/Icons/GearIcon';

const Navigation = () => {
	const {
		curUser,
		curUserData,
		setCurUserData,
		peachFeed,
		jwt,
		setCurUser,
		setJwt,
	} = useContext(PeachContext);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	let feedListIDs: string[] = [];

	let showRightArrow = false;
	let showLeftArrow = false;
	let nextUser = '';
	let prevUser = '';

	useEffect(() => {
		if (!curUser || !jwt || !curUserData.id) {
			const storedCurUser = getUserFromStorage();
			const storedJwt = localStorage.getItem(STORAGE_TOKEN_KEY);

			if (!storedCurUser || !storedJwt) {
				navigate('/login', { replace: true });
			} else {
				setJwt(storedJwt);
				setCurUser(storedCurUser);

				if (!curUserData.id) {
					api(ACTIONS.connectionStream, storedJwt, {}, storedCurUser.id).then(
						(response: { data: CurUser }) => {
							if (response.data) {
								setCurUserData(response.data);
							} else {
								navigate('/login', { replace: true });
							}
						}
					);
				}
			}
		}
	}, [curUser, jwt, curUserData.id]);

	let onCurUsersProfile = false;
	if (!curUser) {
		navigate('/login', { replace: true });
	} else {
		onCurUsersProfile = pathname === `/friend/${curUser.id}`;
	}

	const curFeed = pathname.split('/friend/')[1] ?? null;

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
							<PageIconWrapper isActive={onCurUsersProfile}>
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
