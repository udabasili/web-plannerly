import { Avatar } from 'flowbite-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { CustomModal } from '@/components/Element/Modal';
import { roles, useGetEmployees } from '@/features/employees';
import { useGetTeam, useUpdateTeam } from '@/features/teams';

type AddEmployeeToTeamProps = {
	isOpen: boolean;
	close: () => void;
	teamId: string;
};

type EmployeeProps = {
	id: string;
	name: string;
	profileUrl: string;
	position: typeof roles[number];
	checked: boolean;
	disabled: boolean;
	setCurrentTeam: React.Dispatch<React.SetStateAction<string[]>>;
};

const Employee = ({ id, name, profileUrl, position, checked, disabled, setCurrentTeam }: EmployeeProps) => {
	const [checkedValue, setChecked] = React.useState(checked);

	const handleChange = () => {
		setChecked(!checkedValue);
	};

	useEffect(() => {
		if (checkedValue) {
			setCurrentTeam((previousTeam) => {
				const set = new Set([...previousTeam, id]);
				return Array.from(set);
			});
		} else {
			setCurrentTeam((previousTeam) => {
				const filteredTeam = previousTeam.filter((team) => team !== id);
				return filteredTeam;
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkedValue, checked]);

	return (
		<li className="py-3 sm:py-4">
			<div className="flex items-center space-x-4">
				<div className="flex-shrink-0">
					<div className="w-10 h-10 rounded-full border-2 border-secondary bg-[antiquewhite] flex justify-center items-center">
						{' '}
						<Image src={profileUrl} alt={name} width={20} height={20} />
					</div>
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium text-gray-900 truncate dark:text-white">{name}</p>
					<p className="text-xs text-gray-500 truncate dark:text-gray-400 font-semibold">
						{disabled ? 'Team Leader' : position}
					</p>
				</div>
				<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
					<input
						id="inline-checkbox"
						type="checkbox"
						checked={checkedValue}
						disabled={disabled}
						onChange={handleChange}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 disabled:bg-gray-700 disabled:border-gray-600 disabled:cursor-not-allowed"
					></input>
				</div>
			</div>
		</li>
	);
};

export const AddEmployeeToTeam = (props: AddEmployeeToTeamProps) => {
	const { close, isOpen, teamId } = props;
	const { isLoading, data: employees } = useGetEmployees();
	const { teamData } = useGetTeam(teamId);
	const { updateTeam } = useUpdateTeam({ nextFn: close });
	const [currentTeam, setCurrentTeam] = useState<Array<string>>([]);

	async function submitFn() {
		const teamId = teamData?._id || '';
		await updateTeam({ id: teamId, updatedData: currentTeam });
	}

	function checkIfInTeam(employeeId: string): boolean {
		if (teamData) {
			const filteredTeam = teamData.teamMembers.filter((member) => {
				return member._id === employeeId;
			});
			return filteredTeam.length > 0;
		}
		return false;
	}

	function checkTeamLeader(employeeId: string): boolean {
		if (teamData) {
			const checkIfTeamLeader = teamData.teamLeader._id === employeeId;
			return checkIfTeamLeader;
		}
		return false;
	}

	return (
		<CustomModal onClose={close} title={'Add Employee to team'} isOpen={isOpen} onSuccessFn={submitFn}>
			<ul className="divide-y divide-gray-200 dark:divide-gray-700">
				{employees?.length === 0 ? (
					<div className="">No Employees</div>
				) : (
					employees?.map((employee) => (
						<Employee
							key={employee._id}
							id={employee._id as string}
							name={employee.name}
							profileUrl={employee.profileUrl}
							position={employee.position}
							checked={checkIfInTeam(employee._id as string)}
							disabled={checkTeamLeader(employee._id as string)}
							setCurrentTeam={setCurrentTeam}
						/>
					))
				)}
			</ul>
		</CustomModal>
	);
};
