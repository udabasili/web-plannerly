/* eslint-disable no-mixed-spaces-and-tabs */
import { Accordion, Label, Progress, TextInput } from 'flowbite-react';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import Button from '@/components/Element/Button';
import { Spinner } from '@/components/Element/Spinner';

import { useGetTasks } from '../api/getTasks';
import { useUpdateTask } from '../api/updateTask';
import { subTasks } from '../data/tasks';

import { TaskListContainer } from './index.types';

const routes = ['addTasks', 'viewGantt', 'viewTasks', 'pickProject'] as const;
type Routes = typeof routes[number];

type State = {
	[key: string]: Array<string>;
};

type ViewTasksProps = {
	projectId: string;
	setRoute: Dispatch<SetStateAction<Routes>>;
};

export const ViewTasks = ({ projectId, setRoute }: ViewTasksProps) => {
	const { data: taskResponse, isLoading } = useGetTasks(projectId);
	const [completeTasks, setCompleteTasks] = useState<State>({});
	const [isSubmitLoading, setLoading] = useState(false);

	const { updateTask } = useUpdateTask({
		setLoading: (e: boolean) => setLoading(e),
		setRoute: (e: Routes) => setRoute(e),
	});

	useEffect(() => {
		const object: Record<string, Array<string>> = {};

		if (taskResponse) {
			taskResponse.forEach((t) => {
				const task = t.name;
				object[task] = t.subTasksCompleted;
				setCompleteTasks(object);
			});
		}
	}, [taskResponse]);

	function getSubTasksValue(taskName: string, subTask: string, subTasksDuration: Array<number>) {
		if (taskResponse) {
			const taskIndex = subTasks.findIndex((task) => {
				return taskName === task.name;
			});
			if (taskIndex !== -1) {
				const subTasksArray = subTasks[taskIndex].children;
				const subTasksIndex = subTasksArray.findIndex((sub) => {
					return subTask === sub;
				});
				return subTasksDuration[subTasksIndex];
			}

			return 0;
		}
	}

	function toggleSubTask(task: string, subTask: string, index: number) {
		return function (e: React.ChangeEvent<HTMLInputElement>) {
			const object: Record<string, Array<string>> = {};
			object[task] = completeTasks[task] ? completeTasks[task] : [];
			if (object[task].includes(subTask)) {
				object[task] = object[task].filter((subT) => subT !== subTask);
			} else {
				object[task].push(subTask);
			}
			setCompleteTasks({
				...completeTasks,
				...object,
			});
		};
	}

	function checkIfChecked(task: string, subTask: string) {
		const taskExists = completeTasks[task];
		if (taskExists && taskExists.includes(subTask)) {
			return true;
		}

		return false;
	}

	const progress = useMemo(() => {
		if (taskResponse) {
			const total = taskResponse?.reduce((prev, currentValue) => {
				return prev + currentValue.subTasksPicked.length;
			}, 0);

			const values = Object.values(completeTasks);
			const checkedTotal = values.reduce((prev, subTask) => {
				return prev + subTask.length;
			}, 0);
			return Number((checkedTotal / total) * 100).toPrecision(3);
		}
	}, [completeTasks]);

	function calcTotalTaskTime(subTasksDuration: Array<number>) {
		const checkedTotal = subTasksDuration.reduce((prev, current) => {
			return prev + Number(current);
		}, 0);
		return checkedTotal;
	}

	async function submitFn() {
		setLoading(true);
		if (taskResponse) {
			const response = taskResponse.map((task) => ({
				...task,
				subTasksCompleted: completeTasks[task.name] || [],
			}));
			await updateTask({ projectId: projectId, updatedData: response });
		}
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
			<h3 className="text-3xl font-bold dark:text-white">Todo List</h3>
			<p>Check the tasks that have been completed</p>
			<Progress
				progress={progress as unknown as number}
				className="progress"
				label="Project Progress"
				labelPosition="outside"
				labelProgress={true}
			/>
			{taskResponse ? (
				<TaskListContainer alwaysOpen={true}>
					{taskResponse.map((task) => {
						return (
							<Accordion.Panel key={task._id}>
								<Accordion.Title className="flex flex-1">
									<div className="flex flex-1 justify-between">
										<span> {task.name}</span>
										<span className="mr-5">
											<span className="mr-5">
												( {calcTotalTaskTime(task.subTasksDuration)} days )
											</span>
											{completeTasks[task.name] ? completeTasks[task.name].length : 0} /{' '}
											{task.subTasksPicked.length}
										</span>
									</div>
								</Accordion.Title>
								<Accordion.Content>
									<ul className=" space-y-1 text-gray-500 list-inside dark:text-gray-400 flex flex-1 flex-col ">
										{task.subTasksPicked.map((subTask, index) => (
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
												<div className="flex items-center">
													<input
														type="number"
														value={getSubTasksValue(
															task.name,
															subTask,
															task.subTasksDuration
														)}
														className="w-20"
														min={0}
														disabled
													/>
													<span className="ml-4">days</span>
												</div>
											</li>
										))}
									</ul>
								</Accordion.Content>
							</Accordion.Panel>
						);
					})}
				</TaskListContainer>
			) : null}
		</>
	);
};
