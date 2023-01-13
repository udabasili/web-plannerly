import { GrAdd } from 'react-icons/gr';

import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Clients } from '@/features/clients';

export default function ClientsPage() {
	return (
		<MainLayout title="Clients">
			<PageHeader title="Clients">
				<Button size="md" variant="secondary" type="button" startIcon={<GrAdd />}>
					Add Client
				</Button>
			</PageHeader>
			<div className="container">
				<Clients />
			</div>
		</MainLayout>
	);
}
