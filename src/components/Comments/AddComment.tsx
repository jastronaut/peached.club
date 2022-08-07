import React, { useState, useEffect, useContext } from 'react';
import Dropdown, { DropdownUserItem } from '../../Theme/Dropdown';
import Button from '../../Theme/Button';

import { PeachContext } from '../../PeachContext';
import { User } from '../../api/interfaces';
import { TextArea, AddCommentContainer, ButtonWrapper } from './style';

interface AddCommentProps {
	onSubmit: (txt: string) => void;
	newCommentText?: string;
	setNewCommentText: Function;
}

const AddComment: React.FC<AddCommentProps> = ({
	onSubmit,
	newCommentText = '',
	setNewCommentText,
}) => {
	const [isDropdownShowing, setDropdownShowing] = useState<boolean>(false);
	const [nameSuggestions, setNameSuggestions] = useState<User[]>([]);

	const { peachFeed } = useContext(PeachContext);

	useEffect(() => {
		if (newCommentText.slice(-1) === ' ' || newCommentText.slice(-1) === '@') {
			setDropdownShowing(false);
			setNameSuggestions([]);
			return;
		}

		if (newCommentText.slice(-2, -1) === '@') {
			setDropdownShowing(true);
		}
	}, [newCommentText]);

	useEffect(() => {
		if (!isDropdownShowing) return;
		const commenttxt = newCommentText.split(' ');
		if (commenttxt.length < 1) return;
		let handle = commenttxt[commenttxt.length - 1];
		if (handle.indexOf('@') !== 0) return;
		handle = handle.slice(1);
		setNameSuggestions(
			peachFeed
				.filter(
					user =>
						user.displayName.indexOf(handle) > -1 ||
						user.name.indexOf(handle) > -1
				)
				.slice(0, 6)
				.reverse()
		);
	}, [isDropdownShowing, newCommentText, peachFeed]);

	const autofillUsername = (username: string) => {
		setNewCommentText(
			(newCommentText: string) =>
				newCommentText.slice(0, newCommentText.lastIndexOf('@') + 1) +
				username +
				' '
		);
		setDropdownShowing(false);
	};

	return (
		<AddCommentContainer>
			{isDropdownShowing ? (
				<Dropdown>
					{nameSuggestions.map(u => (
						<DropdownUserItem
							key={u.id}
							username={u.name}
							displayName={u.displayName}
							avatarSrc={u.avatarSrc}
							onClick={() => autofillUsername(u.name)}
						/>
					))}
				</Dropdown>
			) : null}
			<TextArea
				value={newCommentText}
				onChange={e => setNewCommentText(e.target.value)}
				placeholder='Write a comment...'
				autoFocus
			/>
			<ButtonWrapper>
				<Button
					disabled={newCommentText.length < 1}
					onClick={() => {
						if (newCommentText.length > 0) {
							onSubmit(newCommentText);
							setNewCommentText('');
						}
					}}
				>
					Post
				</Button>
			</ButtonWrapper>
		</AddCommentContainer>
	);
};

export default AddComment;
