import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITicketRequest, ITicketResponse } from '../types';

export type UpdateTicketDTO = Omit<ITicketRequest, 'profileUrl'>;

const updateTicketFn = async ({ id, updatedData }: { id: string; updatedData: UpdateTicketDTO }) => {
	const response = await apiCall.patch<ITicketResponse>(`/tickets/${id}`, updatedData);
	return response.data;
};

export const useUpdateTicket = ({ nextFn }: { nextFn: () => void }) => {
	const queryTicket = useQueryClient();
	const { isLoading, mutate: updateTicket } = useMutation(
		({ id, updatedData }: { id: string; updatedData: UpdateTicketDTO }) => updateTicketFn({ id, updatedData }),
		{
			onSuccess: () => {
				queryTicket.invalidateQueries('tickets');
				toast.success('Ticket Data updated successfully');
				nextFn();
			},
			onError: (error: any) => {
				nextFn();
				toast.error(error.response?.data?.message || error.message);
			},
		}
	);
	return {
		updateTicket,
		isLoading,
	};
};
