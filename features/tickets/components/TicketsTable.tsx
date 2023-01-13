import { Avatar } from 'flowbite-react';
import React, { useMemo } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';

import { ticketData } from '../data';
import { Ticket } from '../types';

import { Table } from '@/components/Element/Table';
import colors from '@/constant/color';
import useDeviceDetect from '@/hooks/useDeviceDetect';

const Tickets = ({ members }: { members: Array<string> }) => {
	const { isMobile } = useDeviceDetect();
	const totalMembers = useMemo(() => {
		return members.length;
	}, [members]);
	console.log(isMobile);
	return (
		<Avatar.Group>
			{members
				.filter((data, index) => {
					if (isMobile) {
						return index < 2;
					}
					return index;
				})
				.map((member, index) => (
					<Avatar
						img="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
						rounded={true}
						stacked={true}
						key={index}
					/>
				))}
			{isMobile ? <Avatar.Counter total={totalMembers - 1} /> : null}
			<div className="relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500 space-x-4 cursor-pointer">
				<IoIosAddCircle color="white" size="20px" fill="white" />
			</div>
		</Avatar.Group>
	);
};

export const TicketTable = () => {
	const tickets = new Array(9).fill(ticketData);
	return (
		<Table<Ticket>
			data={tickets}
			columns={[
				{
					title: 'Id',
					field: 'id',
				},
				{
					title: 'Title',
					field: 'title',
				},
				{
					title: 'Author',
					field: 'author',
				},
				{
					title: 'Created On',
					field: 'createdAt',
				},
				{
					title: ' Status',
					field: 'status',
				},

				{
					title: 'Buttons',
					field: 'status',
					Cell({ entry }: { entry: any }) {
						return (
							<span className="flex">
								<AiTwotoneEdit
									color={colors.primary}
									size="1.2rem"
									className="cursor-pointer hover:opacity-60"
								/>
								<AiFillDelete
									color="red"
									size="1.2rem"
									className="ml-5 cursor-pointer hover:opacity-60"
								/>
							</span>
						);
					},
				},
			]}
		/>
	);
};
