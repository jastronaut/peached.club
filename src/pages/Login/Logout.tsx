import React, { useContext } from 'react';
import { PeachContext } from '../../PeachContext';
import { useNavigate } from 'react-router';
import Loading from '../../Theme/Loading';

export const Logout = () => {
	const { setPeachFeed, setJwt } = useContext(PeachContext);
	const navigate = useNavigate();

	setTimeout(() => {
		setJwt('');
		setPeachFeed([]);
		localStorage.removeItem('peachedToken');
		localStorage.removeItem('user');
		localStorage.removeItem('peachedDarkMode');
		navigate('/login', { replace: true });
	}, 500);

	return <Loading />;
};
