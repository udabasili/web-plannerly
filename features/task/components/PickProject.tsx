import { Label, Select } from 'flowbite-react';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';

import Button from '@/components/Element/Button';
import { Spinner } from '@/components/Element/Spinner';
import { IProject, useGetProjects } from '@/features/projects';

const routes = ['addTasks', 'viewGantt', 'viewTasks', 'pickProject'] as const;
type Routes = typeof routes[number];

type PickProjectProps = {
	setProject: Dispatch<SetStateAction<string>>;
	projectId: string | null;
	setRoute: Dispatch<SetStateAction<Routes>>;
	setProjectName: Dispatch<SetStateAction<string>>;
};

export const PickProject = ({ setProject, projectId, setRoute, setProjectName }: PickProjectProps) => {
	const { isLoading, data: projects } = useGetProjects();
	const router = useRouter();

	if (isLoading) {
		return <Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
	}

	function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		setProjectName(event.target.id);
		setProject(event.target.value);
	}

	return (
		<div id="select">
			<div className="mb-2 flex">
				<Label htmlFor="countries" value="Select your project" className="text-lg font-bold" />
			</div>
			{projects?.length === 0 ? (
				<h2>No Project</h2>
			) : (
				<div className="grid grid-cols-[1fr_max-content] tabPort:grid-cols-1">
					<Select
						id="countries"
						required={true}
						className="flex-1 mr-4 h-full tabPort:mr-0"
						value={projectId as string}
						onChange={onChange}
					>
						<option disabled selected></option>
						{projects?.map((project) => (
							<option key={project._id} value={project._id} id={project.name}>
								{project.name}
							</option>
						))}
					</Select>
					<Button
						size="lg"
						variant="primary"
						type="button"
						className="tabPort:my-3 tabPort:self-center tabPort:justify-self-center"
						onClick={() => router.push('/projects')}
					>
						Add Project
					</Button>
					<div className="flex flex-col justify-start items-center ">
						<Button
							size="lg"
							variant="primary"
							type="button"
							className="my-1"
							disabled={!projectId}
							onClick={() => setRoute('addTasks')}
						>
							Add Tasks
						</Button>
						<Button
							size="lg"
							variant="primary"
							type="button"
							className="my-1"
							disabled={!projectId}
							onClick={() => setRoute('viewTasks')}
						>
							View Tasks
						</Button>

						<Button
							size="lg"
							variant="primary"
							type="button"
							className="my-1"
							disabled={!projectId}
							onClick={() => setRoute('viewGantt')}
						>
							View Gantt Chart
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
