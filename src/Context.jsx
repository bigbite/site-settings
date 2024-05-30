import {
	useEffect,
	createContext,
	useState,
	useContext,
} from "@wordpress/element";

const NSSSiteSettingsContext = createContext();

export const NSSSiteSettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState([]);

	useEffect(() => {
		const fetchSettings = async () => {
			await wp.api.loadPromise.done();

			const settings = new wp.api.models.Settings();

			const response = await settings.fetch();

			if (response.nss_site_settings_values) {
				setSettings(...JSON.parse(response.nss_site_settings_values));
				console.log(JSON.parse(response.nss_site_settings_values));
			}
		};

		fetchSettings();
	}, []);

	async function saveSettings(newSettings) {
		//dummy data just to test the saveSettings function
		const data = [
			{
				field: "Textfield",
				label: "Test text control field",
				id: 123,
				value: "Test value",
			},
		];

		const settings = new wp.api.models.Settings({
			nss_site_settings_values: JSON.stringify(data),
		});

		await settings.save();
	}

	async function deleteSetting(id) {
		const updatedSettings = new wp.api.models.Settings({
			nss_site_settings_values: JSON.stringify(
				settings.filter((setting) => setting.id !== id),
			),
		});

		await updatedSettings.save();
	}

	async function deleteSettings() {
		const settings = new wp.api.models.Settings({
			nss_site_settings_values: JSON.stringify([]),
		});

		await settings.save();
	}

	return (
		<NSSSiteSettingsContext.Provider
			value={{ settings, saveSettings, deleteSetting, deleteSettings }}
		>
			{children}
		</NSSSiteSettingsContext.Provider>
	);
};

export const useSettings = () => useContext(NSSSiteSettingsContext);
