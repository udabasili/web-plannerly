/* eslint-disable no-mixed-spaces-and-tabs */
import { Accordion, Label, TextInput } from 'flowbite-react';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/Element/Button';
import { Spinner } from '@/components/Element/Spinner';
import { useGetProject } from '@/features/projects';

import { useCreateTask } from '../api/createTasks';
import { tasks, subTasks } from '../data/tasks';

import { TaskListContainer } from './index.types';

const routes = ['addTasks', 'viewGantt', 'viewTasks', 'pickProject'] as const;
type Routes = typeof routes[number];

type State = {
	[key: string]: Array<string>;
};

type NumberState = {
	[key: string]: Array<number>;
};

type CreateTasksProps = {
	projectId: string;
	setRoute: Dispatch<SetStateAction<Routes>>;
};

export const CreateTasks = ({ projectId, setRoute }: CreateTasksProps) => {
	const [tasksEntry, setTasks] = useState<State>({});
	const [isSubmitLoading, setLoading] = useState(false);
	const [tasksDayCount, setTasksDayCount] = useState<NumberState>({});
	const [endDate, setEndDate] = useState<string>();
	const [totalDate, setTotalDate] = useState(0);
	const { createTask } = useCreateTask({
		setLoading: (e: boolean) => setLoading(e),
		setRoute: (e: Routes) => setRoute(e),
	});
	const { isLoading, project } = useGetProject(projectId);
	const [startDate, setStartDate] = useState<string>();

	useEffect(() => {
		if (project) {
			setStartDate(project.startDate);
		}
	}, [isLoading, project]);

	useEffect(() => {
		if (startDate) {
			const date = new Date(startDate);
			date.setDate(date.getDate() + totalDate);
			setEndDate(date.toISOString().substring(0, 10));
		}
	}, [startDate, totalDate]);

	useEffect(() => {
		const values = Object.values(tasksDayCount);
		const countArray = (array: any[]) => array.flat(Infinity).reduce((sum: any, n: any) => sum + n, 0);
		setTotalDate(countArray(values));
	}, [tasksDayCount]);

	async function submitFn() {
		const keys = Object.keys(tasksEntry).length !== 8;
		if (keys) {
			toast.error('At least one subtask must be picked for each task');
			return;
		}
		const checkForNonZerosArray = Object.values(tasksDayCount).filter((v) => {
			return !v.every((item) => item === 0);
		});
		if (checkForNonZerosArray.length !== 8) {
			toast.error('All subtasks must have days value greater than 0');
			return;
		}

		if (!startDate) {
			toast.error('Must pick start date');

			return;
		}
		setLoading(true);
		const transformData = Object.entries(tasksEntry).map(([key, value]) => {
			const date = new Date(startDate);
			date.setDate(date.getDate() + tasksDayCount[key].reduce((sum, num) => sum + num));
			const endDate = date.toISOString().substring(0, 10);

			return {
				name: key as unknown as typeof tasks,
				subTasksPicked: value,
				subTasksDuration: tasksDayCount[key],
				project: projectId as any,
				startDate: '',
				endDate,
			};
		});
		await createTask(transformData);
	}

	function toggleSubTask(task: string, subTask: string, index: number) {
		return function (e: React.ChangeEvent<HTMLInputElement>) {
			const object: Record<string, Array<string>> = {};
			object[task] = tasksEntry[task] ? tasksEntry[task] : [];
			if (object[task].includes(subTask)) {
				object[task] = object[task].filter((subT) => subT !== subTask);
				setSubTaskToZero(task, subTask, index);
			} else {
				object[task].push(subTask);
			}
			setTasks({
				...tasksEntry,
				...object,
			});
		};
	}

	function onChangeDayCount(task: string, subTask: string, index: number) {
		return function (e: React.ChangeEvent<HTMLInputElement>) {
			const object: NumberState = {};
			const taskChildrenLength = subTasks.filter((subTask) => subTask.name === task)[0].children.length;
			object[task] = tasksDayCount[task] ? tasksDayCount[task] : new Array(taskChildrenLength).fill(0);
			object[task][index] = Number(e.target.value);
			setTasksDayCount({
				...tasksDayCount,
				...object,
			});
		};
	}

	function checkIfChecked(task: string, subTask: string) {
		const taskExists = tasksEntry[task];
		if (taskExists && taskExists.includes(subTask)) {
			return true;
		}
		return false;
	}

	function setSubTaskToZero(task: string, subTask: string, index: number) {
		const object: NumberState = {};
		const taskChildrenLength = subTasks.filter((subTask) => subTask.name === task)[0].children.length;
		object[task] = tasksDayCount[task] ? tasksDayCount[task] : new Array(taskChildrenLength).fill(0);
		object[task][index] = 0;
		setTasksDayCount({
			...tasksDayCount,
			...object,
		});
	}

	const progress = useMemo(() => {
		const total = subTasks.reduce((prev, currentValue) => {
			return prev + currentValue.children.length;
		}, 0);
		const values = Object.values(tasksEntry);
		const checkedTotal = values.reduce((prev, subTask) => {
			return prev + subTask.length;
		}, 0);
		return Number((checkedTotal / total) * 100).toPrecision(2);
	}, [tasksEntry]);

	function calcTotalTaskTime(task: string) {
		if (!tasksDayCount[task]) {
			return 0;
		}
		const checkedTotal = tasksDayCount[task].reduce((prev, current) => {
			return prev + current;
		}, 0);
		return checkedTotal;
	}

	if (isLoading) {
		return <Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
	}

	return (
		<>
			<Button
				size="lg"
				variant="primary"
				type="button"
				className="my-1 self-center justify-self-center"
				onClick={submitFn}
				isLoading={isSubmitLoading}
			>
				Submit
			</Button>
			<div className="mb-2 w-1/2">
				<div className="mb-2 block">
					<Label htmlFor="startDate" value=" Start Date" />
				</div>
				<TextInput
					id="startDate"
					type="date"
					required={true}
					value={startDate}
					disabled
					onChange={(e) => setStartDate(e.target.value)}
				/>
			</div>
			<div className="mb-2 w-1/2">
				<div className="mb-2 block">
					<Label htmlFor="endDate" value="Estimated End Date" />
				</div>
				<TextInput id="endDate" type="date" value={endDate} disabled />
			</div>
			<h3> Pick at least one subtask for each task below and set day value greater than 0</h3>
			<TaskListContainer alwaysOpen={true}>
				{subTasks.map((task) => {
					return (
						<Accordion.Panel key={task.name}>
							<Accordion.Title className="flex flex-1">
								<div className="flex flex-1 justify-between">
									<span> {task.name}</span>
									<span className="mr-5">
										<span className="mr-5">( {calcTotalTaskTime(task.name)} days )</span>
										{tasksEntry[task.name] ? tasksEntry[task.name].length : 0} /{' '}
										{task.children.length}
									</span>
								</div>
							</Accordion.Title>
							<Accordion.Content>
								<ul className=" space-y-1 text-gray-500 list-inside dark:text-gray-400 flex flex-1 flex-col ">
									{task.children.map((subTask, index) => (
										<li className="flex items-center justify-between" key={subTask}>
											<div className="flex items-center mb-4">
												<input
													id={subTask}
													type="checkbox"
													value={subTask}
													checked={checkIfChecked(task.name, subTask)}
													onChange={toggleSubTask(task.name, subTask, index)}
													className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
												/>
												<label
													htmlFor={subTask}
													className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
												>
													{subTask}
												</label>
											</div>
											{checkIfChecked(task.name, subTask) ? (
												<div className="flex items-center">
													<input
														type="number"
														defaultValue={5}
														className="w-20"
														min={0}
														value={
															tasksDayCount[task.name] &&
															checkIfChecked(task.name, subTask)
																? tasksDayCount[task.name][index]
																: 0
														}
														onChange={onChangeDayCount(task.name, subTask, index)}
													/>
													<span className="ml-4">days</span>
												</div>
											) : null}
										</li>
									))}
								</ul>
							</Accordion.Content>
						</Accordion.Panel>
					);
				})}
			</TaskListContainer>
		</>
	);
};
