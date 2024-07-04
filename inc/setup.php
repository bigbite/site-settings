<?php

namespace Big_Bite\Site_Settings;

/**
 * Runs the plugin setup sequence.
 *
 * @return void
 */
function setup(): void {
	new Loader();
	new Admin();
	new Rest_Api();
}
