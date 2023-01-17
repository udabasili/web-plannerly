import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITaskResponse } from '../types';

const getTaskFn = async (taskId: string) => {
	const response = await apiCall.get<ITaskResponse>(`/tasks/${taskId}`);
	return response.data;
};

export const useGetTask = (taskId: string) => {
	const {
		data: task,
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => getTaskFn(taskId),
		queryKey: ['tasks', taskId],
		select: (data) => data.message,
		onError: (error: any) => {
			toast.error(error.message);
		},
	});
	return {
		task,
		isLoading,
		isError,
	};
};
