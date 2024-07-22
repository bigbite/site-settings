import { __ } from '@wordpress/i18n';

import { useSettings } from '../hooks';

// Placeholder UI - this will be replaced with the actual settings UI

const SettingsContainer = ( { category } ) => {
	const { settings } = useSettings();

	const filteredSettings = settings[ category.toLowerCase() ];

	return (
		<div className="settings-container">
			<div className="settings-container__header">
				<h2>{ category }</h2>
				<p>{ __( 'See your settings below', 'bb_site_settings' ) }</p>
			</div>
			<div className="settings-container__body">
				<pre className="settings-container__pre">
					{ JSON.stringify( filteredSettings, null, 2 ) }
				</pre>
			</div>
		</div>
	);
};

export default SettingsContainer;
