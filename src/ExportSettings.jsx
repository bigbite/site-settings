import { Button } from "@wordpress/components";
import { useSettings } from "./Context";

const ExportSettings = () => {
	const { settings } = useSettings();

	const handleExport = () => {
		const data = JSON.stringify(settings);
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "settings.json";
		a.click();
		URL.revokeObjectURL(url);
	};

	return settings.length ? (
		<Button
			variant="secondary"
			onClick={handleExport}
			style={{ marginRight: "10px" }}
			icon="database-export"
		/>
	) : null;
};

export default ExportSettings;
