import { page, chartBar, styles } from '@wordpress/icons';

const supportedCategories = {
	general: {
		label: 'General',
		icon: page,
	},
	analytics: {
		label: 'Analytics',
		icon: chartBar,
	},
	styles: {
		label: 'Styles',
		icon: styles,
	},
};

/**
 * Returns an array of supported categories
 *
 * @return {string[]} An array of supported categories
 */
const getSupportedCategories = () => Object.keys( supportedCategories );

/**
 * Returns an object of supported categories labels and icons to be used in the navigation
 *
 * @return {Object[]} Array of supported categories labels and icons
 */
const getNavigationCategoriesOptions = () =>
	Object.keys( supportedCategories ).map( ( key ) => ( {
		...supportedCategories[ key ],
		id: key,
	} ) );

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
	getSelectSupportedCategoriesOptions,
	getSupportedCategories,
	getNavigationCategoriesOptions,
};
