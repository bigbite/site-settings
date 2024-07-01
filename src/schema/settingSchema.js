import { getSupportedfields } from '../fields';
import { getSupportedCategories } from './supportedCategories';

const supportedCategories = getSupportedCategories();
const fields = getSupportedfields();

function isValidSetting(setting) {
	const { field, value, id, attributes } = setting;

	return (
		field &&
		fields.includes(field) &&
		value !== undefined &&
		id !== undefined &&
		attributes !== undefined &&
		typeof attributes === 'object'
	);
}

function validateSettings(settings) {
	return new Promise((resolve, reject) => {
		for (const [category, categorySettings] of Object.entries(settings)) {
			if (!supportedCategories.includes(category)) {
				reject(new Error(`Invalid category: ${category}`));
				return;
			}
			if (!Array.isArray(categorySettings)) {
				reject(
					new Error(`Settings for category '${category}' must be an array of setting objects`),
				);
				return;
			}

			if (!categorySettings.every(isValidSetting)) {
				reject(new Error(`Invalid setting found in category '${category}'`));
				return;
			}
		}

		resolve(true);
	});
}

export { validateSettings };
