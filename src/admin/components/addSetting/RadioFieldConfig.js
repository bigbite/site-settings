import { Button, Flex, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const RadioFieldConfig = ( { setting, handleAttributeChange } ) => {
	function handleAddOption() {
		const newOptions = setting.attributes.options
			? [ ...setting.attributes.options ]
			: [];
		newOptions.push( { label: '', value: '' } );

		handleAttributeChange( 'options', newOptions );
	}

	function handleDeleteOption( optionIndex ) {
		const newOptions = [ ...setting.attributes.options ];
		newOptions.splice( optionIndex, 1 );

		handleAttributeChange( 'options', newOptions );
	}

	function handleUpdateOption( optionIndex, key, value ) {
		const newOptions = [ ...setting.attributes.options ];
		newOptions[ optionIndex ][ key ] = value;

		handleAttributeChange( 'options', newOptions );
	}

	return (
		<>
			<TextControl
				required
				label={ __( 'Field Label', 'bb_site_settings' ) }
				value={ setting.attributes.label }
				onChange={ ( value ) =>
					handleAttributeChange( 'label', value )
				}
			/>
			<div className="setting-field-config__options">
				<h4>{ __( 'Radio options', 'bb_site_settings' ) }</h4>
				{ setting.attributes.options?.map( ( option, optionIndex ) => (
					<div
						key={ optionIndex }
						className="setting-field-config__option"
					>
						<Flex>
							<h5 className="setting-field-config__option-title">
								{ __(
									'Option Configuration',
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
						</Flex>
						<TextControl
							required
							label={ __( 'Option Label', 'bb_site_settings' ) }
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
							label={ __( 'Option Value', 'bb_site_settings' ) }
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
				) ) }
			</div>

			<Button variant="secondary" onClick={ handleAddOption }>
				{ __( 'Add Option', 'bb_site_settings' ) }
			</Button>
		</>
	);
};

export default RadioFieldConfig;
