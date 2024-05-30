import {
	TextControl,
	CheckboxControl,
	ToggleControl,
} from "@wordpress/components";

const Settings = ({ settings }) => {
	const supportedComponents = {
		text: TextControl,
		toggle: ToggleControl,
		checkbox: CheckboxControl,
	};

	return (
		<>
			<h2>Settings</h2>
			<ul>
				{settings.map((setting) => {
					const Component = supportedComponents[setting.type];
					const { props } = setting;
					return (
						<li key={setting.id}>
							<Component {...props} />
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default Settings;
