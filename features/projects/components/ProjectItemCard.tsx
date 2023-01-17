import clsx from 'clsx';
import { Avatar, Badge, Progress } from 'flowbite-react';
import { useMemo, useState } from 'react';
import { BiEdit, BiTime } from 'react-icons/bi';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ImBin } from 'react-icons/im';
import { IoIosAddCircle, IoIosPeople } from 'react-icons/io';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';
import { useGetTeam } from '@/features/teams';

import { useDeleteProject } from '../api/deleteProject';
import { projectCategoryWithIcons } from '../data/projectCategories';
import { IProject } from '../types';

import { AddEmployeeToTeam } from './AddEmployeeToTeam';
import { ProjectItemCardContainer } from './index.styled';
import { UpdateProject } from './UpdateProject';

function getProjectIcon(category: string) {
	return projectCategoryWithIcons.filter((project) => project.name === category)[0].icon || '';
}

const pluralize = (count: number, noun: string, suffix = 's') => {
	return `${count} ${noun}${count !== 1 ? suffix : ''}`;
};

export const ProjectItemCard = (props: IProject) => {
	const { _id, name, category, team, startDate, endDate } = props;
	const teamId = team?._id;
	const { isLoading, teamData } = useGetTeam(teamId);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [showUpdateProjectForm, setshowUpdateProjectForm] = useState(false);
	const [showAddToTeamModal, setShowAddToTeamModal] = useState(false);

	const { deleteProject } = useDeleteProject(() => setShowDeleteDialog(false));

	function onDeleteHandler() {
		deleteProject(_id);
	}

	const difference = useMemo(() => {
		const startDateTime = new Date(startDate).getTime();
		const endDateTime = new Date(endDate).getTime();
		const timeDifference = Math.abs(endDateTime - startDateTime);
		//calculate days difference by dividing total milliseconds in a day
		const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
		return pluralize(daysDifference, 'day');
	}, [startDate, endDate]);

	return (
		<>
			<ProjectItemCardContainer>
				<div className="flex justify-center items-center space-x-4 project-item__avatar bg-secondary w-20 h-20 rounded-full">
					<div className="relative">
						<i className={clsx([getProjectIcon(category), 'text-[2.3rem] text-white'])}></i>
					</div>
				</div>

				<ImBin
					className={clsx(['project-item__icon', 'project-item__icon--delete'])}
					role="button"
					onClick={() => setShowDeleteDialog(true)}
				/>
				<BiEdit
					className={clsx(['project-item__icon', 'project-item__icon--edit'])}
					role="button"
					onClick={() => setshowUpdateProjectForm(true)}
				/>
				<span className="font-medium leading-tight text-xl text-blue-600 project-item__name">{name}</span>
				<div className="project-item__category">{category}</div>
				<div className="project-item__team-members">
					{' '}
					<Avatar.Group>
						{teamData &&
							teamData.teamMembers.map((member) => (
								<Avatar key={member._id} img={member.profileUrl} rounded={true} stacked={true} />
							))}

						<div
							className="relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500 space-x-4 cursor-pointer"
							onClick={() => setShowAddToTeamModal(true)}
							role="button"
							onKeyDown={() => (f: any) => f}
							tabIndex={-1}
						>
							<IoIosAddCircle color="white" size="20px" fill="white" />
						</div>
					</Avatar.Group>
				</div>
				<div className="project-item__duration">
					<BiTime />
					<span className="ml-2">{difference}</span>
				</div>
				<div className="project-item__team-no">
					<IoIosPeople />
					<span className="ml-2">{teamData && pluralize(teamData.teamMembers.length, 'employee')}</span>
				</div>
			</ProjectItemCardContainer>
			<CustomModal
				onClose={() => setShowDeleteDialog(false)}
				isOpen={showDeleteDialog}
				bodyClassName="text-center"
			>
				<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
				<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Are you sure you want to delete this Project?
				</h3>
				<div className="flex justify-center gap-4">
					<Button size="md" variant="danger" onClick={onDeleteHandler} type="button">
						Yes, I&apos;m sure
					</Button>
					<Button size="md" variant="inverse" onClick={() => setShowDeleteDialog(false)} type="button">
						No, cancel
					</Button>
				</div>
			</CustomModal>
			{showUpdateProjectForm ? (
				<UpdateProject id={_id} isOpen={showUpdateProjectForm} close={() => setshowUpdateProjectForm(false)} />
			) : null}
			{showAddToTeamModal ? (
				<AddEmployeeToTeam
					teamId={teamId as string}
					isOpen={showAddToTeamModal}
					close={() => setShowAddToTeamModal(false)}
				/>
			) : null}
		</>
	);
};
