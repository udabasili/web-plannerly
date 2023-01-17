/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

import { Spinner } from '@/components/Element/Spinner';

import { useGetEmployees } from '../api/getEmployees';

import { EmployeeCard } from './EmployeeCard';
import { EmployeesContainer } from './index.styled';

export const Employees = () => {
	const { isLoading, data: employees } = useGetEmployees();

	if (isLoading) {
		return <Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
	}

	if (!employees?.length) {
		return (
			<div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
				<FaUserFriends className="w-16 h-16" />
				<h4>No Employees Found</h4>
			</div>
		);
	}
	return (
		<EmployeesContainer>
			{employees?.length !== 0
				? employees?.map((employee) => <EmployeeCard key={employee._id} {...employee} />)
				: null}
		</EmployeesContainer>
	);
};
