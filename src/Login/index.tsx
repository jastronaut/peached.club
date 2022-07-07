import React, {
	useState,
	useContext,
	useEffect,
	FormEvent,
	SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { PeachContext } from '../PeachContext';
import {
	AuthInput,
	Page,
	Container,
	Heading,
	DangerTxt,
	Button,
	ButtonCenter,
	LoginFormContainer,
} from './style';
import { LoginResponse } from '../api/interfaces';
import { LOGIN } from '../api/constants';
import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '../constants';
enum loginErrors {
	OK,
	INVALID_LOGIN,
	MISSING_CREDENTIALS,
}

const displayError = (err: loginErrors) => {
	let msg = '';
	if (err === loginErrors.INVALID_LOGIN)
		msg = 'Incorrect username and/or password';
	else msg = 'Missing email and/or password';
	return <DangerTxt>{msg}</DangerTxt>;
};

export const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');
	const [pw, setPassword] = useState<string>('');
	const [err, setErr] = useState<loginErrors>(loginErrors.OK);
	const peachContext = useContext(PeachContext);

	useEffect(() => {
		const peachedToken = localStorage.getItem(STORAGE_TOKEN_KEY);
		const user = localStorage.getItem(STORAGE_USER_KEY);
		if (
			peachedToken !== null &&
			peachedToken !== '' &&
			user !== null &&
			user !== ''
		) {
			peachContext.setJwt(peachedToken);
			peachContext.setCurUser(JSON.parse(user));
			navigate('/feed', { replace: true });
		}
	}, [peachContext]);

	const onClickSubmit = () => {
		if (email.indexOf('@') < 1 || email.length < 1 || pw.length < 1) {
			setErr(loginErrors.MISSING_CREDENTIALS);
			return;
		}

		setErr(loginErrors.OK);
		fetch(LOGIN, {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: pw,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.catch(err => console.log(err))
			.then((response: LoginResponse) => {
				if (response.error) {
					setErr(loginErrors.INVALID_LOGIN);
					return;
				}
				if (response.data && response.data.streams[0]) {
					peachContext.setJwt(response.data.streams[0].token);
					localStorage.setItem(
						STORAGE_TOKEN_KEY,
						response.data.streams[0].token
					);

					peachContext.setCurUser(response.data.streams[0]);
					localStorage.setItem(
						'user',
						JSON.stringify(response.data.streams[0])
					);
				}
				navigate('/feed', { replace: true });
			});
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onClickSubmit();
	};

	return (
		<LoginFormContainer>
			<form onSubmit={onSubmit}>
				<LoginComponent
					setEmail={setEmail}
					setPassword={setPassword}
					onClickSubmit={onClickSubmit}
				/>
			</form>
			{err !== loginErrors.OK && displayError(err)}
		</LoginFormContainer>
	);
};

export type LoginComponentProps = {
	setEmail: React.Dispatch<SetStateAction<string>>;
	setPassword: React.Dispatch<SetStateAction<string>>;
	onClickSubmit: () => void;
};

export const LoginComponent = ({
	setEmail,
	setPassword,
	onClickSubmit,
}: LoginComponentProps) => {
	return (
		<Page>
			<Container>
				<Heading>Log in to Peached</Heading>
				<AuthInput
					onChange={e => setEmail(e.target.value)}
					key='email'
					type='text'
					placeholder='email'
				/>
				<AuthInput
					onChange={e => setPassword(e.target.value)}
					key='password'
					type='password'
					placeholder='password'
				/>
				<ButtonCenter>
					<Button onClick={onClickSubmit} link='#' lg>
						Submit
					</Button>
				</ButtonCenter>
			</Container>
		</Page>
	);
};
