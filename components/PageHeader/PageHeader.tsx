import React from 'react';

import Button from '../Element/Button';

import { PageHeaderContainer } from './index.styled';

type PageHeaderProps = {
	title: string;
	children?: React.ReactNode;
};

export const PageHeader = (props: PageHeaderProps) => {
	const { title, children } = props;
	return (
		<PageHeaderContainer className="flex flex-1 w-full">
			<span>
				<h1 className="font-bold  text-4xl text-primaryDark tabPort:mb-9">{title}</h1>
			</span>
			{children}
		</PageHeaderContainer>
	);
};
