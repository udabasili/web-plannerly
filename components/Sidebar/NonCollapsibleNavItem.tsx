import clsx from 'clsx';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

import { NavLink } from './index.styled';

type NonCollapsableNavItemProps = {
	icon: React.ReactElement;
	name: string;
};

export const NonCollapsableNavItem = ({ icon, name }: NonCollapsableNavItemProps) => {
	const router = useRouter();
	const link = `/${name.toLowerCase().split(' ').join('-')}`;

	return (
		<li className="relative" id="sidenavSecEx2">
			<div
				className={clsx([
					'flex items-center overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-secondary hover:[#c4bfbb] transition duration-300 ease-in-out cursor-pointer',
				])}
			>
				<NavLink
					href={link}
					className={clsx([
						' font-extrabold capitalize text-lg flex flex-1  py-4 px-6 h-12  items-center',
						router.pathname === link ? 'active' : '',
					])}
				>
					<span className="text-sm">{icon}</span>
					<span className="mx-2 font-extrabold capitalize text-lg">{name ? name : 'Hame'}</span>
				</NavLink>
			</div>
		</li>
	);
};
