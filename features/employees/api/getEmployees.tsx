import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { IEmployeesResponse } from '../types';

import { apiCall } from '@/lib/axios';

const getAllEmployeesFn = async () => {
	const response = await apiCall.get<IEmployeesResponse>(`employees`);
	return response.data;
};

export const useGetEmployees = () => {
	const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(['employees'], () => getAllEmployeesFn(), {
		select: (data) => {
			return data.message;
		},
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
