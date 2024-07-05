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

// BBMSK-8 will add validated to settings

export const SiteSettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	/**
	 * Fetches the settings from the db (settingService).
	 * Handles loading and error states.
	 *
	 * @return {Promise<void>}
	 */
	const fetchSettings = async () => {
		setLoading(true);
		setError(null);

		try {
			const fetchedSettings = await getSettings();

			if (fetchedSettings) {
				setSettings(fetchedSettings);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Saves the new settings to the db (settingService).
	 * Handles loading and error states.
	 *
	 * @param {Object} newSettings - new settings object to be saved to the db
	 *
	 * @return {Promise<void>}
	 */
	const handleSaveSettings = async (newSettings) => {
		setLoading(true);
		setError(null);

		try {
			await saveSettings(newSettings);
			setSettings(newSettings);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Adds a new setting to the settings object and saves it to the db.
	 *
	 * @param {string} category - category to add the new setting to
	 * @param {Object} newSetting - new settings object to be added
	 *
	 * @return {Promise<void>}
	 */
	const handleAddSetting = async (category, newSetting) => {
		const updatedSettings = await addSetting({ ...settings }, category, newSetting);
		await handleSaveSettings(updatedSettings);
	};

	/**
	 * Edits an existing setting in the settings object and saves it to the db.
	 *
	 * @param {string} category - category for the edited setting
	 * @param {Object} editedSetting - edited setting
	 *
	 * @return {Promise<void>}
	 */
	const handleEditSetting = async (category, editedSetting) => {
		const updatedSettings = await editSetting({ ...settings }, category, editedSetting);
		await handleSaveSettings(updatedSettings);
	};

	/**
	 * Deletes a setting from the settings object and saves it to the db.
	 *
	 * @param {string} category - category to delete the new setting from
	 * @param {string} id - id of the setting to delete
	 *
	 * @return {Promise<void>}
	 */
	const handleDeleteSetting = async (category, id) => {
		const updatedSettings = await deleteSetting({ ...settings }, category, id);
		await handleSaveSettings(updatedSettings);
	};

	/**
	 * Deletes all settings from the settings object and saves it to the db.
	 *
	 * @return {Promise<void>}
	 */
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
