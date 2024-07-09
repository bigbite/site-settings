import { Button, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

import { useSettings } from '../../hooks';
import { getSelectSupportedCategoriesOptions } from '../../schema';
import { getSelectSupportedOptions } from '../../fields';

const AddSettingPanel = ( { handleClose } ) => {
	const { loading, handleAddSetting } = useSettings();
	const [ category, setCategory ] = useState( '' );
	const [ field, setField ] = useState( '' );
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
	 * Handles the form submit event, preventing the default behavior
	 *
	 * @param {Object} event - form submit event
	 */
	const handleSubmit = async ( event ) => {
		event.preventDefault();

		await handleAddSetting( category, newSetting );

		resetForm();
	};

	/**
	 * Resets the form, clearing the category, field and new setting
	 */
	const resetForm = () => {
		setCategory( '' );
		setField( '' );
		setNewSetting( null );
	};

	return (
		<div className="add-settings-panel">
			<div className="add-settings-panel__header">
				<h2>Add Settings</h2>
				<Button icon="no-alt" onClick={ handleClose } />
			</div>
			<form onSubmit={ handleSubmit }>
				<SelectControl
					options={ categoryOptions }
					value={ category }
					onChange={ ( selected ) => setCategory( selected ) }
					label="Category"
					required
				/>

				<SelectControl
					options={ fieldOptions }
					value={ field }
					onChange={ ( selected ) => setField( selected ) }
					label="Field"
					required
				/>

				{ /* TODO BBMSK-17 add selected field config */ }

				<Button
					type="submit"
					variant="primary"
					disabled={ loading || ! isFormValid() }
				>
					Add Setting
				</Button>
			</form>
		</div>
	);
};

export default AddSettingPanel;
