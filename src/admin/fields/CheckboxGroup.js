import { CheckboxControl } from '@wordpress/components';

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
						const newOptions = [ ...options ];
						newOptions[ index ].checked = value;
						onChange( newOptions );
					} }
					{ ...rest }
				/>
			) ) }
		</fieldset>
	);
};

export default CheckboxGroup;
