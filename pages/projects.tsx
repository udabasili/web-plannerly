import clsx from 'clsx';
import { Tabs } from 'flowbite-react';
import { useState } from 'react';
import { GrAdd } from 'react-icons/gr';

import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { ProjectList, projectStates } from '@/features/projects';

export default function Projects() {
	const [currentProjectState, setProjectState] = useState<typeof projectStates[number]>('all');
	return (
		<MainLayout title="Projects">
			<PageHeader title="Projects">
				<div className="flex flex-row tabPort:flex-col">
					<Button
						size="md"
						variant="secondary"
						type="button"
						className="self-center tabPort:mb-4"
						startIcon={<GrAdd />}
					>
						Create project
					</Button>
					<div className="flex items-center justify-center tabPort:ml-0 ml-8">
						<div
							className="grid grid-cols-4 shadow-md hover:shadow-lg focus:shadow-lg border-2 border-black mt-0 tabPort:mt-3"
							role="toolbar"
						>
							{projectStates.map((projectState) => (
								<button
									type="button"
									key={projectState}
									onFocus={() => setProjectState(projectState)}
									className={clsx([
										' border-r-2 border-r-black inline-block py-2.5 px-6 mobile:px-1 tabPort:px-3 tabLand:px-4 font-medium text-sm tabLand:text-xs uppercase hover:bg-gray-400 hover:text-black ',
										currentProjectState === projectState ? 'bg-black text-white' : 'text-black',
									])}
								>
									{projectState}
								</button>
							))}
						</div>
					</div>
				</div>
			</PageHeader>
			<div className="container">
				<ProjectList projectState={currentProjectState} />
			</div>
		</MainLayout>
	);
}
