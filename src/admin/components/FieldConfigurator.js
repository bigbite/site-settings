import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import classNames from 'classnames';

import OptionConfig from './OptionConfig';
import { getAttributes, getConfig } from '../fields';

const FieldConfigurator = ( { field, setting, setNewSetting } ) => {
	/**
	 * Set the new setting with default attributes when the
	 * field changes and on first mount
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

	const renderFieldConfig = () => {
		const fieldConfig = getConfig( field );

		if ( ! fieldConfig ) {
			return null;
		}

		if ( fieldConfig.options ) {
			return (
				<OptionConfig
					optionsKey={ fieldConfig.optionsKey }
					setting={ setting }
					handleAttributeChange={ handleAttributeChange }
					optionsHeader={ fieldConfig.optionsHeader }
					newOption={ fieldConfig.newOption }
					controls={ fieldConfig.controls }
				/>
			);
		}

		return fieldConfig.controls.map( ( control, index ) => {
			const Control = control.component;
			/**
			 * Dynamically set the prop based on the control componentProp,
			 * getting the correct value from the setting object.
			 * E.g checked, value etc
			 */
			const dynamicProp = {
				[ control.componentProp ]:
					setting?.[ control.settingKey ] || '',
			};

			return (
				<Control
					key={ index }
					className={ classNames( {
						'form-field--required': control.required,
					} ) }
					label={ control.label }
					required={ control.required }
					{ ...dynamicProp }
					onChange={ ( value ) =>
						handleAttributeChange( control.settingKey, value )
					}
				/>
			);
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
			<div className="field-config__field">{ renderFieldConfig() }</div>
		</div>
	);
};

export default FieldConfigurator;
