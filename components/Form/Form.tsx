import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { DeepPartial, FieldValues, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ZodType, ZodTypeAny, ZodTypeDef } from 'zod';

type FormProps<IFormSchema, IFormValues extends FieldValues> = {
	schema: IFormSchema;
	className: string;
	children: (methods: UseFormReturn<IFormValues>) => React.ReactNode;
	id?: string;
	onSubmitFn: (values: IFormValues) => void;
	options?: UseFormProps<IFormValues>;
	defaultValues?: DeepPartial<IFormValues>;
	resetDefaultValues?: boolean;
};
export const Form = <
	IFormSchema extends ZodType<unknown, ZodTypeDef, unknown>,
	IFormValues extends Record<string, unknown>
>(
	props: FormProps<IFormSchema, IFormValues>
) => {
	const { schema, children, id, className, onSubmitFn, options, defaultValues, resetDefaultValues = false } = props;
	const methods = useForm<IFormValues>({
		...options,
		mode: 'onChange',
		resolver: schema && zodResolver(schema),
	});

	const onSubmit = async (data: IFormValues) => {
		await onSubmitFn(data);
	};

	useEffect(() => {
		if (defaultValues && resetDefaultValues) {
			methods.reset({ ...defaultValues });
		}
	}, [defaultValues, methods, resetDefaultValues]);

	return (
		<form className={clsx(['grid', className])} onSubmit={methods.handleSubmit(onSubmit)} id={id}>
			{children(methods)}
		</form>
	);
};
