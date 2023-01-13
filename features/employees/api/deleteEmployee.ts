import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { IEmployeeResponse } from '../types';

import { apiCall } from '@/lib/axios';

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
			toast.error(error.message);
		},
	});
	return {
		deleteEmployee,
	};
};
