import { __ } from '@wordpress/i18n';
import { Button, Flex, FlexItem } from '@wordpress/components';
import { cloudUpload, copy, trash } from '@wordpress/icons';
import { useEffect, useState } from '@wordpress/element';

import { useSettings } from '../hooks';
import { getComponent, getKeyProp } from '../fields';
import { editSetting } from '../services';
import { workoutValue } from '../schema';

const SettingsContainer = ( { category } ) => {
	const { loading, settings, handleDeleteSetting, handleSaveSettings } =
		useSettings();
	const [ localSettings, setLocalSettings ] = useState( {} );
	const [ isDirty, setIsDirty ] = useState( false );

	useEffect( () => {
		setLocalSettings( settings );
	}, [ settings ] );

	async function handleChange( setting, value ) {
		const key = getKeyProp( setting.field );

		const updatedSetting = {
			...setting,
			attributes: { ...setting.attributes, [ key ]: value },
		};

		const updatedValue = workoutValue(
			setting.field,
			updatedSetting.attributes
		);

		const updatedSettings = await editSetting(
			localSettings,
			category.toLowerCase(),
			{ ...updatedSetting, value: updatedValue }
		);

		setLocalSettings( updatedSettings );

		checkIfDirty( updatedSettings );
	}

	function checkIfDirty( updatedSettings ) {
		// Compare updated settings with original settings to check for changes
		const isModified = Object.keys( updatedSettings ).some(
			( key ) =>
				updatedSettings[ key ] !==
				settings[ category.toLowerCase() ][ key ]
		);
		setIsDirty( isModified );
	}

	async function handleSave() {
		if ( isDirty ) {
			await handleSaveSettings( localSettings );

			setIsDirty( false );
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

				<Button
					label={ __( 'Save setting', 'bb_site_settings' ) }
					text={ __( 'Save', 'bb_site_settings' ) }
					disabled={ ! isDirty || loading }
					variant="primary"
					icon={ cloudUpload }
					onClick={ handleSave }
					isBusy={ loading }
				/>
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
