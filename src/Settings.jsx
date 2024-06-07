import { useEffect } from "@wordpress/element";

import { useSettings } from "./Context";
import ImportSettings from "./ImportSettings";
import Setting from "./Setting";
import AddSettings from "./AddSettings";
import ExportSettings from "./ExportSettings";
import DeleteSettings from "./DeleteSettings";
import SettingSkeleton from "./SettingSkeleton";

const Info = ({ children }) => (
	<h2 style={{ marginBottom: "30px" }}>{children}</h2>
);

const Settings = () => {
	const { settings, loading, error, getSettings } = useSettings();

	useEffect(() => {
		getSettings();
	}, []);

	function renderContent() {
		if (loading)
			return [...Array(3)].map((_, i) => <SettingSkeleton key={i} />);

		if (error) return <Info>There seems to be an error getting settings</Info>;

		if (!settings.length)
			return <Info>No settings found, add your first one.</Info>;

		return settings.map((setting) => (
			<Setting key={setting.id} setting={setting} />
		));
	}

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					position: "sticky",
					top: "30px",
					zIndex: 100,
					backgroundColor: "white",
					padding: "0 10px 0 10px",
					marginBottom: "10px",
					borderBottom: "1px solid #eaeaea",
				}}
			>
				<h1 style={{ marginBottom: "30px" }}>Site Settings</h1>
				<div>
					<DeleteSettings />
					<ExportSettings />
					<ImportSettings />
					<AddSettings />
				</div>
			</div>
			{renderContent()}
		</>
	);
};

export default Settings;
