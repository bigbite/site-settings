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
 * Text Domain:       site-settings
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


/**
 * Enqueue styles for site settings.
 */
function bb_site_settings_enqueue_styles() {
	wp_enqueue_style( 'site-settings-styles', get_theme_file_uri() . '/build/index.css', [], '0.0.1' );
}

add_action( 'admin_enqueue_scripts', 'bb_site_settings_enqueue_styles' );
