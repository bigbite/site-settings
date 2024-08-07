import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { useSettings } from '../hooks';

const ExportSettings = () => {
	const { settings } = useSettings();

	function handleExportSettings() {
		const data = JSON.stringify( settings, null, 2 );

		const blob = new Blob( [ data ], {
			type: 'application/json;charset=utf-8',
		} );

		const url = URL.createObjectURL( blob );

		const a = document.createElement( 'a' );
		a.href = url;
		a.download = 'site-settings.json';
		a.click();
		URL.revokeObjectURL( url );
	}

	return (
		<Button
			label={ __( 'Export current settings', 'bb_site_settings' ) }
			variant="secondary"
			onClick={ handleExportSettings }
			disabled={ ! settings || ! Object.keys( settings ).length }
		>
			{ __( 'Export', 'bb_site_settings' ) }
		</Button>
	);
};

export default ExportSettings;
