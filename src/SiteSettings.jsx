import { Button } from "@wordpress/components";
import AddSettings from "./AddSettings";
import Settings from "./Settings";
import DeleteSettings from "./DeleteSettings";

const SiteSettings = () => (
	<>
		<Settings />
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<DeleteSettings />
			<AddSettings />
		</div>
	</>
);

export default SiteSettings;
