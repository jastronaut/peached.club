import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		fill='none'
		stroke='#cacaca'
		strokeWidth={2}
		strokeLinecap='round'
		strokeLinejoin='round'
		className='feather feather-x'
		{...props}
	>
		<title>Delete</title>
		<path d='M18 6 6 18M6 6l12 12' />
	</svg>
);

export default SvgComponent;
