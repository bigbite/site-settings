import { TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import RadioFieldConfig from './RadioFieldConfig';
import CheckboxGroupConfig from './CheckboxGroupConfig';

const SettingFieldConfig = ( { field, setting, setNewSetting } ) => {
	const handleAttributeChange = ( key, value ) => {
		setNewSetting( {
			...setting,
			attributes: {
				...setting.attributes,
				[ key ]: value,
			},
		} );
	};

	return (
		<div className="setting-field-config">
			<h3>{ __( 'Field Configuration', 'bb_site_settings' ) }</h3>
			<p>
				{ __(
					'Configure the field for the setting',
					'bb_site_settings'
				) }
			</p>
			<div className="setting-field-config__field">
				{ field === 'text' && (
					<div className="setting-field-config__options">
						<TextControl
							required
							label={ __(
								'Label for field',
								'bb_site_settings'
							) }
							value={ setting.attributes.label }
							onChange={ ( value ) =>
								handleAttributeChange( 'label', value )
							}
						/>
						<TextControl
							label={ __(
								'Value for field',
								'bb_site_settings'
							) }
							value={ setting.attributes.value }
							onChange={ ( value ) => {
								handleAttributeChange( 'value', value );
							} }
						/>
					</div>
				) }

				{ field === 'toggle' && (
					<div className="setting-field-config__options">
						<TextControl
							required
							label={ __(
								'Label for field',
								'bb_site_settings'
							) }
							value={ setting.attributes.label }
							onChange={ ( value ) =>
								handleAttributeChange( 'label', value )
							}
						/>
						<ToggleControl
							label={ __(
								'Value for field',
								'bb_site_settings'
							) }
							checked={ setting.attributes.checked }
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

export default SettingFieldConfig;
