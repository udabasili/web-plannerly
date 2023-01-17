import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IProjectRequest, IProjectResponse } from '../types';

export type createProjectDTO = {
	name: string;
	companyName: string;
	profileUrl: string;
	email: string;
	phoneNumber: string;
};

export const createProjectFn = async (newProject: IProjectRequest) => {
	const response = await apiCall.post<IProjectResponse>('/projects', newProject, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const useCreateProject = (nextFn: () => void) => {
	const queryClient = useQueryClient();
	const { mutate: createProject, isLoading } = useMutation(
		(newProject: IProjectRequest) => createProjectFn(newProject),
		{
			onError: (error: any) => {
				toast.error(error.response?.data?.message || error.message);
			},
			onSuccess: () => {
				queryClient.invalidateQueries(['projects']);
				nextFn();
				toast.success('A new project is created');
			},
		}
	);

	return {
		createProject,
		isLoading,
	};
};
