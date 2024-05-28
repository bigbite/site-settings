<?php
/**
 * Plugin Name:       Site Settings
 * Description:       Network sub site settings.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Big Bite
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       nss-site-settings
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

const NSS_SITE_SETTINGS = 'nss_site_settings';

/**
 * Enqueue scripts for site settings.
 */
function bb_site_settings_admin_scripts() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	$dependencies = array_merge( $asset_file['dependencies'], [ 'wp-api' ] );
	$version      = $asset_file['version'];

	// Load our app.js.
	wp_register_script(
		NSS_SITE_SETTINGS,
		plugins_url( 'build/index.js', __FILE__ ),
		$dependencies,
		$version,
		false
	);

	wp_enqueue_script( NSS_SITE_SETTINGS );

	// Load our style.css.
	wp_register_style(
		NSS_SITE_SETTINGS,
		plugins_url( 'build/style-index.css', __FILE__ ),
		[],
		$version
	);

	wp_enqueue_style( NSS_SITE_SETTINGS );
}

/**
 * Add admin menu for site settings.
 */
function bb_site_settings_admin_menu() {
	add_menu_page(
		__( 'Site Settings', 'nss_site_settings' ),
		__( 'Site Settings', 'nss_site_settings' ),
		'manage_options',
		NSS_SITE_SETTINGS,
		function () {
			echo '<div id="nss-site-settings"></div>';
		},
		'dashicons-admin-generic',
		6
	);
}

add_action( 'admin_menu', 'bb_site_settings_admin_menu' );
add_action( 'admin_enqueue_scripts', 'bb_site_settings_admin_scripts' );
