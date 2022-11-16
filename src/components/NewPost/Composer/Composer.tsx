import React, { useState, useCallback, useContext } from 'react';
import { RichTextEditor } from '@mantine/rte';

import {
	POST_TYPE,
	GifMessage,
	ImgBBUploadResponse,
	ImageMessage,
} from '../../../api/interfaces';
import { UPLOAD_TO_IMGBB } from '../../../api/constants';
import { makeApiCall } from '../../../api/api';
import { PeachContext } from '../../../PeachContext';

import Button from '../../../Theme/Button';
import { DeletePrompt } from '../../Comments/style';

import { Modal } from './style';
import { MagicPostActions } from '../MagicPostActions';
import { GiphyImage, UploadableMessageTypes } from '../../../api/interfaces';
import { parseHTMLForUpload } from './utils';

const IMG_API_KEY =
	process.env.REACT_APP_IBB_API_KEY || process.env.IBB_API_KEY || '';
const EMPTY_COMPOSER_CONTENT = `<p><br></p>`;

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
	isOpen: boolean;
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
	const { curUserId, onSubmit, toggleComposer, isOpen } = props;
	const [postText, setPostText] = useState<string>('');
	const [images, setImages] = useState<UploadableMessageTypes[]>([]);
	const [isDismissWarningShowing, setIsDismissWarningShowing] = useState(false);
	const [uploadedImages, setUploadedImages] = useState<{
		[key: string]: ImageMessage;
	}>({});

	const uploadImage = async (files: FileList | null, id: string) => {
		if (files === null || files.length < 1) {
			return;
		}

		const req2 = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
			},
			body: createImageUploadRequest(files),
		};

		await fetch(
			UPLOAD_TO_IMGBB(
				process.env.REACT_APP_IBB_API_KEY || process.env.IBB_API_KEY || ''
			),
			req2
		)
			.then(resp => resp.json())
			.then((resp: ImgBBUploadResponse) => {
				if (!resp.success) {
					return;
				}
				setImages(images =>
					images.concat([
						{
							type: POST_TYPE.IMAGE,
							src: resp.data.url,
							height: resp.data.height,
							width: resp.data.width,
						},
					])
				);
			});
		/*
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
		*/
	};

	const onSubmitPost = useCallback(() => {
		const parsedComposerText = parseHTMLForUpload(postText, uploadedImages);

		if (parsedComposerText[0]) {
			onSubmit(parsedComposerText);
		}
	}, [postText, uploadedImages, onSubmit]);

	const onGifSelect = (selectedGif: GiphyImage) => {
		const gifPost: GifMessage = {
			type: POST_TYPE.GIF,
			src: selectedGif.url,
			width: parseInt(selectedGif.width),
			height: parseInt(selectedGif.height),
		};

		setImages(images => images.concat(gifPost));
	};

	const onTryDismissComposer = () => {
		if (isComposerEmpty) {
			setIsDismissWarningShowing(false);
			toggleComposer();
		} else {
			setIsDismissWarningShowing(true);
		}
	};

	const onChangeComposerText = (text: string) => {
		setPostText(text);
	};

	const isComposerEmpty = !postText || postText === EMPTY_COMPOSER_CONTENT;

	const handleImageUpload = useCallback(
		(file: File): Promise<string> =>
			new Promise((resolve, reject) => {
				const formData = new FormData();
				formData.append('image', file);

				fetch(`https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`, {
					method: 'POST',
					body: formData,
				})
					.then(response => response.json())
					.then((result: ImgBBUploadResponse) => {
						const { url, width, height } = result.data;
						const newImage: ImageMessage = {
							type: POST_TYPE.IMAGE,
							src: url,
							height: height,
							width: width,
						};
						setUploadedImages(uploadedImages => {
							uploadedImages[url] = newImage;
							return uploadedImages;
						});
						return resolve(url);
					})
					.catch(() => reject(new Error('Upload failed')));
			}),
		[]
	);

	const onDeleteDraft = () => {
		setIsDismissWarningShowing(false);
		setPostText('<p><br></p>');
		toggleComposer();
	};

	return (
		<>
			{isDismissWarningShowing && (
				<DeletePrompt
					isShowing
					onDelete={onDeleteDraft}
					onCancel={() => setIsDismissWarningShowing(false)}
				>
					Are you sure you want to abandon this post? 😳
				</DeletePrompt>
			)}
			<Modal
				opened={props.isOpen}
				onClose={() => onTryDismissComposer()}
				centered
			>
				<RichTextEditor
					value={postText}
					onChange={onChangeComposerText}
					controls={[['image']]}
					sticky={false}
					placeholder='write something...'
					onImageUpload={handleImageUpload}
				/>
				<MagicPostActions
					setPostText={setPostText}
					curUserId={curUserId}
					uploadImage={uploadImage}
					onGifSelect={onGifSelect}
				/>
				<Button disabled={isComposerEmpty} onClick={() => onSubmitPost()}>
					Post
				</Button>
			</Modal>
		</>
	);
};
