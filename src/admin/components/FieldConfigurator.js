import { TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import RadioFieldConfig from './RadioFieldConfig';
import CheckboxGroupConfig from './CheckboxGroupConfig';
import { getAttributes } from '../fields';

const FieldConfigurator = ( { field, setting, setNewSetting } ) => {
	/**
	 * Set the new setting with default attributes when the field changes and on first mount
	 */
	useEffect( () => {
		setNewSetting( {
			...getAttributes( field ),
		} );
	}, [ field ] );

	/**
	 * Handle the attribute change for the setting
	 *
	 * @param {string} key - attribute key
	 * @param {*} value - attribute value
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
							aria-label={ __(
								'Label for new setting',
								'bb_site_settings'
							) }
							label={ __(
								'Label for field',
								'bb_site_settings'
							) }
							value={ setting?.label }
							onChange={ ( value ) =>
								handleAttributeChange( 'label', value )
							}
						/>
						<TextControl
							aria-label={ __(
								'Value for new setting',
								'bb_site_settings'
							) }
							label={ __(
								'Value for field',
								'bb_site_settings'
							) }
							value={ setting?.value }
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
							value={ setting?.label }
							onChange={ ( value ) =>
								handleAttributeChange( 'label', value )
							}
						/>
						<ToggleControl
							label={ __(
								'Value for field',
								'bb_site_settings'
							) }
							checked={ setting?.checked }
							onChange={ ( value ) => {
								handleAttributeChange( 'checked', value );
							} }
						/>
					</div>
				) }

				{ field === 'radio' && (
					<RadioFieldConfig
						setting={ setting }
						handleAttributeChange={ handleAttributeChange }
					/>
				) }

				{ field === 'checkbox-group' && (
					<CheckboxGroupConfig
						setting={ setting }
						handleAttributeChange={ handleAttributeChange }
					/>
				) }
			</div>
		</div>
	);
};

export default FieldConfigurator;
