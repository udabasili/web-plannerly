import clsx from 'clsx';
import { Avatar } from 'flowbite-react';
import { useState } from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { BiEdit, BiPhone } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ImBin } from 'react-icons/im';

import { useDeleteEmployee } from '../api/deleteEmployee';
import { IEmployee } from '../types';

import { EmployeeCardContainer } from './index.styled';
import { UpdateEmployee } from './UpdateEmployee';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';

export const EmployeeCard = (props: IEmployee) => {
	const { _id = '', profileUrl, position, email, phoneNumber, name } = props;
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [showUpdateEmployeeForm, setshowUpdateEmployeeForm] = useState(false);

	const { deleteEmployee } = useDeleteEmployee(() => setShowDeleteDialog(false));

	function onDeleteHandler() {
		deleteEmployee(_id);
	}

	return (
		<>
			<EmployeeCardContainer>
				<Avatar className="employee__avatar" img={profileUrl} rounded={true} size="lg"></Avatar>
				<ImBin
					className={clsx(['employee__icon', 'employee__icon--delete'])}
					role="button"
					onClick={() => setShowDeleteDialog(true)}
				/>
				<BiEdit
					className={clsx(['employee__icon', 'employee__icon--edit'])}
					role="button"
					onClick={() => setshowUpdateEmployeeForm(true)}
				/>
				<span className="font-medium leading-tight text-xl text-blue-600 employee__name">{name}</span>
				<div className="employee__position">{position}</div>
				<div className="employee__phone">
					<BiPhone />
					<span className="ml-2">{phoneNumber}</span>
				</div>
				<div className="employee__email">
					<FiMail />
					<span className="ml-2">{email}</span>
				</div>
				<div className="employee__no-of-projects">
					<AiOutlineFundProjectionScreen />
					<span className="ml-2">No of projects</span>
				</div>
				<div className="employee__no-of-current-tasks">
					<AiOutlineFundProjectionScreen />
					<span className="ml-2">No of current tasks</span>
				</div>
			</EmployeeCardContainer>
			<CustomModal
				onClose={() => setShowDeleteDialog(false)}
				isOpen={showDeleteDialog}
				bodyClassName="text-center"
			>
				<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
				<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Are you sure you want to delete this Employee?
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
			{showUpdateEmployeeForm ? (
				<UpdateEmployee
					id={_id}
					isOpen={showUpdateEmployeeForm}
					close={() => setshowUpdateEmployeeForm(false)}
				/>
			) : null}
		</>
	);
};
