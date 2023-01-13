import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { IEmployeeResponse } from '../types';

import { apiCall } from '@/lib/axios';

export const getEmployeeFn = async (id: string) => {
	const response = await apiCall.get<IEmployeeResponse>(`employees/${id}`);
	return response.data;
};

export const useGetEmployee = (id: string) => {
	const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(['employee', id], {
		queryFn: () => getEmployeeFn(id),
		select: (data) => data.message,
		onError: (error: any) => {
			toast.error(error.message);
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
