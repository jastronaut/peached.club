import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { MiniLoader } from '../../Theme/Loading';
import { PeachContext } from '../../PeachContext';
import ACTIONS from '../../api/constants';
import { NameChangeResponse } from '../../api/interfaces';
import api from '../../api';
import { Page } from '../../Theme/Layout';
import { Title, SubTitle } from '../../Theme/Type';
import Button from '../../Theme/Button';
import { Input, Label, Fieldset } from '../../Theme/Form';
import NightModeIcon from '../../Theme/Icons/NightModeIcon';
import {
	SettingsWrapper,
	ErrText,
	SuccessText,
	SettingsSection,
	LogoutButtonWrapper,
} from './style';
import { ERROR } from '../../api/error';
import { LinkText } from '../../components/Posts/LinkPost';

export const SettingsPage = () => {
	const navigate = useNavigate();
	const { jwt, toggleDarkMode, curUser } = useContext(PeachContext);

	useEffect(() => {
		if (!jwt || !curUser) {
			navigate('/login', { replace: true });
		}
	}, [jwt, curUser]);

	return (
		<Page>
			<Title>Settings</Title>
			<SettingsWrapper>
				<CustomizationSection toggleDarkMode={toggleDarkMode} />
				<PeachAccountSection
					logout={() => {
						navigate('/logout', { replace: true });
					}}
				/>
				<ContactSection />
			</SettingsWrapper>
		</Page>
	);
};

const ContactSection = () => (
	<SettingsSection>
		<SubTitle>Help or suggestions?</SubTitle>
		<p>
			Create an issue on{' '}
			<LinkText
				href='https://github.com/jastronaut/peached.club/issues'
				title='peached.club issues on github'
			>
				GitHub
			</LinkText>
			🥳
		</p>
		<SubTitle>Become an angel</SubTitle>
		<p>
			Support this project! Donate at{' '}
			<LinkText
				href='https://ko-fi.com/peachedclub'
				title='donate at ko-fi to peachedclub'
			>
				ko-fi
			</LinkText>
		</p>
	</SettingsSection>
);

const CustomizationSection = (props: { toggleDarkMode: Function }) => (
	<SettingsSection>
		<SubTitle>Customize app appearance</SubTitle>

		<Button onClick={() => props.toggleDarkMode()} mode='bad'>
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

	const onSubmit = () => {
		if (!isButtonDisabled) {
			setShowError(false);
			setNameChangeSuccess(false);
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
						setNameChangeSuccess(true);
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
						setNameChangeSuccess(true);
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
				<Input
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
				{!showError && newDisplayName && isLoaderShowing ? (
					<SuccessText>
						Successfully changed your display name! Hi, {newDisplayName}!
					</SuccessText>
				) : null}
			</Fieldset>
			<Fieldset>
				<Label htmlFor='userName'>Username</Label>
				<Input
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
				{!showError && newUserName && nameChangeSuccess ? (
					<SuccessText>
						Successfully changed your username! Hello, {newUserName}!
					</SuccessText>
				) : null}
			</Fieldset>
			<Fieldset>
				<Label htmlFor='bio'>Bio</Label>
				<Input
					id='bio'
					type='text'
					value={newBio}
					placeholder={curUserData.bio}
					onChange={e => setNewBio(e.target.value)}
					maxLength={200}
				/>
				{isLoaderShowing && newBio ? <MiniLoader /> : null}
				{showError && newBio ? <ErrText>Bio is too long</ErrText> : null}
				{!showError && newBio && nameChangeSuccess ? (
					<SuccessText>Bio updated</SuccessText>
				) : null}
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
