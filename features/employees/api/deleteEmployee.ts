import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IEmployeeResponse } from '../types';

const deleteEmployeeFn = async (id: string) => {
	const response = await apiCall.delete<IEmployeeResponse>(`employees/${id}`);
	return response.data;
};

export const useDeleteEmployee = (nextFn: () => void) => {
	const queryClient = useQueryClient();
	const { mutate: deleteEmployee } = useMutation((id: string) => deleteEmployeeFn(id), {
		onSuccess: () => {
			queryClient.invalidateQueries('employees');
			toast.success('Employee deleted successfully');
			nextFn();
		},
		onError: (error: any) => {
			nextFn();
			toast.error(error.response?.data?.message || error.message);
		},
	});
	return {
		deleteEmployee,
	};
};
