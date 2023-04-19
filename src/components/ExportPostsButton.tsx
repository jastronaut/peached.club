import React from 'react';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import { Button } from '@mantine/core';

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
		const posts = data.posts;
		const nextCursor = res.data.cursor;

		// add the results to an array
		const allResults = [...posts];

		// if there is a next cursor, make another request recursively
		if (nextCursor) {
			const moreResults = await getAllResults(bearer, uri, nextCursor);
			allResults.push(...moreResults);
		}

		// return all results
		return allResults;
	} catch (error) {
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
