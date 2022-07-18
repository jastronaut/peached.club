import React, { SVGProps } from 'react';
import { useTheme } from 'styled-components';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
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
			className='feather feather-arrow-left'
			{...props}
		>
			<path d='M19 12H5M12 19l-7-7 7-7' />
		</svg>
	);
};

export default SvgComponent;
