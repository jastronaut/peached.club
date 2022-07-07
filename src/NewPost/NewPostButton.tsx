import React from 'react';
import { NewPostButtonContainer } from './style';
import WritePostIcon from '../Theme/Icons/WritePostIcon';

export const NewPostButton = (props: { setShowComposer: () => void }) => {
	return (
		<NewPostButtonContainer onClick={() => props.setShowComposer()}>
			<WritePostIcon />
		</NewPostButtonContainer>
	);
};
