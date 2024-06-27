import { v4 as uuidv4 } from 'uuid';

export const getSettings = async () => {
	await wp.api.loadPromise.done();
	const settingModel = new wp.api.models.Settings();
	const response = await settingModel.fetch();

	if (response.bb_site_settings_values) {
		const parsedSettings = JSON.parse(response.bb_site_settings_values);

		return parsedSettings;
	}
};

export const saveSettings = async (newSettings) => {
	const updatedSettings = new wp.api.models.Settings({
		bb_site_settings_values: JSON.stringify(newSettings),
	});

	await updatedSettings.save();
};

export const addSetting = async (settings, category, newSetting) => {
	if (!settings[category]) {
		settings[category] = [];
	}

	return {
		...settings,
		[category]: [...settings[category], { ...newSetting, id: uuidv4() }],
	};
};

export const editSetting = async (settings, category, editedSetting) => {
	const updatedCategorySettings = settings[category].map((setting) =>
		setting.id === editedSetting.id ? editedSetting : setting,
	);
	return { ...settings, [category]: updatedCategorySettings };
};

export const deleteSetting = async (settings, category, id) => {
	const filteredCategorySettings = settings[category].filter((setting) => setting.id !== id);
	return { ...settings, [category]: filteredCategorySettings };
};

export const deleteAllSettings = async () => {
	const emptySettings = {};
	await saveSettings(emptySettings);
};
