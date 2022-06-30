import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const Settings = () => {
	const navigate = useNavigate();
	const { darkMode, jwt, toggleDarkMode } = useContext(PeachContext);
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

	if (!jwt) {
		navigate('/login', { replace: true });
	}

	return (
		<>
			<Navigation />
			<Page>
				<Title>Settings</Title>
				<SettingsWrapper>
					<SettingsSection>
						<SubTitle>Customize app appearance</SubTitle>

						<Button
							onClick={() => toggleDarkMode()}
							color={darkMode ? 'black' : '#7b7b7b'}
							colorHover={darkMode ? '#7b7b7b' : 'black'}
						>
							<img src={NightModeDark} alt='Dark Mode Icon' />
							Toggle dark mode
						</Button>
					</SettingsSection>
					<SettingsSection>
						<SubTitle>Change your identity</SubTitle>
						<Fieldset>
							<Label htmlFor='displayName'>
								Change display name
							</Label>
							<Input
								id='displayName'
								type='text'
								onChange={e =>
									setNewDisplayName(e.target.value)
								}
							/>
							{isLoaderShowing && newDisplayName ? (
								<MiniLoader />
							) : null}
							{showError && newDisplayName ? (
								<ErrText>
									Can't change display name at the moment.,..
									please try again later!
								</ErrText>
							) : null}
							{!showError &&
							newDisplayName &&
							nameChangeSuccess ? (
								<SuccessText>
									Successfully changed your display name! Hi,{' '}
									{newDisplayName}!
								</SuccessText>
							) : null}
						</Fieldset>
						<Fieldset>
							<Label htmlFor='userName'>Change user name</Label>
							<Input
								id='userName'
								type='text'
								onChange={e => setNewUserName(e.target.value)}
							/>
							{isLoaderShowing && newUserName ? (
								<MiniLoader />
							) : null}
							{showError && newUserName ? (
								<ErrText>Username is already taken!</ErrText>
							) : null}
							{!showError && newUserName && nameChangeSuccess ? (
								<SuccessText>
									Successfully changed your username! Hello,{' '}
									{newUserName}!
								</SuccessText>
							) : null}
						</Fieldset>
						<br />
						<Button
							disabled={isButtonDisabled}
							onClick={() => onSubmit()}
						>
							Submit
						</Button>
						<LogoutButtonWrapper>
							<Link to='/logout'>
								<Button
									isSmall
									color='#ff4c4c'
									colorHover='#ce2222'
								>
									Log out
								</Button>
							</Link>
						</LogoutButtonWrapper>
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
								, or email jas [at] jasdelgado [dot] com. (Or
								you can contact me on peach if you're already
								friends with me!)
							</p>
						</SettingsSection>
					</SettingsSection>
				</SettingsWrapper>
			</Page>
		</>
	);
};

export default Settings;
