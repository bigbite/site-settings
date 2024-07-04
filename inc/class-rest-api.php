<?php

namespace Big_Bite\Site_Settings;

/**
 * Rest class for handling rest api.
 */
class Rest_Api {
	/**
	 * Initialise the hooks and filters.
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_settings' ] );
	}

	/**
	 * Register settings
	 *
	 * @return void
	 */
	public function register_settings() {
		register_setting(
			BB_SITE_SETTINGS,
			'bb_site_settings_values',
			[
				'description'       => __( 'Website global settings values', 'bb_site_settings' ),
				'type'              => 'string',
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
			]
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
		$option = get_option( BB_SITE_SETTINGS_VALUES );

		if ( String !== $option ) {
			return null;
		}

		$decoded_option = json_decode( $option, true );

		foreach ( $decoded_option as $item ) {
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
