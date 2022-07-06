import React, { SVGProps } from 'react';
import { useTheme } from 'styled-components';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
	const theme = useTheme();
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
			fill={theme.background.primary}
			stroke={theme.background.primary}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-moon'
			{...props}
		>
			<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
		</svg>
	);
};

export default SvgComponent;
