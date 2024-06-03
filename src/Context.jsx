import {
	useEffect,
	createContext,
	useState,
	useContext,
} from "@wordpress/element";
import { v4 as uuidv4 } from "uuid";

const SiteSettingsContext = createContext();

//dummy data just to test the saveSettings function
const dummyData = [
	{
		field: "checkbox",
		id: 1,
		props: { checked: true, label: "Test checkbox" },
	},
	{
		field: "text",
		id: 2,
		props: { label: "Test text field", value: "Test field" },
	},
	{ field: "toggle", id: 3, props: { checked: true, label: "Test toggle" } },
];

export const SiteSettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState([]);

	useEffect(() => {
		const fetchSettings = async () => {
			await wp.api.loadPromise.done();

			const settings = new wp.api.models.Settings();

			const response = await settings.fetch();

			if (response.bb_site_settings_values) {
				setSettings([...JSON.parse(response.bb_site_settings_values)]);
			}
		};

		fetchSettings();
	}, []);

	async function addSetting(newSetting) {
		newSetting.id = uuidv4();

		const updatedSettings = new wp.api.models.Settings({
			bb_site_settings_values: JSON.stringify([...settings, newSetting]),
		});

		await updatedSettings.save();

		setSettings([...settings, newSetting]);
	}

	async function updateSetting(editiedSetting) {
		const updatedSettings = new wp.api.models.Settings({
			bb_site_settings_values: JSON.stringify(
				settings.map((setting) =>
					setting.id === editiedSetting.id ? editiedSetting : setting,
				),
			),
		});

		await updatedSettings.save();

		setSettings(
			settings.map((setting) =>
				setting.id === editiedSetting.id ? editiedSetting : setting,
			),
		);
	}

	async function deleteSetting(id) {
		const updatedSettings = new wp.api.models.Settings({
			bb_site_settings_values: JSON.stringify(
				settings.filter((setting) => setting.id !== id),
			),
		});

		await updatedSettings.save();

		setSettings(settings.filter((setting) => setting.id !== id));
	}

	async function deleteSettings() {
		const settings = new wp.api.models.Settings({
			bb_site_settings_values: JSON.stringify([]),
		});

		await settings.save();

		setSettings([]);
	}

	return (
		<SiteSettingsContext.Provider
			value={{
				settings,
				addSetting,
				deleteSetting,
				deleteSettings,
				updateSetting,
			}}
		>
			{children}
		</SiteSettingsContext.Provider>
	);
};

export const useSettings = () => useContext(SiteSettingsContext);
