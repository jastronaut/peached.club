import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ScrollArea } from '@mantine/core';

import { Input } from '../../../Theme/Form';
import SearchIcon from '../../../Theme/Icons/SearchIcon';

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

export const GifResultsWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Gif = styled.img<{ index: number }>`
	object-fit: cover;
	min-width: ${rem(120)};
	max-width: ${rem(160)};
	height: ${rem(150)};
	cursor: pointer;
	transition: 0.2s ease all;

	:hover {
		scale: 0.95;
		object-fit: contain;
		transition: 0.2s ease all;
	}

	:active {
		scale: 0.8;
	}
`;

export const ScrollAreaStyled = styled(ScrollArea)`
	height: ${rem(170)};

	.mantine-ScrollArea-scrollbar:hover {
		background-color: initial;
	}
`;

export const SearchBar = (props: { setQuery: Function; query: string }) => {
	return (
		<SearchBarWrapper isSearching={props.query.length > 2}>
			<SearchIcon />
			<Input type='text' onChange={e => props.setQuery(e.target.value)} />
		</SearchBarWrapper>
	);
};

export const Wrapper = styled.div`
	:first-child {
		margin-bottom: ${rem(36)};
	}

	/* overflow-x: scroll; */
`;
