import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import dayjs from 'dayjs';

import {
	ActionButton,
	MagicPostActionsContainer,
	PictureInputStyled,
} from './style';
import ImageIcon from '../../Theme/Icons/ImageIcon';
import ClockIcon from '../../Theme/Icons/ClockIcon';
import CalendarIcon from '../../Theme/Icons/CalendarIcon';
import GiftIcon from '../../Theme/Icons/GiftIcon';
import { GifPicker } from './GifPicker/GifPicker';
import { GiphyImage } from '../../api/interfaces';

export const getCurrentTime = (currentPostLen: number) => {
	const now = dayjs().format('h:mm A');
	return `${currentPostLen ? '\n' : ''}🕓 ${now}\n`;
};

export const getCurrentDate = (currentPostLen: number) => {
	const now = dayjs().format('dddd, MMMM D, YYYY');
	return `${currentPostLen ? '\n' : ''}📰 ${now} \n`;
};

const GifPickerComponent = (props: {
	onGifSelect: (selectedGif: GiphyImage) => void;
}) => {
	const [flip, set] = useState(false);

	const springProps = useSpring({
		from: { transform: 'scaleY(0.3)', opacity: 0 },
		to: { transform: 'scaleY(1)', opacity: 1 },
		delay: 100,
		config: config.wobbly,
		onRest: () => set(!flip),
	});

	return (
		<animated.div style={springProps}>
			<GifPicker onGifSelect={props.onGifSelect} />
		</animated.div>
	);
};

type MagicPostActionsProps = {
	setPostText: React.Dispatch<React.SetStateAction<string>>;
	uploadImage: (files: FileList | null, id: string) => void;
	curUserId: string | null;
	onGifSelect: (selectedGif: GiphyImage) => void;
};

export const MagicPostActions = (props: MagicPostActionsProps) => {
	const [isGifPickerShowing, setIsGifPickerShowing] = useState(false);

	return (
		<div>
			<MagicPostActionsContainer>
				<ActionButton>
					<ImageIcon accented title='Add an image to your post' />
					<PictureInputStyled
						type='file'
						accept='image*'
						onChange={e =>
							props.curUserId
								? props.uploadImage(e.target.files, props.curUserId)
								: null
						}
					/>
				</ActionButton>
				<ActionButton>
					<ClockIcon
						onClick={() =>
							props.setPostText(
								postText => postText + getCurrentTime(postText.length)
							)
						}
						title='Add the current time to post'
					/>
				</ActionButton>
				<ActionButton>
					<CalendarIcon
						onClick={() =>
							props.setPostText(
								postText => postText + getCurrentDate(postText.length)
							)
						}
						title="Add today's date to post"
					/>
				</ActionButton>
				<ActionButton>
					<GiftIcon
						onClick={() => setIsGifPickerShowing(i => !i)}
						title='Add GIF to post'
					/>
				</ActionButton>
			</MagicPostActionsContainer>

			{isGifPickerShowing && (
				<GifPickerComponent onGifSelect={props.onGifSelect} />
			)}
		</div>
	);
};
