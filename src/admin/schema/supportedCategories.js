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

/**
 * Returns an array of supported categories
 *
 * @return {string[]} An array of supported categories
 */
const getSupportedCategories = () => Object.keys( supportedCategories );

/**
 * Returns an icon of supported category
 *
 * @param {string} category - category name
 *
 * @return {string} Icon name
 */
const getSupportedCategoriesIcons = ( category ) =>
	supportedCategories[ category ]?.icon;

/**
 * Returns an array of supported categories in select options format
 *
 * @return {Object[]} Array of supported categories options
 */
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
