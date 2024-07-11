import { Button, SelectControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { useSettings } from '../../hooks';
import { getSelectSupportedCategoriesOptions } from '../../schema';
import { getAttributes, getSelectSupportedOptions } from '../../fields';
import SettingFieldConfig from './SettingFieldConfig';

const AddSettingPanel = ( { handleClose } ) => {
	const { loading, handleAddSetting } = useSettings();
	const [ category, setCategory ] = useState( 'general' );
	const [ field, setField ] = useState( 'text' );
	const [ newSetting, setNewSetting ] = useState( {
		attributes: getAttributes( field ),
		value: null,
	} );

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

		await handleAddSetting( category, { field, ...newSetting } );

		resetForm();
	};

	/**
	 * Resets the form, clearing the category, field and new setting
	 */
	const resetForm = () => {
		setNewSetting( { attributes: getAttributes( field ), value: null } );
	};

	useEffect( () => {
		setNewSetting( { ...newSetting, attributes: getAttributes( field ) } );
	}, [ field ] );

	return (
		<div className="add-settings-panel">
			<form className="add-setting-panel__form" onSubmit={ handleSubmit }>
				<div className="add-settings-panel__header">
					<h2>{ __( 'Add Settings', 'bb_site_settings' ) }</h2>
					<Button icon="no-alt" onClick={ handleClose } />
				</div>
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

				<SettingFieldConfig
					field={ field }
					setting={ newSetting }
					setNewSetting={ setNewSetting }
				/>

				<div className="add-settings-panel__footer">
					<Button
						type="submit"
						variant="primary"
						disabled={ loading || ! isFormValid() }
					>
						{ __( 'Add Settings', 'bb_site_settings' ) }
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddSettingPanel;
