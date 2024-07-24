import { __ } from '@wordpress/i18n';
import { Button, Flex, FlexItem } from '@wordpress/components';
import { copy, trash } from '@wordpress/icons';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { isEqual } from 'lodash';

import { useSettings } from '../hooks';
import { getComponent, getKeyProp } from '../fields';
import { editSetting } from '../services';
import { workoutValue } from '../schema';

const SettingsContainer = ( { category } ) => {
	const { loading, settings, handleDeleteSetting, handleSaveSettings } =
		useSettings();

	const [ localSettings, setLocalSettings ] = useState( {} );

	const isDirty = useMemo( () => {
		return ! isEqual( localSettings, settings );
	}, [ localSettings, settings ] );

	/**
	 * Set the local settings to the settings from the hook(db), use these
	 * for local changes before saving
	 */
	useEffect( () => {
		setLocalSettings( settings );
	}, [ settings ] );

	/**
	 * Handle the change of a setting
	 *
	 * @param {Object} setting - Current setting object
	 * @param {*}      value   - The valure passed from the field component
	 */
	async function handleChange( setting, value ) {
		// Get the key of the attribute to update
		const key = getKeyProp( setting.field );

		// Update the correct attribute with the new value
		const updatedSetting = {
			...setting,
			attributes: { ...setting.attributes, [ key ]: value },
		};

		// Work out the new value for the setting
		const updatedValue = workoutValue(
			setting.field,
			updatedSetting.attributes
		);

		// Update the setting with the new value
		updatedSetting.value = updatedValue;

		// Find the updated setting in the localSettings and update it
		const updatedSettings = await editSetting(
			{ ...localSettings },
			category.toLowerCase(),
			updatedSetting
		);

		// Update the localSettings with the updated setting
		setLocalSettings( updatedSettings );
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
		setLocalSettings( settings );
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
						label={ __( 'Discard changes', 'bb_site_settings' ) }
						text={ __( 'Discard', 'bb_site_settings' ) }
						disabled={ ! isDirty }
						variant="secondary"
						onClick={ handleDiscard }
					/>
					<Button
						label={ __( 'Save setting', 'bb_site_settings' ) }
						text={ __( 'Save', 'bb_site_settings' ) }
						disabled={ ! isDirty || loading }
						variant="primary"
						onClick={ handleSave }
						isBusy={ loading }
					/>
				</div>
			</div>
			<div className="settings-container__body">
				{ localSettings[ category.toLowerCase() ]?.map( ( setting ) => {
					const Setting = getComponent( setting.field );

					return (
						<div
							key={ setting.id }
							className="settings-container__setting"
						>
							<Flex justify="flex-end">
								<FlexItem>
									<Button
										label={ __(
											'Copy ID',
											'bb_site_settings'
										) }
										text={ __(
											'Copy ID',
											'bb_site_settings'
										) }
										icon={ copy }
										onClick={ () => {
											window.navigator.clipboard.writeText(
												setting.id
											);
										} }
									/>
								</FlexItem>
								<FlexItem>
									<Button
										label={ __(
											'Delete setting',
											'bb_site_settings'
										) }
										text={ __(
											'Delete',
											'bb_site_settings'
										) }
										isDestructive
										icon={ trash }
										onClick={ () =>
											handleDeleteSetting(
												category.toLowerCase(),
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
				} ) }
			</div>
		</div>
	);
};

export default SettingsContainer;
