/**
 * Format setting object, working out the value based on the field type.
 *
 * @param {string} field - field name
 * @param {Object} setting - setting object
 *
 * @return {Object} - formatted setting object with worked out value
 */
export function formatSetting( field, setting ) {
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
		default:
			value = null;
	}

	return {
		field,
		value,
		attributes: {
			...setting,
		},
	};
}
