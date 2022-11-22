import React, { useState, useCallback, useContext } from 'react';
import { FileButton, Button } from '@mantine/core';
import { IconPhotoHeart, IconCalendar, IconClockHour4 } from '@tabler/icons';

import {
	POST_TYPE,
	ImgBBUploadResponse,
	ImageMessage,
	isText,
	UploadableMessageTypes,
	TextMessage,
} from '../../../api/interfaces';
import { UPLOAD_TO_IMGBB } from '../../../api/constants';
import { PeachContext } from '../../../PeachContext';

import { MiniLoader } from '../../../Theme/Loading';
// import Button from '../../../Theme/Button';
import { DeletePrompt } from '../../Comments/style';
import { Modal } from './style';
import { PostDraft } from './PostDraft';
import { getCurrentDate } from '../MagicPostActions';

function createImageUploadRequest(file: File) {
	const formData = new FormData();
	formData.append('image', file);
	formData.append('type', 'file');
	return formData;
}

export type ComposerProps = {
	onSubmit: (messages: UploadableMessageTypes[]) => void;
	setIsComposerShowing: (showing: boolean) => void;
	isOpen: boolean;
	setIsImageLoading: (loading: boolean) => void;
	isImageLoading: boolean;
};

export const Composer = (props: ComposerProps) => {
	const { curUser } = useContext(PeachContext);

	if (!curUser?.id) {
		return null;
	}

	return <ComposerComponent {...props} />;
};

