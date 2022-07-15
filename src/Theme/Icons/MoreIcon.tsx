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
			stroke={theme.text.lightest}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-more-horizontal'
			{...props}
		>
			<circle cx={12} cy={12} r={1} />
			<circle cx={19} cy={12} r={1} />
			<circle cx={5} cy={12} r={1} />
		</svg>
	);
};

export default SvgComponent;
