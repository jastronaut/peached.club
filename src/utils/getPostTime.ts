import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import UpdateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(RelativeTime);
dayjs.extend(UpdateLocale);

dayjs.updateLocale('en', {
	relativeTime: {
		future: 'in %s',
		past: '%s ago',
		s: '%ds',
		m: '1m',
		mm: '%dm',
		h: '1h',
		hh: '%dh',
		d: '1d',
		dd: '%dd',
		M: '1M',
		MM: '%dM',
		y: '1y',
		yy: '%dy',
	},
});

export default (timestamp: number) => {
	const timestampStr = timestamp.toString();
	return dayjs().to(
		timestampStr.length > 10 ? timestamp : dayjs.unix(timestamp),
		true
	);
};

export const formatPostTime = (timestamp: number) => {
	const timestampStr = timestamp.toString();
	return dayjs(
		timestampStr.length > 10 ? timestamp : dayjs.unix(timestamp)
	).format('MMM D, YYYY');
};
