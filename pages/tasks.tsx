import { Dispatch, SetStateAction, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { GrAdd } from 'react-icons/gr';

import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { IProject } from '@/features/projects';
import {
	CreateTasks,
	PickProject,
	Tasks,
	TasksContainer,
	UpdateTask,
	ViewGanttChart,
	ViewTasks,
} from '@/features/task';

const routes = ['addTasks', 'viewGantt', 'viewTasks', 'pickProject'] as const;
type Routes = typeof routes[number];

type Props = {
	setProject: Dispatch<SetStateAction<string>>;
	projectId: string;
	setRoute: Dispatch<SetStateAction<Routes>>;
	setProjectName: Dispatch<SetStateAction<string>>;
};

type Components = {
	[k in Routes]: React.FC<Props>;
};

const ComponentMaps: Components = {
	addTasks: CreateTasks,
	pickProject: PickProject,
	viewGantt: ViewGanttChart,
	viewTasks: ViewTasks,
};

export default function TasksPage() {
	const [route, setRoute] = useState<Routes>('pickProject');
	const [projectId, setProject] = useState<string>(null as unknown as string);
	const [projectName, setProjectName] = useState<string>('');

	const backButton = () => {
		return (
			<Button
				size="md"
				variant="secondary"
				type="button"
				className="self-center tabPort:mb-4"
				startIcon={<BiArrowBack />}
				onClick={() => setRoute('pickProject')}
			>
				Go Back
			</Button>
		);
	};

	const Component = ComponentMaps[route];
	return (
		<MainLayout title="Tasks">
			<PageHeader title="Tasks"></PageHeader>
			{route !== 'pickProject' ? <PageHeader title="" backButton={backButton()}></PageHeader> : null}
			<TasksContainer>
				<Component
					setProject={setProject}
					projectId={projectId}
					setRoute={setRoute}
					setProjectName={setProjectName}
				/>
			</TasksContainer>
		</MainLayout>
	);
}
