import React, { useState, useRef, useContext } from 'react';

import {
	ImgurUploadResponse,
	POST_TYPE,
	GifMessage,
	TextMessage,
} from '../../../api/interfaces';
import { UPLOAD_IMAGE } from '../../../api/constants';
import { PeachContext } from '../../../PeachContext';

import Modal from '../../../Theme/Modal';
import Button from '../../../Theme/Button';
import { DeletePrompt } from '../../Comments/style';

import { TextArea } from './style';
import { MagicPostActions } from '../MagicPostActions';
import { GiphyImage, UploadableMessageTypes } from '../../../api/interfaces';
import { UploadedImages } from './UploadedImages';

function createImageUploadRequest(files: FileList) {
	const file = files[0];
	const formData = new FormData();
	formData.append('image', file);
	formData.append('type', 'file');
	return formData;
}

export type ComposerProps = {
	onSubmit: (messages: UploadableMessageTypes[]) => void;
	toggleComposer: () => void;
};

export const Composer = (props: ComposerProps) => {
	const { curUser } = useContext(PeachContext);

	if (!curUser?.id) {
		return null;
	}

	return <ComposerComponent curUserId={curUser.id} {...props} />;
};

export const ComposerComponent = (
	props: ComposerProps & { curUserId: string }
) => {
	const { curUserId, onSubmit, toggleComposer } = props;
	const postRef = useRef<HTMLTextAreaElement>(null);
	const [postText, setPostText] = useState<string>('');
	const [images, setImages] = useState<UploadableMessageTypes[]>([]);
	const [isDismissWarningShowing, setIsDismissWarningShowing] = useState(false);

	const uploadImage = async (files: FileList | null, id: string) => {
		if (files === null || files.length < 1) {
			return;
		}

		const req = {
			method: 'POST',
			headers: {
				Authorization: 'Client-ID f3f088c23280375',
				Accept: 'application/json',
			},
			body: createImageUploadRequest(files),
		};

		await fetch(UPLOAD_IMAGE, req)
			.then(resp => resp.json())
			.then((resp: ImgurUploadResponse) => {
				if (!resp.success) {
					return;
				}
				setImages(images =>
					images.concat([
						{
							type: POST_TYPE.IMAGE,
							src: resp.data.link,
							height: resp.data.height,
							width: resp.data.width,
						},
					])
				);
			});
	};

	const onSubmitPost = () => {
		onSubmit(
			postText.length > 0
				? (
						[
							{
								type: POST_TYPE.TEXT,
								text: postText,
							},
						] as UploadableMessageTypes[]
				  ).concat(images)
				: images
		);
	};

	const onGifSelect = (selectedGif: GiphyImage) => {
		const gifPost: GifMessage = {
			type: POST_TYPE.GIF,
			src: selectedGif.url,
			width: parseInt(selectedGif.width),
			height: parseInt(selectedGif.height),
		};

		setImages(images => images.concat(gifPost));
	};

	const onTryDismissComposer = (postText: string, numImages: number) => {
		if (postText || numImages) {
			setIsDismissWarningShowing(true);
		} else {
			toggleComposer();
		}
	};

	return (
		<Modal onKeyDown={() => onTryDismissComposer(postText, images.length)}>
			<DeletePrompt
				isShowing={isDismissWarningShowing}
				onDelete={toggleComposer}
				onCancel={() => setIsDismissWarningShowing(false)}
			>
				Are you sure you want to abandon this post?
			</DeletePrompt>
			<TextArea
				ref={postRef}
				placeholder="What's going on?"
				onChange={e => setPostText(e.target.value)}
				value={postText}
				autoFocus
			/>
			<MagicPostActions
				setPostText={setPostText}
				curUserId={curUserId}
				uploadImage={uploadImage}
				onGifSelect={onGifSelect}
			/>
			<UploadedImages images={images} setImages={setImages} />
			<Button
				disabled={images.length < 1 && postText.length < 1}
				onClick={() => onSubmitPost()}
			>
				Post
			</Button>
		</Modal>
	);
};