export const ComposerComponent = (props: ComposerProps) => {
	const { onSubmit, setIsComposerShowing, isOpen } = props;
	const [isDismissWarningShowing, setIsDismissWarningShowing] = useState(false);
	const [messages, setMessages] = useState<UploadableMessageTypes[]>([
		{ type: POST_TYPE.TEXT, text: '' },
	]);
	const [editingMessageIndex, setEditingMessageIndex] = useState<number>(-1);

	const onTryDismissComposer = useCallback(() => {
		const isComposerEmpty =
			messages.length < 1 ||
			(isText(messages[0]) && messages[0].text.length < 1);
		if (isComposerEmpty) {
			setIsDismissWarningShowing(false);
			setIsComposerShowing(false);
		} else {
			setIsDismissWarningShowing(true);
		}
	}, [messages]);

	const onChangeComposerText = (text: string, index: number) => {
		setMessages(messages => {
			const curMessages = messages;
			curMessages[index] = {
				type: POST_TYPE.TEXT,
				text: text,
			};
			return curMessages;
		});
		setEditingMessageIndex(index);
	};

	const handleImageUpload = useCallback(
		async (file: File | null) => {
			if (file === null) {
				return;
			}

			setEditingMessageIndex(-1);

			props.setIsImageLoading(true);

			const req = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
				body: createImageUploadRequest(file),
			};

			await fetch(
				UPLOAD_TO_IMGBB(
					process.env.REACT_APP_IBB_API_KEY || process.env.IBB_API_KEY || ''
				),
				req
			)
				.then(resp => resp.json())
				.then((resp: ImgBBUploadResponse) => {
					if (!resp.success) {
						return;
					}

					const { url, width, height } = resp.data;
					const newImage: ImageMessage = {
						type: POST_TYPE.IMAGE,
						src: url,
						height: height,
						width: width,
					};

					const lastMessage = messages[messages.length - 1];
					if (isText(lastMessage) && lastMessage.text.length < 1) {
						messages.pop();
					}

					const messagesToAppend: UploadableMessageTypes[] = [
						newImage,
						{
							type: POST_TYPE.TEXT,
							text: '',
						},
					];

					if (
						messages.length === 1 &&
						isText(messages[0]) &&
						messages[0].text.length < 1
					) {
						setMessages(messagesToAppend);
					} else {
						setMessages(messages => messages.concat(messagesToAppend));
					}
				})
				.catch(e => console.error(e));
			const loadingTimer = setTimeout(
				() => props.setIsImageLoading(false),
				500
			);
			return () => clearTimeout(loadingTimer);
		},
		[messages]
	);

	const onDeleteDraft = () => {
		setMessages([
			{
				type: POST_TYPE.TEXT,
				text: '',
			},
		]);
		setIsDismissWarningShowing(false);
		setIsComposerShowing(false);
		setEditingMessageIndex(-1);
	};

	const addTime = useCallback(() => {
		/*
		setMessages(messages => {
			const timeText = getCurrentDate() + '\n';
			const curMessages = messages;
			const lastMessage = curMessages[messages.length - 1];
			console.log(lastMessage);
			if (isText(lastMessage)) {
				const newText =
					lastMessage.text.length > 1
						? `${lastMessage.text}\n${timeText}`
						: timeText;

				curMessages[messages.length - 1] = {
					...lastMessage,
					text: newText,
				};

				const textarea = document.getElementById(
					`post-draft-${messages.length - 1}`
				);
				if (textarea && textarea.innerText) {
					textarea.innerText = newText;
				}

				return curMessages;
			} else {
				const newMessages = [
					...curMessages,
					{
						type: POST_TYPE.TEXT,
						text: timeText,
					},
				];

				const textarea = document.getElementById(
					`post-draft-${messages.length - 1}`
				);
				if (textarea && textarea.innerText) {
					textarea.innerText = timeText;
				}

				return newMessages;
			}
		});
		*/
		const timeText = getCurrentDate() + '\n';
		const curMessages = messages;
		const lastMessage = curMessages[messages.length - 1];
		console.log(lastMessage);

		if (isText(lastMessage)) {
			const newText =
				lastMessage.text.length > 1
					? `${lastMessage.text}\n${timeText}`
					: timeText;

			curMessages[messages.length - 1] = {
				...lastMessage,
				text: newText,
			};
			console.log('hah', curMessages[messages.length - 1]);

			const textarea = document.getElementById(
				`post-draft-${messages.length - 1}`
			);
			if (textarea && textarea.innerText) {
				textarea.innerText = newText;
			}
			setMessages(curMessages);
			return;
		}
		const timeTextPost: TextMessage = {
			type: POST_TYPE.TEXT,
			text: timeText,
		};
		const newMessages = [...curMessages, timeTextPost];

		const textarea = document.getElementById(
			`post-draft-${messages.length - 1}`
		);
		if (textarea && textarea.innerText) {
			textarea.innerText = timeText;
		}

		setMessages(newMessages);
	}, [messages]);

	const onSubmitPost = (messages: UploadableMessageTypes[]) => {
		onSubmit(messages);
		setMessages([
			{
				type: POST_TYPE.TEXT,
				text: '',
			},
		]);
		setEditingMessageIndex(-1);
	};

	const onKeyUp = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key !== 'Backspace') {
				return;
			}

			if (editingMessageIndex < 1) {
				return;
			}
			console.log('editing message index', editingMessageIndex);

			const focusedMessage = messages[editingMessageIndex];

			if (!focusedMessage || !isText(focusedMessage)) {
				return;
			}

			if (focusedMessage.text.length >= 1) {
				return;
			}

			const prevMessage = messages[editingMessageIndex - 1];
			if (!isText(prevMessage)) {
				return;
			}

			console.log('first');
			const updatedMessages: UploadableMessageTypes[] = [
				...messages.slice(0, editingMessageIndex),
				...messages.slice(editingMessageIndex + 1),
			];
			console.log(updatedMessages);
			console.log('second');

			setMessages(updatedMessages);
			setEditingMessageIndex(-1);
		},
		[editingMessageIndex, messages]
	);

	const onDoubleClickImage = useCallback(
		(index: number) => {
			setEditingMessageIndex(-1);
			const messagesLen = messages.length;
			if (index === 0) {
				if (messagesLen === 1) {
					setMessages([
						{
							type: POST_TYPE.TEXT,
							text: '',
						},
					]);
					return;
				} else {
					setMessages(messages.slice(1));
				}
			} else {
				const updatedMessages = [
					...messages.slice(0, index),
					...messages.slice(index + 1),
				];
				console.log(updatedMessages);
				const lastMessage = updatedMessages[updatedMessages.length - 1];
				if (!isText(lastMessage)) {
					setMessages(
						updatedMessages.concat({
							type: POST_TYPE.TEXT,
							text: '',
						})
					);
				} else {
					setMessages(updatedMessages);
				}
			}
		},
		[messages]
	);

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
				opened={isOpen}
				onClose={() => onTryDismissComposer()}
				onKeyUp={onKeyUp}
				// centered
			>
				<PostDraft
					messages={messages}
					onChangeComposerText={onChangeComposerText}
					setFocusedMessageIndex={setEditingMessageIndex}
					onDoubleClickImage={onDoubleClickImage}
					focusedMessageIndex={editingMessageIndex}
				/>
				{props.isImageLoading && <MiniLoader />}
				<div>
					<Button
						onClick={() =>
							setMessages(messages => {
								return [
									...messages,
									{
										type: POST_TYPE.IMAGE,
										width: 100,
										height: 100,
										src: 'https://pbs.twimg.com/profile_images/1567661993791836162/tG94W0j8_400x400.jpg',
									},
									{
										type: POST_TYPE.TEXT,
										text: '',
									},
								];
							})
						}
					>
						lol
					</Button>
					<FileButton
						onChange={handleImageUpload}
						accept='image/png,image/jpeg'
					>
						{props => (
							<Button variant='light' {...props} compact color='pink'>
								<IconPhotoHeart size={16} />
							</Button>
						)}
					</FileButton>
					{/* <Button variant='light' compact color='orange'>
						<IconCalendar size={16} />
					</Button>
					<Button variant='light' compact color='yellow' onClick={addTime}>
						<IconClockHour4 size={16} />
					</Button> */}
				</div>
				<Button
					// disabled={isComposerEmpty}
					onClick={() => onSubmitPost(messages)}
					color='green'
				>
					Post
				</Button>
			</Modal>
		</>
	);
};
