import { v4 as uuidv4 } from 'uuid';

/**
 * Fetches the settings from the db.
 *
 * @return {Object | undefined} - settings object if found, undefined otherwise
 */
export const getSettings = async () => {
	await wp.api.loadPromise.done();
	const settingModel = new wp.api.models.Settings();
	const response = await settingModel.fetch();

	return response?.bb_site_settings_values
		? JSON.parse(response.bb_site_settings_values)
		: undefined;
};

/**
 * Saves the new settings to the db.
 *
 * @param {Object} newSettings new settings object to be saved to db
 */
export const saveSettings = async (newSettings) => {
	const updatedSettings = new wp.api.models.Settings({
		bb_site_settings_values: JSON.stringify(newSettings),
	});

	await updatedSettings.save();
};

/**
 * Adds a new setting to the settings object based on category.
 * Will create a new category if it does not exist.
 * Adds a new id to the new setting object.
 *
 * @param {Object} settings - current settings object
 * @param {string} category - category to add the new setting to
 * @param {Object} newSetting - new settings object wto be added
 *
 * @return {Object} - updated settings object
 */
export const addSetting = async (settings, category, newSetting) => {
	if (!settings[category]) {
		settings[category] = [];
	}

	return {
		...settings,
		[category]: [...settings[category], { ...newSetting, id: uuidv4() }],
	};
};

/**
 * Edits an existing setting in the settings object based on category.
 *
 * @param {Object} settings - current settings object
 * @param {string} category - category for the edited setting
 * @param {Object} editedSetting - edited setting
 *
 * @return {Object} - updated settings object
 */
export const editSetting = async (settings, category, editedSetting) => {
	const updatedCategorySettings = settings[category].map((setting) =>
		setting.id === editedSetting.id ? editedSetting : setting,
	);
	return { ...settings, [category]: updatedCategorySettings };
};

/**
 * Deletes a setting from the settings object based on category and id.
 *
 * @param {Object} settings - current settings object
 * @param {string} category - category to delete the setting from
 * @param {Object} id - id of the setting to delete
 *
 * @return {Object} - updated settings object
 */
export const deleteSetting = async (settings, category, id) => {
	const filteredCategorySettings = settings[category].filter((setting) => setting.id !== id);
	return { ...settings, [category]: filteredCategorySettings };
};

/**
 * Deletes all settings from the settings object.
 */
export const deleteAllSettings = async () => {
	const emptySettings = {};
	await saveSettings(emptySettings);
};
