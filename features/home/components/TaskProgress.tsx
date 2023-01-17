import clsx from 'clsx';
import React from 'react';

import { Spinner } from '@/components/Element/Spinner';
import { projectCategoryWithIcons, useGetProjects } from '@/features/projects';

import { CardBody, CardHeader, TaskProgressContainer } from './index.styled';

function getProjectIcon(category: string) {
	return projectCategoryWithIcons.filter((project) => project.name === category)[0].icon || '';
}
export const TaskProgress = () => {
	const { data: projects, isLoading } = useGetProjects();

	return (
		<TaskProgressContainer>
			{isLoading ? (
				<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />
			) : projects ? (
				<>
					<CardHeader>Projects in Progress</CardHeader>
					<CardBody>
						<ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
							{projects.map((project, index) => (
								<li className="py-3 sm:py-4" key={project._id}>
									<div className="flex items-center space-x-4">
										<div className="flex justify-center items-center space-x-4 project-item__avatar bg-secondary w-10 h-10 rounded-full">
											<div className="relative">
												<i
													className={clsx([
														getProjectIcon(project.category),
														'text-[2.3rem] text-white',
													])}
												></i>
											</div>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
												{project.name}
											</p>
											<p className="text-xs text-gray-500 truncate dark:text-gray-400">
												{project.category}
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					</CardBody>
				</>
			) : null}
		</TaskProgressContainer>
	);
};
