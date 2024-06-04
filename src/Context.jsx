import { createContext, useState, useContext } from "@wordpress/element";
import { v4 as uuidv4 } from "uuid";

const SiteSettingsContext = createContext();

export const SiteSettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const getSettings = async () => {
		setLoading(true);

		try {
			await wp.api.loadPromise.done();

			const settings = new wp.api.models.Settings();

			const response = await settings.fetch();

			if (response.bb_site_settings_values) {
				setSettings([...JSON.parse(response.bb_site_settings_values)]);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const saveSettings = async (newSettings) => {
		setLoading(true);

		try {
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

	const addSetting = async (newSetting) => {
		//TODO: Add validation for each newSetting
		// newSetting[0].id = uuidv4();
		// newSettingWithId = newSetting.map((setting) => ({...setting, id: uuidv4()}));

		await saveSettings([
			...settings,
			...newSetting.map((setting) => ({ ...setting, id: uuidv4() })),
		]);
	};

	const editSetting = async (editedSetting) => {
		await saveSettings(
			settings.map((setting) =>
				setting.id === editedSetting.id ? editedSetting : setting,
			),
		);
	};

	const deleteSetting = async (id) => {
		await saveSettings(settings.filter((setting) => setting.id !== id));
	};

	const deleteSettings = async () => {
		await saveSettings([]);
	};

	return (
		<SiteSettingsContext.Provider
			value={{
				settings,
				error,
				loading,
				getSettings,
				addSetting,
				editSetting,
				deleteSetting,
				deleteSettings,
			}}
		>
			{children}
		</SiteSettingsContext.Provider>
	);
};

export const useSettings = () => useContext(SiteSettingsContext);
