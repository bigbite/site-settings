import { createContext, useState } from '@wordpress/element';
import { v4 as uuidv4 } from 'uuid';

export const SiteSettingsContext = createContext();

export const SiteSettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState({ general: [], analytics: [], style: [] });
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const getSettings = async () => {
		setLoading(true);
		setError(null);

		try {
			await wp.api.loadPromise.done();

			const settingModal = new wp.api.models.Settings();

			const response = await settingModal.fetch();

			if (response.bb_site_settings_values) {
				const parsedSettings = JSON.parse(response.bb_site_settings_values);

				// BBMSK-8 validate settings
				setSettings(parsedSettings);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const saveSettings = async (newSettings) => {
		setLoading(true);
		setError(null);

		try {
			// BBMSK-8 validate settings
			const updatedSettings = new wp.api.models.Settings({
				bb_site_settings_values: JSON.stringify(newSettings),
			});

			await updatedSettings.save();

			setSettings(newSettings);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const addSettings = async (category, newSetting) => {
		const newSettings = {
			...settings,
			[category]: [...settings[category], { ...newSetting, id: uuidv4() }],
		};

		await saveSettings(newSettings);
	};

	const editSetting = async (category, editedSetting) => {
		const updatedCategorySettings = settings[category].map((setting) =>
			setting.id === editedSetting.id ? editedSetting : setting,
		);

		await saveSettings({ ...settings, [category]: updatedCategorySettings });
	};

	const deleteSetting = async (category, id) => {
		const filteredCategorySettings = settings[category].filter((setting) => setting.id !== id);

		await saveSettings({ ...settings, [category]: filteredCategorySettings });
	};

	const deleteSettings = async () => {
		await saveSettings({});
	};

	return (
		<SiteSettingsContext.Provider
			value={{
				settings,
				error,
				loading,
				getSettings,
				addSettings,
				editSetting,
				deleteSetting,
				deleteSettings,
			}}
		>
			{children}
		</SiteSettingsContext.Provider>
	);
};
