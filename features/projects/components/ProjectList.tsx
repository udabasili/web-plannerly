import React from 'react';
import { GrProjects } from 'react-icons/gr';

import { Spinner } from '@/components/Element/Spinner';

import { useGetProjects } from '../api/getProjects';
import { projectStates } from '../types';

import { ProjectListContainer } from './index.styled';
import { ProjectItemCard } from './ProjectItemCard';

export const ProjectList = ({ projectState }: { projectState: typeof projectStates[number] }) => {
	const { isLoading, data: projects } = useGetProjects();

	if (isLoading) {
		return <Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
	}

	if (!projects?.length) {
		return (
			<div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
				<GrProjects className="w-10 h-10" />
				<h4>No Projects Found</h4>
			</div>
		);
	}
	console.log(projects);
	return (
		<ProjectListContainer>
			{projects?.length > 0
				? projects?.map((project) => <ProjectItemCard key={project._id} {...project} />)
				: null}
		</ProjectListContainer>
	);
};
