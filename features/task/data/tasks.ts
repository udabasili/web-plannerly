export const tasks = [
	'Discovery',
	'Site Architecture/Journey',
	'Web style guide',
	'Content creation',
	'Site Design',
	'Site Development',
	'QA and Testing',
	'Deployment',
] as const;

export const subTasks = [
	{
		name: tasks[0],
		children: [
			'Kick off meeting (Review Vision/goals and Teams)',
			'Collection of Brand assets',
			'Scope of Project/timeline',
			'setup  project management',
			'Market research',
			'Competition sites',
			'Keyword research',
		],
	},
	{
		name: tasks[1],
		children: [
			'Site Architecture',
			'Priority Keywords',
			'Revision and Approval of sitemaps',
			'Sitemap and Page Priority',
		],
	},
	{
		name: tasks[2],
		children: ['Picking Colors', 'Font Choice', 'Design of core Elements'],
	},
	{
		name: tasks[3],
		children: [
			'Supporting Keywords',
			'Paragraph Choice',
			'Lead Capture(CTAs)',
			'Links and Locations',
			'Page main headings (H1)',
			'Secondary Headings (H2 - H6)',
		],
	},
	{
		name: tasks[4],
		children: [
			'Home page layout',
			'Internal Page layout ',
			'Specialty Page layout (post blog / categories / contact pages)',
		],
	},
	{
		name: tasks[5],
		children: [
			'Setup hosting account',
			'Domain Setup ',
			'Setup development environment',
			'Building Priority pages',
			'3rd Party integration',
			'Form Integration/Setup',
			'Mobile responsiveness',
			'SEO Core implementation',
		],
	},
	{
		name: tasks[6],
		children: [
			'Final editing',
			'Backup schedule ',
			'Form Testing',
			'SSL testing',
			'Browser Testing',
			'Mobile Testing',
			'E2E Testing',
			'Integration Testing',
		],
	},
	{
		name: tasks[7],
		children: [
			'Push data/files to live server',
			'Post development QA ',
			'Setup google analytics tracking',
			'Deploy',
		],
	},
] as const;
