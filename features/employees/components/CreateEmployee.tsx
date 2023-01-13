import _ from 'lodash';
import { z } from 'zod';

import { useCreateEmployee } from '../api/createEmployee';
import { departments } from '../data/department';
import { roles } from '../data/roles';
import { IEmployeeRequest } from '../types';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';
import { CustomSelectInput, Form, Input, InputImage } from '@/components/Form';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

type CreateEmployeeProps = {
	isOpen: boolean;
	close: () => void;
};

const schema = z.object({
	name: z.string().min(1, 'Name is Required'),
	position: z.enum(roles),
	department: z.enum(departments),
	email: z.string().email(),
	joinedDate: z.string(),
	phoneNumber: z.string().regex(/\d{3}-\d{3}-\d{4}/),
	profileUrl: z
		.any()
		// .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported.'
		),
});

function createSelectOptions(arrayValues: any) {
	const selectionOptionObject = [...arrayValues].map((position) => ({
		label: _.upperFirst(position),
		value: position,
	}));
	return selectionOptionObject;
}

export const CreateEmployee = (props: CreateEmployeeProps) => {
	const { close, isOpen } = props;
	const { isLoading, createEmployee } = useCreateEmployee({ nextFn: close });

	async function onSubmit(createEmployeeData: IEmployeeRequest) {
		const formData = new FormData();
		formData.append('file', createEmployeeData.profileUrl[0]);
		Reflect.deleteProperty(createEmployeeData, 'profileUrl');
		formData.append('data', JSON.stringify(createEmployeeData));
		await createEmployee(formData);
	}

	return (
		<CustomModal onClose={close} title={'Add New Employee'} isOpen={isOpen}>
			<div className="grid grid-cols-2">
				<Form<typeof schema, IEmployeeRequest>
					schema={schema}
					className="col-span-2 gap-x-3"
					onSubmitFn={onSubmit}
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
								selectionOptions={createSelectOptions(roles)}
								registration={register('position')}
								defaultValue={roles[0]}
								containerClass="col-span-2"
							/>

							<InputImage
								label={'Profile Image'}
								name={'profileUrl'}
								registration={register('profileUrl')}
								error={errors.profileUrl}
								containerClass="col-span-2"
							/>
							<CustomSelectInput
								name={'department'}
								label={'Department'}
								selectionOptions={createSelectOptions(departments)}
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
		</CustomModal>
	);
};
