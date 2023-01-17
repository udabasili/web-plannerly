import _ from 'lodash';
import { FieldError } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';
import { CustomSelectInput, CustomTextArea, Form, Input } from '@/components/Form';
import { IEmployee, useGetEmployees } from '@/features/employees';

import { useGetProject } from '../api/getProject';
import { useUpdateProject } from '../api/updateProject';
import { projectCategories } from '../data/projectCategories';
import { IProjectRequest, priorities } from '../types';

type UpdateProjectProps = {
	isOpen: boolean;
	close: () => void;
	id: string;
};

const schema = z.object({
	name: z.string().min(1, 'Project name is Required'),
	category: z.enum(projectCategories),
	startDate: z.string(),
	endDate: z.string(),
	priority: z.enum(priorities),
	budget: z.number(),
	description: z.string().optional(),
	teamLeader: z.string().min(1, 'Team leader is Required'),
});

function createSelectOptions(arrayValues: any) {
	const selectionOptionObject = [...arrayValues].map((position) => ({
		label: _.upperFirst(position),
		value: position,
	}));
	return selectionOptionObject;
}

function createEmployeeSelectOptions(arrayValues: IEmployee[]) {
	const selectionOptionObject = [...arrayValues].map((employee) => ({
		label: _.upperFirst(employee.name),
		value: employee._id as string,
	}));
	return selectionOptionObject;
}

function UpdateSelectOptions(arrayValues: any) {
	const selectionOptionObject = [...arrayValues].map((position) => ({
		label: _.upperFirst(position),
		value: position,
	}));
	return selectionOptionObject;
}

export const UpdateProject = (props: UpdateProjectProps) => {
	const { close, isOpen, id } = props;
	const projectQuery = useGetProject(id);
	const { isLoading, updateProject } = useUpdateProject({ nextFn: close });
	const employeesQuery = useGetEmployees();

	async function onSubmit(updatedData: IProjectRequest) {
		const data: IProjectRequest = {
			...projectQuery.project,
			...updatedData,
		};
		Reflect.deleteProperty(data, 'id');
		Reflect.deleteProperty(data, '_id');
		updateProject({ id, updatedData: data });
	}

	return (
		<CustomModal onClose={close} title={'Edit Project'} isOpen={isOpen}>
			<div className="grid grid-cols-2">
				<Form<typeof schema, IProjectRequest>
					schema={schema}
					className="col-span-2 gap-x-3"
					onSubmitFn={onSubmit}
					resetDefaultValues={!isLoading}
					defaultValues={{
						name: projectQuery.project?.name,
						category: projectQuery.project?.category,
						startDate: projectQuery.project?.startDate,
						endDate: projectQuery.project?.endDate,
						priority: projectQuery.project?.priority,
						budget: projectQuery.project?.budget,
						description: projectQuery.project?.description,
						teamLeader: projectQuery.project?.teamLeader._id,
					}}
				>
					{({ register, formState: { errors } }) => (
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
								>
									Add Employee
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
					)}
				</Form>
			</div>
		</CustomModal>
	);
};
