import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';

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

export const SiteSettingsProvider = ( { children } ) => {
	const [ settings, setSettings ] = useState( {} );
	const [ loading, setLoading ] = useState( false );

	const { createErrorNotice, createSuccessNotice } =
		useDispatch( noticesStore );
	/**
	 * Fetches the settings from the db (settingService).
	 * Handles loading and error states.
	 *
	 * @return {Promise<void>}
	 */
	const fetchSettings = async () => {
		setLoading( true );

		try {
			const fetchedSettings = await getSettings();

			if ( fetchedSettings ) {
				await validateSettings( fetchedSettings );
				setSettings( fetchedSettings );
			}
		} catch ( err ) {
			createErrorNotice(
				__( 'Error fetching settings', 'bb_site_settings' ),
				{
					type: 'errorNotice',
				}
			);
			// eslint-disable-next-line no-console
			console.error( err.message );
		} finally {
			setLoading( false );
		}
	};

	/**
	 * Saves the new settings to the db (settingService).
	 * Handles loading and error states.
	 *
	 * @param {Object} newSettings   - new settings object to be saved to the db
	 * @param {string} noticeMessage - message to display in the notice
	 *
	 * @return {Promise<void>}
	 */
	const handleSaveSettings = async (
		newSettings,
		noticeMessage = 'Settings saved'
	) => {
		setLoading( true );

		try {
			await validateSettings( newSettings );

			await saveSettings( newSettings );

			createSuccessNotice( noticeMessage, { type: 'snackbar' } );

			setSettings( newSettings );
		} catch ( err ) {
			createErrorNotice(
				__( 'Error saving settings', 'bb_site_settings' ),
				{
					type: 'errorNotice',
				}
			);
			// eslint-disable-next-line no-console
			console.error( err.message );
		} finally {
			setLoading( false );
		}
	};

	/**
	 * Adds a new setting to the settings object and saves it to the db.
	 *
	 * @param {string} category   - category to add the new setting to
	 * @param {Object} newSetting - new settings object to be added
	 *
	 * @return {Promise<void>}
	 */
	const handleAddSetting = async ( category, newSetting ) => {
		const updatedSettings = await addSetting(
			{ ...settings },
			category,
			newSetting
		);
		await handleSaveSettings(
			updatedSettings,
			__( 'Setting saved', 'bb_site_settings' )
		);
	};

	/**
	 * Edits an existing setting in the settings object and saves it to the db.
	 *
	 * @param {string} category      - category for the edited setting
	 * @param {Object} editedSetting - edited setting
	 *
	 * @return {Promise<void>}
	 */
	const handleEditSetting = async ( category, editedSetting ) => {
		const updatedSettings = await editSetting(
			{ ...settings },
			category,
			editedSetting
		);
		await handleSaveSettings(
			updatedSettings,
			__( 'Edited setting', 'bb_site_settings' )
		);
	};

	/**
	 * Deletes a setting from the settings object and saves it to the db.
	 *
	 * @param {string} category - category to delete the new setting from
	 * @param {string} id       - id of the setting to delete
	 *
	 * @return {Promise<void>}
	 */
	const handleDeleteSetting = async ( category, id ) => {
		const updatedSettings = await deleteSetting(
			{ ...settings },
			category,
			id
		);
		await handleSaveSettings(
			updatedSettings,
			__( 'Setting deleted', 'bb_site_settings' )
		);
	};

	/**
	 * Deletes all settings from the settings object and saves it to the db.
	 *
	 * @return {Promise<void>}
	 */
	const handleDeleteAllSettings = async () => {
		await deleteAllSettings();
		setSettings( {} );
	};

	return (
		<SiteSettingsContext.Provider
			value={ {
				settings,
				loading,
				fetchSettings,
				handleAddSetting,
				handleEditSetting,
				handleDeleteSetting,
				handleDeleteAllSettings,
				handleSaveSettings,
			} }
		>
			{ children }
		</SiteSettingsContext.Provider>
	);
};
