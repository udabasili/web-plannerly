import { Chart as ChartJS, ArcElement, Tooltip, Legend, CoreChartOptions, ChartOptions } from 'chart.js';
import Chart, { ChartItem } from 'chart.js/auto';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
import { Spinner } from '@/components/Element/Spinner';
import { departments, roles, useGetEmployees } from '@/features/employees';

import { CardHeader, EmployeeContainer } from './index.styled';

export const Employee = () => {
	const { data: employees, isLoading } = useGetEmployees();
	const [values, setValues] = useState<Array<number>>([]);

	const data = {
		labels: [...roles],
		datasets: [
			{
				label: 'Employee positions',
				data: values,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(115, 159, 64, 0.2)',
					'rgba(5, 109, 64, 0.2)',
					'rgba(194, 34, 34, 0.2)',
					'rgba(0, 195, 255, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(5, 109, 64, 0.2)',
					'rgba(194, 34, 34, 0.2)',
					'rgba(0, 195, 255, 0.2)',
				],
				borderWidth: 1,
			},
		],
	};

	const options: ChartOptions<'pie'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Employees',
			},
		},
	};

	useEffect(() => {
		if (employees) {
			const object: Record<string, number> = {};
			for (const index of roles) {
				object[index] = 0;
			}
			employees.forEach((team) => {
				object[team.position] = object[team.position] + 1;
			});
			setValues(Object.values(object));
		}
	}, [isLoading, employees]);

	return (
		<EmployeeContainer>
			{isLoading ? (
				<Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />
			) : employees && values.length ? (
				<>
					<CardHeader className="mb-3">Employees</CardHeader>
					<Pie data={data} options={options} />
				</>
			) : null}
		</EmployeeContainer>
	);
};
