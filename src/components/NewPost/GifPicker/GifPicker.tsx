import React, { useEffect, useState, useCallback, useRef } from 'react';

import { GiphyImage, GiphyItem, GiphyResponse } from '../../../api/interfaces';

import Loading from '../../../Theme/Loading';
import {
	Wrapper,
	Gif,
	GifResultsWrapper,
	ScrollAreaStyled,
	SearchBar,
} from './style';

const NUM_GIFS_TO_FETCH = 10;
const LOAD_GIFS_SCROLL_INCREMENT = 200;

export const GifPicker = (props: {
	onGifSelect: (selectedGif: GiphyImage) => void;
}) => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<GiphyItem[]>([]);
	const [scrollPositionX, setScrollPositionX] = useState(0);
	const [greatestScrollPositionX, setGreatestScrollPositionX] = useState(0);
	const prevScrollPositionX = useRef<number>(0);

	useEffect(() => {
		getGifs(true);
	}, []);

	const getGifs = useCallback(
		async (replaceCurrentResults: boolean, query?: string) => {
			const req = {
				method: 'GET',
			};

			const encodedQuery = query ? encodeURI(query) : '';

			await fetch(
				`https://api.giphy.com/v1/gifs/${
					query ? 'search' : 'trending'
				}?api_key=K5EpOLehH5FTKj1CDFe87RyzS5rxrKbY${
					query ? `&q=` + encodedQuery : ''
				}&limit=${NUM_GIFS_TO_FETCH}&offset=${
					NUM_GIFS_TO_FETCH * results.length
				}&rating=pg-13&lang=en`,
				req
			)
				.then(resp => resp.json())
				.then((resp: GiphyResponse) => {
					if (!resp || resp.meta.status !== 200) {
						console.error('error occured when trying to get gifs from giphy');
						return;
					}

					setResults(curResults => {
						if (replaceCurrentResults) {
							return resp.data;
						}

						return [...curResults, ...resp.data];
					});
				});
		},
		[results]
	);

	useEffect(() => {
		if (query.length < 3) {
			return;
		}

		getGifs(true, query);
	}, [query]);

	const getAndSetGifsOnScroll = useCallback(() => {
		const curGreatestScrollPosX = greatestScrollPositionX;

		if (
			(prevScrollPositionX.current as number) < scrollPositionX &&
			scrollPositionX >= greatestScrollPositionX
		) {
			getGifs(false, query);
		}

		if (curGreatestScrollPosX < scrollPositionX) {
			setGreatestScrollPositionX(scrollPositionX);
		}

		prevScrollPositionX.current = scrollPositionX;
	}, [
		scrollPositionX,
		prevScrollPositionX.current,
		greatestScrollPositionX,
		getGifs,
		query,
	]);

	useEffect(() => {
		const threshold = 100;
		const x = scrollPositionX % LOAD_GIFS_SCROLL_INCREMENT;
		const y = prevScrollPositionX.current % LOAD_GIFS_SCROLL_INCREMENT;

		const shouldGetGifs =
			scrollPositionX % LOAD_GIFS_SCROLL_INCREMENT === 0 ||
			(x >= LOAD_GIFS_SCROLL_INCREMENT - threshold &&
				y <= LOAD_GIFS_SCROLL_INCREMENT - threshold);

		if (shouldGetGifs) {
			getAndSetGifsOnScroll();
		}
	}, [scrollPositionX]);

	return (
		<Wrapper>
			{!results ? (
				<Loading />
			) : (
				<ScrollAreaStyled
					onScrollPositionChange={pos => setScrollPositionX(pos.x)}
				>
					<GifResultsWrapper>
						{results.map((gif, index) =>
							gif.images.preview_gif.url ? (
								<Gif
									onClick={() => props.onGifSelect(gif.images.downsized_large)}
									src={gif.images.preview_gif.url}
									key={`giphy-${index}`}
									index={index}
									width={gif.images.preview_gif.width}
									height={gif.images.preview_gif.height}
									loading='lazy'
									title='Add this GIF to post'
								/>
							) : null
						)}
					</GifResultsWrapper>
				</ScrollAreaStyled>
			)}
			<SearchBar setQuery={setQuery} query={query} />
		</Wrapper>
	);
};
