import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import React from 'react';

import Button from '../Element/Button';

import { PageHeaderContainer } from './index.styled';

type PageHeaderProps = {
	title: string;
	children?: React.ReactNode;
	backButton?: EmotionJSX.Element;
};

export const PageHeader = (props: PageHeaderProps) => {
	const { title, children, backButton } = props;
	return (
		<PageHeaderContainer className="flex flex-1 w-full">
			{backButton ? backButton : null}
			<span>
				<h1 className="font-bold  text-4xl text-primaryDark tabPort:mb-9">{title}</h1>
			</span>
			{children}
		</PageHeaderContainer>
	);
};
