<?php

namespace Big_Bite\Site_Settings;

/**
 * Loader for handling assets.
 */
class Loader {
	/**
	 * Initialise the hooks and filters.
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
	}

	/**
	 * Enqueue scripts and styles
	 *
	 * @return void
	 */
	public function enqueue_admin_assets() {
		$asset_file = include plugin_dir_path( __FILE__ ) . '../build/index.asset.php';

		$dependencies = array_merge( $asset_file['dependencies'], [ 'wp-api' ] );
		$version      = $asset_file['version'];

		wp_enqueue_script( 'wp-api' );

		wp_enqueue_script(
			BB_SITE_SETTINGS,
			plugins_url( '../build/index.js', __FILE__ ),
			$dependencies,
			$version,
			false
		);

		wp_enqueue_style(
			BB_SITE_SETTINGS,
			plugins_url( '../build/style-index.css', __FILE__ ),
			[],
			$version
		);
	}
}
