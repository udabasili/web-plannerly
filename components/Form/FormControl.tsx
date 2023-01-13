import clsx from 'clsx';
import { Label } from 'flowbite-react';
import React from 'react';
import { FieldError } from 'react-hook-form';

type FormControlProps = {
	label: string;
	children: React.ReactNode;
	containerClass?: string;
	description?: string;
	name: string;
	error?: FieldError | undefined;
};

export type FormControlWithoutChildren = Omit<FormControlProps, 'children'>;

export const FormControl = (props: FormControlProps) => {
	const { label, children, containerClass = '', error, name } = props;
	return (
		<div className={clsx(['mb-2', containerClass])}>
			<div className="mb-2 block">
				<Label htmlFor={name} value={label} />
			</div>
			{children}
			{error?.message ? (
				<div role="alert" aria-label={error.message} className="text-sm font-semibold text-red-500">
					{error.message}
				</div>
			) : null}
		</div>
	);
};
