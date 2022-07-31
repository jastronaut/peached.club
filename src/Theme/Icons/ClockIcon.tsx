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
			stroke={theme.text.lightest}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-clock'
			{...rest}
		>
			{title && <title>{title}</title>}
			<circle cx={12} cy={12} r={10} />
			<path d='M12 6v6l4 2' />
		</svg>
	);
};

export default SvgComponent;
