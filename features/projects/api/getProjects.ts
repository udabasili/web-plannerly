import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IProjectsResponse } from '../types';

const getAllProjectsFn = async () => {
	const response = await apiCall.get<IProjectsResponse>(`projects`);
	return response.data;
};

export const useGetProjects = () => {
	const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(['projects'], () => getAllProjectsFn(), {
		select: (data) => {
			return data.message;
		},
		onError: (error: Error) => {
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
