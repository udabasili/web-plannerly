import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITicketResponse } from '../types';

const deleteTicketFn = async (ticketId: string) => {
	const response = await apiCall.delete<ITicketResponse>(`/tickets/${ticketId}`);
	return response.data;
};

export const useDeleteTicket = (nextFn: () => void) => {
	const queryTicket = useQueryClient();
	const { mutate: deleteTicket } = useMutation((ticketId: string) => deleteTicketFn(ticketId), {
		onSuccess: () => {
			toast.success('Ticket has been deleted');
			queryTicket.invalidateQueries(['tickets']);
			nextFn();
		},
		onError: (error: any) => {
			nextFn();
			toast.error(error.response?.data?.message || error.message);
		},
	});

	return {
		deleteTicket,
	};
};
