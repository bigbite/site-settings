import {
	Button,
	CheckboxControl,
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const CheckboxGroupConfig = ( { setting, handleAttributeChange } ) => {
	function handleAddCheckbox() {
		const newCheckboxes = setting?.options ? [ ...setting?.options ] : [];

		newCheckboxes.push( { label: '', checked: false } );

		handleAttributeChange( 'options', newCheckboxes );
	}

	function handleDeleteCheckbox( checkboxIndex ) {
		const newCheckboxes = [ ...setting?.options ];

		newCheckboxes.splice( checkboxIndex, 1 );

		handleAttributeChange( 'options', newCheckboxes );
	}

	function handleUpdateCheckbox( checkboxIndex, key, value ) {
		const newCheckboxes = [ ...setting?.options ];

		newCheckboxes[ checkboxIndex ][ key ] = value;

		handleAttributeChange( 'options', newCheckboxes );
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
				header={ __( 'Checkbox options', 'bb_site_settings' ) }
				className="field-config__option"
			>
				{ setting?.options?.map( ( checkbox, checkboxIndex ) => (
					<PanelBody
						key={ checkboxIndex }
						title={ __(
							'Checkbox Configuration',
							'bb_site_settings'
						) }
					>
						<PanelRow>
							<h5 className="field-config__option-title">
								{ __(
									'Checkbox Configuration',
									'bb_site_settings'
								) }
							</h5>
							<Button
								isDestructive
								icon="trash"
								onClick={ () =>
									handleDeleteCheckbox( checkboxIndex )
								}
							/>
						</PanelRow>
						<TextControl
							className="form-field--required"
							required
							label={ __( 'Checkbox Label', 'bb_site_settings' ) }
							value={ checkbox.label }
							onChange={ ( value ) =>
								handleUpdateCheckbox(
									checkboxIndex,
									'label',
									value
								)
							}
						/>
						<CheckboxControl
							label={ __( 'Field Value', 'bb_site_settings' ) }
							checked={ checkbox.checked }
							onChange={ ( value ) =>
								handleUpdateCheckbox(
									checkboxIndex,
									'checked',
									value
								)
							}
						/>
					</PanelBody>
				) ) }
			</Panel>

			<Button variant="secondary" onClick={ handleAddCheckbox }>
				{ __( 'Add Option', 'bb_site_settings' ) }
			</Button>
		</>
	);
};

export default CheckboxGroupConfig;
