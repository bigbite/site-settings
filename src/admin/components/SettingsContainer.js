import { __ } from '@wordpress/i18n';

import { useSettings } from '../hooks';

// Placeholder UI - this will be replaced with the actual settings UI

const SettingsContainer = ( { setting } ) => {
	const { settings } = useSettings();

	const filteredSettings = settings[ setting.toLowerCase() ];

	return (
		<div className="settings-container">
			<div className="settings-container__header">
				<h2>{ setting }</h2>
				<p>{ __( 'See your settings below', 'bb_site_settings' ) }</p>
			</div>
			<div className="settings-container__body">
				<pre>{ JSON.stringify( filteredSettings, null, 2 ) }</pre>
			</div>
		</div>
	);
};

export default SettingsContainer;
