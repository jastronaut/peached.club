import React from 'react';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import { Button } from '@mantine/core';
import { Post } from '../api/interfaces';

type CleanedComment = {
	id: string;
	body: string;
	author: {
		id: string;
		name: string;
		displayName: string;
	};
};

async function getAllResults(
	bearer: string,
	uri: string,
	cursor: string | null
) {
	try {
		const response = await fetch(`${uri}${cursor ? `?cursor=${cursor}` : ''}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
		});
		// parse the response
		const res = await response.json();

		const data = await res.data;
		const posts = data.posts || [];
		const nextCursor = res.data.cursor;

		const cleanedPosts = posts
			.map((post: Post) => {
				let comments: CleanedComment[] = [];

				if (post.comments) {
					comments = post.comments.map(comment => {
						const cleanedComment = {
							id: comment.id,
							body: comment.body,
							author: {
								id: comment.author.id,
								name: comment.author.name,
								displayName: comment.author.displayName,
							},
						};

						return cleanedComment;
					});
				}

				const newPost = {
					id: post.id,
					message: post.message,
					commentCount: post.commentCount,
					likeCount: post.likeCount,
					likedByMe: post.likedByMe,
					createdTime: post.createdTime,
					comments,
				};

				return newPost;
			})
			.reverse();

		// add the results to an array
		const allResults = [...cleanedPosts];

		// if there is a next cursor, make another request recursively
		if (nextCursor) {
			const moreResults = await getAllResults(bearer, uri, nextCursor);
			allResults.push(...moreResults);
		}

		// return all results
		return allResults;
	} catch (error) {
		await fetch('https://api.axiom.co/v1/datasets/web-errors/ingest', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_AXIOM_TOKEN}`,
			},
			body: JSON.stringify([
				{
					page: 'ExportPostsButton',
					error: error,
					message: 'Error in getAllResults',
				},
			]),
		});

		console.log(error);
	}

	return [];
}

const getURI = (id: string) =>
	`https://peached-club-proxy.herokuapp.com/https://v1.peachapi.com/stream/id/${id}`;

type ExportPostsButtonProps = {
	id: string;
	token: string;
};

export const ExportPostsButton = ({ token, id }: ExportPostsButtonProps) => {
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async () => {
		try {
			setIsDownloading(true);
			const response = await getAllResults(token, getURI(id), null);
			const data = response;
			const jsonData = JSON.stringify(data);
			const blob = new Blob([jsonData], { type: 'application/json' });
			const fileUrl = URL.createObjectURL(blob);
			saveAs(fileUrl, 'data.json');
		} catch (error) {
			console.error(error);
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<Button
			onClick={handleDownload}
			loading={isDownloading}
			radius='lg'
			color='pink'
		>
			{isDownloading ? 'Downloading...' : 'Export Posts'}
		</Button>
	);
};
