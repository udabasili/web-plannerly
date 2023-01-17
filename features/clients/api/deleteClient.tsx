import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IClientResponse } from '../types';

const deleteClientFn = async (clientId: string) => {
	const response = await apiCall.delete<IClientResponse>(`/clients/${clientId}`);
	return response.data;
};

export const useDeleteClient = (nextFn: () => void) => {
	const queryClient = useQueryClient();
	const { mutate: deleteClient } = useMutation((clientId: string) => deleteClientFn(clientId), {
		onSuccess: () => {
			toast.success('Client has been deleted');
			queryClient.invalidateQueries(['clients']);
			nextFn();
		},
		onError: (error: any) => {
			nextFn();
			toast.error(error.response?.data?.message || error.message);
		},
	});

	return {
		deleteClient,
	};
};
