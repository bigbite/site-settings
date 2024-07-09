import { TextControl } from '@wordpress/components';

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

	const handleValueChange = ( value ) => {
		setNewSetting( {
			...setting,
			value,
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
			</div>
		</div>
	);
};

export default SettingFieldConfig;
