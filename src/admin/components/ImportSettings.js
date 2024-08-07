import { FormFileUpload } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import { useSettings } from '../hooks';

const ImportSettings = () => {
	const { handleSaveSettings } = useSettings();
	const { createErrorNotice } = useDispatch( noticesStore );

	/**
	 * Reads the file text content
	 *
	 * @param {File} file - file to read
	 *
	 * @return {Promise<string>} - file content
	 */
	async function readFile( file ) {
		try {
			return await file.text();
		} catch ( error ) {
			throw new Error( __( 'Failed to read file', 'b_site_settings' ) );
		}
	}

	/**
	 * Parses the JSON string
	 *
	 * @param {string} jsonString
	 *
	 * @return {Object} - parsed JSON object
	 */
	function parseJSON( jsonString ) {
		try {
			return JSON.parse( jsonString );
		} catch ( error ) {
			throw new Error( __( 'Failed to parse JSON', 'bb_site_settings' ) );
		}
	}

	/**
	 * Handles the import settings, trys reading the file and saving the settings.
	 * Will show a notice on success or error.
	 *
	 * @param {Event} event - file upload event
	 */
	async function handleImportSettings( event ) {
		try {
			const file = event.target.files[ 0 ];

			if ( ! file ) {
				throw new Error( __( 'No file selected', 'bb_site_settings' ) );
			}

			const result = await readFile( file );
			const importedSettings = parseJSON( result );

			await handleSaveSettings(
				importedSettings,
				__( 'Setting imported', 'bb_site_settings' )
			);
		} catch ( error ) {
			if ( error.name === 'AbortError' ) {
				return;
			}
			createErrorNotice(
				__( 'Failed to import settings.', 'bb_site_settings' ),
				{
					type: 'errorNotice',
				}
			);

			// eslint-disable-next-line no-console
			console.error(
				__(
					'An error occurred while importing settings:',
					'bb_site_settings'
				),
				error
			);
		}
	}

	return (
		<FormFileUpload
			label={ __(
				'Import new settings, will override any current settings',
				'bb_site_settings'
			) }
			variant="primary"
			accept="application/json"
			onChange={ handleImportSettings }
		>
			{ __( 'Import / Override', 'bb_site_settings' ) }
		</FormFileUpload>
	);
};

export default ImportSettings;
