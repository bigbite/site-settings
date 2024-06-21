<?php
/**
 * Plugin Name:       BB Site Settings
 * Description:       Custom site settings configuration.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Big Bite
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bb-site-settings
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class BBSiteSettings
 */
class BBSiteSettings {
	private const BB_SITE_SETTINGS = 'bb_site_settings';

	/**
	 * BBSiteSettings constructor.
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'bb_site_settings_admin_assets' ] );
		add_action( 'admin_menu', [ $this, 'bb_site_settings_admin_menu' ] );
	}

	/**
	 * Enqueue scripts and styles
	 */
	public function bb_site_settings_admin_assets() {
		$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

		$dependencies = $asset_file['dependencies'];
		$version      = $asset_file['version'];

		wp_enqueue_script(
			self::BB_SITE_SETTINGS,
			plugins_url( 'build/index.js', __FILE__ ),
			$dependencies,
			$version,
			false
		);

		wp_enqueue_style(
			self::BB_SITE_SETTINGS,
			plugins_url( 'build/style-index.css', __FILE__ ),
			[],
			$version
		);
	}

	/**
	 * Adds our site settings to admin menu panel
	 */
	public function bb_site_settings_admin_menu() {
		add_menu_page(
			__( 'Site Settings', 'bb_site_settings' ),
			__( 'Site Settings', 'bb_site_settings' ),
			'manage_options',
			self::BB_SITE_SETTINGS,
			function () {
				echo '<div id="bb-site-settings"></div>';
			},
			'dashicons-admin-settings'
		);
	}
}

new BBSiteSettings();
