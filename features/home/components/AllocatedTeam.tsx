import React from 'react';

import { Spinner } from '@/components/Element/Spinner';
import { useGetTeams } from '@/features/teams';

import { AllocatedTeamContainer, CardBody, CardHeader } from './index.styled';

export const AllocatedTeam = () => {
	const { data: teams, isLoading } = useGetTeams();

	console.log(teams);
	return (
		<AllocatedTeamContainer>
			{isLoading ? (
				<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />
			) : teams ? (
				<>
					<CardHeader>Projects in Progress</CardHeader>
					<CardBody>
						<ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
							{teams.map((team, index) => (
								<li className="py-3 sm:py-4" key={team._id}>
									<div className="flex items-center space-x-4">
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
												Team 1
											</p>
											<p className="text-xs text-gray-500 truncate dark:text-gray-400">
												{/* {team.project.name} */}
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					</CardBody>
				</>
			) : null}
		</AllocatedTeamContainer>
	);
};
