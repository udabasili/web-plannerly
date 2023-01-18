import Head from 'next/head';
import React from 'react';

import { MainNavigation } from '@/components/Navigation/MainNavigation';
import useDisclosure from '@/hooks/useDisclosure';

import { SideNav } from '../Sidebar';

import { Container, Main } from './index.styled';

type MainLayoutProps = {
	title: string;
	children: React.ReactNode;
	bgColor?: string;
};

export const MainLayout = (props: MainLayoutProps) => {
	const { title = '', children } = props;
	const { open, close, isOpen } = useDisclosure();

	return (
		<Container>
			<Head>
				<title>{`Web Plannerly  | ${title} | Best Project Management`}</title>
				<link rel="icon" href="/fav.ico" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="The number one  Best Project Management" />
				<meta property="og:URL" content="https://web-plannerly.vercel.app/" />
				<meta property="og:title" content={`Web Plannerly   | ${title} |  Best Project Management`} />
				<meta property="og:type" content="website" />
				<meta property="og:description" content="The number one  Best Project Management." />
			</Head>
			<SideNav isOpen={isOpen} />
			<MainNavigation open={open} isOpen={isOpen} close={close} />
			<Main>{children}</Main>
		</Container>
	);
};
