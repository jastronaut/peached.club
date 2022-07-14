import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { ProfilePic, InfoContainer } from '../../Feed/style';

import { Container } from '../../Theme/Layout';
import { Preview } from '../../Theme/Preview';
import Button, { ButtonLink } from '../../Theme/Button';

type Props = {
	avatarSrc: string;
	name: string;
	bio: string;
	displayName: string;
	children: React.ReactNode;
};

const RequestResponseContainer = styled.div`
	display: flex;
	justify-content: space-between;
	word-wrap: break-word;

	p {
		flex: 2 200px;
	}

	@media screen and (max-width: 900px) {
		flex-direction: column;
		p {
			flex: initial;
		}
	}
`;

const ButtonArea = styled.div`
	display: flex;

	${ButtonLink} {
		margin-right: ${rem(12)};
	}
`;

export const FriendRequestComponent = ({ children, ...props }: Props) => {
	return (
		<Preview {...props}>
			<>
				<RequestResponseContainer>
					<p>{props.bio}</p>
					<ButtonArea>
						<Button mode='success'>accept</Button>
						<Button isInverted>reject</Button>
						<Button mode='bad'>block</Button>
					</ButtonArea>
				</RequestResponseContainer>
			</>
		</Preview>
	);
};
