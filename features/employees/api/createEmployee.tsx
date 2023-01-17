import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IEmployeeResponse } from '../types';

const createEmployeeFn = async (data: FormData) => {
	const response = await apiCall<IEmployeeResponse>({
		method: 'post',
		url: 'employees',
		data: data,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
};

export const useCreateEmployee = ({ nextFn }: { nextFn: () => void }) => {
	const queryClient = useQueryClient();
	const {
		mutate: createEmployee,
		isError,
		status,
	} = useMutation((employee: FormData) => createEmployeeFn(employee), {
		onSuccess: () => {
			queryClient.invalidateQueries(['employees']);
			toast.success('Employee created successfully');
			nextFn();
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message || error.message);
		},
	});
	return {
		isLoading: status === 'loading',
		createEmployee,
		isError,
	};
};
