import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITasksResponse } from '../types';

const getAllTasksFn = async (projectId: string) => {
	const response = await apiCall.get<ITasksResponse>(`tasks/${projectId}`);
	return response.data;
};

export const useGetTasks = (projectId: string) => {
	const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(
		['tasks'],
		() => getAllTasksFn(projectId),
		{
			select: (data) => {
				return data.message;
			},
			retry: false,
			enabled: !!projectId,
			onError: (error: Error) => {
				toast.error(error.message);
			},
		}
	);
	return {
		isLoading,
		isSuccess,
		isError,
		data,
		error,
		refetch,
	};
};
