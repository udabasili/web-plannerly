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
				<title>{`Udendu Portfolio  | ${title} | Best Developer Portfolio`}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="The number one Best Developer Portfolio store in Nigeria. Get your quality kitchen here"
				/>
				<meta property="og:URL" content="www.udabasili.live" />
				<meta property="og:title" content={`Udendu Portfolio  | ${title} | Best Developer Portfolio Nigeria`} />
				<meta property="og:type" content="website" />
				<meta
					property="og:description"
					content="The number one Best Developer Portfolio store in Nigeria. Get your quality websites built here. See Best Developer Portfolio."
				/>
			</Head>
			<SideNav isOpen={isOpen} />
			<MainNavigation open={open} isOpen={isOpen} close={close} />
			<Main>{children}</Main>
			{/* <Footer /> */}
		</Container>
	);
};
