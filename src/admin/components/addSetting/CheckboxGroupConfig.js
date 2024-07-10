import { Button, CheckboxControl, TextControl } from '@wordpress/components';

const CheckboxGroupSetup = ( { setting, handleAttributeChange } ) => {
	function handleAddCheckbox() {
		let newCheckboxes = setting.attributes.options
			? [ ...setting.attributes.options ]
			: [];

		newCheckboxes.push( { label: '', checked: false } );

		handleAttributeChange( 'options', newCheckboxes );
	}

	function handleDeleteCheckbox( checkboxIndex ) {
		let newCheckboxes = [ ...setting.attributes.options ];

		newCheckboxes.splice( checkboxIndex, 1 );

		handleAttributeChange( 'options', newCheckboxes );
	}

	function handleUpdateCheckbox( checkboxIndex, key, value ) {
		let newCheckboxes = [ ...setting.attributes.options ];

		newCheckboxes[ checkboxIndex ][ key ] = value;

		handleAttributeChange( 'options', newCheckboxes );
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
				<h4>Checkbox options</h4>
				{ setting.attributes.options?.map(
					( checkbox, checkboxIndex ) => (
						<div
							key={ checkboxIndex }
							className="setting-field-config__option"
						>
							<div className="setting-field-config__option-full">
								<TextControl
									required
									label="Checkbox Label"
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
									label="Field Value"
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
							<Button
								isDestructive
								icon="trash"
								onClick={ () =>
									handleDeleteCheckbox( checkboxIndex )
								}
							/>
						</div>
					)
				) }
			</div>

			<Button variant="secondary" onClick={ handleAddCheckbox }>
				Add checkbox
			</Button>
		</>
	);
};

export default CheckboxGroupSetup;
