import React from 'react';
import { useTheme } from 'styled-components';

interface IconProps {
	title: string;
	titleId: string;
}

function Clock({
	title,
	titleId,
}: React.SVGProps<SVGSVGElement> & IconProps) {
	const theme = useTheme();
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			stroke={theme.text.primary}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='prefix__feather prefix__feather-clock'
			aria-labelledby={titleId}
		>
			<title id={titleId}>{title}</title>
			<circle cx={12} cy={12} r={10} />
			<path d='M12 6v6l4 2' />
		</svg>
	);
}

export default Clock;
