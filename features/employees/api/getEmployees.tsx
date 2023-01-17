import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IEmployeesResponse } from '../types';

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
