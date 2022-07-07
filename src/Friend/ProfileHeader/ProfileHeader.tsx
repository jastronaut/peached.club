import React from 'react';

import { User } from '../../api/interfaces';
import {
	Avatar,
	ProfileHeaderContainer,
	ProfileHeaderText,
	ProfileHeaderHandle,
	ProfileHeaderContent,
} from './style';

export type ProfileHeaderProps = {
	viewingUser: User;
	postsLoaded: boolean;
};

export const ProfileHeader = ({
	viewingUser,
	postsLoaded,
}: ProfileHeaderProps) => {
	return (
		<ProfileHeaderContainer>
			<ProfileHeaderContent>
				<Avatar>
					<img
						src={
							postsLoaded
								? viewingUser.avatarSrc || '/defaultavatar.jpg'
								: '/defaultavatar.jpg'
						}
						style={{ opacity: postsLoaded ? '1' : '0.5' }}
						alt={`${viewingUser.name}'s avatar`}
					/>
				</Avatar>
				<ProfileHeaderText>
					<h2>{postsLoaded ? viewingUser.displayName : '...'}</h2>
					<ProfileHeaderHandle>@{viewingUser.name}</ProfileHeaderHandle>
					<p>{postsLoaded ? viewingUser.bio : '...'}</p>
				</ProfileHeaderText>
			</ProfileHeaderContent>
		</ProfileHeaderContainer>
	);
};
