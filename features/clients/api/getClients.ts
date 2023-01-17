import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IClientsResponse } from '../types';

const getAllClientsFn = async () => {
	const response = await apiCall.get<IClientsResponse>(`clients`);
	return response.data;
};

export const useGetClients = () => {
	const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(['clients'], () => getAllClientsFn(), {
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
