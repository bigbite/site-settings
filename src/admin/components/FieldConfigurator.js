import {
	CheckboxControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import OptionConfig from './OptionConfig';
import { getAttributes } from '../fields';

const FieldConfigurator = ( { field, setting, setNewSetting } ) => {
	/**
	 * Set the new setting with default attributes when the field changes and on first mount
	 */
	useEffect( () => {
		setNewSetting( {
			...getAttributes( field ),
		} );
	}, [ field, setNewSetting ] );

	/**
	 * Handle the attribute change for the setting
	 *
	 * @param {string} key   - attribute key
	 * @param {*}      value - attribute value
	 */
	const handleAttributeChange = ( key, value ) => {
		setNewSetting( {
			...setting,
			[ key ]: value,
		} );
	};

	return (
		<div className="field-config">
			<h3>{ __( 'Field Configuration', 'bb_site_settings' ) }</h3>

			<p>
				{ __(
					'Configure the field for the setting',
					'bb_site_settings'
				) }
			</p>
			<div className="field-config__field">
				{ field === 'text' && (
					<div className="field-config__options">
						<TextControl
							className="form-field--required"
							required
							label={ __(
								'Label for field',
								'bb_site_settings'
							) }
							value={ setting?.label || '' }
							onChange={ ( value ) =>
								handleAttributeChange( 'label', value )
							}
						/>
						<TextControl
							label={ __(
								'Value for field',
								'bb_site_settings'
							) }
							value={ setting?.value || '' }
							onChange={ ( value ) => {
								handleAttributeChange( 'value', value );
							} }
						/>
					</div>
				) }

				{ field === 'toggle' && (
					<div className="field-config__options">
						<TextControl
							className="form-field--required"
							required
							label={ __(
								'Label for field',
								'bb_site_settings'
							) }
							value={ setting?.label || '' }
							onChange={ ( value ) =>
								handleAttributeChange( 'label', value )
							}
						/>
						<ToggleControl
							label={ __(
								'Value for field',
								'bb_site_settings'
							) }
							checked={ setting?.checked || false }
							onChange={ ( value ) => {
								handleAttributeChange( 'checked', value );
							} }
						/>
					</div>
				) }

				{ field === 'radio' && (
					<OptionConfig
						setting={ setting }
						handleAttributeChange={ handleAttributeChange }
						optionsHeader={ __(
							'Radio options',
							'bb_site_settings'
						) }
						config={ {
							newOption: { label: '', value: '' },
							controls: [
								{
									type: TextControl,
									required: true,
									label: __(
										'Option Label',
										'bb_site_settings'
									),
									updateField: 'label',
									valueProp: 'value',
								},
								{
									type: TextControl,
									required: false,
									label: __(
										'Option Value',
										'bb_site_settings'
									),
									updateField: 'value',
									valueProp: 'value',
								},
							],
						} }
					/>
				) }

				{ field === 'checkbox-group' && (
					<OptionConfig
						setting={ setting }
						handleAttributeChange={ handleAttributeChange }
						optionsHeader={ __(
							'Checkbox options',
							'bb_site_settings'
						) }
						config={ {
							newOption: { label: '', checked: false },
							controls: [
								{
									type: TextControl,
									required: true,
									label: __(
										'Option Label',
										'bb_site_settings'
									),
									updateField: 'label',
									valueProp: 'value',
								},
								{
									type: CheckboxControl,
									required: false,
									label: __(
										'Option Value',
										'bb_site_settings'
									),
									updateField: 'checked',
									valueProp: 'checked',
								},
							],
						} }
					/>
				) }
			</div>
		</div>
	);
};

export default FieldConfigurator;
