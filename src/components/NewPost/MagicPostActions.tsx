import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import dayjs from 'dayjs';

import {
	ActionButton,
	PictureInputStyled,
	MagicPostActionsGroup,
} from './style';
import ImageIcon from '../../Theme/Icons/ImageIcon';
import ClockIcon from '../../Theme/Icons/ClockIcon';
import CalendarIcon from '../../Theme/Icons/CalendarIcon';
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

type DisplayedActionInteraction = 'Oracle' | 'Gif';

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
	return (
		<div>
			<MagicPostActionsGroup spacing={'xs'}>
				{/*
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
					*/}
			</MagicPostActionsGroup>
		</div>
	);
};
