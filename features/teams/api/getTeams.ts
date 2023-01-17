import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITeamsResponse } from '../types';

const getAllTeamsFn = async () => {
	const response = await apiCall.get<ITeamsResponse>(`teams`);
	return response.data;
};

export const useGetTeams = () => {
	const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(['teams'], () => getAllTeamsFn(), {
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
