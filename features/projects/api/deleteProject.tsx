import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IProjectResponse } from '../types';

const deleteProjectFn = async (projectId: string) => {
	const response = await apiCall.delete<IProjectResponse>(`/projects/${projectId}`);
	return response.data;
};

export const useDeleteProject = (nextFn: () => void) => {
	const queryProject = useQueryClient();
	const { mutate: deleteProject } = useMutation((projectId: string) => deleteProjectFn(projectId), {
		onSuccess: () => {
			toast.success('Project has been deleted');
			queryProject.invalidateQueries(['projects']);
			nextFn();
		},
		onError: (error: Error) => {
			nextFn();
			toast.error(error.message);
		},
	});

	return {
		deleteProject,
	};
};
