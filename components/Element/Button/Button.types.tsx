/* eslint-disable no-mixed-spaces-and-tabs */
export const variants = {
	primary: 'bg-primaryDark text-black',
	secondary: 'bg-secondary text-black',
	inverse: 'bg-white text-blue-600',
	danger: 'bg-red-600 text-white',
};

export const sizes = {
	sm: 'py-2 px-4 text-sm',
	md: 'py-2 px-6 text-md',
	lg: 'py-3 px-8 text-lg',
};

export type IconProps =
	| {
			startIcon: React.ReactElement;
			endIcon?: never;
	  }
	| {
			startIcon?: never;
			endIcon: React.ReactElement;
	  }
	| {
			startIcon?: undefined;
			endIcon?: undefined;
	  };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	size: keyof typeof sizes;
	variant: keyof typeof variants;
	isLoading?: boolean;
	type: 'button' | 'submit';
} & IconProps;
