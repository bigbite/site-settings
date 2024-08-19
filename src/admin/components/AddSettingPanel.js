import { Button, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { close, plus } from '@wordpress/icons';

import FieldConfigurator from './FieldConfigurator';
import { useSettings } from '../hooks';
import { getSelectSupportedOptions } from '../fields';
import { formatSetting, getSelectSupportedCategoriesOptions } from '../schema';

const AddSettingPanel = () => {
	const { loading, handleAddSetting } = useSettings();
	const [ category, setCategory ] = useState( 'general' );
	const [ field, setField ] = useState( 'text' );
	const [ newSetting, setNewSetting ] = useState( null );
	const [ showAddPanel, setShowAddPanel ] = useState( false );

	const categoryOptions = getSelectSupportedCategoriesOptions();
	const fieldOptions = getSelectSupportedOptions();

	/**
	 * Checks if the form is valid, has to have a category, field and new setting
	 *
	 * @return {boolean} - true if the form is valid, false otherwise
	 */
	const isFormValid = () => {
		return category && field && newSetting;
	};

	/**
	 * Handles the form submit event, calls the handleAddSetting function
	 * with the category, field and new setting and resets the form
	 *
	 * @param {Object} event - form submit event
	 */
	const handleSubmit = async ( event ) => {
		event.preventDefault();

		await handleAddSetting( category, formatSetting( field, newSetting ) );

		resetForm();
	};

	/**
	 * Resets the form by clearing the setting
	 */
	const resetForm = () => {
		setNewSetting( null );
	};

	return (
		<>
			{ showAddPanel && (
				<div className="add-settings-panel">
					<div className="add-settings-panel__header">
						<h2>{ __( 'Add Settings', 'bb_site_settings' ) }</h2>
						<Button
							label={ __(
								'Close add setting sidebar',
								'bb_site_settings'
							) }
							tooltipPosition="middle left"
							icon={ close }
							onClick={ () => setShowAddPanel( false ) }
						/>
					</div>
					<form
						className="add-setting-panel__form"
						onSubmit={ handleSubmit }
					>
						<div className="add-settings-panel__body">
							<SelectControl
								className="form-field--required"
								options={ categoryOptions }
								value={ category }
								onChange={ ( selected ) =>
									setCategory( selected )
								}
								label="Category"
								required
							/>

							<SelectControl
								className="form-field--required"
								options={ fieldOptions }
								value={ field }
								onChange={ ( selected ) =>
									setField( selected )
								}
								label="Field"
								required
							/>

							<FieldConfigurator
								field={ field }
								setting={ newSetting }
								setNewSetting={ setNewSetting }
							/>
						</div>

						<div className="add-settings-panel__footer">
							<Button
								label={ __(
									'Save new setting',
									'bb_site_settings'
								) }
								type="submit"
								variant="primary"
								disabled={ loading || ! isFormValid() }
								aria-busy={ loading }
								isBusy={ loading }
							>
								{ __( 'Save', 'bb_site_settings' ) }
							</Button>
						</div>
					</form>
				</div>
			) }
			{ ! showAddPanel && (
				<Button
					className="add-setting__fab"
					label={ __(
						'Open add setting sidebar',
						'bb_site_settings'
					) }
					tooltipPosition="middle left"
					variant="primary"
					icon={ plus }
					onClick={ () => setShowAddPanel( true ) }
				/>
			) }
		</>
	);
};

export default AddSettingPanel;
