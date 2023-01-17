import { MainLayout } from '@/components/Layout';
import { AllocatedTeam, Employee, HomeContainer, TaskProgress } from '@/features/home';

export default function HrDashboard() {
	return (
		<MainLayout title="Home">
			<HomeContainer>
				<TaskProgress />
				<AllocatedTeam />
				<Employee />
			</HomeContainer>
		</MainLayout>
	);
}
