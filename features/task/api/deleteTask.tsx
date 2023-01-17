import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITaskResponse } from '../types';

const deleteTaskFn = async (taskId: string) => {
	const response = await apiCall.delete<ITaskResponse>(`/tasks/${taskId}`);
	return response.data;
};

export const useDeleteTask = (nextFn: () => void) => {
	const queryTask = useQueryClient();
	const { mutate: deleteTask } = useMutation((taskId: string) => deleteTaskFn(taskId), {
		onSuccess: () => {
			toast.success('Task has been deleted');
			queryTask.invalidateQueries(['tasks']);
			nextFn();
		},
		onError: (error: Error) => {
			nextFn();
			toast.error(error.message);
		},
	});

	return {
		deleteTask,
	};
};
