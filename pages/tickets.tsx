import { GrAdd } from 'react-icons/gr';

import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { CreateTicket, TicketTable } from '@/features/tickets';
import useDisclosure from '@/hooks/useDisclosure';

export default function Tickets() {
	const { isOpen, open, close } = useDisclosure();

	return (
		<MainLayout title="Tickets">
			<PageHeader title="Tickets">
				<Button size="md" variant="secondary" type="button" startIcon={<GrAdd />} onClick={open}>
					Create New Tickets
				</Button>
			</PageHeader>
			<TicketTable />
			<CreateTicket isOpen={isOpen} close={close} />
		</MainLayout>
	);
}
