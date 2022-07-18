import React, { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
			fill='none'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-user'
			{...props}
		>
			<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
			<circle cx={12} cy={7} r={4} />
		</svg>
	);
};

export default SvgComponent;
