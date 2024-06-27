import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import Settings from './Settings';
import { SiteSettingsProvider } from './context';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

domReady(() => {
	const root = createRoot(document.getElementById('bb-site-settings'));
	root.render(
		<SiteSettingsProvider>
			<Settings />
		</SiteSettingsProvider>,
	);
});
