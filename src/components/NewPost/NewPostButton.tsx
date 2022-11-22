import React from 'react';
import { NewPostButtonContainer } from './style';
import WritePostIcon from '../../Theme/Icons/WritePostIcon';

export const NewPostButton = (props: { toggleComposer: () => void }) => {
	return (
		<NewPostButtonContainer onClick={props.toggleComposer}>
			<WritePostIcon />
		</NewPostButtonContainer>
	);
};
