import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITicketsResponse } from '../types';

const getAllTicketsFn = async () => {
	const response = await apiCall.get<ITicketsResponse>(`tickets`);
	return response.data;
};

export const useGetTickets = () => {
	const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(['tickets'], () => getAllTicketsFn(), {
		select: (data) => {
			return data.message;
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || error.message);
		},
	});
	return {
		isLoading,
		isSuccess,
		isError,
		data,
		error,
		refetch,
	};
};
