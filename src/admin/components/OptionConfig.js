import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { v4 as uuidv4 } from 'uuid';

const OptionConfig = ( {
	setting,
	handleAttributeChange,
	optionsHeader,
	config,
} ) => {
	/**
	 * Handles adding a new option to the setting
	 */
	const handleAddOption = () => {
		const newOptions = setting?.options ? [ ...setting?.options ] : [];
		newOptions.push( config.newOption );

		handleAttributeChange( 'options', newOptions );
	};

	/**
	 * Handles deleting an option from the setting
	 *
	 * @param {number} optionIndex - index of the option to delete
	 */
	const handleDeleteOption = ( optionIndex ) => {
		const newOptions = [ ...setting?.options ];
		newOptions.splice( optionIndex, 1 );

		handleAttributeChange( 'options', newOptions );
	};

	/**
	 * Handles updating an option in the setting
	 *
	 * @param {number} optionIndex - index of the option to update
	 * @param {string} key         - key of the option to update
	 * @param {*}      value       - value of the option to update
	 */
	const handleUpdateOption = ( optionIndex, key, value ) => {
		const newOptions = [ ...setting?.options ];
		newOptions[ optionIndex ][ key ] = value;

		handleAttributeChange( 'options', newOptions );
	};

	return (
		<>
			<TextControl
				className="form-field--required"
				required
				label={ __( 'Field Label', 'bb_site_settings' ) }
				value={ setting?.label || '' }
				onChange={ ( value ) =>
					handleAttributeChange( 'label', value )
				}
			/>
			<Panel header={ optionsHeader } className="field-config__option">
				{ setting?.options &&
					setting.options?.map( ( option, optionIndex ) => (
						<PanelBody
							key={ uuidv4() }
							title={ __(
								`Option Configuration`,
								'bb_site_settings'
							) }
						>
							<PanelRow>
								<h5 className="field-config__option-title">
									{ __(
										`Configuration`,
										'bb_site_settings'
									) }
								</h5>
								<Button
									isDestructive
									icon="trash"
									onClick={ () =>
										handleDeleteOption( optionIndex )
									}
								/>
							</PanelRow>
							{ config.controls.map( ( control, controlKey ) => {
								const Control = control.type;
								/**
								 * Dynamically set the prop based on the control valueProp,
								 * getting the correct value from the option object.
								 * E.g checked, value etc
								 */
								const dynamicProp = {
									[ control.valueProp ]:
										option[ control.updateField ],
								};

								return (
									<Control
										key={ controlKey }
										label={ control.label }
										{ ...dynamicProp }
										onChange={ ( value ) =>
											handleUpdateOption(
												optionIndex,
												control.updateField,
												value
											)
										}
									/>
								);
							} ) }
						</PanelBody>
					) ) }
			</Panel>
			<Button variant="secondary" onClick={ handleAddOption }>
				{ __( `Add Option`, 'bb_site_settings' ) }
			</Button>
		</>
	);
};

export default OptionConfig;
