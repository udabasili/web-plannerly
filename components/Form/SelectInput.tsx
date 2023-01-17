import clsx from 'clsx';
import { Select, Textarea } from 'flowbite-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FormControl, FormControlWithoutChildren } from './FormControl';

type SelectOption = {
	label: React.ReactNode;
	value: string | number | string[];
};

type CustomSelectInputProps = FormControlWithoutChildren & {
	selectionOptions: SelectOption[];
	registration: Partial<UseFormRegisterReturn>;
	placeholder?: string;
	required?: boolean;
	className?: string;
	defaultValue?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const CustomSelectInput = (props: CustomSelectInputProps) => {
	const {
		name,
		label,
		selectionOptions,
		error,
		className,
		registration,
		placeholder,
		defaultValue,
		containerClass,
		required,
		...otherProps
	} = props;

	return (
		<FormControl label={label} containerClass={containerClass} name={name} error={error} {...otherProps}>
			<div id="select">
				<Select
					id={name}
					className={className}
					required={required}
					name={name}
					placeholder={placeholder}
					defaultValue={defaultValue}
					{...registration}
				>
					<option selected disabled>
						{placeholder}
					</option>
					{selectionOptions.map((selectionOption) => (
						<option value={selectionOption.value} key={selectionOption.label?.toString()}>
							{selectionOption.label}
						</option>
					))}
				</Select>
			</div>
		</FormControl>
	);
};
