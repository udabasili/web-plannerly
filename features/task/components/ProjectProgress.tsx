import { Progress } from 'flowbite-react';
import React from 'react';

import { CardHeader, CardBody, Card } from './index.types';

export const ProjectProgress = () => {
	const arrayList = new Array(6).fill(6);
	return (
		<Card className="bg-white px-4">
			<CardHeader className="py-6 font-bold">Project Progress</CardHeader>
			<CardBody>
				{arrayList.map((_, index) => (
					<Progress
						progress={45}
						label="Flowbite"
						labelPosition="outside"
						labelProgress={true}
						key={index}
						className="mb-5"
					/>
				))}
			</CardBody>
		</Card>
	);
};
