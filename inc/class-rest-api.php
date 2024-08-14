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
	 * @param string $category Category of the setting.
	 * @param string $id Id of the setting.
	 *
	 * @return array|null
	 */
	private static function get_option_item( $category, $id ): array|null {
		/**
		 * Return settings values from the options table
		 */
		$option = get_option( BB_SITE_SETTINGS_VALUES );

		/**
		 * Return settings values from the options table
		 */
		$decoded_option = json_decode( $option, true );

		/**
		 * $decoded_option should always be an array, if it's a string then return null
		 */
		if ( is_string( $decoded_option ) ) {
			return null;
		}

		/**
		 * Check if the provided category exists
		 *
		 * If the category doesn't exist, return null
		 */
		if ( isset( $decoded_option[ $category ] ) ) {
			$target_category_values = $decoded_option[ $category ];
		} else {
			return null;
		}

		/**
		 * Loop through category values to find the target ID
		 */
		foreach ( $target_category_values as $item ) {
			if ( $item['id'] === $id ) {
				return $item;
			}
		}

		/**
		 * If the ID is not found, return null
		 */
		return null;
	}

	/**
	 * Get value of the setting from the options table.
	 *
	 * @param string $category Category of the setting.
	 * @param string $id Id of the setting.
	 *
	 * @return mixed
	 */
	public static function get_value( $category, $id ): mixed {
		$item = self::get_option_item( $category, $id );

		return $item ? $item['value'] : null;
	}

	/**
	 * Get attributes of the setting from the options table.
	 *
	 * @param string $category Category of the setting.
	 * @param string $id Id of the setting.
	 *
	 * @return mixed
	 */
	public static function get_attributes( $category, $id ): mixed {
		$item = self::get_option_item( $category, $id );

		return $item ? $item['attributes'] : null;
	}
}
