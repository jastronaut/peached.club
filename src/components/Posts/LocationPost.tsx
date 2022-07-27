import React from 'react';
import styled from 'styled-components';
import { LocationMessage } from '../../api/interfaces';

const LocationWrapper = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 1rem;
`;

const LocationIcon = styled.div`
	background-color: #aaa;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	> img {
		width: 50px;
		height: 50px;
	}
`;

const LocationInfo = styled.div`
	margin-left: 1rem;
	> p {
		margin: 0;
	}
`;

const LocationAddress = styled.p`
	margin: 0;
	color: #aaa;
`;

const LocationPost = (props: LocationMessage) => {
	return (
		<LocationWrapper>
			<LocationIcon>
				<img src={props.iconSrc} alt={props.name} />
			</LocationIcon>
			<LocationInfo>
				<p>{props.name}</p>
				{props.formattedAddress.map(addrLine => (
					<LocationAddress key={addrLine}>{addrLine}</LocationAddress>
				))}
			</LocationInfo>
		</LocationWrapper>
	);
};

export default LocationPost;
