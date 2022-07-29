import React, { useEffect, useState, useCallback, useRef } from 'react';

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
		status: number;
	};
};

export const GifPicker = () => {
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
							console.log(resp.data);
							return resp.data;
						}

						console.log([...curResults, ...resp.data]);
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

		console.log('made it');
		if (
			(prevScrollPositionX.current as number) < scrollPositionX &&
			scrollPositionX >= greatestScrollPositionX
		) {
			getGifs(false, query);
			console.log('ok');
		}

		console.log('heeya');
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
		console.log(
			greatestScrollPositionX,
			scrollPositionX,
			prevScrollPositionX.current
		);

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
						{results.map(({ images }, index) =>
							images.preview_gif.url ? (
								<Gif
									onClick={() => console.log(images.preview_gif.url)}
									src={images.preview_gif.url}
									key={`giphy-${index}`}
									index={index}
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
