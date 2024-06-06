import { useState } from "@wordpress/element";
import {
	SelectControl,
	TextControl,
	Button,
	CheckboxControl,
} from "@wordpress/components";
import {
	getComponent,
	getValueProp,
	getProps,
	getSelectSupportedOptions,
} from "./supportedFields";
import { useSettings } from "./Context";
import SettingModal from "./SettingModal";

const AddSettings = () => {
	const { addSetting } = useSettings();

	const [settings, setSettings] = useState([{ field: "" }]);

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
								options={getSelectSupportedOptions()}
								value={setting.field}
								onChange={(value) => {
									if (value === "checkbox") {
										setSettings((prevSettings) => {
											const newSettings = [...prevSettings];
											newSettings[index] = {
												field: value,
												checkboxes: [
													{
														label: `Checkbox label`,
														checked: false,
													},
												],
											};
											return newSettings;
										});
									} else {
										setSettings((prevSettings) => {
											const newSettings = [...prevSettings];
											newSettings[index] = {
												field: value,
												props: getProps(value),
											};
											return newSettings;
										});
									}
								}}
							/>
						</div>
						{setting.field.length && SelectedComponent ? (
							<div
								style={{
									marginTop: "30px",
								}}
							>
								<TextControl
									label="Label for setting field"
									onChange={(event) => handleLabelChange(index, event)}
									value={setting.label}
									required
								/>

								{setting.field === "text" || setting.field === "toggle" ? (
									<SelectedComponent
										{...setting.props}
										label="Value for the setting field"
										onChange={(event) => handleValueChange(index, event)}
									/>
								) : null}

								{setting.field === "radio" ? (
									<>
										{setting.props.options.map((option, optionsIndex) => (
											<div
												style={{ position: "relative", marginBottom: "30px" }}
											>
												<TextControl
													label={`Option label`}
													value={option.label}
													onChange={(event) => {
														setSettings((prevSettings) => {
															const newSettings = [...prevSettings];

															newSettings[index].props.options[
																optionsIndex
															].label = event;

															return newSettings;
														});
													}}
												/>
												<TextControl
													label={`Option value`}
													value={option.value}
													onChange={(event) => {
														setSettings((prevSettings) => {
															const newSettings = [...prevSettings];

															newSettings[index].props.options[
																optionsIndex
															].value = event;

															return newSettings;
														});
													}}
												/>
												{optionsIndex > 0 ? (
													<Button
														style={{
															position: "absolute",
															top: "-10px",
															right: "-5px",
														}}
														onClick={() => {
															setSettings((prevSettings) => {
																const newSettings = [...prevSettings];

																newSettings[index].props.options = newSettings[
																	index
																].props.options.filter(
																	(option, optionIndex) =>
																		optionIndex !== optionsIndex,
																);

																return newSettings;
															});
														}}
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
										))}
										<Button
											style={{ marginBottom: "30px" }}
											onClick={() => {
												setSettings((prevSettings) => {
													const newSettings = [...prevSettings];
													newSettings[index].props.options = [
														...newSettings[index].props.options,
														{
															label: `New option label`,
															value: `New Option value`,
														},
													];
													return newSettings;
												});
											}}
										>
											Add option
										</Button>

										<SelectedComponent
											{...setting.props}
											label="Value for the setting field"
											onChange={(event) => handleValueChange(index, event)}
										/>
									</>
								) : null}

								{setting.field === "checkbox" ? (
									<>
										{settings[index].checkboxes.map(
											(checkbox, checkboxesIndex) => (
												<div
													style={{ position: "relative", marginBottom: "30px" }}
												>
													<TextControl
														label={`Checkbox label`}
														value={checkbox.label}
														onChange={(event) => {
															setSettings((prevSettings) => {
																const newSettings = [...prevSettings];
																newSettings[index].checkboxes[
																	checkboxesIndex
																].label = event;
																return newSettings;
															});
														}}
													/>
													{checkboxesIndex > 0 ? (
														<Button
															style={{
																position: "absolute",
																top: "-10px",
																right: "-5px",
															}}
															onClick={() => {
																setSettings((prevSettings) => {
																	const newSettings = [...prevSettings];
																	newSettings[index].checkboxes = newSettings[
																		index
																	].checkboxes.filter(
																		(_, checkboxIndex) =>
																			checkboxIndex !== checkboxesIndex,
																	);
																	return newSettings;
																});
															}}
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
											),
										)}
										{settings[index].checkboxes.length > 0 ? (
											<Button
												style={{ marginBottom: "30px" }}
												onClick={() => {
													setSettings((prevSettings) => {
														const newSettings = [...prevSettings];
														newSettings[index].checkboxes = [
															...newSettings[index].checkboxes,
															{
																label: `New checkbox label`,
																checked: false,
															},
														];
														return newSettings;
													});
												}}
											>
												Add checkbox
											</Button>
										) : null}
										{settings[index].checkboxes.map(
											(checkbox, checkboxIndex) => (
												<CheckboxControl
													label={checkbox.label}
													checked={checkbox.checked}
													onChange={(checked) => {
														setSettings((prevSettings) => {
															const newSettings = [...prevSettings];
															newSettings[index].checkboxes[
																checkboxIndex
															].checked = checked;
															return newSettings;
														});
													}}
												/>
											),
										)}
									</>
								) : null}
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
