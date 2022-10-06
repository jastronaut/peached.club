import React from 'react';
import Linkify from 'linkify-react';

import { User } from '../../api/interfaces';
import { LINKIFY_OPTIONS } from '../../constants';

import {
	Avatar,
	ProfileHeaderContainer,
	ProfileHeaderText,
	ProfileHeaderHandle,
	ProfileHeaderContent,
} from './style';

export type ProfileHeaderProps = {
	user: User;
	postsLoaded: boolean;
};

export const ProfileHeader = ({ user, postsLoaded }: ProfileHeaderProps) => {
	return (
		<ProfileHeaderContainer>
			<ProfileHeaderContent>
				<Avatar>
					<img
						src={
							postsLoaded
								? user.avatarSrc || '/defaultavatar.jpg'
								: '/defaultavatar.jpg'
						}
						style={{ opacity: postsLoaded ? '1' : '0.5' }}
						alt={`${user.name}'s avatar`}
					/>
				</Avatar>
				<ProfileHeaderText>
					<h2>{postsLoaded ? user.displayName : '......'}</h2>
					<ProfileHeaderHandle>
						@{postsLoaded ? user.name : '......'}
					</ProfileHeaderHandle>
					<p>
						{postsLoaded ? (
							<Linkify tagName='span' options={LINKIFY_OPTIONS}>
								{user.bio}
							</Linkify>
						) : (
							'......'
						)}
					</p>
				</ProfileHeaderText>
			</ProfileHeaderContent>
		</ProfileHeaderContainer>
	);
};
