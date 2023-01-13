import clsx from 'clsx';
import { FileInput, TextInput } from 'flowbite-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FormControl, FormControlWithoutChildren } from './FormControl';

type InputProps = Omit<FormControlWithoutChildren, 'type'> & {
	registration: Partial<UseFormRegisterReturn>;
	placeholder?: string;
	required?: boolean;
};

export const InputImage = (props: InputProps) => {
	const { label, containerClass, name, placeholder, registration, required, error, ...otherProps } = props;
	return (
		<FormControl label={label} containerClass={containerClass} name={name} error={error}>
			<FileInput
				id={name}
				placeholder={placeholder}
				required={required}
				accept="image/*"
				{...otherProps}
				{...registration}
			/>
		</FormControl>
	);
};
