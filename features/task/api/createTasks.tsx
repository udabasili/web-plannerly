import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITaskRequest, ITaskResponse } from '../types';

export type createTaskDTO = {
	name: string;
	companyName: string;
	profileUrl: string;
	email: string;
	phoneNumber: string;
};

const routes = ['addTasks', 'viewGantt', 'viewTasks', 'pickProject'] as const;
type Routes = typeof routes[number];

export const createTaskFn = async (newTask: ITaskRequest[]) => {
	const response = await apiCall.post<ITaskResponse>('/tasks', JSON.stringify(newTask), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

type CreateTaskProps = {
	setLoading: (e: boolean) => void;
	setRoute: (e: Routes) => void;
};
export const useCreateTask = (props: CreateTaskProps) => {
	const queryTask = useQueryClient();
	const { mutate: createTask, isLoading } = useMutation((newTask: ITaskRequest[]) => createTaskFn(newTask), {
		onSuccess: () => {
			// nextFn();
			queryTask.invalidateQueries('tasks');
			toast.success('A new Task has been created');
			props.setLoading && props.setLoading(false);
			props.setRoute && props.setRoute('viewTasks');
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || error.message);
			props.setLoading && props.setLoading(false);
		},
	});
	return {
		isLoading,
		createTask,
	};
};
