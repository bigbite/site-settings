<?php

namespace Big_Bite\Site_Settings;

/**
 * Admin menu class for handling admin menu.
 */
class Admin {
	/**
	 * Initialise the hooks and filters.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'register_admin_menu' ] );
	}

	/**
	 * Adds our site settings to admin menu panel
	 *
	 * @return void
	 */
	public function register_admin_menu() {
		add_menu_page(
			__( 'Site Settings', 'bb_site_settings' ),
			__( 'Site Settings', 'bb_site_settings' ),
			'manage_options',
			BB_SITE_SETTINGS,
			function () {
				echo '<div id="bb-site-settings"></div>';
			},
			'dashicons-admin-settings'
		);
	}
}
