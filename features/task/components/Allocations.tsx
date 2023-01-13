import Image from 'next/image';
import React from 'react';

import { Card, CardBody, CardHeader } from './index.types';

export const Allocations = () => {
	const arrayList = new Array(6).fill(6);

	return (
		<Card className="bg-white px-4">
			<CardHeader className="py-6 font-bold">Allocations</CardHeader>
			<CardBody>
				<div className="flow-root">
					<ul className="divide-y divide-gray-200 dark:divide-gray-700">
						{arrayList.map((_, index) => (
							<li className="py-3 sm:py-4" key={index}>
								<div className="flex items-center space-x-4">
									<div className="shrink-0">
										<Image
											className="h-8 w-8 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
											alt="Neil image"
											height={40}
											width={40}
										/>
									</div>
									<div className="min-w-0 flex-1">
										<p className="truncate text-md font-medium text-gray-900 dark:text-white">
											Neil Sims
										</p>
										<p className="truncate text-sm text-black ">Project</p>
										<p className="truncate text-xs text-gray-500 ">Task</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</CardBody>
		</Card>
	);
};
