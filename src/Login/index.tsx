import React, { useState, useContext, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PeachContext } from '../PeachContext';
import {
	AuthInput,
	Moat,
	Castle,
	Heading,
	DangerTxt,
	Button,
	ButtonCenter,
} from './style';
import { LoginResponse } from '../api/interfaces';
import { LOGIN } from '../api/constants';
enum loginErrors {
	OK,
	INVALID_LOGIN,
	MISSING_CREDENTIALS,
}

export const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');
	const [pw, setPw] = useState<string>('');
	const [err, setErr] = useState<loginErrors>(loginErrors.OK);
	const peachContext = useContext(PeachContext);

	useEffect(() => {
		const peachedToken = localStorage.getItem('peachedToken');
		const user = localStorage.getItem('user');
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
						'peachedToken',
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

	const displayError = (err: loginErrors) => {
		let msg = '';
		if (err === loginErrors.INVALID_LOGIN)
			msg = 'Incorrect username and/or password';
		else msg = 'Missing email and/or password';
		return <DangerTxt>{msg}</DangerTxt>;
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onClickSubmit();
	};

	return (
		<Moat>
			<Castle>
				<Heading>Login</Heading>
				<form onSubmit={onSubmit}>
					<AuthInput
						onChange={e => setEmail(e.target.value)}
						key='email'
						type='text'
						placeholder='email'
					/>
					<AuthInput
						onChange={e => setPw(e.target.value)}
						key='password'
						type='password'
						placeholder='password'
					/>
					<ButtonCenter>
						<Button onClick={onClickSubmit} link='#' lg>
							Submit
						</Button>
					</ButtonCenter>
				</form>
				{err !== loginErrors.OK && displayError(err)}
			</Castle>
		</Moat>
	);
};
