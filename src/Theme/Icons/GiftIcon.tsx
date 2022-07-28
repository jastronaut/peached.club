import React from 'react';
import { useTheme } from 'styled-components';

import { SVGIcon } from './constants';

const SvgComponent = (props: SVGIcon) => {
	const { title, ...rest } = props;
	const theme = useTheme();
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
			fill='none'
			stroke={theme.text.primary}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-gift'
			{...rest}
		>
			{title && <title>{title}</title>}
			<path d='M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' />
		</svg>
	);
};

export default SvgComponent;
