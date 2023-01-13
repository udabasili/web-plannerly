import clsx from 'clsx';
import { TextInput } from 'flowbite-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FormControl, FormControlWithoutChildren } from './FormControl';

type InputProps = FormControlWithoutChildren & {
	type: 'password' | 'text' | 'email' | 'number' | 'tel' | 'date';
	registration: Partial<UseFormRegisterReturn>;
	placeholder?: string;
	required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
	const { label, containerClass, name, placeholder, registration, type, required, error, ...otherProps } = props;
	return (
		<FormControl label={label} containerClass={containerClass} name={name} error={error}>
			<TextInput
				id={name}
				type={type}
				placeholder={placeholder}
				required={required}
				{...otherProps}
				{...registration}
			/>
		</FormControl>
	);
};
