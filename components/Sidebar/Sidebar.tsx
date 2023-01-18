/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { CollapsibleNavItem } from './CollapsibleNavItem';
import { SidebarContainer } from './index.styled';
import { navData } from './navigationData';
import { NonCollapsableNavItem } from './NonCollapsibleNavItem';

type SideNavProps = {
	isOpen: boolean;
};

const SideNavLogo = () => {
	return (
		<div className="pt-4 pb-2 px-6 my-7">
			<Link href="#!">
				<div className="flex items-center">
					<div className="shrink-0">
						<Image
							src="/icons8-schedule-cloud-96.png"
							className="rounded-full w-10"
							alt="Web plannerly"
							width={20}
							height={20}
						/>
					</div>
					<div className="grow ml-3">
						<p className="text-xl font-semibold text-white">Web Plannerly</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const SideNav = ({ isOpen }: SideNavProps) => {
	return (
		<SidebarContainer className={clsx(['w-60 h-full shadow-md bg-white absolute', isOpen ? 'open' : ''])}>
			<SideNavLogo />
			<ul className="relative px-1">
				{navData.map((item) => {
					return item.collapsible && item.children ? (
						<CollapsibleNavItem
							key={item.name}
							icon={<item.icon />}
							name={item.name}
							linkChildren={item.children}
						/>
					) : (
						<NonCollapsableNavItem key={item.name} icon={<item.icon />} name={item.name} />
					);
				})}
			</ul>
		</SidebarContainer>
	);
};
