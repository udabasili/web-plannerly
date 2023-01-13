import { GrAdd } from 'react-icons/gr';

import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { TeamsTable } from '@/features/teams';

export default function Teams() {
	return (
		<MainLayout title="Teams">
			<PageHeader title="Teams">
				<Button size="md" variant="secondary" type="button" startIcon={<GrAdd />}>
					Create Team
				</Button>
			</PageHeader>
			<TeamsTable />
		</MainLayout>
	);
}
