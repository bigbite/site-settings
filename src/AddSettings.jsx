import { useState } from "@wordpress/element";
import {
	Button,
	Modal,
	SelectControl,
	TextControl,
} from "@wordpress/components";
import supportedComponents from "./supportFields";
import { useSettings } from "./Context";

const AddSettings = () => {
	const { addSetting } = useSettings();

	const [isOpen, setOpen] = useState(false);

	const openModal = () => {
		setSetting({ type: "" });
		setOpen(true);
	};

	const closeModal = () => setOpen(false);

	const [setting, setSetting] = useState({ type: "" });

	const options = [
		{
			disabled: true,
			label: "Select an Option",
			value: "",
		},
		...Object.keys(supportedComponents).map((key) => ({
			label: key.toUpperCase(),
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
		if (setting.type === "checkbox" || setting.type === "toggle") {
			setSetting({ ...setting, props: { ...setting.props, checked: event } });
		} else {
			setSetting({ ...setting, props: { ...setting.props, value: event } });
		}
	}

	const SelectComponent =
		setting.type.length && supportedComponents[setting.type];

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
							value={setting.type}
							onChange={(value) => setSetting({ type: value })}
						/>

						<br />

						{setting && supportedComponents[setting.type] && (
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
