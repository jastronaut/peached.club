import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { MagicPostActions } from './MagicPostActions';

import { darkTheme } from '../../Theme/theme';
import styled, { ThemeProvider } from 'styled-components';

const ResultBox = styled.div`
	border: 2px solid red;
	padding: 1rem;
`;

export const MPAComponent = () => {
	const [postText, setPostText] = useState('');

	return (
		<ThemeProvider theme={darkTheme}>
			<MagicPostActions
				setPostText={setPostText}
				curUserId='5'
				uploadImage={(files: FileList | null, id: string) => null}
				onGifSelect={() => console.log('hi')}
			/>
			<ResultBox>{postText}</ResultBox>
		</ThemeProvider>
	);
};

export default {
	component: MPAComponent,
} as ComponentMeta<typeof MPAComponent>;
