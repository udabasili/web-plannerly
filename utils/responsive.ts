const devices = {
	mobile: '600px',
	tabPort: '900px',
	tabLand: '1200px',
	bigDesktop: '1800px',
};

export const responsive = {
	mobile: `@media screen and (max-width:${devices.mobile})`,
	tabPort: `@media screen and (max-width:${devices.tabPort})`,
	tabLand: `@media screen and (max-width:${devices.tabLand})`,
	bigDesktop: `@media screen and (max-width:${devices.bigDesktop})`,
};
