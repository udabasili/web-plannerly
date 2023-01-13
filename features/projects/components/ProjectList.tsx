import React from 'react';

import { ProjectListProps } from '../types';

import { ProjectListContainer } from './index.styled';
import { ProjectItemCard } from './ProjectItemCard';

export const ProjectList = (props: ProjectListProps) => {
	const arrays = new Array(7).fill(1);
	return (
		<ProjectListContainer>
			{arrays.map((_, index) => (
				<ProjectItemCard
					key={index}
					name={''}
					category={'UI/UX Design'}
					image={''}
					priority={''}
					budget={0}
					id={''}
					createdAt={''}
				/>
			))}
		</ProjectListContainer>
	);
};
