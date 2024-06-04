import { useState } from "@wordpress/element";
import { SelectControl, TextControl, Button } from "@wordpress/components";
import { getComponent, supportedFields, getValueProp } from "./supportedFields";
import { useSettings } from "./Context";
import SettingModal from "./SettingModal";

const AddSettings = () => {
	const { addSetting } = useSettings();

	const [settings, setSettings] = useState([{ field: "" }]);

	const options = [
		{
			disabled: true,
			label: "Select an Option",
			value: "",
		},
		...Object.keys(supportedFields).map((key) => ({
			label: supportedFields[key].label,
			value: key,
		})),
	];

	async function handleSubmit() {
		await addSetting(settings);

		setSettings([{ field: "" }]);
	}

	function handleValueChange(index, event) {
		const valueProp = getValueProp(settings[index].field) || "value";
		const newSettings = [...settings];
		newSettings[index] = {
			...newSettings[index],
			props: { ...newSettings[index].props, [valueProp]: event },
		};
		setSettings(newSettings);
	}

	function handleLabelChange(index, event) {
		const newSettings = [...settings];
		newSettings[index] = {
			...newSettings[index],
			props: { ...newSettings[index].props, label: event },
		};
		setSettings(newSettings);
	}

	function addNewSetting() {
		setSettings([...settings, { field: "" }]);
	}

	function handleRemoveSetting(removeIndex) {
		const newSettings = settings.filter(
			(setting, index) => index !== removeIndex,
		);
		setSettings(newSettings);
	}

	function handleCancel() {
		setSettings([{ field: "" }]);
	}

	return (
		<SettingModal
			buttonText="Add"
			modalTitle="Add new settings"
			handleSubmit={handleSubmit}
			handleCancel={handleCancel}
		>
			{settings.map((setting, index) => {
				const SelectedComponent = getComponent(setting.field);
				return (
					<div
						style={{
							marginBottom: "30px",
							backgroundColor: "antiquewhite",
							padding: "10px",
							position: "relative",
						}}
						key={index}
					>
						<div>
							<SelectControl
								required
								label="Select setting field"
								options={options}
								value={setting.field}
								onChange={(value) => {
									const newSettings = [...settings];
									newSettings[index] = { field: value };
									setSettings(newSettings);
								}}
							/>
						</div>
						{setting.field.length && SelectedComponent ? (
							<div style={{ marginTop: "30px" }}>
								<TextControl
									label="Label for setting field"
									onChange={(event) => handleLabelChange(index, event)}
									value={setting.label}
									required
								/>
								<SelectedComponent
									{...setting.props}
									label="Value for the setting field"
									onChange={(event) => handleValueChange(index, event)}
								/>
							</div>
						) : null}
						{index > 0 ? (
							<Button
								style={{ position: "absolute", top: "0", right: "0" }}
								onClick={() => handleRemoveSetting(index)}
								icon={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="36"
										height="36"
										aria-hidden="true"
										focusable="false"
									>
										<path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path>
									</svg>
								}
							/>
						) : null}
					</div>
				);
			})}
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Button onClick={addNewSetting}>Add another setting</Button>
			</div>
		</SettingModal>
	);
};

export default AddSettings;
