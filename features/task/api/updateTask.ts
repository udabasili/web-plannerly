import { Dispatch, SetStateAction } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITaskRequest, ITaskResponse } from '../types';

const updateTaskFn = async ({ projectId, updatedData }: { projectId: string; updatedData: ITaskRequest[] }) => {
	const response = await apiCall.patch<ITaskResponse>(`/tasks/${projectId}`, updatedData);
	return response.data;
};

const routes = ['addTasks', 'viewGantt', 'viewTasks', 'pickProject'] as const;
type Routes = typeof routes[number];

type UpdateTaskProps = {
	setLoading: (e: boolean) => void;
	setRoute: (e: Routes) => void;
};

export const useUpdateTask = (props: UpdateTaskProps) => {
	const queryTask = useQueryClient();
	const { isLoading, mutate: updateTask } = useMutation(
		({ projectId, updatedData }: { projectId: string; updatedData: ITaskRequest[] }) =>
			updateTaskFn({ projectId, updatedData }),
		{
			onSuccess: () => {
				queryTask.invalidateQueries('tasks');
				toast.success('Task Data updated successfully');
				props.setLoading && props.setLoading(false);
				props.setRoute && props.setRoute('viewGantt');
			},
			onError: (error: Error) => {
				// props.setLoading && props.setLoading(false);

				toast.error(error.message);
			},
		}
	);
	return {
		updateTask,
		isLoading,
	};
};
