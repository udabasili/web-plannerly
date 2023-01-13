import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

import { NavLink } from './index.styled';

type CollapsibleNavItemProps = {
	icon: React.ReactElement;
	name: string;
	linkChildren: Array<string>;
};

type DropDownItemChildProps = {
	name: string;
};

const DropDownItemChild = ({ name }: DropDownItemChildProps) => {
	const router = useRouter();
	const link = `/${name.toLowerCase().split(' ').join('-')}`;

	return (
		<li className="relative">
			<NavLink
				href={link}
				className={clsx([
					'flex items-center text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-secondary hover:[#c4bfbb] transition duration-300 ease-in-out',
					router.pathname === link ? 'active' : '',
				])}
			>
				{name}
			</NavLink>
		</li>
	);
};

export const CollapsibleNavItem = ({ icon, name, linkChildren }: CollapsibleNavItemProps) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<li className="relative" id="sidenavSecEx2">
			<div
				className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-secondary hover:[#c4bfbb] transition duration-300 ease-in-out cursor-pointer"
				aria-expanded={isActive}
				aria-controls="collapseSidenavSecEx1"
				onClick={() => setIsActive(!isActive)}
				role="button"
				onKeyDown={() => (f: any) => f}
				tabIndex={0}
			>
				{icon}
				<span className="mx-2 font-extrabold capitalize text-lg">{name}</span>
				{!isActive ? (
					<GoTriangleDown className="w-4 h-4 ml-auto" />
				) : (
					<GoTriangleUp className="w-4 h-4  ml-auto" />
				)}
			</div>
			{isActive ? (
				<ul className="relative" id="collapseSidenavSecEx2">
					{linkChildren.map((child) => (
						<DropDownItemChild name={child} key={child} />
					))}
				</ul>
			) : null}
		</li>
	);
};
