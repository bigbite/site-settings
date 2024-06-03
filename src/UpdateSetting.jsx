import { useState } from "@wordpress/element";
import { Button, Modal, TextControl } from "@wordpress/components";
import supportedFields from "./supportedFields";
import { useSettings } from "./Context";

const UpdateSetting = ({ setting }) => {
	const { updateSetting } = useSettings();
	const [isOpen, setOpen] = useState(false);

	const openModal = () => {
		setOpen(true);
	};

	const closeModal = () => setOpen(false);

	const [editiedSetting, setEditiedSetting] = useState(setting);

	async function handleSubmit(event) {
		event.preventDefault();
		await updateSetting(editiedSetting);
		closeModal();
	}

	function handleLabelChange(event) {
		setEditiedSetting({
			...editiedSetting,
			props: { ...editiedSetting.props, label: event },
		});
	}

	function handleValueChange(event) {
		// TODO refactor this, don't like it but too tired to think of a better way atm.
		if (setting.field === "checkbox" || setting.field === "toggle") {
			setEditiedSetting({
				...editiedSetting,
				props: { ...editiedSetting.props, checked: event },
			});
		} else {
			setEditiedSetting({
				...editiedSetting,
				props: { ...editiedSetting.props, value: event },
			});
		}
	}

	const SelectComponent =
		editiedSetting.field.length &&
		supportedFields[editiedSetting.field].Component;

	return (
		<>
			<Button variant="primary" onClick={openModal}>
				Edit
			</Button>
			{isOpen && (
				<Modal title="Update setting" onRequestClose={closeModal}>
					<form onSubmit={handleSubmit}>
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

						<br />

						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Button variant="secondary" onClick={closeModal}>
								Cancel
							</Button>
							<Button type="submit" variant="primary">
								Update
							</Button>
						</div>
					</form>
				</Modal>
			)}
		</>
	);
};

export default UpdateSetting;
