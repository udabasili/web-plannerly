import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IClientResponse } from '../types';

export type createClientDTO = {
	name: string;
	companyName: string;
	profileUrl: string;
	email: string;
	phoneNumber: string;
};

export const createClientFn = async (newClient: FormData) => {
	const response = await apiCall.post<IClientResponse>('/clients', newClient, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
};

export const useCreateClient = (nextFn: () => void) => {
	const queryClient = useQueryClient();
	const { mutate: createClient, isLoading } = useMutation((newClient: FormData) => createClientFn(newClient), {
		onSuccess: () => {
			nextFn();
			queryClient.invalidateQueries('clients');
			toast.success('A new Client has been created');
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || error.message);
		},
	});
	return {
		isLoading,
		createClient,
	};
};
