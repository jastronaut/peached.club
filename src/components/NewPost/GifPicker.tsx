//
import React, { useState } from 'react';
import useSWR from 'swr';
import { Grid } from '@mantine/core';
import styled from 'styled-components';
import { rem } from 'polished';

import { fetcher } from '../../api';
import { Input } from '../../Theme/Form';
import SearchIcon from '../../Theme/Icons/SearchIcon';

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

export const GifPicker = () => {
	const [query, setQuery] = useState('');
	const { data, error } = useSWR(
		`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=5&rating=pg-13`,
		fetcher
	);

	if (error) {
		console.error('lol');
	}

	return (
		<Wrapper>
			<Grid>
				<Grid.Col span={4}>
					<img src={data[0].url} loading='lazy' />
				</Grid.Col>
				<Grid.Col span={4}>
					<img src={data[1].url} loading='lazy' />
				</Grid.Col>
				<Grid.Col span={4}>
					<img src={data[2].url} loading='lazy' />
				</Grid.Col>
				<Grid.Col span={4}>
					<img src={data[3].url} loading='lazy' />
				</Grid.Col>
				<Grid.Col span={4}>
					<img src={data[4].url} loading='lazy' />
				</Grid.Col>
			</Grid>
			<SearchBar setQuery={setQuery} query={query} />
		</Wrapper>
	);
};
