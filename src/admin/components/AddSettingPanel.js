import { Button, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { useSettings } from '../hooks';
import { getSelectSupportedOptions } from '../fields';
import { getSelectSupportedCategoriesOptions } from '../schema';

const AddSettingPanel = ( { handleClose } ) => {
	const { loading, handleAddSetting } = useSettings();
	const [ category, setCategory ] = useState( 'general' );
	const [ field, setField ] = useState( 'text' );
	const [ newSetting, setNewSetting ] = useState( null );

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

		await handleAddSetting( category, { field, ...newSetting } );

		resetForm();
	};

	/**
	 * Resets the form by clearing the setting
	 */
	const resetForm = () => {
		setNewSetting( null );
	};

	return (
		<div className="add-settings-panel">
			<div className="add-settings-panel__header">
				<h2>{ __( 'Add Settings', 'bb_site_settings' ) }</h2>
				<Button
					aria-label={ __(
						'Close add setting panel',
						'bb_site_settings'
					) }
					icon="no-alt"
					onClick={ handleClose }
				/>
			</div>
			<form className="add-setting-panel__form" onSubmit={ handleSubmit }>
				<div className="add-settings-panel__body">
					<SelectControl
						className="add-setting-panel__form-field--required"
						options={ categoryOptions }
						value={ category }
						onChange={ ( selected ) => setCategory( selected ) }
						label="Category"
						required
					/>

					<SelectControl
						className="add-setting-panel__form-field--required"
						options={ fieldOptions }
						value={ field }
						onChange={ ( selected ) => setField( selected ) }
						label="Field"
						required
					/>

					{ /* TODO BBMSK-17 field config */ }
				</div>

				<div className="add-settings-panel__footer">
					<Button
						aria-label={ __(
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
	);
};

export default AddSettingPanel;
