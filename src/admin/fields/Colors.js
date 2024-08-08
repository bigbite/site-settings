import { ColorPalette } from '@wordpress/components';

const Colors = ( { label, onChange, ...rest } ) => (
	<fieldset>
		<legend className="checkbox-group__label">{ label }</legend>
		<ColorPalette onChange={ onChange } { ...rest } />
	</fieldset>
);

export default Colors;
