const supportedCategories = {
	general: {
		label: 'General',
		icon: 'settings',
	},
	analytics: {
		label: 'Analytics',
		icon: 'chart-line',
	},
	styles: {
		label: 'Styles',
		icon: 'brush',
	},
};

const getSupportedCategories = () => Object.keys( supportedCategories );

const getSupportedCategoriesIcons = ( category ) =>
	supportedCategories[ category ]?.icon;

const getSelectSupportedCategoriesOptions = () => [
	{
		disabled: true,
		label: 'Select category',
		value: '',
	},
	...Object.keys( supportedCategories ).map( ( key ) => ( {
		label: supportedCategories[ key ].label,
		value: key,
	} ) ),
];

export {
	getSupportedCategoriesIcons,
	getSelectSupportedCategoriesOptions,
	getSupportedCategories,
};
