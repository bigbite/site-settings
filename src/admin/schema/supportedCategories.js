import { __ } from '@wordpress/i18n';
import { page, chartBar, styles } from '@wordpress/icons';

const supportedCategories = {
	general: {
		label: __( 'General', 'bb_site_settings' ),
		icon: page,
	},
	analytics: {
		label: __( 'Analytics', 'bb_site_settings' ),
		icon: chartBar,
	},
	styles: {
		label: __( 'Styles', 'bb_site_settings' ),
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
		label: __( 'Select category', 'bb_site_settings' ),
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
