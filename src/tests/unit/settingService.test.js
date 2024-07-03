import {
	getSettings,
	saveSettings,
	addSetting,
	editSetting,
	deleteSetting,
	deleteAllSettings,
} from '../../services';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
	v4: jest.fn(),
}));

describe('settingsService', () => {
	beforeAll(() => {
		global.wp = {
			api: {
				loadPromise: {
					done: jest.fn().mockResolvedValue(true),
				},
				models: {
					Settings: jest.fn().mockImplementation(() => ({
						fetch: jest.fn().mockResolvedValue({
							bb_site_settings_values: JSON.stringify({ general: [], analytics: [], styles: [] }),
						}),
						save: jest.fn().mockResolvedValue(true),
					})),
				},
			},
		};
	});

	it('getSettings should fetch and return parsed settings', async () => {
		const settings = await getSettings();
		expect(settings).toEqual({ general: [], analytics: [], styles: [] });
		expect(global.wp.api.models.Settings).toHaveBeenCalled();
		expect(global.wp.api.loadPromise.done).toHaveBeenCalled();
	});

	it('saveSettings should save the provided settings', async () => {
		const settings = {
			general: [{ field: 'text', value: 'hello', id: '1', attributes: {} }],
			analytics: [],
			styles: [],
		};
		await saveSettings(settings);
		expect(global.wp.api.models.Settings).toHaveBeenCalledWith({
			bb_site_settings_values: JSON.stringify(settings),
		});
	});

	it('addSetting should add a new setting to the specified category', async () => {
		uuidv4.mockReturnValue('test-uuid');
		const settings = await addSetting({ general: [] }, 'general', {
			field: 'text',
			value: 'hello',
			attributes: {},
		});
		expect(settings).toEqual({
			general: [{ field: 'text', id: 'test-uuid', value: 'hello', attributes: {} }],
		});
	});

	it('editSetting should update an existing setting', async () => {
		const initialSettings = {
			general: [{ field: 'text', value: 'hello', id: '1', attributes: {} }],
		};
		const updatedSettings = await editSetting(initialSettings, 'general', {
			id: '1',
			field: 'text',
			value: 'world',
			attributes: {},
		});
		expect(updatedSettings).toEqual({
			general: [{ field: 'text', value: 'world', id: '1', attributes: {} }],
		});
	});

	it('deleteSetting should remove a setting by id', async () => {
		const initialSettings = {
			general: [{ field: 'text', value: 'hello', id: '1', attributes: {} }],
		};
		const updatedSettings = await deleteSetting(initialSettings, 'general', '1');
		expect(updatedSettings).toEqual({ general: [] });
	});

	it('deleteAllSettings should reset all settings', async () => {
		await deleteAllSettings();
		expect(global.wp.api.models.Settings).toHaveBeenCalledWith({
			bb_site_settings_values: JSON.stringify({}),
		});
	});
});
