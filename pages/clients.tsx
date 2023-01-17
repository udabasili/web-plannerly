import { GrAdd } from 'react-icons/gr';

import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Clients, CreateClient } from '@/features/clients';
import useDisclosure from '@/hooks/useDisclosure';

export default function ClientsPage() {
	const { isOpen, open, close } = useDisclosure();

	return (
		<MainLayout title="Clients">
			<PageHeader title="Clients">
				<Button size="md" variant="secondary" type="button" startIcon={<GrAdd />} onClick={open}>
					Add Client
				</Button>
			</PageHeader>
			<div className="container flex flex-col">
				<Clients />
			</div>
			<CreateClient isOpen={isOpen} close={close} />
		</MainLayout>
	);
}
