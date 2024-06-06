import { useSettings } from "./Context";

const ImportSettings = () => {
	const { addSetting } = useSettings();

	const handleImport = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const importedSettings = JSON.parse(e.target.result);

				addSetting(importedSettings);
			} catch (err) {
				console.error("Invalid JSON file");
			}
		};
		reader.readAsText(file);
	};

	return <input type="file" accept=".json" onChange={handleImport} />;
};

export default ImportSettings;
