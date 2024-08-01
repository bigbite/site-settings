import { CheckboxControl } from '@wordpress/components';

const CheckboxGroup = ( { label, options, onChange, ...rest } ) => {
	/**
	 * Updates the checked value of an option and calls
	 * the onChange callback with new options
	 *
	 * @param {boolean} value       - checked value
	 * @param {number}  optionIndex - index of the option
	 */
	function handleCheckboxChange( value, optionIndex ) {
		const newOptions = [ ...options ];
		newOptions[ optionIndex ].checked = value;
		onChange( newOptions );
	}

	return (
		<fieldset>
			<legend className="checkbox-group__label">{ label }</legend>
			{ options.map( ( option, index ) => (
				<CheckboxControl
					key={ option.id }
					label={ option.label }
					checked={ option.checked }
					name={ label.toLowerCase().replace( /\s/g, '-' ) }
					onChange={ ( value ) =>
						handleCheckboxChange( value, index )
					}
					{ ...rest }
				/>
			) ) }
		</fieldset>
	);
};

export default CheckboxGroup;
