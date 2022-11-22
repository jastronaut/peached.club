import React, { useState, useContext, useCallback } from 'react';
import { Notification } from '@mantine/core';

import {
	CreatePostResponse,
	isText,
	Post,
	UploadableMessageTypes,
} from '../../api/interfaces';
import { PeachContext } from '../../PeachContext';
import { Composer } from './Composer/Composer';

import Toasty from '../../Theme/Toasty';
import { NewPostButton } from './NewPostButton';
import { makeApiCall } from '../../api/api';

export type NewPostProps = {
	showNewPost: (post: Post) => void;
};

const NewPost = (props: NewPostProps) => {
	const { showNewPost } = props;
	const [isComposerShowimg, setIsComposerShowing] = useState<boolean>(false);
	const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [showToasty, setShowToasty] = useState<boolean>(false);
	const [postSuccess, setPostSuccess] = useState<boolean>(false);
	const [posting, setPosting] = useState<boolean>(false);
	const { jwt } = useContext(PeachContext);

	const submitPost = useCallback(
		async (messages: UploadableMessageTypes[]) => {
			try {
				const resp = await makeApiCall<CreatePostResponse>({
					uri: `post`,
					method: 'POST',
					jwt,
					body: {
						message: messages,
					},
				});

				// @ts-ignore
				if (!resp.data || !resp.success) {
					throw Error();
				}

				const date = new Date();
				const currentTimestamp = date.getTime();
				const { id, message, commentCount, likeCount, likedByMe, isUnread } =
					resp.data;
				const newPost: Post = {
					id,
					message,
					commentCount,
					likeCount,
					likedByMe,
					isUnread,
					createdTime: currentTimestamp,
					updatedTime: currentTimestamp,
				};

				showNewPost(newPost);
				setPostSuccess(true);
				setIsComposerShowing(false);

				setTimeout(() => {
					setSubmitted(false);
					setShowToasty(false);
					setPosting(false);
				}, 2000);
			} catch (e) {
				console.error(e);
				setPostSuccess(false);
			}

			setPosting(false);
		},
		[jwt, showNewPost]
	);

	const onSubmitPost = (messages: UploadableMessageTypes[]) => {
		const messagesLen = messages.length;
		if (
			messagesLen < 1 ||
			(isText(messages[0]) && messages[0].text.length < 1)
		) {
			return;
		}

		setSubmitted(true);
		setShowToasty(true);
		setPosting(true);

		const lastMessage = messages[messagesLen - 1];
		if (isText(lastMessage) && lastMessage.text.length < 1) {
			messages.pop();
		}

		submitPost(messages);
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
			{isImageLoading && (
				<Notification loading disallowClose>
					Loading image...
				</Notification>
			)}
			{submitted && showToasty ? (
				<Toasty onClick={() => setShowToasty(false)}>
					{postStatusMessage(postSuccess, posting)}
				</Toasty>
			) : null}
			<Composer
				onSubmit={onSubmitPost}
				setIsComposerShowing={setIsComposerShowing}
				isOpen={isComposerShowimg}
				setIsImageLoading={setIsImageLoading}
				isImageLoading={isImageLoading}
			/>
			{!isComposerShowimg && (
				<NewPostButton
					toggleComposer={() => setIsComposerShowing(showing => !showing)}
				/>
			)}
		</>
	);
};

export default NewPost;
