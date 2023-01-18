import clsx from 'clsx';
import { Avatar } from 'flowbite-react';
import { useState } from 'react';
import { BiEdit, BiPhone } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ImBin } from 'react-icons/im';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';

import { useDeleteClient } from '../api/deleteClient';
import { IClient } from '../types';

import { ClientCardContainer } from './index.styled';
import { UpdateClient } from './UpdateClient';

export const ClientCard = (props: IClient) => {
	const { _id = '', profileUrl, companyName, email, phoneNumber, name } = props;
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [showUpdateClientForm, setshowUpdateClientForm] = useState(false);

	const { deleteClient } = useDeleteClient(() => setShowDeleteDialog(false));

	function onDeleteHandler() {
		deleteClient(_id);
	}

	return (
		<>
			<ClientCardContainer>
				<Avatar className="client__avatar object-cover" img={profileUrl} rounded={true} size="lg"></Avatar>
				<ImBin
					className={clsx(['client__icon', 'client__icon--delete'])}
					role="button"
					onClick={() => setShowDeleteDialog(true)}
				/>
				<BiEdit
					className={clsx(['client__icon', 'client__icon--edit'])}
					role="button"
					onClick={() => setshowUpdateClientForm(true)}
				/>
				<span className="font-medium leading-tight text-xl text-blue-600 client__name">{name}</span>
				<div className="client__category">{companyName}</div>
				<div className="client__phone">
					<BiPhone />
					<span className="ml-2 text-xs">{phoneNumber}</span>
				</div>
				<div className="client__email">
					<FiMail />
					<span className="ml-2 text-xs">{email}</span>
				</div>
			</ClientCardContainer>
			<CustomModal
				onClose={() => setShowDeleteDialog(false)}
				isOpen={showDeleteDialog}
				bodyClassName="text-center"
			>
				<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
				<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Are you sure you want to delete this Client?
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
			{showUpdateClientForm ? (
				<UpdateClient id={_id} isOpen={showUpdateClientForm} close={() => setshowUpdateClientForm(false)} />
			) : null}
		</>
	);
};
