import { useState } from "@wordpress/element";
import { TextControl } from "@wordpress/components";
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
			<SelectComponent
				{...editiedSetting.props}
				label="Value for the setting field"
				onChange={handleValueChange}
			/>
		</SettingModal>
	);
};

export default EditSetting;
