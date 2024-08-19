<?php

declare( strict_types = 1 );

use PHPUnit\Framework\TestCase;
use Big_Bite\Site_Settings\Rest_Api;
use Brain\Monkey;

/**
 * Rest_Api tests for get_value and get_attributes methods.
 */
class Rest_Api_Test extends TestCase {

	/**
	 * Define private variable for the Rest_Api class
	 */
	private $restApi;

	/**
	 * Run before each test.
	 *
	 * Stub the get_option function to return an example JSON string.
	 */
	protected function setUp(): void {
		parent::setUp();
		Monkey\setUp();
		Monkey\Functions\stubs(
			[
				'get_option' => '{"general":[{"field":"text","attributes":{"label":"Text Label","value":"API Testing"},"value":"API Testing","id":"1234567890"}],"analytics":[{"field":"text","value":null,"id":"0987654321"}]}',
			]
		);

		// Instantiate the Rest_Api class
		$this->restApi = new Rest_Api();
	}

	/**
	 * Run after each test to clean up
	 */
	protected function tearDown() : void {
		Monkey\tearDown();
		parent::tearDown();
	}

	/**
	 * Test for get_value method to ensure return value is correct.
	 */
	public function test_get_value(): void {
		// Define testing variables
		$test_category = 'general';
		$test_value_ID = '1234567890';
		$test_expected_value = 'API Testing';

		// Test a null return if category doesn't exist
		$this->assertNull($this->restApi->get_value('failedCategory', $test_value_ID));

		// Test a null return if the ID doesn't exist
		$this->assertNull($this->restApi->get_value($test_category, 'incorrect-ID'));

		// Test the returned value is a string
		$this->assertIsString($this->restApi->get_value($test_category, $test_value_ID));

		// Test when the value does not exist within a category
		$this->assertNull($this->restApi->get_value('analytics', '0987654321'));

		// Test the returned value is equal to the expected value
		$this->assertEquals($test_expected_value, $this->restApi->get_value($test_category, $test_value_ID));
	}

	/**
	 * Test for get_value method to ensure return value is correct.
	 */
	public function test_get_attributes(): void {
		// Define testing variables
		$test_category = 'general';
		$test_value_ID = '1234567890';

		// Test a null return if category doesn't exist
		$this->assertNull($this->restApi->get_attributes('failedCategory', $test_value_ID));

		// Test a null return if the ID doesn't exist
		$this->assertNull($this->restApi->get_attributes($test_category, 'incorrect-ID'));

		// Test the returned value is an array
		$this->assertIsArray($this->restApi->get_attributes($test_category, $test_value_ID));

		// Test null return if the attributes do not exist
		$this->assertNull($this->restApi->get_value('analytics', '0987654321'));
	}

}
