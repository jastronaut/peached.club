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
	loading: boolean;
};

export const ProfileHeader = ({ viewingUser, loading }: ProfileHeaderProps) => {
	const avatarSrc =
		loading || !viewingUser ? DEFAULT_AVATAR_SRC : viewingUser.avatarSrc;
	const avatarAlt = `${viewingUser?.name}'s avatar`;
	const displayName = loading || !viewingUser ? '...' : viewingUser.displayName;
	const username = loading || !viewingUser ? '...' : viewingUser.name;

	return (
		<ProfileHeaderContainer>
			<ProfileHeaderContent>
				<Avatar>
					<img
						src={avatarSrc}
						style={{ opacity: loading ? '0.5' : '1' }}
						alt={avatarAlt}
					/>
				</Avatar>
				<ProfileHeaderText>
					<h2>{displayName}</h2>
					<ProfileHeaderHandle>@{username}</ProfileHeaderHandle>
					<p>
						{loading || !viewingUser ? (
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
