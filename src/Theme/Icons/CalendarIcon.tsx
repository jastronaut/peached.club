import React, { SVGProps } from 'react';
import { useTheme } from 'styled-components';

import { SVGIcon } from './constants';

const SvgComponent = (props: SVGIcon) => {
	const { title, ...rest } = props;
	const theme = useTheme();
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24px'
			height='24px'
			fill='none'
			stroke={theme.text.primary}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-calendar'
			{...rest}
		>
			{title && <title>{title}</title>}
			<rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
			<path d='M16 2v4M8 2v4M3 10h18' />
		</svg>
	);
};

export default SvgComponent;
