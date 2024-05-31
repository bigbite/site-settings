import { Button } from "@wordpress/components";
import supportedComponents from "./supportFields";
import UpdateSetting from "./UpdateSetting";
import { useSettings } from "./Context";

const Settings = () => {
	const { settings, deleteSetting } = useSettings();

	return (
		<>
			<h1 style={{ marginBottom: "30px" }}>Site Settings</h1>
			{settings.length ? (
				<ul>
					{settings.map((setting) => {
						const Component = supportedComponents[setting.type];
						const { props } = setting;

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
										<UpdateSetting setting={setting} />
									</div>
								</li>
							</div>
						);
					})}
				</ul>
			) : (
				<h2 style={{ marginBottom: "30px" }}>
					No settings found, add your first one.
				</h2>
			)}
		</>
	);
};

export default Settings;
