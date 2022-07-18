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
			className='feather feather-activity'
			{...props}
		>
			<path d='M22 12h-4l-3 9L9 3l-3 9H2' />
		</svg>
	);
};

export default SvgComponent;
