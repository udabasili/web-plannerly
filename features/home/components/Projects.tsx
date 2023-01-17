import React from 'react';

import { Spinner } from '@/components/Element/Spinner';
import { useGetProjects } from '@/features/projects';

import { ProjectContainer } from './index.styled';

export const Projects = () => {
	const { data, isLoading } = useGetProjects();

	if (!isLoading) {
		return <Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
	}
	return <ProjectContainer>Projects</ProjectContainer>;
};
