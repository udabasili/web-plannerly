import { Avatar, Dropdown } from 'flowbite-react';
import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

import { SearchBox } from '../Element/SearchBox';

import { MainNavigationContainer } from './index.styled';

type MainNavigationProps = {
	open: () => void;
	isOpen: boolean;
	close: () => void;
};

export const MainNavigation = ({ open, isOpen, close }: MainNavigationProps) => {
	return (
		<MainNavigationContainer className="flex  px-4 py-5">
			{!isOpen ? (
				<GiHamburgerMenu
					className="h-10 w-10 hidden tabPort:block m-6 cursor-pointer hover:opacity-60"
					type="button"
					onClick={open}
				/>
			) : (
				<AiFillCloseCircle
					className="h-10 w-10 hidden tabPort:block m-6 cursor-pointer hover:opacity-60"
					color="red"
					type="button"
					onClick={close}
				/>
			)}
			<div className="flex flex-1  justify-between bottom-row">
				{/* <SearchBox className="search" /> */}
				{/* <Dropdown
					label={
						<Avatar
							alt="User settings"
							img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
							rounded={true}
						/>
					}
					arrowIcon={false}
					inline={true}
				>
					<Dropdown.Header>
						<span className="block text-sm">Bonnie Green</span>
						<span className="block truncate text-sm font-medium">admin@webplannerly.com</span>
					</Dropdown.Header>
				</Dropdown> */}
			</div>
		</MainNavigationContainer>
	);
};
