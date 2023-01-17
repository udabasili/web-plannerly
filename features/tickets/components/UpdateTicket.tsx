import _ from 'lodash';
import { z } from 'zod';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';
import { CustomSelectInput, Form, Input } from '@/components/Form';
import { IEmployee, useGetEmployees } from '@/features/employees';

import { useGetTicket } from '../api/getTicket';
import { UpdateTicketDTO, useUpdateTicket } from '../api/updateTicket';
import { ITicketRequest, status } from '../types';

type UpdateTicketProps = {
	isOpen: boolean;
	close: () => void;
	id: string;
};

const schema = z.object({
	title: z.string().min(1, 'Ticket name is required'),
	author: z.string().min(1, 'Ticket creator must be selected'),
	status: z.enum(status),
});

function createEmployeeSelectOptions(arrayValues: IEmployee[]) {
	const selectionOptionObject = [...arrayValues].map((employee) => ({
		label: _.upperFirst(employee.name),
		value: employee._id as string,
	}));
	return selectionOptionObject;
}

function createSelectOptions(arrayValues: any) {
	const selectionOptionObject = [...arrayValues].map((position) => ({
		label: _.upperFirst(position),
		value: position,
	}));
	return selectionOptionObject;
}

export const UpdateTicket = (props: UpdateTicketProps) => {
	const { close, isOpen, id } = props;
	const ticketQuery = useGetTicket(id);
	const employeesQuery = useGetEmployees();
	const { isLoading, updateTicket } = useUpdateTicket({ nextFn: close });

	async function onSubmit(data: UpdateTicketDTO) {
		const updatedData = {
			...ticketQuery.ticket,
			...data,
		};
		Reflect.deleteProperty(updatedData, 'id');
		Reflect.deleteProperty(updatedData, '_id');
		updateTicket({ id, updatedData });
	}

	return (
		<CustomModal onClose={close} title={'Edit Ticket'} isOpen={isOpen}>
			<div className="grid grid-cols-2">
				<Form<typeof schema, UpdateTicketDTO>
					schema={schema}
					className="col-span-2 gap-x-3"
					onSubmitFn={onSubmit}
					resetDefaultValues={!isLoading}
					defaultValues={{
						title: ticketQuery.ticket?.title,
						author: ticketQuery.ticket?.author as any,
						status: ticketQuery.ticket?.status,
					}}
				>
					{({ register, formState: { errors } }) => (
						<>
							<Input
								label={'Name'}
								name={'name'}
								type={'text'}
								registration={register('title')}
								error={errors.title}
								containerClass="col-span-2"
							/>
							<div className="flex col-span-2">
								<CustomSelectInput
									name={'author'}
									label={'Ticket Author'}
									selectionOptions={createEmployeeSelectOptions(
										employeesQuery.data && !employeesQuery.isLoading ? employeesQuery.data : []
									)}
									registration={register('author')}
									containerClass="flex-1 mr-2"
									placeholder="Who is creating this ticket?"
								/>
								<Button
									size="sm"
									variant="primary"
									className="self-center mt-7 justify-self-center"
									type="button"
								>
									Add Employee
								</Button>
							</div>
							<CustomSelectInput
								name={'status'}
								label={'Status'}
								selectionOptions={createSelectOptions(status)}
								registration={register('status')}
								defaultValue={status[0]}
								containerClass="col-span-2"
							/>

							<Button
								size="md"
								variant="primary"
								className="self-center mt-7 col-span-2 justify-self-center"
								type="submit"
								isLoading={isLoading}
							>
								Submit
							</Button>
						</>
					)}
				</Form>
			</div>
		</CustomModal>
	);
};
