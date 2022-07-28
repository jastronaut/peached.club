import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import dayjs from 'dayjs';

import { ActionButton, MagicPostActionsContainer } from './style';
import ImageIcon from './ImageIcon';
import ClockIcon from '../../Theme/Icons/ClockIcon';
import CalendarIcon from '../../Theme/Icons/CalendarIcon';
import GiftIcon from '../../Theme/Icons/GiftIcon';
import { GifPicker } from './GifPicker';

export const getCurrentTime = (currentPostLen: number) => {
	const now = dayjs().format('h:mm A');
	return `${currentPostLen ? '\n' : ''}🕓 ${now}\n`;
};

export const getCurrentDate = (currentPostLen: number) => {
	const now = dayjs().format('dddd, MMMM D, YYYY');
	return `${currentPostLen ? '\n' : ''}📰 ${now} \n`;
};

const GifPickerComponent = () => {
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
			<GifPicker />
		</animated.div>
	);
};

type MagicPostActionsProps = {
	setPostText: React.Dispatch<React.SetStateAction<string>>;
	uploadImage: (files: FileList | null, id: string) => void;
	curUserId: string | null;
};

export const MagicPostActions = (props: MagicPostActionsProps) => {
	const [isGifPickerShowing, setIsGifPickerShowing] = useState(false);

	return (
		<div>
			<MagicPostActionsContainer>
				<ActionButton>
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
				</ActionButton>
				<ActionButton>
					<ClockIcon
						onClick={() =>
							props.setPostText(
								postText => postText + getCurrentTime(postText.length)
							)
						}
					/>
				</ActionButton>
				<ActionButton>
					<CalendarIcon
						onClick={() =>
							props.setPostText(
								postText => postText + getCurrentDate(postText.length)
							)
						}
					/>
				</ActionButton>
				<ActionButton>
					<GiftIcon onClick={() => setIsGifPickerShowing(i => !i)} />
				</ActionButton>
			</MagicPostActionsContainer>

			{isGifPickerShowing && <GifPickerComponent />}
		</div>
	);
};
