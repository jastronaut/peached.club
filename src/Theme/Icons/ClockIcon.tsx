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
			className='feather feather-clock'
			{...props}
		>
			<circle cx={12} cy={12} r={10} />
			<path d='M12 6v6l4 2' />
		</svg>
	);
};

export default SvgComponent;
