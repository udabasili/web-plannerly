import _ from 'lodash';
import { useRouter } from 'next/router';
import { FieldError } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';
import { CustomSelectInput, CustomTextArea, Form, Input, InputImage } from '@/components/Form';
import { IClient, useGetClients } from '@/features/clients';
import { IEmployee, useGetEmployees } from '@/features/employees';

import { useCreateProject } from '../api/createProject';
import { projectCategories } from '../data/projectCategories';
import { IProjectRequest, priorities } from '../types';

type CreateProjectProps = {
	isOpen: boolean;
	close: () => void;
};

const schema = z
	.object({
		name: z.string().min(1, 'Project name is Required'),
		category: z.enum(projectCategories),
		startDate: z.string().refine((date) => {
			return new Date(date) >= new Date();
		}, 'The date must be after today'),
		endDate: z.string().refine((date) => {
			return new Date(date) >= new Date();
		}, 'The date must be after today'),
		priority: z.enum(priorities),
		budget: z.number(),
		description: z.string().optional(),
		teamLeader: z.string().min(1, 'Team leader is Required'),
		client: z.string().min(1, 'Client is Required'),
	})
	.refine(
		(data) => {
			return new Date(data.endDate) > new Date(data.startDate);
		},
		{
			message: 'End Date must be greater than start',
			path: ['endDate'], // path of error
		}
	);

function createSelectOptions(arrayValues: any) {
	const selectionOptionObject = [...arrayValues].map((position) => ({
		label: _.upperFirst(position),
		value: position,
	}));
	return selectionOptionObject;
}

function createEmployeeSelectOptions(arrayValues: IEmployee[] | IClient[]) {
	const selectionOptionObject = [...arrayValues].map((employee) => ({
		label: _.upperFirst(employee.name),
		value: employee._id as string,
	}));
	return selectionOptionObject;
}

export const CreateProject = (props: CreateProjectProps) => {
	const { close, isOpen } = props;
	const { isLoading, createProject } = useCreateProject(close);
	const employeesQuery = useGetEmployees();
	const clientsQuery = useGetClients();

	const router = useRouter();

	async function onSubmit(newProject: IProjectRequest) {
		await createProject(newProject);
	}

	function navToEmployee() {
		router.push('/employees');
	}

	function navToClient() {
		router.push('/clients');
	}

	return (
		<CustomModal onClose={close} title={'Add New Project'} isOpen={isOpen}>
			<div className="grid grid-cols-2">
				<Form<typeof schema, IProjectRequest>
					schema={schema}
					className="col-span-2 gap-x-3"
					onSubmitFn={onSubmit}
				>
					{({ register, formState: { errors } }) => {
						return (
							<>
								<Input
									label={'Project Name'}
									name={'name'}
									type={'text'}
									registration={register('name')}
									error={errors.name}
									containerClass="col-span-2"
								/>
								<CustomSelectInput
									name={'category'}
									label={'Project Category'}
									selectionOptions={createSelectOptions(projectCategories)}
									registration={register('category')}
									containerClass="col-span-2"
								/>
								<Input
									label={'Project Start'}
									name={'startDate'}
									type={'date'}
									registration={register('startDate')}
									error={errors.startDate}
									required
								/>
								<Input
									label={'Project End'}
									name={'endDate'}
									type={'date'}
									registration={register('endDate')}
									error={errors.endDate}
									required
								/>
								<CustomSelectInput
									name={'priority'}
									label={'Project Priority'}
									selectionOptions={createSelectOptions(priorities)}
									registration={register('priority')}
								/>
								<Input
									label={'Project Budget ($)'}
									name={'budget'}
									type={'number'}
									min={100}
									registration={register('budget', {
										setValueAs(value) {
											return Number(value);
										},
									})}
									error={errors.budget}
									required
								/>
								<div className="flex col-span-2">
									<CustomSelectInput
										name={'teamLeader'}
										label={'Assign Team Leader'}
										selectionOptions={createEmployeeSelectOptions(
											employeesQuery.data && !employeesQuery.isLoading ? employeesQuery.data : []
										)}
										registration={register('teamLeader')}
										containerClass="flex-1 mr-2"
										placeholder="Please choose the team leader"
										error={errors.teamLeader as FieldError}
										defaultValue=""
										required
									/>
									<Button
										size="sm"
										variant="primary"
										className="self-center mt-7 justify-self-center"
										type="button"
										onClick={navToEmployee}
									>
										Add Employee
									</Button>
								</div>
								<div className="flex col-span-2">
									<CustomSelectInput
										name={'client'}
										label={'Assign Client'}
										selectionOptions={createEmployeeSelectOptions(
											clientsQuery.data && !clientsQuery.isLoading ? clientsQuery.data : []
										)}
										registration={register('client')}
										containerClass="flex-1 mr-2"
										placeholder="Please choose the client"
										error={errors.client as FieldError}
										defaultValue=""
										required
									/>
									<Button
										size="sm"
										variant="primary"
										className="self-center mt-7 justify-self-center"
										type="button"
										onClick={navToClient}
									>
										Add Client
									</Button>
								</div>

								<CustomTextArea
									label={'Project Description (Optional)'}
									name={'description'}
									registration={register('description')}
									error={errors.description}
									placeholder="What is the project about?"
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
						);
					}}
				</Form>
			</div>
		</CustomModal>
	);
};
