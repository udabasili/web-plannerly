import { Avatar } from 'flowbite-react';
import { useState } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { HiArchive, HiOutlineExclamationCircle, HiOutlineTicket } from 'react-icons/hi';

import Button from '@/components/Element/Button';
import { CustomModal } from '@/components/Element/Modal';
import { Spinner } from '@/components/Element/Spinner';
import { Table } from '@/components/Element/Table';
import colors from '@/constant/color';
import { IEmployee } from '@/features/employees';

import { useDeleteTicket } from '../api/deleteTicket';
import { useGetTickets } from '../api/getTickets';
import { ITicket } from '../types';

import { UpdateTicket } from './UpdateTicket';

export const TicketTable = () => {
	const { isLoading, data: tickets } = useGetTickets();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [showUpdateTicketForm, setshowUpdateTicketForm] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState('');
	const { deleteTicket } = useDeleteTicket(() => setShowDeleteDialog(false));

	function onDeleteHandler() {
		deleteTicket(selectedTicket);
	}

	if (isLoading) {
		return <Spinner size="lg" containerClassName="self-center justify-self-center mt-10" />;
	}

	if (!tickets?.length) {
		return (
			<div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
				<HiOutlineTicket className="w-16 h-16" />
				<h4>No Tickets Found</h4>
			</div>
		);
	}

	return (
		<div className="col-span-full overflow-x-auto mt-7">
			<Table<ITicket>
				data={tickets || []}
				columns={[
					{
						title: 'Ticket Id',
						field: 'ticketId',
					},
					{
						title: 'Title',
						field: 'title',
					},
					{
						title: 'Author',
						field: 'author',
						Cell({ entry }: { entry: ITicket }) {
							return (
								<span className="flex items-center">
									<Avatar img={entry.author.profileUrl} rounded={true} stacked={true} />
									<span className="ml-2">{entry.author.name}</span>
								</span>
							);
						},
					},
					{
						title: 'Created On',
						field: 'createdAt',
						Cell({ entry }: { entry: ITicket }) {
							return <>{new Date(entry.createdAt).toDateString()}</>;
						},
					},
					{
						title: ' Status',
						field: 'status',
					},

					{
						title: 'Buttons',
						field: 'status',
						Cell({ entry }: { entry: ITicket }) {
							return (
								<span className="flex">
									<AiTwotoneEdit
										color={colors.primary}
										size="1.2rem"
										className="cursor-pointer hover:opacity-60"
										onClick={() => {
											setSelectedTicket(entry._id);
											setshowUpdateTicketForm(true);
										}}
									/>
									<AiFillDelete
										color="red"
										size="1.2rem"
										className="ml-5 cursor-pointer hover:opacity-60"
										onClick={() => {
											setSelectedTicket(entry._id);
											setShowDeleteDialog(true);
										}}
									/>
								</span>
							);
						},
					},
				]}
			/>
			<CustomModal
				onClose={() => setShowDeleteDialog(false)}
				isOpen={showDeleteDialog}
				bodyClassName="text-center"
			>
				<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
				<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Are you sure you want to delete this Ticket?
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
			{showUpdateTicketForm ? (
				<UpdateTicket
					id={selectedTicket}
					isOpen={showUpdateTicketForm && !!selectedTicket}
					close={() => setshowUpdateTicketForm(false)}
				/>
			) : null}
		</div>
	);
};
