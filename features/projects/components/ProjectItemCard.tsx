import clsx from 'clsx';
import { Avatar, Badge, Progress } from 'flowbite-react';
import { BiEdit, BiTime } from 'react-icons/bi';
import { GrAdd, GrAddCircle } from 'react-icons/gr';
import { ImBin } from 'react-icons/im';
import { IoIosAddCircle, IoIosAddCircleOutline, IoIosPeople } from 'react-icons/io';

import { ProjectItemProps } from '../types';

import { ProjectItemCardContainer } from './index.styled';

export const ProjectItemCard = (props: ProjectItemProps) => {
	const { name, id, image, endDate } = props;
	return (
		<ProjectItemCardContainer>
			<Avatar
				className="project-item__avatar"
				img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
				rounded={true}
				size="lg"
			></Avatar>
			<ImBin className={clsx(['project-item__icon', 'project-item__icon--delete'])} />
			<BiEdit className={clsx(['project-item__icon', 'project-item__icon--edit'])} />
			<span className="font-medium leading-tight text-xl text-blue-600 project-item__name">
				Tailwind Elements
			</span>
			<div className="project-item__category">category</div>
			<div className="project-item__team-members">
				{' '}
				<Avatar.Group>
					<Avatar
						img="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
						rounded={true}
						stacked={true}
					/>
					<Avatar
						img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
						rounded={true}
						stacked={true}
					/>
					<Avatar
						img="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
						rounded={true}
						stacked={true}
					/>
					<Avatar
						img="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
						rounded={true}
						stacked={true}
					/>

					<div className="relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500 space-x-4 cursor-pointer">
						<IoIosAddCircle color="white" size="20px" fill="white" />
					</div>
				</Avatar.Group>
			</div>
			<div className="project-item__duration">
				<BiTime />
				<span className="ml-2">4 month</span>
			</div>
			<div className="project-item__team-no">
				<IoIosPeople />
				<span className="ml-2">5 employees</span>
			</div>
			<div className="project-item__progress">
				<span className="label">progress</span>
				<Badge color="info" className="days ">
					35 days
				</Badge>
				<span className="value">
					<Progress progress={45} />
				</span>
			</div>
		</ProjectItemCardContainer>
	);
};
