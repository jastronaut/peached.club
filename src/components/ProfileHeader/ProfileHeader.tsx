import React from 'react';
import Linkify from 'linkify-react';

import { User } from '../../api/interfaces';
import { LINKIFY_OPTIONS, DEFAULT_AVATAR_SRC } from '../../constants';

import {
	Avatar,
	ProfileHeaderContainer,
	ProfileHeaderText,
	ProfileHeaderHandle,
	ProfileHeaderContent,
} from './style';

export type ProfileHeaderProps = {
	viewingUser: User | null;
	postsLoading: boolean;
};

export const ProfileHeader = ({
	viewingUser,
	postsLoading,
}: ProfileHeaderProps) => {
	const avatarSrc =
		postsLoading || !viewingUser ? DEFAULT_AVATAR_SRC : viewingUser.avatarSrc;
	const avatarAlt = `${viewingUser?.name}'s avatar`;
	const displayName =
		postsLoading || !viewingUser ? '...' : viewingUser.displayName;
	const username = postsLoading || !viewingUser ? '...' : viewingUser.name;

	return (
		<ProfileHeaderContainer>
			<ProfileHeaderContent>
				<Avatar>
					<img
						src={avatarSrc}
						style={{ opacity: postsLoading ? '0.5' : '1' }}
						alt={avatarAlt}
					/>
				</Avatar>
				<ProfileHeaderText>
					<h2>{displayName}</h2>
					<ProfileHeaderHandle>@{username}</ProfileHeaderHandle>
					<p>
						{postsLoading || !viewingUser ? (
							'...'
						) : (
							<Linkify tagName='span' options={LINKIFY_OPTIONS}>
								{viewingUser.bio}
							</Linkify>
						)}
					</p>
				</ProfileHeaderText>
			</ProfileHeaderContent>
		</ProfileHeaderContainer>
	);
};
