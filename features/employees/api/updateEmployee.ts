import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { apiCall } from '@/lib/axios';

import { IEmployeeRequest, IEmployeeResponse } from '../types';

export type UpdateEmployeeDTO = Omit<IEmployeeRequest, 'profileUrl'>;

const updateEmployeeFn = async ({ id, updatedData }: { id: string; updatedData: UpdateEmployeeDTO }) => {
	const response = await apiCall.patch<IEmployeeResponse>(`/employees/${id}`, updatedData);
	return response.data;
};

export const useUpdateEmployee = ({ nextFn }: { nextFn: () => void }) => {
	const queryClient = useQueryClient();
	const { isLoading, mutate: updateEmployee } = useMutation(
		({ id, updatedData }: { id: string; updatedData: UpdateEmployeeDTO }) => updateEmployeeFn({ id, updatedData }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('employees');
				toast.success('Employee Data updated successfully');
				nextFn();
			},
			onError: (error: any) => {
				nextFn();
				toast.error(error.response?.data?.message || error.message);
			},
		}
	);
	return {
		updateEmployee,
		isLoading,
	};
};
