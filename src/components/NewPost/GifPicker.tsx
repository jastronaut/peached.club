import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { Input } from '../../Theme/Form';
import SearchIcon from '../../Theme/Icons/SearchIcon';
import Loading from '../../Theme/Loading';

const SearchBarWrapper = styled.div<{ isSearching: boolean }>`
	position: relative;
	> * {
		position: absolute;
		top: 0;
		left: 0;
	}

	svg {
		z-index: 1000;
		padding-left: ${rem(6)};
		padding-top: ${rem(2)};
		stroke: ${props =>
			props.isSearching ? props.theme.accent : props.theme.text.muted};
	}

	input {
		padding-left: ${rem(32)};
	}
`;

const GifResultsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	overflow: hidden;
	margin-bottom: ${rem(16)};
`;

const Gif = styled.img<{ index: number }>`
	object-fit: cover;
	max-width: ${rem(160)};
	max-height: ${rem(150)};
	cursor: pointer;
	transition: 0.2s ease scale;

	:hover {
		scale: 0.9;
	}

	:active {
		scale: 0.8;
	}
`;

const SearchBar = (props: { setQuery: Function; query: string }) => {
	return (
		<SearchBarWrapper isSearching={props.query.length > 2}>
			<SearchIcon />
			<Input type='text' onChange={e => props.setQuery(e.target.value)} />
		</SearchBarWrapper>
	);
};

const Wrapper = styled.div`
	:first-child {
		padding-bottom: ${rem(36)};
	}
`;

type GiphyItem = {
	type: string;
	id: string;
	url: string;
	images: {
		preview_gif: { url: string };
		fixed_width: { url: string };
	};
};

type GiphyResponse = {
	data: GiphyItem[];
	meta: {
		status: string;
	};
};

export const GifPicker = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<GiphyItem[]>([]);

	useEffect(() => {
		getGifs();
	}, []);

	useEffect(() => {
		if (query.length < 3) {
			return;
		}

		getGifs(query);
	}, [query]);

	const getGifs = async (query?: string) => {
		const req = {
			method: 'GET',
		};

		const encodedQuery = query ? encodeURI(query) : '';

		await fetch(
			`https://api.giphy.com/v1/gifs/${
				query ? 'search' : 'trending'
			}?api_key=K5EpOLehH5FTKj1CDFe87RyzS5rxrKbY${
				query ? `&q=` + encodedQuery : ''
			}&limit=5&offset=0&rating=pg-13&lang=en`,
			req
		)
			.then(resp => resp.json())
			.then((resp: GiphyResponse) => {
				if (!resp.meta.status || resp.meta.status !== '200' || !resp.data) {
					console.error('error occured when trying to get gifs from giphy');
					return;
				}

				setResults(resp.data);
			});
	};

	return (
		<Wrapper>
			{!results ? (
				<Loading />
			) : (
				<GifResultsWrapper>
					{results.map((res, index) => (
						<Gif
							src={res.url}
							key={`giphy-${index}`}
							index={index}
							loading='lazy'
						/>
					))}
				</GifResultsWrapper>
			)}
			<SearchBar setQuery={setQuery} query={query} />
		</Wrapper>
	);
};
