import React, { useState, useRef, useContext } from 'react';

import {
	ImgurUploadResponse,
	ImageMessage,
	TextMessage,
	isImage,
	POST_TYPE,
} from '../../api/interfaces';
import { PeachContext } from '../../PeachContext';

import Modal from '../../Theme/Modal';
import Button from '../../Theme/Button';

import {
	TextArea,
	Header,
	ImagesHolder,
	ImageWrapper,
	UploadedImage,
	DeleteImage,
} from './style';
import DeleteIcon from '../../Theme/Icons/DeleteIcon';
import { MagicPostActions } from './MagicPostActions';
import { GifPicker } from './GifPicker';

type ImageProps = {
	images: (TextMessage | ImageMessage)[];
	setImages: React.Dispatch<
		React.SetStateAction<(TextMessage | ImageMessage)[]>
	>;
};

const Images = ({ images, setImages }: ImageProps) => {
	return (
		<>
			{images.length > 0 ? (
				<ImagesHolder>
					{images.map(
						img =>
							isImage(img) && (
								<ImageWrapper key={img.src}>
									<DeleteImage
										onClick={() =>
											setImages(images =>
												images.filter(
													i => isImage(i) && i.src && i.src !== img.src
												)
											)
										}
									>
										<DeleteIcon />
									</DeleteImage>
									<UploadedImage src={img.src} alt={img.src} />
								</ImageWrapper>
							)
					)}
				</ImagesHolder>
			) : null}
		</>
	);
};

export type ComposerProps = {
	onSubmit: (messages: (TextMessage | ImageMessage)[]) => void;
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
	const [images, setImages] = useState<(ImageMessage | TextMessage)[]>([]);

	const uploadImage = async (files: FileList | null, id: string) => {
		if (files === null || files.length < 1) return;
		const file = files[0];
		const formData = new FormData();
		formData.append('image', file);
		formData.append('type', 'file');
		const req = {
			method: 'POST',
			headers: {
				Authorization: 'Client-ID 7683e91b3b47a80',
				Accept: 'application/json',
			},
			body: formData,
		};

		await fetch('https://api.imgur.com/3/image', req)
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
						] as (ImageMessage | TextMessage)[]
				  ).concat(images)
				: images
		);
	};

	return (
		<Modal onKeyDown={() => toggleComposer()}>
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
			/>
			<Images images={images} setImages={setImages} />
			<Button
				disabled={images.length < 1 && postText.length < 1}
				onClick={() => onSubmitPost()}
			>
				Post
			</Button>
		</Modal>
	);
};
