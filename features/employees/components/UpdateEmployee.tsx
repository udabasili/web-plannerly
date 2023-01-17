import _ from 'lodash';
import { z } from 'zod';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';
import { Spinner } from '@/components/Element/Spinner';
import { CustomSelectInput, Form, Input } from '@/components/Form';

import { useGetEmployee } from '../api/getEmployee';
import { UpdateEmployeeDTO, useUpdateEmployee } from '../api/updateEmployee';
import { departments } from '../data/department';
import { roles } from '../data/roles';

type UpdateEmployeeProps = {
	isOpen: boolean;
	close: () => void;
	id: string;
};

const schema = z.object({
	name: z.string().min(1, 'Name is Required'),
	position: z.enum(roles),
	department: z.enum(departments),
	email: z.string().email(),
	joinedDate: z.string(),
	phoneNumber: z.string().regex(/\d{3}-\d{3}-\d{4}/),
});

function UpdateSelectOptions(arrayValues: any) {
	const selectionOptionObject = [...arrayValues].map((position) => ({
		label: _.upperFirst(position),
		value: position,
	}));
	return selectionOptionObject;
}

export const UpdateEmployee = (props: UpdateEmployeeProps) => {
	const { close, isOpen, id } = props;
	const employeeQuery = useGetEmployee(id);
	const { isLoading, updateEmployee } = useUpdateEmployee({ nextFn: close });

	async function onSubmit(data: UpdateEmployeeDTO) {
		const updatedData = {
			...employeeQuery.data,
			...data,
		};
		Reflect.deleteProperty(updatedData, 'id');
		Reflect.deleteProperty(updatedData, '_id');
		updateEmployee({ id, updatedData });
	}

	return (
		<CustomModal onClose={close} title={'Edit Employee'} isOpen={isOpen}>
			{isLoading ? (
				<div className="h-[20rem] flex items-center justify-center">
					<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />
				</div>
			) : (
				<div className="grid grid-cols-2">
					<Form<typeof schema, UpdateEmployeeDTO>
						schema={schema}
						className="col-span-2 gap-x-3"
						onSubmitFn={onSubmit}
						resetDefaultValues={!isLoading}
						defaultValues={{
							name: employeeQuery.data?.name,
							department: employeeQuery.data?.department as typeof departments[number],
							email: employeeQuery.data?.email,
							joinedDate: employeeQuery.data?.joinedDate,
							position: employeeQuery.data?.position as typeof roles[number],
							phoneNumber: employeeQuery.data?.phoneNumber,
						}}
					>
						{({ register, formState: { errors } }) => (
							<>
								<Input
									label={'Name'}
									name={'name'}
									type={'text'}
									registration={register('name')}
									error={errors.name}
									containerClass="col-span-2"
								/>
								<CustomSelectInput
									name={'position'}
									label={'Role'}
									selectionOptions={UpdateSelectOptions(roles)}
									registration={register('position')}
									defaultValue={roles[0]}
									containerClass="col-span-2"
									error={errors.position}
								/>
								<CustomSelectInput
									name={'department'}
									label={'Department'}
									selectionOptions={UpdateSelectOptions(departments)}
									registration={register('department')}
									defaultValue={departments[0]}
									error={errors.department}
								/>
								<Input
									label={'Email'}
									name={'email'}
									type={'email'}
									registration={register('email')}
									error={errors.email}
									required
								/>
								<Input
									label={'Phone'}
									name={'phoneNumber'}
									type={'tel'}
									pattern="\d{3}-\d{3}-\d{4}"
									registration={register('phoneNumber')}
									error={errors.phoneNumber}
									placeholder="000-000-0000"
									required
								/>
								<Input
									label={'Date Employed'}
									name={'joinedDate'}
									type={'date'}
									registration={register('joinedDate')}
									error={errors.joinedDate}
									required
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
			)}
		</CustomModal>
	);
};
