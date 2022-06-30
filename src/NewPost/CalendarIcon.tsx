import React, { SVGProps } from 'react';
import { useTheme } from 'styled-components';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
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
			{...props}
		>
			<rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
			<path d='M16 2v4M8 2v4M3 10h18' />
		</svg>
	);
};

export default SvgComponent;
