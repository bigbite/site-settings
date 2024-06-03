import { useState } from "@wordpress/element";
import {
	Button,
	Modal,
	SelectControl,
	TextControl,
} from "@wordpress/components";
import supportedFields from "./supportedFields";
import { useSettings } from "./Context";

const AddSettings = () => {
	const { addSetting } = useSettings();

	const [isOpen, setOpen] = useState(false);

	const openModal = () => {
		setSetting({ field: "" });
		setOpen(true);
	};

	const closeModal = () => setOpen(false);

	const [setting, setSetting] = useState({ field: "" });

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

	async function handleSubmit(event) {
		event.preventDefault();
		await addSetting(setting);
		closeModal();
	}

	function handleLabelChange(event) {
		setSetting({ ...setting, props: { ...setting.props, label: event } });
	}

	function handleValueChange(event) {
		// TODO refactor this, don't like it but too tired to think of a better way atm.
		if (setting.field === "checkbox" || setting.field === "toggle") {
			setSetting({
				...setting,
				props: { ...setting.props, checked: event },
			});
		} else {
			setSetting({ ...setting, props: { ...setting.props, value: event } });
		}
	}

	const SelectComponent =
		setting.field.length && supportedFields[setting.field].Component;

	return (
		<>
			<Button variant="primary" onClick={openModal}>
				Add
			</Button>
			{isOpen && (
				<Modal title="Add setting" onRequestClose={closeModal}>
					<form onSubmit={handleSubmit}>
						<SelectControl
							required
							label="Select setting field"
							options={options}
							value={setting.field}
							onChange={(value) => setSetting({ field: value })}
						/>

						<br />

						{setting && supportedFields[setting.field] && (
							<>
								<TextControl
									label="Label for setting field"
									onChange={handleLabelChange}
									value={setting.label}
									required
								/>
								<SelectComponent
									{...setting.props}
									label="Value for the setting field"
									onChange={handleValueChange}
								/>
							</>
						)}

						<br />

						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Button variant="secondary" onClick={closeModal}>
								Cancel
							</Button>
							<Button type="submit" variant="primary">
								Add
							</Button>
						</div>
					</form>
				</Modal>
			)}
		</>
	);
};

export default AddSettings;
