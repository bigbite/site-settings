import { getSupportedfields } from '../fields';
import { getSupportedCategories } from './supportedCategories';

const supportedCategories = getSupportedCategories();
const fields = getSupportedfields();

/**
 * Checks if the setting object is valid
 *
 * @param {Object} setting - setting object
 * @return {boolean} - true if the setting is valid, false otherwise
 */
function isValidSetting( setting ) {
	const { field, value, id, attributes } = setting;

	return (
		field &&
		fields.includes( field ) &&
		value !== undefined &&
		id !== undefined &&
		attributes !== undefined &&
		typeof attributes === 'object'
	);
}

/**
 * Validates the settings object. Checks if the category is supported,
 * if the settings are an array and if the settings are valid.
 *
 * @param {Object} settings - settings object
 * @return {Promise<boolean | Error>} - true if the settings are valid, error otherwise
 */
function validateSettings( settings ) {
	return new Promise( ( resolve, reject ) => {
		for ( const [ category, categorySettings ] of Object.entries(
			settings
		) ) {
			if ( ! supportedCategories.includes( category ) ) {
				reject( new Error( `Invalid category: ${ category }` ) );
				return;
			}
			if ( ! Array.isArray( categorySettings ) ) {
				reject(
					new Error(
						`Settings for category '${ category }' must be an array of setting objects`
					)
				);
				return;
			}

			if ( ! categorySettings.every( isValidSetting ) ) {
				reject(
					new Error(
						`Invalid setting found in category '${ category }'`
					)
				);
				return;
			}
		}

		resolve( true );
	} );
}

export { validateSettings };
