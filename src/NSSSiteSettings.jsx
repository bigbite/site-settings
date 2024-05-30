import { TextControl } from "@wordpress/components";
import AddSettings from "./AddSettings";
import { useSettings } from "./Context";
import Settings from "./Settings";

function NSSSiteSettings() {
	const { settings, deleteSettings, saveSettings } = useSettings();

	return (
		<>
			<Settings settings={settings} />
			<AddSettings />
			<button onClick={() => deleteSettings()}>Delete all settings</button>
			<button onClick={() => saveSettings()}>Save settings</button>
		</>
	);
}

export default NSSSiteSettings;
