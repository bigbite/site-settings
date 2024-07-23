import { CheckboxControl } from '@wordpress/components';

/* This component will be fleshed out in a later task */

const CheckboxGroup = ( { label, options, onChange, ...rest } ) => {
	return (
		<fieldset>
			<legend className="checkbox-group__label">{ label }</legend>
			{ options.map( ( option, index ) => (
				<CheckboxControl
					key={ option.id }
					label={ option.label }
					checked={ option.checked }
					onChange={ ( value ) => {
						// const newOptions = [ ...options ];
						// newOptions[ index ].checked = value;
						// onChange( newOptions );
						onChange( value );
					} }
					{ ...rest }
				/>
			) ) }
		</fieldset>
	);
};

export default CheckboxGroup;
