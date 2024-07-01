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
 * Update URI:        false
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class BBSiteSettings
 */
class BBSiteSettings {
	private const BB_SITE_SETTINGS        = 'bb_site_settings';
	private const BB_SITE_SETTINGS_VALUES = 'bb_site_settings_values';

	/**
	 * BBSiteSettings constructor.
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'bb_site_settings_admin_assets' ] );
		add_action( 'admin_menu', [ $this, 'bb_site_settings_admin_menu' ] );
		add_action( 'rest_api_init', array( $this, 'bb_site_settings_register_settings' ) );
	}

	/**
	 * Enqueue scripts and styles
	 */
	public function bb_site_settings_admin_assets() {
		$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

		$dependencies = array_merge( $asset_file['dependencies'], [ 'wp-api' ] );
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
			[ 'wp-components' ],
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

	/**
	 * Register settings
	 */
	public function bb_site_settings_register_settings() {
		register_setting(
			self::BB_SITE_SETTINGS,
			'bb_site_settings_values',
			array(
				'description'       => __( 'Website global settings values', 'bb_site_settings' ),
				'type'              => 'string',
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
			)
		);
	}

	/**
	 * Get item from the options table.
	 *
	 * @param string $id Id of the setting.
	 *
	 * @return array|null
	 */
	private static function get_option_item( $id ) {
		$option = json_decode( get_option( self::BB_SITE_SETTINGS_VALUES ), true );

		if ( ! $option ) {
			return null;
		}

		foreach ( $option as $item ) {
			if ( $item['id'] === $id ) {
				return $item;
			}
		}

		return null;
	}

	/**
	 * Get value of the setting from the options table.
	 *
	 * @param string $id Id of the setting.
	 *
	 * @return mixed
	 */
	public static function get_value( $id ) {
		$item = self::get_option_item( $id );

		return $item ? $item['value'] : null;
	}

	/**
	 * Get attributes of the setting from the options table.
	 *
	 * @param string $id Id of the setting.
	 *
	 * @return mixed
	 */
	public static function get_attributes( $id ) {
		$item = self::get_option_item( $id );

		return $item ? $item['attributes'] : null;
	}
}

new BBSiteSettings();
