import React, { SVGProps } from 'react';
import { useTheme } from 'styled-components';

import { SVGIcon } from './constants';

interface IconProps extends SVGIcon {
	accented?: boolean;
}

const SvgComponent = (props: IconProps) => {
	const { accented, title, ...args } = props;
	const theme = useTheme();
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
			fill='none'
			stroke={props.accented ? theme.accent : theme.text.primary}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-image'
			{...args}
		>
			{title && <title>{title}</title>}
			<rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
			<circle cx={8.5} cy={8.5} r={1.5} />
			<path d='m21 15-5-5L5 21' />
		</svg>
	);
};

export default SvgComponent;
