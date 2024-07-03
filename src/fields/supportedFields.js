import {
	TextControl,
	ToggleControl,
	RadioControl,
} from '@wordpress/components';

import CheckboxGroup from './CheckboxGroup';

const supportedFields = {
	text: {
		Component: TextControl,
		label: 'Text',
		attributes: {
			label: 'Text Label',
			value: 'Text Value',
		},
	},
	toggle: {
		Component: ToggleControl,
		label: 'Toggle',
		attributes: {
			label: 'Toggle Label',
			checked: true,
		},
	},
	'checkbox-group': {
		Component: CheckboxGroup,
		label: 'Checkbox Group',
		attributes: {
			label: 'Checkbox Group Label',
			options: [
				{
					label: 'Checkbox 1',
					checked: true,
				},
				{
					label: 'Checkbox 2',
					checked: false,
				},
				{
					label: 'Checkbox 3',
					checked: false,
				},
			],
		},
	},
	radio: {
		Component: RadioControl,
		label: 'Radio',
		attributes: {
			label: 'Radio Label',
			selected: 2,
			options: [
				{
					label: 'Option 1',
					value: 1,
				},
				{
					label: 'Option 2',
					value: 2,
				},
				{
					label: 'Option 3',
					value: 3,
				},
			],
		},
	},
};

const getSupportedfields = () => Object.keys( supportedFields );

const getComponent = ( field ) => supportedFields[ field ]?.Component;

const getAttributes = ( field ) => supportedFields[ field ]?.attributes;

const getSelectSupportedOptions = () => [
	{
		disabled: true,
		label: 'Select field',
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
};
