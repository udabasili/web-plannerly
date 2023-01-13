import clsx from 'clsx';
import React from 'react';

import { SpinnerContainer } from './index.styled';

const sizes = {
	sm: 'sm',
	md: 'md',
	lg: 'lg',
	xl: 'xl',
};

const variants = {
	light: 'light',
	primary: 'primary',
};

type SpinnerProps = {
	size?: keyof typeof sizes;
	variant?: keyof typeof variants;
	containerClassName?: string;
};

export const Spinner = ({ size = 'md', variant = 'primary', containerClassName }: SpinnerProps) => {
	return <SpinnerContainer className={clsx([sizes[size], variants[variant], containerClassName])} />;
};
