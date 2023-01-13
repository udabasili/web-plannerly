import { GrAdd } from 'react-icons/gr';

import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import {
	Allocations,
	Completed,
	InProgress,
	NeedsReview,
	RecentActivity,
	ProjectProgress,
	TasksContainer,
} from '@/features/task';

export default function Tasks() {
	return (
		<MainLayout title="Tasks">
			<PageHeader title="Tasks">
				<Button size="md" variant="secondary" type="button" startIcon={<GrAdd />}>
					Add Task
				</Button>
			</PageHeader>
			<TasksContainer>
				<ProjectProgress />
				<RecentActivity />
				<Allocations />
				<InProgress />
				<NeedsReview />
				<Completed />
			</TasksContainer>
		</MainLayout>
	);
}
