import React from 'react';

import { User } from '../../api/interfaces';
import {
	Avatar,
	ProfileHeaderContainer,
	ProfileHeaderText,
	ProfileHeaderHandle,
	ProfileHeaderContent,
} from './style';

type ProfileHeaderProps = {
	viewingUser: User;
};

export const ProfileHeader = ({ viewingUser }: ProfileHeaderProps) => {
	return (
		<ProfileHeaderContainer>
			<ProfileHeaderContent>
				<Avatar>
					<img
						src={viewingUser.avatarSrc || '/defaultavatar.jpg'}
						alt={`${viewingUser.name}'s avatar`}
					/>
				</Avatar>
				<ProfileHeaderText>
					<h2>{viewingUser.displayName}</h2>
					<ProfileHeaderHandle>@{viewingUser.name}</ProfileHeaderHandle>
					<p>{viewingUser.bio}</p>
				</ProfileHeaderText>
			</ProfileHeaderContent>
		</ProfileHeaderContainer>
	);
};
