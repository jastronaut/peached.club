import React, { useState, useCallback, useContext } from 'react';
import { RichTextEditor } from '@mantine/rte';
import {
	Button,
	Modal,
	Center,
	Stack,
	Flex,
	Space,
	Text as MText,
} from '@mantine/core';

import {
	POST_TYPE,
	GifMessage,
	ImgBBUploadResponse,
	ImageMessage,
	UploadableMessageTypes,
	GiphyImage,
} from '../../../api/interfaces';
import { UPLOAD_TO_IMGBB } from '../../../api/constants';
import { PeachContext } from '../../../PeachContext';

import { Text } from '../../../Theme/Type';
import { MagicPostActions } from '../MagicPostActions';
import { parseHTMLForUpload } from './utils';

const IMG_API_KEY =
	process.env.REACT_APP_IBB_API_KEY || process.env.IBB_API_KEY || '';
export const EMPTY_COMPOSER_CONTENT = `<p><br></p>`;

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
	};

	const onSubmitPost = useCallback(() => {
		const parsedComposerText = parseHTMLForUpload(postText, uploadedImages);

		if (parsedComposerText[0]) {
			onSubmit(parsedComposerText);
			setPostText('<p><br></p>');
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
			<Modal
				opened={isOpen}
				onClose={() => onTryDismissComposer()}
				centered
				withCloseButton={false}
			>
				<Modal
					opened={isDismissWarningShowing}
					onClose={() => setIsDismissWarningShowing(false)}
					withCloseButton={false}
					centered
					size={350}
				>
					<Center>
						<Stack>
							<Text style={{ marginBottom: '0' }} centered>
								Are you sure you want to abandon this post? 😳
							</Text>
							<Center>
								<Flex>
									<Button radius='md' color='pink' onClick={onDeleteDraft}>
										Yep
									</Button>
									<Space w='md' />
									<Button
										radius='md'
										color='gray'
										onClick={() => setIsDismissWarningShowing(false)}
									>
										Nope
									</Button>
								</Flex>
							</Center>
						</Stack>
					</Center>
				</Modal>
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
				<Button
					disabled={isComposerEmpty}
					onClick={() => onSubmitPost()}
					color='pink'
					radius='lg'
				>
					Post
				</Button>
				<MText color='red'>
					:( The editor is buggy right now, fixes are on the way!
				</MText>
			</Modal>
		</>
	);
};
