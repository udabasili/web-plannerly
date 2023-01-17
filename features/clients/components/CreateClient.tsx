import { z } from 'zod';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';
import { Form, Input, InputImage } from '@/components/Form';

import { useCreateClient } from '../api/createClient';
import { IClientRequest } from '../types';

const MAX_FILE_SIZE = 200000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

type CreateClientProps = {
	isOpen: boolean;
	close: () => void;
};

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	companyName: z.string().min(1, 'Company name is required'),
	email: z.string().email(),
	phoneNumber: z.string().regex(/\d{3}-\d{3}-\d{4}/),
	profileUrl: z
		.any()
		.refine((files) => files?.length == 1, 'Image is required.')
		.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
		.refine(
			(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
			'.jpg, .jpeg, .png and .webp files are accepted.'
		),
});

export const CreateClient = (props: CreateClientProps) => {
	const { close, isOpen } = props;
	const { isLoading, createClient } = useCreateClient(close);

	async function onSubmit(createClientData: IClientRequest) {
		const formData = new FormData();
		formData.append('file', createClientData.profileUrl[0]);
		Reflect.deleteProperty(createClientData, 'profileUrl');
		formData.append('data', JSON.stringify(createClientData));
		await createClient(formData);
	}

	return (
		<CustomModal onClose={close} title={'Add New Client'} isOpen={isOpen}>
			<div className="grid grid-cols-2">
				<Form<typeof schema, IClientRequest>
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
							<Input
								label={'Company Name'}
								name={'companyName'}
								type={'text'}
								registration={register('companyName')}
								error={errors.companyName}
								containerClass="col-span-2"
							/>
							<InputImage
								label={'Profile Image'}
								name={'profileUrl'}
								registration={register('profileUrl')}
								error={errors.profileUrl}
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
		</CustomModal>
	);
};
