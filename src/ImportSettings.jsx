import { Button } from "@wordpress/components";
import { useSettings } from "./Context";

const ImportSettings = () => {
	const { addSetting } = useSettings();
	let fileInput = React.createRef();

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

	return (
		<>
			<input
				type="file"
				accept=".json"
				onChange={handleImport}
				style={{ display: "none" }}
				ref={fileInput}
			/>
			<Button
				icon="database-import"
				variant="secondary"
				style={{ marginRight: "10px" }}
				onClick={() => fileInput.current.click()}
			/>
		</>
	);
};

export default ImportSettings;
