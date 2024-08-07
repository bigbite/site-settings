import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import { useSettings } from '../hooks';

const ExportSettings = () => {
	const { settings } = useSettings();
	const { createErrorNotice, createSuccessNotice } =
		useDispatch( noticesStore );

	/**
	 * Handles the export settings, trys to save the settings to a file.
	 * Uses the File System Access API to save the file.
	 * Will show a notice on success or error.
	 *
	 * @return {Promise<void>}
	 */
	async function handleExportSettings() {
		try {
			const data = JSON.stringify( settings, null, 2 );
			const blob = new Blob( [ data ], {
				type: 'application/json;charset=utf-8',
			} );

			const fileHandle = await window.showSaveFilePicker( {
				suggestedName: 'site-settings.json',
				types: [
					{
						description: 'JSON Files',
						accept: { 'application/json': [ '.json' ] },
					},
				],
			} );

			const writableStream = await fileHandle.createWritable();
			await writableStream.write( blob );
			await writableStream.close();

			createSuccessNotice(
				__( 'Succesfuly exported settings.', 'bb_site_settings' ),
				{
					type: 'snackbar',
				}
			);
		} catch ( error ) {
			if ( error.name === 'AbortError' ) {
				return;
			}
			createErrorNotice(
				__( 'Failed to export settings.', 'bb_site_settings' ),
				{
					type: 'errorNotice',
				}
			);
			// eslint-disable-next-line no-console
			console.error(
				__(
					'An error occurred while exporting settings:',
					'bb_site_settings'
				),
				error
			);
		}
	}

	return (
		<Button
			label={ __( 'Export current settings', 'bb_site_settings' ) }
			variant="secondary"
			onClick={ handleExportSettings }
			disabled={ ! settings || Object.keys( settings ).length === 0 }
		>
			{ __( 'Export', 'bb_site_settings' ) }
		</Button>
	);
};

export default ExportSettings;
