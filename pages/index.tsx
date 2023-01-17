import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { AllocatedTeam, Employee, HomeContainer, Projects, RecentActivity, TaskProgress } from '@/features/home';

export default function HrDashboard() {
	return (
		<MainLayout title="Home">
			<HomeContainer>
				<TaskProgress />
				<RecentActivity />
				<AllocatedTeam />
				<Employee />
				<Projects />
			</HomeContainer>
		</MainLayout>
	);
}
