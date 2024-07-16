import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const RadioFieldConfig = ( { setting, handleAttributeChange } ) => {
	function handleAddOption() {
		const newOptions = setting?.options ? [ ...setting?.options ] : [];
		newOptions.push( { label: '', value: '' } );

		handleAttributeChange( 'options', newOptions );
	}

	function handleDeleteOption( optionIndex ) {
		const newOptions = [ ...setting?.options ];
		newOptions.splice( optionIndex, 1 );

		handleAttributeChange( 'options', newOptions );
	}

	function handleUpdateOption( optionIndex, key, value ) {
		const newOptions = [ ...setting?.options ];
		newOptions[ optionIndex ][ key ] = value;

		handleAttributeChange( 'options', newOptions );
	}

	return (
		<>
			<TextControl
				className="form-field--required"
				required
				label={ __( 'Field Label', 'bb_site_settings' ) }
				value={ setting?.label }
				onChange={ ( value ) =>
					handleAttributeChange( 'label', value )
				}
			/>
			<Panel
				header={ __( 'Radio options', 'bb_site_settings' ) }
				className="field-config__option"
			>
				{ setting?.options?.map( ( option, optionIndex ) => (
					<PanelBody
						key={ optionIndex }
						title={ __(
							'Option Configuration',
							'bb_site_settings'
						) }
					>
						<PanelRow>
							<h5 className="field-config__option-title">
								{ __( 'Configuration', 'bb_site_settings' ) }
							</h5>
							<Button
								isDestructive
								icon="trash"
								onClick={ () =>
									handleDeleteOption( optionIndex )
								}
							/>
						</PanelRow>
						<TextControl
							className="form-field--required"
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
							className="form-field--required"
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
					</PanelBody>
				) ) }
			</Panel>

			<Button variant="secondary" onClick={ handleAddOption }>
				{ __( 'Add Option', 'bb_site_settings' ) }
			</Button>
		</>
	);
};

export default RadioFieldConfig;
