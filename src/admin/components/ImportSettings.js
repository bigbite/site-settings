import { FormFileUpload } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import { useSettings } from '../hooks';

const ImportSettings = () => {
	const { handleSaveSettings } = useSettings();
	const { createErrorNotice } = useDispatch( noticesStore );

	async function handleImportSettings( event ) {
		try {
			const file = event.target.files[ 0 ];

			if ( ! file ) {
				throw new Error( 'No file selected' );
			}

			const result = await file.text();

			let settings;
			try {
				settings = JSON.parse( result );
			} catch ( parseError ) {
				throw new Error( 'Failed to parse JSON' );
			}

			await handleSaveSettings(
				settings,
				__( 'Setting imported', 'bb_site_settings' )
			);
		} catch ( error ) {
			createErrorNotice(
				__( 'Failed to import settings.', 'bb_site_settings' ),
				{
					type: 'errorNotice',
				}
			);

			// eslint-disable-next-line no-console
			console.error(
				'An error occurred while importing settings:',
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
