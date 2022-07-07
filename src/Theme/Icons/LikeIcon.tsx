import React, { SVGProps } from 'react';
import { useTheme } from 'styled-components';

interface Props extends SVGProps<SVGSVGElement> {
	isLiked: boolean;
}

const SvgComponent = (props: Props) => {
	const theme = useTheme();
	const { isLiked, ...args } = props;
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
			fill={isLiked ? 'red' : 'none'}
			stroke={isLiked ? 'red' : theme.text.primary}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-heart'
			{...args}
		>
			<title>Likes</title>
			<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
		</svg>
	);
};

export default SvgComponent;
