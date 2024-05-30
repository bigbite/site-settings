import domReady from "@wordpress/dom-ready";
import NSSSiteSettings from "./NSSSiteSettings";
import { createRoot } from "@wordpress/element";
import { NSSSiteSettingsProvider } from "./Context";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

domReady(() => {
	const root = createRoot(document.getElementById("nss-site-settings"));
	root.render(
		<NSSSiteSettingsProvider>
			<NSSSiteSettings />
		</NSSSiteSettingsProvider>,
	);
});
