const prefixIcon = (icon: string) => {
	return `/category-icons/${icon}`;
};
export const projectCategories = [
	'UI/UX Design',
	'App Development',
	'Quality Assurance',
	'Frontend Development',
	'FullStack Development',
	'Backend Development',
	'Software Testing',
	'Marketing',
	'SEO',
] as const;

export const projectCategoryWithIcons = [
	{
		name: projectCategories[0],
		icon: 'icofont-drawing-tablet',
	},
	{
		name: projectCategories[1],
		icon: 'icofont-mobile-phone',
	},
	{
		name: projectCategories[2],
		icon: 'icofont-tick-boxed',
	},
	{
		name: projectCategories[3],
		icon: 'icofont-dashboard-web',
	},
	{
		name: projectCategories[4],
		icon: 'icofont-web',
	},
	{
		name: projectCategories[5],
		icon: 'icofont-server',
	},
	{
		name: projectCategories[6],
		icon: 'icofont-test-tube-alt',
	},
	{
		name: projectCategories[7],
		icon: 'icofont-envelope-open',
	},
	{
		name: projectCategories[8],
		icon: 'icofont-search-document',
	},
];
