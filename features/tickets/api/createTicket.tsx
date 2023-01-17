import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITicketRequest, ITicketResponse } from '../types';

export type createTicketDTO = {
	name: string;
	companyName: string;
	profileUrl: string;
	email: string;
	phoneNumber: string;
};

export const createTicketFn = async (newTicketData: ITicketRequest) => {
	const response = await apiCall.post<ITicketResponse>('/tickets', newTicketData, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const useCreateTicket = (nextFn: () => void) => {
	const queryTicket = useQueryClient();
	const { mutate: createTicket, isLoading } = useMutation(
		(newTicketData: ITicketRequest) => createTicketFn(newTicketData),
		{
			onSuccess: () => {
				nextFn();
				queryTicket.invalidateQueries('tickets');
				toast.success('A new Ticket has been created');
			},
			onError: (error: any) => {
				toast.error(error.response?.data?.message || error.message);
			},
		}
	);
	return {
		isLoading,
		createTicket,
	};
};
