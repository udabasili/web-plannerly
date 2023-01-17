import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IProjectRequest, IProjectResponse } from '../types';

const updateProjectFn = async ({ id, updatedData }: { id: string; updatedData: IProjectRequest }) => {
	const response = await apiCall.patch<IProjectResponse>(`/projects/${id}`, updatedData);
	return response.data;
};

export const useUpdateProject = ({ nextFn }: { nextFn: () => void }) => {
	const queryProject = useQueryClient();
	const { isLoading, mutate: updateProject } = useMutation(
		({ id, updatedData }: { id: string; updatedData: IProjectRequest }) => updateProjectFn({ id, updatedData }),
		{
			onSuccess: () => {
				queryProject.invalidateQueries('projects');
				toast.success('Project Data updated successfully');
				nextFn();
			},
			onError: (error: Error) => {
				nextFn();
				toast.error(error.message);
			},
		}
	);
	return {
		updateProject,
		isLoading,
	};
};
