import { __ } from '@wordpress/i18n';
import {
	TextControl,
	ToggleControl,
	RadioControl,
} from '@wordpress/components';
import { v4 as uuidv4 } from 'uuid';

import CheckboxGroup from './CheckboxGroup';

const supportedFields = {
	text: {
		Component: TextControl,
		keyProp: 'value',
		label: __( 'Text', 'bb_site_settings' ),
		attributes: {
			label: 'Text Label',
			value: '',
		},
	},
	toggle: {
		Component: ToggleControl,
		keyProp: 'checked',
		label: __( 'Toggle', 'bb_site_settings' ),
		attributes: {
			label: 'Toggle Label',
			checked: false,
		},
	},
	'checkbox-group': {
		Component: CheckboxGroup,
		keyProp: 'options',
		label: __( 'Checkbox Group', 'bb_site_settings' ),
		attributes: {
			label: 'Checkbox Group Label',
			options: [
				{
					label: 'Checkbox 1',
					checked: false,
					id: uuidv4(),
				},
				{
					label: 'Checkbox 2',
					checked: false,
					id: uuidv4(),
				},
				{
					label: 'Checkbox 3',
					checked: false,
					id: uuidv4(),
				},
			],
		},
	},
	radio: {
		Component: RadioControl,
		keyProp: 'selected',
		label: __( 'Radio', 'bb_site_settings' ),
		attributes: {
			label: 'Radio Label',
			selected: null,
			options: [
				{
					label: 'Option 1',
					value: '1',
					id: uuidv4(),
				},
				{
					label: 'Option 2',
					value: '2',
					id: uuidv4(),
				},
				{
					label: 'Option 3',
					value: '3',
					id: uuidv4(),
				},
			],
		},
	},
};

/**
 * Returns an array of supported fields
 *
 * @return {string[]} Array of supported fields
 */
const getSupportedfields = () => Object.keys( supportedFields );

/**
 * Returns the component for a given field
 *
 * @param {string} field - field name
 *
 * @return {Component | undefined} Component for the given field
 */
const getComponent = ( field ) => supportedFields[ field ]?.Component;

/**
 * Returns the attributes for a given field
 *
 * @param {string} field - field name
 *
 * @return {Object | undefined} Attributes for the given field
 */
const getAttributes = ( field ) => supportedFields[ field ]?.attributes;

/**
 * Returns the key prop for a given field
 *
 * @param {string} field - field name
 *
 * @return {string | undefined} Key prop for the given field
 */
const getKeyProp = ( field ) => supportedFields[ field ]?.keyProp;

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
	...Object.keys( supportedFields ).map( ( key ) => ( {
		label: supportedFields[ key ].label,
		value: key,
	} ) ),
];

export {
	getComponent,
	getAttributes,
	getSelectSupportedOptions,
	getSupportedfields,
	getKeyProp,
};
