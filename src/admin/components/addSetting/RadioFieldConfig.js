import { Button, TextControl } from '@wordpress/components';

const RadioFieldConfig = ( { setting, handleAttributeChange } ) => {
	function handleAddOption() {
		let newOptions = setting.attributes.options
			? [ ...setting.attributes.options ]
			: [];
		newOptions.push( { label: '', value: '' } );

		handleAttributeChange( 'options', newOptions );
	}

	function handleDeleteOption( optionIndex ) {
		let newOptions = [ ...setting.attributes.options ];
		newOptions.splice( optionIndex, 1 );

		handleAttributeChange( 'options', newOptions );
	}

	function handleUpdateOption( optionIndex, key, value ) {
		let newOptions = [ ...setting.attributes.options ];
		newOptions[ optionIndex ][ key ] = value;

		handleAttributeChange( 'options', newOptions );
	}

	return (
		<>
			<TextControl
				required
				label="Field Label"
				value={ setting.attributes.label }
				onChange={ ( value ) =>
					handleAttributeChange( 'label', value )
				}
			/>
			<div className="setting-field-config__options">
				<h4>Radio options</h4>
				{ setting.attributes.options?.map( ( option, optionIndex ) => (
					<div
						key={ optionIndex }
						className="setting-field-config__option"
					>
						<div className="setting-field-config__option-full">
							<TextControl
								required
								label="Option Label"
								value={ option.label }
								onChange={ ( value ) =>
									handleUpdateOption(
										optionIndex,
										'label',
										value
									)
								}
							/>

							<TextControl
								required
								label="Option Value"
								value={ option.value }
								onChange={ ( value ) =>
									handleUpdateOption(
										optionIndex,
										'value',
										value
									)
								}
							/>
						</div>

						<Button
							isDestructive
							icon="trash"
							onClick={ () => handleDeleteOption( optionIndex ) }
						/>
					</div>
				) ) }
			</div>

			<Button variant="secondary" onClick={ handleAddOption }>
				Add option
			</Button>
		</>
	);
};

export default RadioFieldConfig;
