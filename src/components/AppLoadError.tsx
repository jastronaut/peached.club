import React from 'react';
import { Modal, Center, Container, Text } from '@mantine/core';

type Props = {
	isShowing: boolean;
};

export const AppLoadError = (props: Props) => {
	return (
		<Modal
			onClose={() => null}
			opened={props.isShowing}
			withCloseButton={false}
			overlayBlur={5}
			centered
		>
			<Center>
				<Container>
					<Text align='center'>😵‍💫 Peach might be broken.</Text>
					<Text align='center' color='dimmed'>
						Hang tight and try again later!
					</Text>
				</Container>
			</Center>
		</Modal>
	);
};
