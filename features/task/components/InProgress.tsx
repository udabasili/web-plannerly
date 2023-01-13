import React from 'react';

import { CardHeader, CardBody, Card } from './index.types';

export const InProgress = () => {
	return (
		<Card className="bg-blue-500">
			<CardHeader>Task in Progress</CardHeader>
			<CardBody></CardBody>
		</Card>
	);
};
