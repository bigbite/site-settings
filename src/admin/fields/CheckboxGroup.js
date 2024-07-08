import { CheckboxControl } from '@wordpress/components';

/* This component will be fleshed out in a later task */

const CheckboxGroup = ( { label, options, onChange } ) => {
	return (
		<fieldset>
			<legend>{ label }</legend>
			{ options.map( ( option, index ) => (
				<CheckboxControl
					key={ option.label }
					label={ option.label }
					checked={ option.checked }
					onChange={ ( value ) => {
						const newOptions = [ ...options ];
						newOptions[ index ].checked = value;
						onChange( newOptions );
					} }
				/>
			) ) }
		</fieldset>
	);
};

export default CheckboxGroup;
