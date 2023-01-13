import { Timeline, Button } from 'flowbite-react';
import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';

import { CardHeader, CardBody, Card } from './index.types';

export const RecentActivity = () => {
	const arrayList = new Array(6).fill(6);

	return (
		<Card className="bg-white px-4">
			<CardHeader className="py-6 font-bold">Recent Activity</CardHeader>
			<CardBody>
				<Timeline>
					{arrayList.map((_, index) => (
						<Timeline.Item key={index}>
							<Timeline.Point />
							<Timeline.Content>
								<Timeline.Time>40 minutes ago</Timeline.Time>
								<Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
							</Timeline.Content>
						</Timeline.Item>
					))}
				</Timeline>
			</CardBody>
		</Card>
	);
};
