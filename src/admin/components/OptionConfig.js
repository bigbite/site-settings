import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { trash } from '@wordpress/icons';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

const OptionConfig = ( {
	setting,
	optionsKey = 'options',
	handleAttributeChange,
	optionsHeader,
	newOption,
	controls,
} ) => {
	/**
	 * Add a new option to the options array, based on the
	 * supplied newOption structure
	 * Uses the optionsKey to determine which options array to update.
	 */
	const handleAddOption = () => {
		const newOptions = setting?.[ optionsKey ]
			? [ ...setting[ optionsKey ] ]
			: [];
		newOptions.push( { ...newOption, id: uuidv4() } );

		handleAttributeChange( optionsKey, newOptions );
	};

	/**
	 * Delete an option from the options array.
	 * Uses the optionsKey to determine which options array to update.
	 *
	 * @param {number} optionIndex - The index of the option to delete
	 */
	const handleDeleteOption = ( optionIndex ) => {
		const newOptions = [ ...setting[ optionsKey ] ];
		newOptions.splice( optionIndex, 1 );

		handleAttributeChange( optionsKey, newOptions );
	};

	/**
	 * Update an option in the options array.
	 * Uses the optionsKey to determine which options array to update.
	 *
	 * @param {number} optionIndex - The index of the option to update
	 * @param {string} key         - The key of the option to update
	 * @param {*}      value       - The value to update the option with
	 */
	const handleUpdateOption = ( optionIndex, key, value ) => {
		const newOptions = [ ...setting[ optionsKey ] ];
		newOptions[ optionIndex ][ key ] = value;

		handleAttributeChange( optionsKey, newOptions );
	};

	/**
	 * Render the control component based on the control object
	 * and set the correct props based on the option object
	 * and the control object.
	 *
	 * @param {Object} control      - The control object
	 * @param {Object} option       - The option object
	 * @param {number} optionIndex  - The key of the option
	 * @param {number} controlIndex - The key of the control
	 *
	 * @return {Component} - The control component with the correct props
	 */
	const renderControl = ( control, option, optionIndex, controlIndex ) => {
		const Control = control.component;
		/**
		 * Dynamically set the prop based on the control componentProp,
		 * getting the correct value from the option object.
		 * E.g checked, value etc
		 */
		const dynamicProp = {
			[ control.componentProp ]: option[ control.optionKey ],
		};

		return (
			<Control
				className={ classNames( {
					'form-field--required': control.required,
				} ) }
				key={ `${ option.id }-${ controlIndex }` }
				label={ control.label }
				required={ control.required }
				{ ...dynamicProp }
				onChange={ ( value ) =>
					handleUpdateOption( optionIndex, control.optionKey, value )
				}
			/>
		);
	};

	/**
	 * Render the control component based on the control object
	 * and set the correct props based on the option object
	 * and the control object.
	 *
	 * @param {Object} control      - The control object
	 * @param {Object} option       - The option object
	 * @param {number} optionIndex  - The key of the option
	 * @param {number} controlIndex - The key of the control
	 *
	 * @return {Component} - The control component with the correct props
	 */
	const renderControl = ( control, option, optionIndex, controlIndex ) => {
		const Control = control.component;
		/**
		 * Dynamically set the prop based on the control componentProp,
		 * getting the correct value from the option object.
		 * E.g checked, value etc
		 */
		const dynamicProp = {
			[ control.componentProp ]: option[ control.optionKey ],
		};

		return (
			<Control
				className={ classNames( {
					'form-field--required': control.required,
				} ) }
				key={ `${ option.id }-${ controlIndex }` }
				label={ control.label }
				required={ control.required }
				{ ...dynamicProp }
				onChange={ ( value ) =>
					handleUpdateOption( optionIndex, control.optionKey, value )
				}
			/>
		);
	};

	return (
		<>
			<TextControl
				className="form-field--required"
				required
				label={ __( 'Label for field', 'bb_site_settings' ) }
				value={ setting?.label || '' }
				onChange={ ( value ) =>
					handleAttributeChange( 'label', value )
				}
			/>
			<Panel header={ optionsHeader } className="field-config__option">
				{ setting?.[ optionsKey ] &&
					setting[ optionsKey ].map( ( option, optionIndex ) => (
						<PanelBody
							key={ option.id }
							title={ __(
								'Option Configuration',
								'bb_site_settings'
							) }
						>
							<PanelRow>
								<h5 className="field-config__option-title">
									{ __(
										'Configuration',
										'bb_site_settings'
									) }
								</h5>
								<Button
									label={ __(
										'Delete Option',
										'bb_site_settings'
									) }
									isDestructive
									icon={ trash }
									text={ __( 'Delete', 'bb_site_settings' ) }
									onClick={ () =>
										handleDeleteOption( optionIndex )
									}
								/>
							</PanelRow>
							{ controls.map( ( control, controlIndex ) =>
								renderControl(
									control,
									option,
									optionIndex,
									controlIndex
								)
							) }
						</PanelBody>
					) ) }
			</Panel>
			<Button
				label={ __( 'Add new option', 'bb_site_settings' ) }
				variant="secondary"
				onClick={ handleAddOption }
			>
				{ __( 'Add Option', 'bb_site_settings' ) }
			</Button>
		</>
	);
};

export default OptionConfig;
