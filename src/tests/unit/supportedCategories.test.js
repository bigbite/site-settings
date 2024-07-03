import {
	getSelectSupportedCategoriesOptions,
	getSupportedCategories,
	getSupportedCategoriesIcons,
} from '../../schema';

describe('supportedCategories tests', () => {
	describe('getSupportedCategories', () => {
		it('should return all category keys', () => {
			const categories = getSupportedCategories();
			expect(categories).toEqual(['general', 'analytics', 'styles']);
		});
	});

	describe('getSupportedCategoriesIcons', () => {
		it('should return the correct icon for a given category', () => {
			expect(getSupportedCategoriesIcons('general')).toEqual('settings');
			expect(getSupportedCategoriesIcons('analytics')).toEqual('chart-line');
			expect(getSupportedCategoriesIcons('styles')).toEqual('brush');
		});

		it('should return undefined for an unknown category', () => {
			expect(getSupportedCategoriesIcons('unknown')).toBeUndefined();
		});
	});

	describe('getSelectSupportedCategoriesOptions', () => {
		it('should return correct options including the disabled "Select category" option', () => {
			const options = getSelectSupportedCategoriesOptions();
			expect(options.length).toBe(4); // 3 categories + 1 disabled option
			expect(options[0]).toEqual({ disabled: true, label: 'Select category', value: '' });
			expect(options).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ label: 'General', value: 'general' }),
					expect.objectContaining({ label: 'Analytics', value: 'analytics' }),
					expect.objectContaining({ label: 'Styles', value: 'styles' }),
				]),
			);
		});
	});
});
