import clsx from 'clsx';
import { Textarea, TextInput } from 'flowbite-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FormControl, FormControlWithoutChildren } from './FormControl';

type TextAreaProps = FormControlWithoutChildren & {
	registration: Partial<UseFormRegisterReturn>;
	placeholder: string;
	required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const CustomTextArea = (props: TextAreaProps) => {
	const { label, containerClass, name, placeholder, required, error, registration, ...otherProps } = props;
	return (
		<FormControl label={label} containerClass={containerClass} name={name} error={error}>
			<Textarea
				id={name}
				placeholder={placeholder}
				required={required}
				rows={4}
				{...otherProps}
				{...registration}
			/>
		</FormControl>
	);
};
