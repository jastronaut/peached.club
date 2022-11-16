import {
	POST_TYPE,
	ImageMessage,
	UploadableMessageTypes,
} from '../../../api/interfaces';

const HTML_NEWLINE_START = `<p><br>`;
const HTML_P_START = `<p>`;
const HTML_P_END = `</p>`;
const HTML_IMG_START = `<img src="`;
const HTML_IMG_END = `">`;

const getImageMessagesFromHTML = (
	text: string,
	uploadedImages: { [key: string]: ImageMessage }
): ImageMessage[] => {
	const imgMessages: ImageMessage[] = [];
	let curText = text;
	while (curText.length > 0) {
		const startImgIndex = curText.indexOf(HTML_IMG_START);

		console.log('lol');
		if (startImgIndex < 0) {
			break;
		}

		const endImgIndex = curText.indexOf(HTML_IMG_END);
		const src = curText.slice(HTML_IMG_START.length, endImgIndex);
		const uploadedImage = uploadedImages[src];
		if (uploadedImage) {
			const im: ImageMessage = {
				type: POST_TYPE.IMAGE,
				src,
				height: uploadedImage.height,
				width: uploadedImage.width,
			};

			imgMessages.push(im);
		}

		curText = curText.slice(endImgIndex + HTML_IMG_END.length);
	}

	return imgMessages;
};

export const parseHTMLForUpload = (
	postText: string,
	uploadedImages: { [key: string]: ImageMessage }
) => {
	let p: UploadableMessageTypes[] = [];
	// remove extra newlines
	const regex = /(<p><br><\/p>){2,}/;
	let curText = postText
		.replace(regex, `<p><br></p>`)
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&');

	while (curText.length > 0) {
		const startTextIndex = curText.indexOf(HTML_P_START);

		if (startTextIndex < 0) {
			break;
		}

		const endTextIndex = curText.indexOf(HTML_P_END);

		const elementContent = curText
			.slice(HTML_P_START.length, endTextIndex)
			.trim();

		const startImgIndex = elementContent.indexOf(HTML_IMG_START);
		if (elementContent.length > 0) {
			if (startImgIndex === 0) {
				// handle images
				const imageMessages = getImageMessagesFromHTML(
					elementContent,
					uploadedImages
				);
				p = [...p, ...imageMessages];
			} else {
				// handle text
				const startLineBreakIndex = curText.indexOf(HTML_NEWLINE_START);
				const lastPostPart = p[p.length - 1];
				if (
					startLineBreakIndex === 0 &&
					lastPostPart &&
					lastPostPart.type === POST_TYPE.TEXT
				) {
					if (lastPostPart) p.pop();
					p.push({
						...lastPostPart,
						text: lastPostPart.text + `\n`,
					});
				} else {
					p.push({
						type: POST_TYPE.TEXT,
						text: elementContent.replace(`<br>`, `\n`),
					});
				}
			}
		}
		curText = curText.slice(endTextIndex + 4);
	}

	// when the composer content is actually empty
	if (p.length === 1 && p[0].type === POST_TYPE.TEXT && p[0].text === `\n`) {
		return [];
	}

	return p;
};
