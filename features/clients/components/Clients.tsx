import React from 'react';

import { ClientProps } from '../types';

import { ClientCard } from './ClientCard';
import { ClientsContainer } from './index.styled';

export const Clients = () => {
	const arrays = new Array(7).fill(1);
	return (
		<ClientsContainer>
			{arrays.map((_, index) => (
				<ClientCard key={index} name={''} companyName={''} profileUrl={''} email={''} phoneNumber={''} />
			))}
		</ClientsContainer>
	);
};
