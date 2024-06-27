import { useState } from '@wordpress/element';

import { SiteSettingsContext } from './SiteSettingsContext';
import {
	getSettings,
	saveSettings,
	addSetting,
	editSetting,
	deleteSetting,
	deleteAllSettings,
} from '../services';
import { validateSettings } from '../schema';

export const SiteSettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchSettings = async () => {
		setLoading(true);
		setError(null);

		try {
			const fetchedSettings = await getSettings();

			if (fetchedSettings) {
				await validateSettings(fetchedSettings);
				setSettings(fetchedSettings);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSaveSettings = async (newSettings) => {
		setLoading(true);
		setError(null);

		try {
			await validateSettings(newSettings);

			await saveSettings(newSettings);

			setSettings(newSettings);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleAddSetting = async (category, newSetting) => {
		const updatedSettings = await addSetting({ ...settings }, category, newSetting);
		await handleSaveSettings(updatedSettings);
	};

	const handleEditSetting = async (category, editedSetting) => {
		const updatedSettings = await editSetting({ ...settings }, category, editedSetting);
		await handleSaveSettings(updatedSettings);
	};

	const handleDeleteSetting = async (category, id) => {
		const updatedSettings = await deleteSetting({ ...settings }, category, id);
		await handleSaveSettings(updatedSettings);
	};

	const handleDeleteAllSettings = async () => {
		await deleteAllSettings();
		setSettings({});
	};

	return (
		<SiteSettingsContext.Provider
			value={{
				settings,
				error,
				loading,
				fetchSettings,
				handleAddSetting,
				handleEditSetting,
				handleDeleteSetting,
				handleDeleteAllSettings,
			}}
		>
			{children}
		</SiteSettingsContext.Provider>
	);
};
