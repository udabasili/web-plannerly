/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';

import { useGetEmployees } from '../api/getEmployees';

import { EmployeeCard } from './EmployeeCard';
import { EmployeesContainer } from './index.styled';

import { Spinner } from '@/components/Element/Spinner';

export const Employees = () => {
	const { isLoading, data: employees } = useGetEmployees();

	if (isLoading) {
		return <Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
	}

	console.log(employees);
	return (
		<EmployeesContainer>
			{employees?.length === 0 ? (
				<div className="">No Employees</div>
			) : (
				employees?.map((employee) => <EmployeeCard key={employee._id} {...employee} />)
			)}
		</EmployeesContainer>
	);
};
