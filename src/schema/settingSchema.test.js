import { validateSettings } from './settingSchema';

jest.mock('../fields', () => ({
	getSupportedfields: jest.fn().mockReturnValue(['text', 'radio']),
}));

jest.mock('./supportedCategories', () => ({
	getSupportedCategories: jest.fn().mockReturnValue(['general', 'analytics']),
}));

describe('validateSettings', () => {
	it('should validate settings with valid categories and fields', async () => {
		const settings = {
			general: [
				{
					field: 'text',
					value: 'Example',
					id: '1',
					attributes: { label: 'Example Text', value: 'Example' },
				},
			],
		};

		await expect(validateSettings(settings)).resolves.toBe(true);
	});

	it('should reject with an error for an invalid category', async () => {
		const settings = {
			unknownCategory: [
				{
					field: 'text',
					value: 'Example',
					id: '1',
					attributes: { label: 'Example Text', value: 'Example' },
				},
			],
		};

		await expect(validateSettings(settings)).rejects.toThrow('Invalid category: unknownCategory');
	});

	it('should reject with an error for non-array category settings', async () => {
		const settings = {
			general: {
				field: 'text',
				value: 'Example',
				id: '1',
				attributes: { label: 'Example Text', value: 'Example' },
			},
		};

		await expect(validateSettings(settings)).rejects.toThrow(
			"Settings for category 'general' must be an array of setting objects",
		);
	});

	it('should reject with an error for invalid setting in a category', async () => {
		const settings = {
			general: [
				{
					field: 'unsupportedField',
					value: 'Example',
					id: '1',
					attributes: { label: 'Example Text', value: 'Example' },
				},
			],
		};

		await expect(validateSettings(settings)).rejects.toThrow(
			"Invalid setting found in category 'general'",
		);
	});
});
