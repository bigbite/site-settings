import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import Settings from './admin/components/Settings';
import { SiteSettingsProvider } from './admin/context';

import './admin/styles/style.scss';

domReady( () => {
	const root = createRoot( document.getElementById( 'bb-site-settings' ) );
	root.render(
		<SiteSettingsProvider>
			<Settings />
		</SiteSettingsProvider>
	);
} );
