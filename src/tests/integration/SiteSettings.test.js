import { render, waitFor, fireEvent, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SiteSettingsProvider } from '../../context';
import { useSettings } from '../../hooks';
import {
	getSettings,
	saveSettings,
	addSetting,
	editSetting,
	deleteSetting,
	deleteAllSettings,
} from '../../services';
import { validateSettings } from '../../schema';

jest.mock('../../services', () => ({
	getSettings: jest.fn(),
	saveSettings: jest.fn(),
	addSetting: jest.fn(),
	editSetting: jest.fn(),
	deleteSetting: jest.fn(),
	deleteAllSettings: jest.fn(),
}));

jest.mock('../../schema', () => ({
	validateSettings: jest.fn(),
}));

const ContextConsumer = () => {
	const {
		settings,
		error,
		loading,
		fetchSettings,
		handleAddSetting,
		handleEditSetting,
		handleDeleteSetting,
		handleDeleteAllSettings,
	} = useSettings();

	return (
		<div>
			{loading && <span>Loading...</span>}
			{error && <span>Error: {error}</span>}
			<button onClick={fetchSettings}>Fetch Settings</button>
			<button
				onClick={() =>
					handleAddSetting('general', {
						field: 'testField',
						value: 'testValue',
						id: '1',
						attributes: {},
					})
				}
			>
				Add Setting
			</button>
			<button
				onClick={() =>
					handleEditSetting('general', {
						field: 'testField',
						value: 'editedValue',
						id: '1',
						attributes: {},
					})
				}
			>
				Edit Setting
			</button>
			<button onClick={() => handleDeleteSetting('general', '1')}>Delete Setting</button>
			<button onClick={handleDeleteAllSettings}>Delete All Settings</button>
			<div>{JSON.stringify(settings)}</div>
		</div>
	);
};

describe('SiteSettingsProvider', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('fetches and validates settings', async () => {
		getSettings.mockResolvedValue({
			general: [{ field: 'testField', value: 'testValue', id: '1', attributes: {} }],
		});
		validateSettings.mockResolvedValue(true);

		render(
			<SiteSettingsProvider>
				<ContextConsumer />
			</SiteSettingsProvider>,
		);

		await act(async () => {
			fireEvent.click(screen.getByText('Fetch Settings'));
		});

		// await waitFor(() => expect(screen.getByText(/Loading/i)).not.toBeInTheDocument());

		expect(getSettings).toHaveBeenCalledTimes(1);
		expect(validateSettings).toHaveBeenCalledTimes(1);
		expect(screen.getByText(/testValue/i)).toBeInTheDocument();
	});

	test('adds a new setting', async () => {
		validateSettings.mockResolvedValue(true);
		addSetting.mockResolvedValue({
			general: [{ field: 'testField', value: 'testValue', id: '1', attributes: {} }],
		});

		render(
			<SiteSettingsProvider>
				<ContextConsumer />
			</SiteSettingsProvider>,
		);

		await act(async () => {
			fireEvent.click(screen.getByText('Add Setting'));
		});

		// await waitFor(() => expect(screen.getByText(/Loading/i)).not.toBeInTheDocument());

		expect(addSetting).toHaveBeenCalledTimes(1);
		expect(saveSettings).toHaveBeenCalledTimes(1);
		expect(screen.getByText(/testValue/i)).toBeInTheDocument();
	});

	test('edits an existing setting', async () => {
		validateSettings.mockResolvedValue(true);
		editSetting.mockResolvedValue({
			general: [{ field: 'testField', value: 'editedValue', id: '1', attributes: {} }],
		});

		render(
			<SiteSettingsProvider>
				<ContextConsumer />
			</SiteSettingsProvider>,
		);

		await act(async () => {
			fireEvent.click(screen.getByText('Edit Setting'));
		});

		// await waitFor(() => expect(screen.getByText(/Loading/i)).not.toBeInTheDocument());

		expect(editSetting).toHaveBeenCalledTimes(1);
		expect(saveSettings).toHaveBeenCalledTimes(1);
		expect(screen.getByText(/editedValue/i)).toBeInTheDocument();
	});

	test('deletes an existing setting', async () => {
		validateSettings.mockResolvedValue(true);
		deleteSetting.mockResolvedValue({ general: [] });

		render(
			<SiteSettingsProvider>
				<ContextConsumer />
			</SiteSettingsProvider>,
		);

		await act(async () => {
			fireEvent.click(screen.getByText('Delete Setting'));
		});

		// await waitFor(() => expect(screen.getByText(/Loading/i)).not.toBeInTheDocument());

		expect(deleteSetting).toHaveBeenCalledTimes(1);
		expect(saveSettings).toHaveBeenCalledTimes(1);
		expect(screen.queryByText(/testValue/i)).not.toBeInTheDocument();
	});

	test('deletes all settings', async () => {
		deleteAllSettings.mockResolvedValue();

		render(
			<SiteSettingsProvider>
				<ContextConsumer />
			</SiteSettingsProvider>,
		);

		await act(async () => {
			fireEvent.click(screen.getByText('Delete All Settings'));
		});

		// await waitFor(() => expect(screen.getByText(/Loading/i)).not.toBeInTheDocument());

		expect(deleteAllSettings).toHaveBeenCalledTimes(1);
		expect(screen.getByText('{}')).toBeInTheDocument();
	});
});
