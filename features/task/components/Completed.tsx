import React from 'react';

import { CardHeader, CardBody, Card } from './index.types';

export const Completed = () => {
	return (
		<Card className="bg-blue-500">
			<CardHeader>Task Completed</CardHeader>
			<CardBody></CardBody>
		</Card>
	);
};
