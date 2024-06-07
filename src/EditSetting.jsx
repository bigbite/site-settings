import { useState } from "@wordpress/element";
import { TextControl } from "@wordpress/components";
import { getComponent, getValueProp } from "./supportedFields";
import { useSettings } from "./Context";
import SettingModal from "./SettingModal";

const EditSetting = ({ setting }) => {
	const { editSetting } = useSettings();
	const [editiedSetting, setEditiedSetting] = useState(setting);
	const field = editiedSetting.fields[0].type;

	async function handleSubmit() {
		await editSetting(editiedSetting);
	}

	function handleLabelChange(event) {
		setEditiedSetting({
			...editiedSetting,
			title: event,
		});
	}

	function handleValueChange(event) {
		const valueProp = getValueProp(field) || "value";

		setEditiedSetting({
			...editiedSetting,
			value: event,
			fields: [
				{
					...editiedSetting.fields[0],
					props: {
						...editiedSetting.fields[0].props,
						[valueProp]: event,
					},
				},
			],
		});
	}

	const Component = getComponent(field);

	return (
		<SettingModal
			buttonText="edit"
			modalTitle="Edit Setting"
			handleSubmit={handleSubmit}
		>
			<TextControl
				label="Title of the setting field"
				value={editiedSetting.title}
				onChange={handleLabelChange}
				required
			/>

			<br />

			{field === "checkbox" ? (
				editiedSetting.fields.map((checkbox, index) => (
					<Component
						key={index}
						{...checkbox.props}
						onChange={(event) => {
							setEditiedSetting((prev) => {
								const updatedSettings = { ...prev };
								updatedSettings.fields[index].props.checked = event;

								// Update the value array
								if (event) {
									// Checkbox is checked, add the label to the value array
									updatedSettings.value.push(checkbox.props.label);
								} else {
									// Checkbox is unchecked, remove the label from the value array
									updatedSettings.value = updatedSettings.value.filter(
										(value) => value !== checkbox.props.label,
									);
								}

								return updatedSettings;
							});
						}}
					/>
				))
			) : (
				<Component
					required
					{...editiedSetting.fields[0].props}
					onChange={handleValueChange}
				/>
			)}
		</SettingModal>
	);
};

export default EditSetting;
