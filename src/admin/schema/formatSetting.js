/**
 * Format setting object with required schema.
 *
 * @param {string} field   - field type
 * @param {Object} setting - setting object
 *
 * @return {Object} - formatted setting object with worked out value
 */
export function formatSetting( field, setting ) {
	const value = getSettingValue( field, setting );

	return {
		field,
		value,
		attributes: {
			...setting,
		},
	};
}

/**
 * Work out the value of a setting based on the field type.
 *
 * @param {string} field   - field type
 * @param {Object} setting - setting object
 *
 * @return {*} - worked out value of the setting
 */
export function getSettingValue( field, setting ) {
	let value;

	switch ( field ) {
		case 'text':
			value = setting.value || '';
			break;
		case 'toggle':
			value = setting.checked || false;
			break;
		case 'checkbox-group':
			value = setting.options
				.filter( ( option ) => option.checked )
				.map( ( option ) => option.label );
			break;
		case 'radio':
			value = setting.selected || null;
			break;
		case 'color-palette':
			value = setting.value || null;
			break;
		default:
			value = null;
	}

	return value;
}
