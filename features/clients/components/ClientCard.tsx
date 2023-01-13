import clsx from 'clsx';
import { Avatar, Badge, Progress } from 'flowbite-react';
import { BiEdit, BiTime } from 'react-icons/bi';
import { GrAdd, GrAddCircle } from 'react-icons/gr';
import { ImBin } from 'react-icons/im';
import { IoIosAddCircle, IoIosAddCircleOutline, IoIosPeople } from 'react-icons/io';

import { ClientProps } from '../types';

import { ClientCardContainer } from './index.styled';

export const ClientCard = (props: ClientProps) => {
	return (
		<ClientCardContainer>
			<Avatar
				className="client__avatar"
				img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
				rounded={true}
				size="lg"
			></Avatar>
			<ImBin className={clsx(['client__icon', 'client__icon--delete'])} />
			<BiEdit className={clsx(['client__icon', 'client__icon--edit'])} />
			<span className="font-medium leading-tight text-xl text-blue-600 client__name">John Peters</span>
			<div className="client__category">T Mobile</div>
			<div className="client__team-members"> </div>
			<div className="client__duration">
				<BiTime />
				<span className="ml-2">Email</span>
			</div>
			<div className="client__team-no">
				<IoIosPeople />
				<span className="ml-2">Phone Number</span>
			</div>
		</ClientCardContainer>
	);
};
