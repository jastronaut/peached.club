import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '../Navigation';
import { MiniLoader } from '../Loading';
import { PeachContext } from '../PeachContext';
import ACTIONS from '../api/constants';
import { NameChangeResponse } from '../api/interfaces';
import api from '../api';
import { Page } from '../Theme/Layout';
import { Title, SubTitle } from '../Theme/Type';
import Button from '../Theme/Button';
import { Input, Label, Fieldset } from '../Theme/Form';
import NightModeDark from '../Navigation/NightModeDark.svg';
import {
	SettingsWrapper,
	ErrText,
	SuccessText,
	SettingsSection,
	LogoutButtonWrapper,
} from './style';
import { ERROR } from '../api/error';
import { LinkText } from '../Friend/Posts/LinkPost';

export const Settings = () => {
	const navigate = useNavigate();
	const { jwt, toggleDarkMode } = useContext(PeachContext);

	if (!jwt) {
		navigate('/login', { replace: true });
	}

	return (
		<>
			<Navigation />
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
		</>
	);
};

const ContactSection = () => (
	<SettingsSection>
		<SubTitle>Help or suggestions?</SubTitle>
		<p>
			Contact @jastronaute on{' '}
			<LinkText
				href='https://twitter.com/jastronaute'
				title='jastronaute on twitter'
			>
				twitter
			</LinkText>{' '}
			or{' '}
			<LinkText
				href='https://www.instagram.com/jastronaute/'
				title='jastronaute on instagram'
			>
				instagram
			</LinkText>
			, or email jastronaut [at] proton [dot] me. (Or you can contact me on
			peach if you're already friends with me!)
		</p>
	</SettingsSection>
);

const CustomizationSection = (props: { toggleDarkMode: Function }) => (
	<SettingsSection>
		<SubTitle>Customize app appearance</SubTitle>

		<Button onClick={() => props.toggleDarkMode()}>
			<img src={NightModeDark} alt='Dark Mode Icon' />
			Toggle dark mode
		</Button>
	</SettingsSection>
);

export type PeachAccountSectionProps = {
	logout: () => void;
};

export const PeachAccountSection = (props: PeachAccountSectionProps) => {
	const { jwt } = useContext(PeachContext);
	const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
	const [newUserName, setNewUserName] = useState<string>('');
	const [newDisplayName, setNewDisplayName] = useState<string>('');
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
		}
	};

	useEffect(() => {
		if (newUserName !== '' || newDisplayName !== '') {
			setButtonDisabled(false);
			setNameChangeSuccess(false);
		} else setButtonDisabled(true);
	}, [newUserName, newDisplayName]);

	return (
		<SettingsSection>
			<SubTitle>Change your identity</SubTitle>
			<Fieldset>
				<Label htmlFor='displayName'>Display name</Label>
				<Input
					id='displayName'
					type='text'
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
