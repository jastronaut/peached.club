import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Notification,
	TextInput,
	Avatar,
	Button,
	Space,
	FileButton,
	Text,
	Switch,
} from '@mantine/core';
import { IconCheck, IconMoonStars, IconSun, IconBeta } from '@tabler/icons';
import { ThemeContext } from 'styled-components';

import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '../../constants';
import { MiniLoader } from '../../Theme/Loading';
import { PeachContext } from '../../PeachContext';
import ACTIONS from '../../api/constants';
import { ImgBBUploadResponse, NameChangeResponse } from '../../api/interfaces';
import api from '../../api';
import { httpTize } from '../../utils/httpTize';

import { Page } from '../../Theme/Layout';
import { Title, SubTitle } from '../../Theme/Type';
import { Label, Fieldset } from '../../Theme/Form';
import {
	SettingsWrapper,
	ErrText,
	SettingsSection,
	LogoutButtonWrapper,
} from './style';
import { ERROR } from '../../api/error';
import { LinkText } from '../../components/Posts/LinkPost';
import { RiseAndFadeAnimationContainer } from '../../Theme/Animations';
import { DEFAULT_AVATAR_SRC } from '../../constants';
import { makeApiCall } from '../../api/api';
import { ExportPostsButton } from '../../components/ExportPostsButton';

const IMG_API_KEY =
	process.env.REACT_APP_IBB_API_KEY || process.env.IBB_API_KEY || '';

export const SettingsPage = () => {
	const navigate = useNavigate();
	const {
		jwt,
		toggleDarkMode,
		curUser,
		setJwt,
		setPeachFeed,
		setConnections,
		darkMode,
		setBetaEnabled,
		betaEnabled,
	} = useContext(PeachContext);

	useEffect(() => {
		if (!jwt || !curUser) {
			navigate('/login', { replace: true });
		}
	}, [jwt, curUser]);

	return (
		<Page>
			<RiseAndFadeAnimationContainer>
				<Title>Settings</Title>
				<SettingsWrapper>
					<CustomizationSection
						toggleDarkMode={toggleDarkMode}
						setBetaEnabled={setBetaEnabled}
						darkMode={darkMode}
						betaEnabled={betaEnabled}
					/>
					<PeachAccountSection
						logout={() => {
							setConnections([]);
							setJwt('');
							setPeachFeed([]);
							localStorage.removeItem(STORAGE_TOKEN_KEY);
							localStorage.removeItem(STORAGE_USER_KEY);
							navigate('/logout', { replace: true });
						}}
						betaEnabled={betaEnabled}
					/>
					<ContactSection />
				</SettingsWrapper>
			</RiseAndFadeAnimationContainer>
		</Page>
	);
};

const ContactSection = () => (
	<SettingsSection>
		<SubTitle>Help or suggestions?</SubTitle>
		<LinkText>
			<a
				href='https://forms.gle/uydFBf1fDCp5gSu97'
				title='peached.club google form'
				target='_blank'
			>
				Fill out this form! 🥳
			</a>
		</LinkText>
	</SettingsSection>
);

const CustomizationSection = (props: {
	toggleDarkMode: Function;
	setBetaEnabled: Function;
	darkMode: boolean;
	betaEnabled: boolean;
}) => {
	const { accent } = useContext(ThemeContext);

	return (
		<SettingsSection>
			<SubTitle>Customize peached.club</SubTitle>
			<Space h='sm' />
			<Switch
				size='md'
				color={accent}
				checked={props.darkMode}
				onChange={() => props.toggleDarkMode()}
				offLabel={<IconSun size={16} stroke={2.5} color={accent} />}
				onLabel={<IconMoonStars size={16} stroke={2.5} color='white' />}
				label='Use dark mode'
			/>

			<Space h='sm' />

			<Switch
				size='md'
				label='Use beta features'
				color={accent}
				checked={props.betaEnabled}
				onChange={e => props.setBetaEnabled(e.target.checked)}
				onLabel={<IconBeta size={16} stroke={2.5} color='yellow' />}
				offLabel={<IconBeta size={16} stroke={2.5} color={accent} />}
			/>
			<Text c='dimmed' ta='right' fz='sm'>
				<a
					href='https://www.notion.so/peached-club-beta-features-0d96217da6d04a54a8271a12762c88ff'
					target='_blank'
					title='peached.club beta features'
				>
					Learn more about beta features
				</a>
			</Text>
		</SettingsSection>
	);
};

export type PeachAccountSectionProps = {
	logout: () => void;
	betaEnabled: boolean;
};

