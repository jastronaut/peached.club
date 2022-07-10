import React from 'react';
import dayjs from 'dayjs';

import { ImageUploadButton, MagicPostActionsContainer } from './style';
import ImageIcon from './ImageIcon';
import ClockIcon from '../Theme/Icons/ClockIcon';
import CalendarIcon from '../Theme/Icons/CalendarIcon';

export const getCurrentTime = (currentPostLen: number) => {
	const now = dayjs().format('h:mm A');
	return `${currentPostLen ? '\n' : ''}🕓 ${now}\n`;
};

export const getCurrentDate = (currentPostLen: number) => {
	const now = dayjs().format('dddd, MMMM D, YYYY');
	return `${currentPostLen ? '\n' : ''}📰 ${now} \n`;
};

type MagicPostActionsProps = {
	setPostText: React.Dispatch<React.SetStateAction<string>>;
	uploadImage: (files: FileList | null, id: string) => void;
	curUserId: string | null;
};

export const MagicPostActions = (props: MagicPostActionsProps) => {
	return (
		<MagicPostActionsContainer>
			<ImageUploadButton>
				<ImageIcon accented />
				<input
					type='file'
					accept='image*'
					onChange={e =>
						props.curUserId
							? props.uploadImage(e.target.files, props.curUserId)
							: null
					}
				/>
			</ImageUploadButton>
			<ImageUploadButton>
				<ClockIcon
					onClick={() =>
						props.setPostText(
							postText => postText + getCurrentTime(postText.length)
						)
					}
				/>
			</ImageUploadButton>
			<ImageUploadButton>
				<CalendarIcon
					onClick={() =>
						props.setPostText(
							postText => postText + getCurrentDate(postText.length)
						)
					}
				/>
			</ImageUploadButton>
		</MagicPostActionsContainer>
	);
};
