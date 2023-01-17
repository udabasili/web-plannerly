import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IProjectResponse } from '../types';

const getProjectFn = async (projectId: string) => {
	const response = await apiCall.get<IProjectResponse>(`/projects/${projectId}`);
	return response.data;
};

export const useGetProject = (projectId: string) => {
	const {
		data: project,
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => getProjectFn(projectId),
		queryKey: ['projects', projectId],
		select: (data) => data.message,
		onError: (error: any) => {
			toast.error(error.message);
		},
	});
	return {
		project,
		isLoading,
		isError,
	};
};
