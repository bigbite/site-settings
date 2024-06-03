import { useEffect } from "@wordpress/element";
import { Button } from "@wordpress/components";
import EditSetting from "./EditSetting";
import { useSettings } from "./Context";
import { getComponent } from "./utils";

const Info = ({ children }) => (
	<h2 style={{ marginBottom: "30px" }}>{children}</h2>
);

const Settings = () => {
	const { settings, loading, error, getSettings, deleteSetting } =
		useSettings();

	useEffect(() => {
		getSettings();
	}, []);

	function renderContent() {
		if (loading) {
			return <Info>Loading settings...</Info>;
		}

		if (error) {
			return <Info>There seems to be an error getting settings</Info>;
		}

		if (!settings.length) {
			return <Info>No settings found, add your first one.</Info>;
		}

		return (
			<ul>
				{settings.map((setting) => {
					const { props, field } = setting;
					const Component = getComponent(field);

					return (
						<div key={setting.id}>
							<li className="bb-site-settings__setting">
								<Component disabled {...props} />
								<div>
									<Button
										onClick={() => deleteSetting(setting.id)}
										style={{ marginRight: "10px" }}
										variant="primary"
										isDestructive
									>
										Delete
									</Button>
									<EditSetting setting={setting} />
								</div>
							</li>
						</div>
					);
				})}
			</ul>
		);
	}

	return (
		<>
			<h1 style={{ marginBottom: "30px" }}>Site Settings</h1>
			{renderContent()}
		</>
	);
};

export default Settings;
