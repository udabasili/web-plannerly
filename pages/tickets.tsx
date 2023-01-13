import { GrAdd } from 'react-icons/gr';

import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { TicketTable } from '@/features/tickets';

export default function Tickets() {
	return (
		<MainLayout title="Tickets">
			<PageHeader title="Tickets">
				<Button size="md" variant="secondary" type="button" startIcon={<GrAdd />}>
					Create New Tickets
				</Button>
			</PageHeader>
			{/* <TicketTable /> */}
		</MainLayout>
	);
}
