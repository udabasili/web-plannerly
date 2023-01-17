import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { ITeamRequest, ITeamResponse } from '../types';

const updateTeamFn = async ({ id, updatedData }: { id: string; updatedData: Array<string> }) => {
	const response = await apiCall.patch<ITeamResponse>(`/teams/${id}`, updatedData);
	return response.data;
};

export const useUpdateTeam = ({ nextFn }: { nextFn: () => void }) => {
	const queryTeam = useQueryClient();
	const { isLoading, mutate: updateTeam } = useMutation(
		({ id, updatedData }: { id: string; updatedData: Array<string> }) => updateTeamFn({ id, updatedData }),
		{
			onSuccess: () => {
				queryTeam.invalidateQueries('teams');
				toast.success('Team Data updated successfully');
				nextFn();
			},
			onError: (error: any) => {
				nextFn();
				toast.error(error.response?.data?.message || error.message);
			},
		}
	);
	return {
		updateTeam,
		isLoading,
	};
};
