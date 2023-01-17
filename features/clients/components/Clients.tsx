import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

import { Spinner } from '@/components/Element/Spinner';

import { useGetClients } from '../api/getClients';

import { ClientCard } from './ClientCard';
import { ClientsContainer } from './index.styled';

export const Clients = () => {
	const { isLoading, data: clients } = useGetClients();

	if (isLoading) {
		return <Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
	}

	if (!clients?.length) {
		return (
			<div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
				<FaUserFriends className="w-16 h-16" />
				<h4>No Clients Found</h4>
			</div>
		);
	}

	return (
		<ClientsContainer>
			{clients.length !== 0 ? clients?.map((client) => <ClientCard key={client._id} {...client} />) : null}
		</ClientsContainer>
	);
};
