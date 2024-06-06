import { useState } from "@wordpress/element";
import { CheckboxControl, TextControl } from "@wordpress/components";
import { getComponent, getValueProp } from "./supportedFields";
import { useSettings } from "./Context";
import SettingModal from "./SettingModal";

const EditSetting = ({ setting }) => {
	const { editSetting } = useSettings();
	const [editiedSetting, setEditiedSetting] = useState(setting);

	async function handleSubmit() {
		await editSetting(editiedSetting);
	}

	function handleLabelChange(event) {
		setEditiedSetting({
			...editiedSetting,
			props: { ...editiedSetting.props, label: event },
		});
	}

	function handleValueChange(event) {
		const valueProp = getValueProp(setting.field) || "value";

		setEditiedSetting({
			...editiedSetting,
			props: { ...editiedSetting.props, [valueProp]: event },
		});
	}

	const SelectComponent = getComponent(editiedSetting.field);

	return (
		<SettingModal
			buttonText="Edit"
			modalTitle="Edit Setting"
			handleSubmit={handleSubmit}
		>
			<TextControl
				label="Label for setting field"
				value={editiedSetting.props.label}
				onChange={handleLabelChange}
				required
			/>

			<br />

			{editiedSetting.field === "checkbox" ? (
				<>
					{editiedSetting.checkboxes.map((checkbox, index) => (
						<TextControl
							key={index}
							label="Checkbox label"
							value={checkbox.label}
							onChange={(event) => {
								setEditiedSetting((prev) => {
									const updatedSettings = { ...prev };
									updatedSettings.checkboxes[index].label = event;

									return updatedSettings;
								});
							}}
						/>
					))}
					{editiedSetting.checkboxes.map((checkbox, index) => (
						<CheckboxControl
							key={index}
							label={checkbox.label}
							checked={checkbox.checked}
							onChange={(event) => {
								setEditiedSetting((prev) => {
									const updatedSettings = { ...prev };
									updatedSettings.checkboxes[index].checked = event;
									return updatedSettings;
								});
							}}
						/>
					))}
				</>
			) : (
				<SelectComponent
					{...editiedSetting.props}
					label="Value for the setting field"
					onChange={handleValueChange}
				/>
			)}
		</SettingModal>
	);
};

export default EditSetting;
