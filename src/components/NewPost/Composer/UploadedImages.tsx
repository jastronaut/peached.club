import React from 'react';

import { isImage, isGif } from '../../../api/interfaces';

import {
	ImagesHolder,
	ImageWrapper,
	UploadedImage,
	DeleteImage,
} from './style';
import DeleteIcon from '../../../Theme/Icons/DeleteIcon';
import { UploadableMessageTypes } from '../../../api/interfaces';

type ImageProps = {
	images: UploadableMessageTypes[];
	setImages: React.Dispatch<React.SetStateAction<UploadableMessageTypes[]>>;
};

export const UploadedImages = ({ images, setImages }: ImageProps) => {
	if (images.length < 1) {
		return null;
	}

	return (
		<ImagesHolder>
			{images.map(
				(img, index) =>
					(isImage(img) || isGif(img)) && (
						<ImageWrapper key={`${index}-${img.src}`}>
							<DeleteImage
								onClick={() =>
									setImages(images =>
										images.filter(i => isImage(i) && i.src && i.src !== img.src)
									)
								}
							>
								<DeleteIcon />
							</DeleteImage>
							<UploadedImage
								src={img.src}
								alt={img.src}
								height={img.height}
								width={img.width}
							/>
						</ImageWrapper>
					)
			)}
		</ImagesHolder>
	);
};
