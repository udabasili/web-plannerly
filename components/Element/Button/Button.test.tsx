import { render } from '@testing-library/react';
import React from 'react';

import Button from './Button';
import { ButtonProps } from './Button.types';

describe('Button Component', () => {
	let props: ButtonProps;

	beforeEach(() => {
		props = {
			size: 'sm',
			variant: 'primary',
			type: 'button',
		};
	});
	const renderComponent = () => render(<Button {...props} />);
	it.each`
		size    | name
		${'sm'} | ${'small'}
		${'md'} | ${'medium'}
		${'lg'} | ${'large'}
	`('should have $size class for $name button', ({ size, name }) => {
		props.size = size;

		const customRender = renderComponent();
		const button = customRender.getByTestId('button-component');
		expect(button).toHaveClass(size);
	});

	it.each`
		variant      | color
		${'primary'} | ${' rgb(109, 114, 195)'}
		${'inverse'} | ${' rgb(255, 255, 255)'}
		${'success'} | ${' rgb(132, 204, 22)'}
		${'dark'}    | ${' rgb(0, 0, 0)'}
		${'danger'}  | ${' rgb(223, 55, 59)'}
	`('$variant button should have background color $color', ({ variant, color }) => {
		props.variant = variant;
		const customRender = renderComponent();
		const button = customRender.getByTestId('button-component');
		expect(button).toHaveStyle({ backgroundColor: color });
	});
});
