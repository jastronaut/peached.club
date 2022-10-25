import React, { useState, useContext } from 'react';

import ACTIONS from '../../api/constants';
import api from '../../api';
import {
	CreatePostResponse,
	UploadableMessageTypes,
} from '../../api/interfaces';
import { PeachContext } from '../../PeachContext';
import { Composer } from './Composer/Composer';

import Toasty from '../../Theme/Toasty';
import { NewPostButton } from './NewPostButton';

const NewPost = () => {
	const [showComposer, setShowComposer] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [showToasty, setShowToasty] = useState<boolean>(false);
	const [postSuccess, setPostSuccess] = useState<boolean>(false);
	const [posting, setPosting] = useState<boolean>(false);
	const { jwt } = useContext(PeachContext);

	const submitPost = (messages: UploadableMessageTypes[]) => {
		if (messages.length < 1) return;

		setSubmitted(true);
		setShowToasty(true);
		setPosting(true);
		api(ACTIONS.createPost, jwt, {
			message: messages,
		}).then((response: { data: CreatePostResponse; success: number }) => {
			setPosting(false);
			if (response.success === 1) {
				setPostSuccess(true);
				setShowComposer(false);
			} else {
				setPostSuccess(false);
			}
			setTimeout(() => {
				setSubmitted(false);
				setShowToasty(false);
				setPosting(false);
			}, 2000);
		});
	};

	const postStatusMessage = (postSuccess: boolean, posting: boolean) => {
		return postSuccess
			? 'Successfully created post!'
			: posting
			? 'Posting...'
			: "Couldn't submit post. Please try again later.";
	};

	return (
		<>
			{submitted && showToasty ? (
				<Toasty onClick={() => setShowToasty(false)}>
					{postStatusMessage(postSuccess, posting)}
				</Toasty>
			) : null}
			<Composer
				onSubmit={submitPost}
				toggleComposer={() => setShowComposer(showComposer => !showComposer)}
				isOpen={showComposer}
			/>
			{!showComposer && (
				<NewPostButton
					setShowComposer={() => setShowComposer(isShowing => !isShowing)}
				/>
			)}
		</>
	);
};

export default NewPost;
