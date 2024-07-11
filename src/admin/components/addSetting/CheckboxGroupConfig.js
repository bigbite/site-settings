import {
	Button,
	CheckboxControl,
	Flex,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const CheckboxGroupSetup = ( { setting, handleAttributeChange } ) => {
	function handleAddCheckbox() {
		const newCheckboxes = setting.attributes.options
			? [ ...setting.attributes.options ]
			: [];

		newCheckboxes.push( { label: '', checked: false } );

		handleAttributeChange( 'options', newCheckboxes );
	}

	function handleDeleteCheckbox( checkboxIndex ) {
		const newCheckboxes = [ ...setting.attributes.options ];

		newCheckboxes.splice( checkboxIndex, 1 );

		handleAttributeChange( 'options', newCheckboxes );
	}

	function handleUpdateCheckbox( checkboxIndex, key, value ) {
		const newCheckboxes = [ ...setting.attributes.options ];

		newCheckboxes[ checkboxIndex ][ key ] = value;

		handleAttributeChange( 'options', newCheckboxes );
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
				<h4>{ __( 'Checkbox options', 'bb_site_settings' ) }</h4>
				{ setting.attributes.options?.map(
					( checkbox, checkboxIndex ) => (
						<div
							key={ checkboxIndex }
							className="setting-field-config__option"
						>
							<Flex>
								<h5 className="setting-field-config__option-title">
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
							</Flex>
							<TextControl
								required
								label={ __(
									'Checkbox Label',
									'bb_site_settings'
								) }
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
								label={ __(
									'Field Value',
									'bb_site_settings'
								) }
								checked={ checkbox.checked }
								onChange={ ( value ) =>
									handleUpdateCheckbox(
										checkboxIndex,
										'checked',
										value
									)
								}
							/>
						</div>
					)
				) }
			</div>

			<Button variant="secondary" onClick={ handleAddCheckbox }>
				{ __( 'Add Option', 'bb_site_settings' ) }
			</Button>
		</>
	);
};

export default CheckboxGroupSetup;
