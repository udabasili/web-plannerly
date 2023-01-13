import { GrAdd } from 'react-icons/gr';

import Button from '@/components/Element/Button';
import { MainLayout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { CreateEmployee, Employees } from '@/features/employees';
import useDisclosure from '@/hooks/useDisclosure';

export default function EmployeesPage() {
	const { isOpen, open, close } = useDisclosure();

	return (
		<MainLayout title="Employees">
			<PageHeader title="Employees">
				<Button size="md" variant="secondary" type="button" startIcon={<GrAdd />} onClick={open}>
					Add Employee
				</Button>
			</PageHeader>
			<Employees />
			<CreateEmployee isOpen={isOpen} close={close} />
		</MainLayout>
	);
}
