import { __ } from '@wordpress/i18n';

import fieldConfigs from './fieldConfigs';

/**
 * Returns the config for a given field used for the field configurator
 *
 * @param {string} field - field name
 *
 * @return {Object | undefined} Config for the given field
 */
const getConfig = ( field ) => fieldConfigs[ field ]?.config;

/**
 * Returns an array of supported fields
 *
 * @return {string[]} Array of supported fields
 */
const getSupportedfields = () => Object.keys( fieldConfigs );

/**
 * Returns the component for a given field
 *
 * @param {string} field - field name
 *
 * @return {Component | undefined} Component for the given field
 */
const getComponent = ( field ) => fieldConfigs[ field ]?.Component;

/**
 * Returns the attributes for a given field
 *
 * @param {string} field - field name
 *
 * @return {Object | undefined} Attributes for the given field
 */
const getAttributes = ( field ) => fieldConfigs[ field ]?.attributes;

/**
 * Returns the key prop for a given field
 *
 * @param {string} field - field name
 *
 * @return {string | undefined} Key prop for the given field
 */
const getKeyProp = ( field ) => fieldConfigs[ field ]?.keyProp;

/**
 * Returns an array of supported fields in select options format
 *
 * @return {Object[]} Array of supported fields in select options format
 */
const getSelectSupportedOptions = () => [
	{
		disabled: true,
		label: __( 'Select field', 'bb_site_settings' ),
		value: '',
	},
	...Object.keys( fieldConfigs ).map( ( key ) => ( {
		label: fieldConfigs[ key ].label,
		value: key,
	} ) ),
];

export {
	getComponent,
	getAttributes,
	getSelectSupportedOptions,
	getSupportedfields,
	getKeyProp,
	getConfig,
};
