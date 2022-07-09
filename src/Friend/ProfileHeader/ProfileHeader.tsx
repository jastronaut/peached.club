import React from 'react';
import Linkify from 'linkify-react';

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

const options = {
	defaultProtocol: 'http',
	target: '_blank',
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
					<ProfileHeaderHandle>
						@{postsLoaded ? viewingUser.name : '...'}
					</ProfileHeaderHandle>
					<p>
						{postsLoaded ? (
							<Linkify tagName='span' options={options}>
								{viewingUser.bio}
							</Linkify>
						) : (
							'...'
						)}
					</p>
				</ProfileHeaderText>
			</ProfileHeaderContent>
		</ProfileHeaderContainer>
	);
};
