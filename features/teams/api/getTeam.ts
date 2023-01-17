import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITeamResponse } from '../types';

const getTeamFn = async (teamId: string | undefined) => {
	const response = await apiCall.get<ITeamResponse>(`/teams/${teamId}`);
	return response.data;
};

export const useGetTeam = (teamId: string | undefined) => {
	const {
		data: teamData,
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => getTeamFn(teamId),
		queryKey: ['teams', teamId],
		enabled: !!teamId,
		select: (data) => data.message,
		onError: (error: any) => {
			toast.error(error.message);
		},
	});
	return {
		teamData,
		isLoading,
		isError,
	};
};