export const PeachAccountSection = (props: PeachAccountSectionProps) => {
	const { jwt, curUserData, setCurUserData } = useContext(PeachContext);
	const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
	const [newUserName, setNewUserName] = useState<string>('');
	const [newDisplayName, setNewDisplayName] = useState<string>('');
	const [newBio, setNewBio] = useState<string>(curUserData.bio);
	const [isLoaderShowing, setLoaderShowing] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);
	const [nameChangeSuccess, setNameChangeSuccess] = useState<boolean>(false);
	const [displayNameChangeSuccess, setDisplayNameChangeSuccess] =
		useState<boolean>(false);
	const [bioChangeSuccess, setBioChangeSuccess] = useState<boolean>(false);

	const onSubmit = () => {
		if (!isButtonDisabled) {
			setShowError(false);
			setNameChangeSuccess(false);
			setDisplayNameChangeSuccess(false);
			setBioChangeSuccess(false);
			if (newUserName) {
				setLoaderShowing(true);
				api(ACTIONS.changeUserName, jwt, {
					name: newUserName,
				}).then((response: NameChangeResponse) => {
					setLoaderShowing(false);
					if (response.success) {
						setNameChangeSuccess(true);
					} else {
						if (
							response.error &&
							response.error.Code === ERROR.usernameAlreadyExists
						) {
							setShowError(true);
						}
					}
				});
			}

			if (newDisplayName) {
				setLoaderShowing(true);
				api(ACTIONS.changeDisplayName, jwt, {
					displayName: newDisplayName,
				}).then((response: NameChangeResponse) => {
					setLoaderShowing(false);
					if (response.success) {
						setDisplayNameChangeSuccess(true);
					} else {
						if (response.error) {
							setShowError(true);
						}
					}
				});
			}

			if (newBio && newBio !== curUserData.bio) {
				setLoaderShowing(true);
				api(ACTIONS.changeBio, jwt, {
					bio: newBio,
				}).then((response: NameChangeResponse) => {
					setLoaderShowing(false);
					if (response.success) {
						setBioChangeSuccess(true);
					} else {
						if (response.error) {
							setShowError(true);
						}
					}
				});
			}
		}
	};

	useEffect(() => {
		if (
			newUserName !== '' ||
			newDisplayName !== '' ||
			(newBio !== '' && newBio.length <= 200)
		) {
			setButtonDisabled(false);
			setNameChangeSuccess(false);
		} else setButtonDisabled(true);
	}, [newUserName, newDisplayName, newBio]);

	const onClickUploadAvatar = useCallback(
		async (file: File | null) => {
			if (!file || !jwt) {
				return;
			}

			try {
				const formData = new FormData();
				formData.append('image', file);

				const uploadResp = await makeApiCall<ImgBBUploadResponse>({
					uri: `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`,
					body: formData,
					method: 'POST',
					stringify: false,
				});

				const success = uploadResp.success;

				if (!success) {
					throw Error();
				}

				const { url } = uploadResp.data.image;
				const uploadAvatarResp = await makeApiCall<{
					data: { avatarSrc: string };
					success: number;
				}>({
					uri: `stream/avatarSrc`,
					body: {
						avatarSrc: url,
					},
					method: 'PUT',
					jwt,
				});

				if (!uploadAvatarResp.data.avatarSrc) {
					throw Error('Couldnt upload new pfp to peach!');
				}

				setCurUserData({
					...curUserData,
					avatarSrc: uploadAvatarResp.data.avatarSrc,
				});
			} catch (e) {
				console.error(e);
			}
		},
		[jwt, curUserData]
	);

	return (
		<SettingsSection>
			<SubTitle>Peach account settings</SubTitle>
			<Fieldset>
				<Label htmlFor='displayName'>Avatar</Label>
				<Avatar
					src={
						curUserData.avatarSrc
							? httpTize(curUserData.avatarSrc)
							: DEFAULT_AVATAR_SRC
					}
					size='xl'
					radius='xl'
				/>
				<Space h='sm' />
				<FileButton
					onChange={onClickUploadAvatar}
					accept='image/png,image/jpeg'
				>
					{props => (
						<Button radius='md' {...props}>
							Upload new avatar
						</Button>
					)}
				</FileButton>
				<Space h='lg' />
				<Label htmlFor='displayName'>Display name</Label>
				<TextInput
					id='displayName'
					type='text'
					value={newDisplayName}
					placeholder={curUserData.displayName}
					onChange={e => setNewDisplayName(e.target.value)}
				/>
				{isLoaderShowing && newDisplayName ? <MiniLoader /> : null}
				{showError && newDisplayName ? (
					<ErrText>
						Can't change display name at the moment... please try again later!
					</ErrText>
				) : null}
				{displayNameChangeSuccess && !showError && (
					<Notification
						icon={<IconCheck size={18} />}
						color='teal'
						onClose={() => setDisplayNameChangeSuccess(false)}
					>
						You'll now be known as {newDisplayName}!
					</Notification>
				)}
			</Fieldset>
			<Fieldset>
				<Label htmlFor='userName'>Username</Label>
				<TextInput
					id='userName'
					type='text'
					value={newUserName}
					placeholder={curUserData.name}
					onChange={e => setNewUserName(e.target.value)}
				/>
				{isLoaderShowing && newUserName ? <MiniLoader /> : null}
				{showError && newUserName ? (
					<ErrText>Username is already taken!</ErrText>
				) : null}

				{nameChangeSuccess && !showError && (
					<Notification
						icon={<IconCheck size={18} />}
						color='teal'
						onClose={() => setNameChangeSuccess(false)}
					>
						The handle @{newUserName} now belongs to YOU!
					</Notification>
				)}
			</Fieldset>
			<Fieldset>
				<Label htmlFor='bio'>Bio</Label>
				<TextInput
					id='bio'
					type='text'
					value={newBio}
					placeholder={curUserData.bio}
					onChange={e => setNewBio(e.target.value)}
					maxLength={200}
				/>
				{isLoaderShowing && newBio ? <MiniLoader /> : null}
				{showError && newBio ? <ErrText>Bio is too long</ErrText> : null}
				{bioChangeSuccess && !showError && (
					<Notification
						icon={<IconCheck size={18} />}
						color='teal'
						onClose={() => setBioChangeSuccess(false)}
					>
						New bio? No problem.
					</Notification>
				)}
			</Fieldset>
			<Space h='md' />
			<Button
				disabled={isButtonDisabled}
				onClick={() => onSubmit()}
				radius='md'
			>
				Submit
			</Button>
			{props.betaEnabled && (
				<>
					<Space h='md' />
					<ExportPostsButton id={curUserData.id} token={jwt} />
				</>
			)}

			<LogoutButtonWrapper>
				<Button onClick={() => props.logout()} color='red' radius='md'>
					Log out
				</Button>
			</LogoutButtonWrapper>
		</SettingsSection>
	);
};
