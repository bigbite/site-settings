import { __ } from '@wordpress/i18n';
import { Button, Flex, FlexItem } from '@wordpress/components';
import { copy, trash } from '@wordpress/icons';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';
import { cloneDeep, isEqual } from 'lodash';

import { useSettings } from '../hooks';
import { getComponent, getKeyProp } from '../fields';
import { getSettingValue } from '../schema';

const SettingsContainer = ( { category } ) => {
	const categoryLowerCase = category.toLowerCase();
	const { loading, settings, handleDeleteSetting, handleSaveSettings } =
		useSettings();

	const { createSuccessNotice, createErrorNotice } =
		useDispatch( noticesStore );

	const [ localSettings, setLocalSettings ] = useState( {} );

	const isDirty = useMemo( () => {
		return ! isEqual( localSettings, settings );
	}, [ localSettings, settings ] );

	/**
	 * Set the local settings to the settings from the hook(db), use these
	 * for local changes before saving
	 */
	useEffect( () => {
		setLocalSettings( cloneDeep( settings ) );
	}, [ settings ] );

	/**
	 * Handle the change of a setting
	 *
	 * @param {Object} setting - Current setting object
	 * @param {*}      value   - The value passed from the field component
	 */
	async function handleChange( setting, value ) {
		// Get the key of the attribute to update
		const key = getKeyProp( setting.field );

		// Update the correct attribute with the new value
		setting.attributes[ key ] = value;

		// Work out the new value for the setting
		setting.value = getSettingValue( setting.field, setting.attributes );

		// Map through localSettings and update the correct setting based on setting.id and replace
		const updatedSettings = localSettings[ categoryLowerCase ].map(
			( localSetting ) => {
				if ( localSetting.id === setting.id ) {
					return setting;
				}
				return localSetting;
			}
		);

		setLocalSettings( {
			...localSettings,
			[ categoryLowerCase ]: updatedSettings,
		} );
	}

	/**
	 * Save the settings to the database
	 */
	async function handleSave() {
		await handleSaveSettings( localSettings );
	}

	/**
	 * Discard changes and reset the localSettings to the original settings
	 */
	function handleDiscard() {
		setLocalSettings( cloneDeep( settings ) );

		createSuccessNotice( __( 'Discarded changes', 'bb_site_settings' ), {
			type: 'snackbar',
		} );
	}

	/**
	 * Copy the setting id to the clipboard
	 *
	 * @param {string} id - The id to copy to the clipboard
	 */
	function handleCopyId( id ) {
		try {
			window.navigator.clipboard.writeText( id );

			createSuccessNotice( __( 'ID copied', 'bb_site_settings' ), {
				type: 'snackbar',
			} );
		} catch ( error ) {
			createErrorNotice( __( 'Could not copy ID', 'bb_site_settings' ) );
		}
	}

	return (
		<div className="settings-container">
			<div className="settings-container__header">
				<div>
					<h2>{ category }</h2>
					<p>
						{ __( 'See your settings below', 'bb_site_settings' ) }
					</p>
				</div>

				<div className="settings-container__header-button-group">
					<Button
						label={ __(
							'Discard all local settings changes',
							'bb_site_settings'
						) }
						text={ __( 'Discard', 'bb_site_settings' ) }
						disabled={ ! isDirty }
						variant="secondary"
						onClick={ handleDiscard }
					/>
					<Button
						label={ __(
							'Save all local setting changes',
							'bb_site_settings'
						) }
						text={ __( 'Save', 'bb_site_settings' ) }
						disabled={ ! isDirty || loading }
						variant="primary"
						onClick={ handleSave }
						isBusy={ loading }
					/>
				</div>
			</div>
			<div className="settings-container__body">
				{ localSettings[ categoryLowerCase ] &&
				localSettings[ categoryLowerCase ].length > 0 ? (
					localSettings[ categoryLowerCase ].map( ( setting ) => {
						const Setting = getComponent( setting.field );
						const { label } = setting.attributes;

						return (
							<div
								key={ setting.id }
								className="settings-container__setting"
							>
								<Flex justify="flex-end">
									<FlexItem>
										<Button
											label={ ` ${ __(
												'Copy ID for:',
												'bb_site_settings'
											) } ${ label }` }
											text={ __(
												'Copy ID',
												'bb_site_settings'
											) }
											icon={ copy }
											onClick={ () =>
												handleCopyId( setting.id )
											}
										/>
									</FlexItem>
									<FlexItem>
										<Button
											label={ ` ${ __(
												'Delete setting:',
												'bb_site_settings'
											) } ${ label }` }
											text={ __(
												'Delete',
												'bb_site_settings'
											) }
											isDestructive
											icon={ trash }
											onClick={ () =>
												handleDeleteSetting(
													categoryLowerCase,
													setting.id
												)
											}
										/>
									</FlexItem>
								</Flex>
								<Setting
									{ ...setting.attributes }
									onChange={ ( value ) =>
										handleChange( setting, value )
									}
								/>
							</div>
						);
					} )
				) : (
					<p className="settings-container__not-found">
						{ __(
							'No settings found, please add one',
							'bb_site_settings'
						) }
					</p>
				) }
			</div>
		</div>
	);
};

export default SettingsContainer;
