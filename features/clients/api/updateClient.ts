import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IClientRequest, IClientResponse } from '../types';

export type UpdateClientDTO = Omit<IClientRequest, 'profileUrl'>;

const updateClientFn = async ({ id, updatedData }: { id: string; updatedData: UpdateClientDTO }) => {
	const response = await apiCall.patch<IClientResponse>(`/clients/${id}`, updatedData);
	return response.data;
};

export const useUpdateClient = ({ nextFn }: { nextFn: () => void }) => {
	const queryClient = useQueryClient();
	const { isLoading, mutate: updateClient } = useMutation(
		({ id, updatedData }: { id: string; updatedData: UpdateClientDTO }) => updateClientFn({ id, updatedData }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('clients');
				toast.success('Client Data updated successfully');
				nextFn();
			},
			onError: (error: any) => {
				nextFn();
				toast.error(error.response?.data?.message || error.message);
			},
		}
	);
	return {
		updateClient,
		isLoading,
	};
};
