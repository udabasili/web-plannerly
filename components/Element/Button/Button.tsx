/* eslint-disable no-mixed-spaces-and-tabs */
import clsx from 'clsx';
import React from 'react';

import { Spinner } from '../Spinner';

import { ButtonProps, sizes, variants } from './Button.types';

const Button = (props: ButtonProps) => {
	const { size, startIcon, endIcon, variant, isLoading, type, className, ...otherProps } = props;
	return (
		<button
			data-testid="button-component"
			type={type}
			className={clsx([
				'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-bold focus:outline-none hover:opacity-80',
				sizes[size],
				variants[variant],
				className,
			])}
			{...otherProps}
		>
			{isLoading && <Spinner size="sm" />}
			{!isLoading && startIcon}
			<span className="mx-2">{otherProps.children}</span>
			{!isLoading && endIcon}
		</button>
	);
};

export default Button;
