import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IClientResponse } from '../types';

const getClientFn = async (clientId: string) => {
	const response = await apiCall.get<IClientResponse>(`/clients/${clientId}`);
	return response.data;
};

export const useGetClient = (clientId: string) => {
	const {
		data: client,
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => getClientFn(clientId),
		queryKey: ['clients', clientId],
		select: (data) => data.message,
		onError: (error: any) => {
			toast.error(error.response?.data?.message || error.message);
		},
	});
	return {
		client,
		isLoading,
		isError,
	};
};
