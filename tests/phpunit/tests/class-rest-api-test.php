<?php

declare( strict_types = 1 );

use PHPUnit\Framework\TestCase;
use Big_Bite\Site_Settings\Rest_Api;

/**
 * Rest_Api tests for get_value and get_attributes methods.
 */
class Rest_Api_Test extends TestCase {

	/**
     * Provides dummy data which follows the DB structure for testing.
     *
     * @return array
     */
    private function getDummyData() {
        return [
            'general' => [
                [
                    'field' => 'radio',
                    'value' => 2,
                    'id' => '187891723-123y8i21',
                    'attributes' => [
                        'label' => 'Radio Label',
                        'selected' => 2,
                        'options' => [
                            ['label' => 'Option 1', 'value' => 1],
                            ['label' => 'Option 2', 'value' => 2],
                            ['label' => 'Option 3', 'value' => 3],
                        ],
                    ],
                ],
                [
                    'field' => 'text',
                    'value' => 'hello world',
                    'id' => '12312312-12323',
                    'attributes' => [
                        'label' => 'Text Label',
                        'value' => 'hello world',
                    ],
                ],
            ],
            'analytics' => [
                [
                    'field' => 'checkbox-group',
                    'value' => ['Post 1', 'Post 2'],
                    'id' => '1121212121',
                    'attributes' => [
                        'label' => 'New Setting for checkbox group',
                        'options' => [
                            ['label' => 'Post 1', 'checked' => true],
                            ['label' => 'Post 2', 'checked' => true],
                            ['label' => 'Post 3', 'checked' => false],
                        ],
                    ],
                ],
                [
                    'field' => 'toggle',
                    'value' => true,
                    'id' => '123123123-123123',
                    'attributes' => [
                        'label' => 'Toggle Label',
                        'value' => true,
                    ],
                ],
            ],
            'styles' => [],
		];
	}

	/**
	 * Test for get_value method to ensure return value is correct.
	 *
	 * NOTE - Dummy data for initial structure only
	 */
	public function test_get_value(): void {

		// Define expected testing values
		$expected_category = 'general';
		$expected_ID = '12312312-12323';
		$expected_value = 'hello world';

		$dummy_data = $this->getDummyData();

        // Ensure the data is an array
        $this->assertIsArray($dummy_data);

		// Check to ensure the data has the category
		$this->assertArrayHasKey($expected_category, $dummy_data);

		// Set the category specific data
		$category_data = $dummy_data[$expected_category];

		// Loop through the target category data to find the expected ID
		foreach ( $category_data as $item ) {
			if ( $item['id'] === $expected_ID ) {
				// Set the dummp value ready to test
				$dummy_value = $item['value'];
				break;
			}
		}

		// Then check to ensure the ID exists and returns the right value
		$this->assertSame( $expected_value, $dummy_value );

    }

	/**
	 * Test for get_attributes method to ensure return value is correct.
	 *
	 * NOTE - Dummy data for initial structure only
	 */
	public function test_get_attributes(): void {

		// Define expected testing values
		$expected_category = 'analytics';
		$expected_ID = '123123123-123123';
		$expected_attr = ['label' => 'Toggle Label', 'value' => true];

		$dummy_data = $this->getDummyData();

        // Ensure the data is an array
        $this->assertIsArray($dummy_data);

		// Check to ensure the data has the category
		$this->assertArrayHasKey('analytics', $dummy_data);

		// Set the category specific data
		$category_data = $dummy_data[$expected_category];

		// Loop through the target category data to find the expected ID
		foreach ( $category_data as $item ) {
			if ( $item['id'] === $expected_ID ) {
				// Set the dummp value ready to test
				$dummy_attr = $item['attributes'];
				break;
			}
		}

		// Then check to ensure the ID exists and returns the right attributes
		$this->assertSame( $expected_attr, $dummy_attr );

    }

}
