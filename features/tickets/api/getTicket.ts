import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITicketResponse } from '../types';

const getTicketFn = async (ticketId: string) => {
	const response = await apiCall.get<ITicketResponse>(`/tickets/${ticketId}`);
	return response.data;
};

export const useGetTicket = (ticketId: string) => {
	const {
		data: ticket,
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => getTicketFn(ticketId),
		queryKey: ['tickets', ticketId],
		select: (data) => data.message,
		onError: (error: any) => {
			toast.error(error.response?.data?.message || error.message);
		},
	});
	return {
		ticket,
		isLoading,
		isError,
	};
};
