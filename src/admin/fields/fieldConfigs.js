import {
	TextControl,
	ToggleControl,
	RadioControl,
	CheckboxControl,
} from '@wordpress/components';
import { v4 as uuidv4 } from 'uuid';
import { __ } from '@wordpress/i18n';

import CheckboxGroup from './CheckboxGroup';

const LABELS = {
	FIELD: __( 'Label for field', 'bb_site_settings' ),
	VALUE: __( 'Value for field', 'bb_site_settings' ),
	OPTION_LABEL: __( 'Option Label', 'bb_site_settings' ),
	OPTION_VALUE: __( 'Option value', 'bb_site_settings' ),
};

const fieldConfigs = {
	text: {
		Component: TextControl,
		keyProp: 'value',
		label: __( 'Text', 'bb_site_settings' ),
		attributes: {
			label: 'Text Label',
			value: '',
		},
		config: {
			controls: [
				{
					component: TextControl,
					required: true,
					label: LABELS.FIELD,
					componentProp: 'value',
					settingKey: 'label',
				},
				{
					component: TextControl,
					label: LABELS.VALUE,
					componentProp: 'value',
					settingKey: 'value',
				},
			],
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
		config: {
			controls: [
				{
					component: TextControl,
					required: true,
					label: LABELS.FIELD,
					componentProp: 'value',
					settingKey: 'label',
				},
				{
					component: ToggleControl,
					label: LABELS.VALUE,
					componentProp: 'checked',
					settingKey: 'checked',
				},
			],
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
		config: {
			options: true,
			optionsKey: 'options',
			optionsHeader: __( 'Checkbox Options', 'bb_site_settings' ),
			newOption: { label: '', checked: false },
			controls: [
				{
					component: TextControl,
					required: true,
					label: LABELS.OPTION_LABEL,
					optionKey: 'label',
					componentProp: 'value',
				},
				{
					component: CheckboxControl,
					label: LABELS.OPTION_VALUE,
					optionKey: 'checked',
					componentProp: 'checked',
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
		config: {
			options: true,
			optionsKey: 'options',
			optionsHeader: __( 'Radio Options', 'bb_site_settings' ),
			newOption: { label: '', value: '' },
			controls: [
				{
					component: TextControl,
					required: true,
					label: LABELS.OPTION_LABEL,
					optionKey: 'label',
					componentProp: 'value',
				},
				{
					component: TextControl,
					label: LABELS.OPTION_VALUE,
					optionKey: 'value',
					componentProp: 'value',
				},
			],
		},
	},
};

export default fieldConfigs;
