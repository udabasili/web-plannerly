import { z } from 'zod';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';
import { Spinner } from '@/components/Element/Spinner';
import { Form, Input } from '@/components/Form';

import { useGetClient } from '../api/getClient';
import { UpdateClientDTO, useUpdateClient } from '../api/updateClient';

type UpdateClientProps = {
	isOpen: boolean;
	close: () => void;
	id: string;
};

const schema = z.object({
	name: z.string().min(1, 'Name is Required'),
	companyName: z.string().min(1, 'Name is Required'),
	email: z.string().email(),
	phoneNumber: z.string().regex(/\d{3}-\d{3}-\d{4}/),
});

export const UpdateClient = (props: UpdateClientProps) => {
	const { close, isOpen, id } = props;
	const clientQuery = useGetClient(id);
	const { isLoading, updateClient } = useUpdateClient({ nextFn: close });

	async function onSubmit(data: UpdateClientDTO) {
		const updatedData = {
			...clientQuery.client,
			...data,
		};
		Reflect.deleteProperty(updatedData, 'id');
		Reflect.deleteProperty(updatedData, '_id');
		updateClient({ id, updatedData });
	}

	return (
		<CustomModal onClose={close} title={'Edit Client'} isOpen={isOpen}>
			{isLoading ? (
				<div className="h-[20rem] flex items-center justify-center">
					<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />
				</div>
			) : (
				<div className="grid grid-cols-2">
					<Form<typeof schema, UpdateClientDTO>
						schema={schema}
						className="col-span-2 gap-x-3"
						onSubmitFn={onSubmit}
						resetDefaultValues={!isLoading}
						defaultValues={{
							name: clientQuery.client?.name,
							email: clientQuery.client?.email,
							companyName: clientQuery.client?.companyName,
							phoneNumber: clientQuery.client?.phoneNumber,
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
								<Input
									label={'Company Name'}
									name={'companyName'}
									type={'text'}
									registration={register('companyName')}
									error={errors.companyName}
									containerClass="col-span-2"
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
