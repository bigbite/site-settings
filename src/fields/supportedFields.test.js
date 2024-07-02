import { TextControl, ToggleControl, RadioControl } from '@wordpress/components';
import CheckboxGroup from './CheckboxGroup';
import {
	getComponent,
	getAttributes,
	getSelectSupportedOptions,
	getSupportedfields,
} from './supportedFields';

jest.mock('@wordpress/components', () => ({
	TextControl: jest.fn(),
	ToggleControl: jest.fn(),
	RadioControl: jest.fn(),
}));
jest.mock('./CheckboxGroup', () => jest.fn());

describe('supportedFields', () => {
	test('getSupportedfields returns correct field keys', () => {
		const fields = getSupportedfields();
		expect(fields).toEqual(expect.arrayContaining(['text', 'toggle', 'checkbox-group', 'radio']));
	});

	test('getComponent returns correct component for each field', () => {
		expect(getComponent('text')).toBe(TextControl);
		expect(getComponent('toggle')).toBe(ToggleControl);
		expect(getComponent('checkbox-group')).toBe(CheckboxGroup);
		expect(getComponent('radio')).toBe(RadioControl);
	});

	test('getAttributes returns correct attributes for each field', () => {
		const textAttributes = getAttributes('text');
		expect(textAttributes).toEqual({ label: 'Text Label', value: 'Text Value' });

		const toggleAttributes = getAttributes('toggle');
		expect(toggleAttributes).toEqual({ label: 'Toggle Label', checked: true });

		const radioAttributes = getAttributes('radio');
		expect(radioAttributes).toEqual({
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
		});

		const checkboxGroupAttributes = getAttributes('checkbox-group');
		expect(checkboxGroupAttributes).toEqual({
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
		});
	});

	test('getSelectSupportedOptions returns correct options for select', () => {
		const options = getSelectSupportedOptions();
		expect(options).toEqual(
			expect.arrayContaining([
				{ disabled: true, label: 'Select field', value: '' },
				{ label: 'Text', value: 'text' },
				{ label: 'Toggle', value: 'toggle' },
				{ label: 'Checkbox Group', value: 'checkbox-group' },
				{ label: 'Radio', value: 'radio' },
			]),
		);
	});
});
