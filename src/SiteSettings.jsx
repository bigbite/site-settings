import AddSettings from "./AddSettings";
import Settings from "./Settings";
import DeleteSettings from "./DeleteSettings";
import ExportSettings from "./ExportSettings";

const SiteSettings = () => (
	<>
		<Settings />
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<DeleteSettings />
			<div>
				<ExportSettings />
				<AddSettings />
			</div>
		</div>
	</>
);

export default SiteSettings;
