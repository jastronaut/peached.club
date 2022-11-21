import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification, TextInput } from '@mantine/core';
import { IconCheck } from '@tabler/icons';

import {
	STORAGE_IS_DARK_MODE,
	STORAGE_TOKEN_KEY,
	STORAGE_USER_KEY,
} from '../../constants';
import { MiniLoader } from '../../Theme/Loading';
import { PeachContext } from '../../PeachContext';
import ACTIONS from '../../api/constants';
import { NameChangeResponse } from '../../api/interfaces';
import api from '../../api';

import { Page } from '../../Theme/Layout';
import { Title, SubTitle } from '../../Theme/Type';
import Button from '../../Theme/Button';
import { Label, Fieldset } from '../../Theme/Form';
import NightModeIcon from '../../Theme/Icons/NightModeIcon';
import {
	SettingsWrapper,
	ErrText,
	SettingsSection,
	LogoutButtonWrapper,
} from './style';
import { ERROR } from '../../api/error';
import { LinkText } from '../../components/Posts/LinkPost';
import { RiseAndFadeAnimationContainer } from '../../Theme/Animations';

export const SettingsPage = () => {
	const navigate = useNavigate();
	const { jwt, toggleDarkMode, curUser, setJwt, setPeachFeed, setConnections } =
		useContext(PeachContext);

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
					<CustomizationSection toggleDarkMode={toggleDarkMode} />
					<PeachAccountSection
						logout={() => {
							setConnections([]);
							setJwt('');
							setPeachFeed([]);
							localStorage.removeItem(STORAGE_TOKEN_KEY);
							localStorage.removeItem(STORAGE_USER_KEY);
							localStorage.removeItem(STORAGE_IS_DARK_MODE);
							navigate('/logout', { replace: true });
						}}
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
		<p>
			<LinkText>
				<a
					href='https://forms.gle/uydFBf1fDCp5gSu97'
					title='peached.club issues on github'
				>
					Fill out this form! 🥳
				</a>
			</LinkText>
		</p>
		<SubTitle>Become an angel</SubTitle>
		<p>
			<LinkText>
				<a
					href='https://ko-fi.com/peachedclub'
					title='donate at ko-fi to peachedclub'
				>
					Donate at ko-fi 😇
				</a>
			</LinkText>
		</p>
	</SettingsSection>
);

const CustomizationSection = (props: { toggleDarkMode: Function }) => (
	<SettingsSection>
		<SubTitle>Customize app appearance</SubTitle>
		<Button onClick={() => props.toggleDarkMode()}>
			<NightModeIcon />
			Toggle dark mode
		</Button>
	</SettingsSection>
);

export type PeachAccountSectionProps = {
	logout: () => void;
};

export const PeachAccountSection = (props: PeachAccountSectionProps) => {
	const { jwt, curUserData } = useContext(PeachContext);
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

			if (newBio) {
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

	return (
		<SettingsSection>
			<SubTitle>Peach account settings</SubTitle>
			<Fieldset>
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
			<br />
			<Button disabled={isButtonDisabled} onClick={() => onSubmit()}>
				Submit
			</Button>
			<LogoutButtonWrapper>
				<Button isSmall onClick={() => props.logout()}>
					Log out
				</Button>
			</LogoutButtonWrapper>
		</SettingsSection>
	);
};
