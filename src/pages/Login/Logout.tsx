import React, { useContext } from 'react';
import { PeachContext } from '../../PeachContext';
import { useNavigate } from 'react-router';
import Loading from '../../Theme/Loading';
import {
	STORAGE_IS_BETA_ENABLED,
	STORAGE_IS_DARK_MODE,
	STORAGE_USER_KEY,
	STORAGE_TOKEN_KEY,
} from '../../constants';

export const Logout = () => {
	const { setPeachFeed, setJwt } = useContext(PeachContext);
	const navigate = useNavigate();

	setTimeout(() => {
		setJwt('');
		setPeachFeed([]);
		localStorage.removeItem(STORAGE_TOKEN_KEY);
		localStorage.removeItem(STORAGE_USER_KEY);
		localStorage.removeItem(STORAGE_IS_DARK_MODE);
		localStorage.removeItem(STORAGE_IS_BETA_ENABLED);
		navigate('/login', { replace: true });
	}, 500);

	return <Loading />;
};
