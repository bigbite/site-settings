import { __ } from '@wordpress/i18n';
import { Button, Flex, FlexItem } from '@wordpress/components';
import { cloudUpload, copy, trash } from '@wordpress/icons';

import { useSettings } from '../hooks';
import { getComponent } from '../fields';

const SettingsContainer = ( { category } ) => {
	const { settings, handleDeleteSetting } = useSettings();

	const filteredSettings = settings[ category.toLowerCase() ];

	function handleChange( value ) {
		// This function needs updated to handle changes to settings
		console.log( value );
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
					disabled
					variant="primary"
					icon={ cloudUpload }
				/>
			</div>
			<div className="settings-container__body">
				{ filteredSettings?.map( ( setting ) => {
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
											navigator.clipboard.writeText(
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
								onChange={ handleChange }
							/>
						</div>
					);
				} ) }
			</div>
		</div>
	);
};

export default SettingsContainer;
