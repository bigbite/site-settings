import { __ } from '@wordpress/i18n';

const supportedCategories = {
	general: {
		label: __( 'General', 'bb_site_settings' ),
		icon: 'settings',
	},
	analytics: {
		label: __( 'Analytics', 'bb_site_settings' ),
		icon: 'chart-line',
	},
	styles: {
		label: __( 'Styles', 'bb_site_settings' ),
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
		label: __( 'Select category', 'bb_site_settings' ),
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
