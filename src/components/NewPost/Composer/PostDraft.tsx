import React from 'react';
import { Image } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

import {
	isImage,
	isText,
	UploadableMessageTypes,
} from '../../../api/interfaces';
import { TextareaAutosizeStyled } from './style';

type PostDraftProps = {
	messages: UploadableMessageTypes[];
	onChangeComposerText: (text: string, index: number) => void;
	setFocusedMessageIndex: (index: number) => void;
	onDoubleClickImage: (index: number) => void;
	focusedMessageIndex: number;
};

export const PostDraft = (props: PostDraftProps) => {
	const uuids: string[] = [];
	props.messages.map(m => uuids.concat(uuidv4()));
	return (
		<>
			{props.messages.map((message, index) => {
				if (isImage(message)) {
					return (
						<Image
							key={`post-draft-${index}-img-${message.src.slice(20)}`}
							src={message.src}
							height={message.height}
							fit='contain'
							withPlaceholder
							onDoubleClick={() => props.onDoubleClickImage(index)}
						/>
					);
				} else if (isText(message)) {
					return (
						<TextareaAutosizeStyled
							key={`post-draft-${index}-txt-${message.text.slice(20)}
							`}
							style={{
								resize: 'none',
								width: '100%',
							}}
							placeholder={index === 0 ? 'write something...' : '...'}
							onChange={e => props.onChangeComposerText(e.target.value, index)}
							autoFocus={props.focusedMessageIndex === index}
							defaultValue={message.text}
							// defaultValue=''
							// value={message.text}
							onFocus={() => props.setFocusedMessageIndex(index)}
							onBlur={() => props.setFocusedMessageIndex(-1)}
						/>
					);
				}
				return;
			})}
		</>
	);
};
