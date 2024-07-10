import { TextControl, ToggleControl } from '@wordpress/components';

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
			<h3>Field Configuration</h3>
			<p>Configure the field for the setting.</p>
			<div className="setting-field-config__field">
				{ field === 'text' && (
					<div className="setting-field-config__options">
						<TextControl
							required
							label="Label for field"
							value={ setting.attributes.label }
							onChange={ ( value ) =>
								handleAttributeChange( 'label', value )
							}
						/>
						<TextControl
							label="Value for field"
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
							label="Label for field"
							value={ setting.attributes.label }
							onChange={ ( value ) =>
								handleAttributeChange( 'label', value )
							}
						/>
						<ToggleControl
							label="Value for field"
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
