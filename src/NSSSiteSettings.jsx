import { useSettings } from "./Context";

function NSSSiteSettings() {
	const { settings, saveSettings, deleteSettings } = useSettings();

	return (
		<>
			<button onClick={saveSettings}>Save settings</button>
			<button onClick={deleteSettings}>Delete settings</button>
		</>
	);
}

export default NSSSiteSettings;
