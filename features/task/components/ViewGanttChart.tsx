import { Gantt, Task } from 'gantt-task-react';
import { useEffect, useState } from 'react';
import 'gantt-task-react/dist/index.css';
import { BiTask } from 'react-icons/bi';

import { Spinner } from '@/components/Element/Spinner';
import { useGetProject } from '@/features/projects';

import { useGetTasks } from '../api/getTasks';

type ViewGanttChartProps = {
	projectId: string;
};

function addDays(date: Date, days: number) {
	const current = new Date(date); //'Mar 11 2015' current.getTime() = 1426060964567
	const followingDay = new Date(current.getTime() + 3600 * 1000 * 24 * days); // + 1 day in ms
	return followingDay;
}

export const ViewGanttChart = ({ projectId }: ViewGanttChartProps) => {
	const { data: taskResponse, isLoading } = useGetTasks(projectId);
	const { project } = useGetProject(projectId);
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		if (taskResponse && project) {
			let startDate = new Date(project.startDate);
			let accumulatedDays = 0;

			const tranformedData: Task[] = taskResponse.map((task, index) => {
				startDate = addDays(startDate, accumulatedDays);

				const endDate = addDays(
					startDate,
					task.subTasksDuration.reduce((prev, curr) => prev + Number(curr), accumulatedDays)
				);
				accumulatedDays = task.subTasksDuration.reduce((prev, curr) => prev + Number(curr), accumulatedDays);

				return {
					start: index === 0 ? new Date(project.startDate) : startDate,
					end: endDate,
					name: task.name,
					id: task._id,
					type: 'task',
					progress: (task.subTasksCompleted.length / task.subTasksPicked.length) * 100,
					styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
				};
			});
			setTasks([...tranformedData]);
		}
	}, [project, taskResponse]);

	if (isLoading) {
		return <Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
	}

	if (!tasks?.length) {
		return (
			<div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
				<BiTask className="w-10 h-10" />
				<h4>No Tasks Found</h4>
			</div>
		);
	}

	return tasks.length > 0 ? <Gantt tasks={tasks} /> : <>No Data</>;
};
