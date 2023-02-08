import React, { useContext, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import dayjs from 'dayjs';
import {
	IconTemperature,
	IconMoodSmile,
	IconCalendar,
	IconClockHour4,
} from '@tabler/icons';

import { EMPTY_COMPOSER_CONTENT } from './Composer/Composer';

import { ActionButton, MagicPostActionsGroup } from './style';
import { GifPicker } from './GifPicker/GifPicker';
import { OpenWeatherResponse, GiphyImage, Weather } from '../../api/interfaces';
import { makeApiCall } from '../../api/api';
import { kelvinToFahrenheit } from './utils';
import { PeachContext } from '../../PeachContext';

export const getCurrentTime = () => {
	const now = dayjs().format('h:mm A');
	return `🕓 ${now}\n`;
};

export const getCurrentDate = () => {
	const now = dayjs().format('dddd, MMMM D, YYYY');
	return `📰 ${now}\n`;
};

type DisplayedActionInteraction = 'Oracle' | 'Gif';

const GifPickerComponent = (props: {
	onGifSelect: (selectedGif: GiphyImage) => void;
}) => {
	const [flip, set] = useState(false);

	const springProps = useSpring({
		from: { transform: 'scaleY(0.3)', opacity: 0 },
		to: { transform: 'scaleY(1)', opacity: 1 },
		delay: 100,
		config: config.wobbly,
		onRest: () => set(!flip),
	});

	return (
		<animated.div style={springProps}>
			<GifPicker onGifSelect={props.onGifSelect} />
		</animated.div>
	);
};
function getWeatherEmoji(weather: Weather, time: number) {
	const id = weather.id;
	const night = time < 3 || time > 17;

	if (id < 300) {
		return `⛈`;
	} else if (id < 400) {
		return `🌧`;
	} else if (id < 511) {
		return `🌧`;
	} else if (id < 520) {
		return `❄️`;
	} else if (id < 600) {
		return '🌧';
	} else if (id < 700) {
		return `❄️`;
	} else if (id < 800) {
		return `🌫`;
	} else if (id === 800) {
		if (night) {
			return `🌙`;
		}
		return `☀️`;
	} else if (id === 801) {
		if (night) {
			return `☁️`;
		}
		return `🌤`;
	} else if (id === 802) {
		return `☁️`;
	} else if (id > 802) {
		if (night) {
			return `☁️`;
		}
		return `⛅️`;
	}
}

type MagicPostActionsProps = {
	setPostText: React.Dispatch<React.SetStateAction<string>>;
	uploadImage: (files: FileList | null, id: string) => void;
	curUserId: string | null;
	onGifSelect: (selectedGif: GiphyImage) => void;
};

type WeatherCommand = 'greeting' | 'weather';

export const MagicPostActions = (props: MagicPostActionsProps) => {
	const [curDisplayedInteraction, setCurDisplayedInteraction] =
		useState<DisplayedActionInteraction | null>(null);
	const { betaEnabled } = useContext(PeachContext);

	const temperatureCommand = (command: WeatherCommand) => {
		const hour = parseInt(dayjs().format('H'));
		const time = dayjs().format('H:mm A');
		if (command === 'greeting' && (hour < 3 || hour > 17)) {
			addToPost(`Good night. 😴🌗<br>${time}<br>`);
			return;
		}
		if (!navigator.geolocation) {
			return 'no';
		}

		const positionSuccess = (position: GeolocationPosition) => {
			const { longitude, latitude } = position.coords;
			const openWeatherKey =
				process.env.REACT_APP_OPEN_WEATHER_API_KEY ||
				process.env.OPEN_WEATHER_API_KEY ||
				'';
			const getWeather = async () => {
				try {
					const resp = await makeApiCall<OpenWeatherResponse>({
						uri: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`,
					});

					if (resp.cod !== 200) {
						throw Error(`Couldn't get weather`);
					}

					const temp = kelvinToFahrenheit(resp.main.temp);
					const emoji = getWeatherEmoji(resp.weather[0], hour);

					if (command === 'weather') {
						addToPost(`${emoji} ${temp}º F\n`);
					} else {
						addToPost(`Good morning! ${emoji} ${temp}ºF<br>${time}<br>`);
					}
				} catch (e) {
					console.error(e);
				}
			};
			getWeather();
		};

		navigator.geolocation.getCurrentPosition(positionSuccess, e =>
			console.error('Couldnt get location', e)
		);
	};

	const addToPost = (content: string) => {
		props.setPostText(postText => {
			if (postText === EMPTY_COMPOSER_CONTENT) {
				return content;
			}
			return postText + '\n' + content;
		});
	};

	return (
		<div>
			<MagicPostActionsGroup spacing={'xs'}>
				<ActionButton title='Add the current time'>
					<IconClockHour4 onClick={() => addToPost(getCurrentTime())} />
				</ActionButton>
				<ActionButton title={`Add today's date`}>
					<IconCalendar onClick={() => addToPost(getCurrentDate())} />
				</ActionButton>
				{betaEnabled && (
					<>
						<ActionButton title='Add the current weather'>
							<IconTemperature onClick={() => temperatureCommand('weather')} />
						</ActionButton>
						<ActionButton title='Add a greeting'>
							<IconMoodSmile onClick={() => temperatureCommand('greeting')} />
						</ActionButton>
					</>
				)}
			</MagicPostActionsGroup>
		</div>
	);
};
