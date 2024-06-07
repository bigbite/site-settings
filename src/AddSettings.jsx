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

function getEmptySetting() {
	return {
		title: "",
		value: null,
		fields: [{ type: "", props: {} }],
	};
}

const AddSettings = () => {
	const { addSetting } = useSettings();

	const [settings, setSettings] = useState([getEmptySetting()]);

	async function handleSubmit() {
		await addSetting(settings);

		setSettings([getEmptySetting()]);
	}

	function handleValueChange(index, event) {
		setSettings((prevSettings) => {
			const valueProp =
				getValueProp(prevSettings[index].fields[0].type) || "value";
			const newSettings = [...prevSettings];
			newSettings[index].value = event;
			newSettings[index].fields[0].props[valueProp] = event;
			return newSettings;
		});
	}

	function handleLabelChange(index, event) {
		setSettings((prevSettings) => {
			const newSettings = [...prevSettings];
			newSettings[index].fields[0].props.label = event;
			return newSettings;
		});
	}

	function handleSettingTitleChange(index, event) {
		setSettings((prevSettings) => {
			const newSettings = [...prevSettings];
			newSettings[index] = { ...newSettings[index], title: event };
			return newSettings;
		});
	}

	function addNewSetting() {
		setSettings([...settings, getEmptySetting()]);
	}

	function handleRemoveSetting(removeIndex) {
		const newSettings = settings.filter(
			(setting, index) => index !== removeIndex,
		);
		setSettings(newSettings);
	}

	function handleCancel() {
		setSettings([getComponent()]);
	}

	return (
		<SettingModal
			buttonText="plus"
			modalTitle="Add new settings"
			handleSubmit={handleSubmit}
			handleCancel={handleCancel}
		>
			{settings?.map((setting, index) => {
				const SelectedComponent = getComponent(settings[index].fields[0].type);
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
								value={setting.fields[0].type}
								onChange={(value) => {
									setSettings((prevSettings) => {
										const newSettings = [...prevSettings];
										newSettings[index] = {
											title: "",
											value: null,
											fields: [
												{
													type: value,
													props: getProps(value),
												},
											],
										};
										return newSettings;
									});
								}}
							/>
						</div>
						{setting.fields.length && SelectedComponent ? (
							<div
								style={{
									marginTop: "30px",
								}}
							>
								<TextControl
									label="Setting title"
									onChange={(event) => handleSettingTitleChange(index, event)}
									value={setting.title}
									required
								/>

								{setting.fields[0].type === "text" ||
								setting.fields[0].type === "toggle" ? (
									<>
										<TextControl
											label="Label for the setting field"
											onChange={(event) => handleLabelChange(index, event)}
											value={settings[index].fields[0].props.label}
											required
										/>
										<SelectedComponent
											{...setting.fields[0].props}
											onChange={(event) => handleValueChange(index, event)}
										/>
									</>
								) : null}

								{setting.fields[0].type === "radio" ? (
									<>
										{setting.fields[0].props.options.map(
											(option, optionsIndex) => (
												<div
													key={optionsIndex}
													style={{ position: "relative", marginBottom: "30px" }}
												>
													<TextControl
														label="Option label"
														value={option.label}
														onChange={(event) => {
															setSettings((prevSettings) => {
																const newSettings = [...prevSettings];

																newSettings[index].fields[0].props.options[
																	optionsIndex
																].label = event;

																return newSettings;
															});
														}}
													/>
													<TextControl
														label="Option value"
														value={option.value}
														onChange={(event) => {
															setSettings((prevSettings) => {
																const newSettings = [...prevSettings];

																newSettings[index].fields[0].props.options[
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

																	newSettings[index].fields[0].props.options =
																		newSettings[
																			index
																		].fields[0].props.options.filter(
																			(option, optionIndex) =>
																				optionIndex !== optionsIndex,
																		);

																	return newSettings;
																});
															}}
															icon="no-alt"
														/>
													) : null}
												</div>
											),
										)}
										<Button
											style={{ marginBottom: "30px" }}
											onClick={() => {
												setSettings((prevSettings) => {
													const newSettings = [...prevSettings];
													newSettings[index].fields[0].props.options = [
														...newSettings[index].fields[0].props.options,
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
											{...setting.fields[0].props}
											onChange={(event) => {
												setSettings((prevSettings) => {
													const newSettings = [...prevSettings];

													newSettings[index].value = event;
													newSettings[index].fields[0].props.selected = event;
													return newSettings;
												});
											}}
										/>
									</>
								) : null}

								{setting.fields[0].type === "checkbox" ? (
									<>
										{setting.fields.map((checkbox, checkboxesIndex) => (
											<div
												key={checkboxesIndex}
												style={{ position: "relative", marginBottom: "30px" }}
											>
												<TextControl
													label="Checkbox label"
													value={checkbox.propslabel}
													onChange={(event) => {
														setSettings((prevSettings) => {
															const newSettings = [...prevSettings];

															newSettings[index].fields[
																checkboxesIndex
															].props.label = event;

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

																newSettings[index].fields = newSettings[
																	index
																].fields.filter(
																	(_, checkboxIndex) =>
																		checkboxIndex !== checkboxesIndex,
																);

																return newSettings;
															});
														}}
														icon="no-alt"
													/>
												) : null}
											</div>
										))}
										{setting.fields.length > 0 ? (
											<Button
												style={{ marginBottom: "30px" }}
												onClick={() => {
													setSettings((prevSettings) => {
														const newSettings = [...prevSettings];

														newSettings[index].fields = [
															...newSettings[index].fields,
															{
																type: "checkbox",
																props: {
																	label: `New checkbox label`,
																	checked: false,
																},
															},
														];

														return newSettings;
													});
												}}
											>
												Add checkbox
											</Button>
										) : null}
										{setting.fields.map((checkbox, checkboxIndex) => (
											<SelectedComponent
												key={checkboxIndex}
												{...checkbox.props}
												onChange={(checked) => {
													setSettings((prevSettings) => {
														const newSettings = [...prevSettings];

														newSettings[index].fields[
															checkboxIndex
														].props.checked = checked;

														// Update the value array
														if (checked) {
															// Checkbox is checked, add the label to the value array
															if (!newSettings[index].value) {
																newSettings[index].value = [];
															}
															newSettings[index].value.push(
																checkbox.props.label,
															);
														} else {
															// Checkbox is unchecked, remove the label from the value array
															newSettings[index].value = newSettings[
																index
															].value.filter(
																(value) => value !== checkbox.props.label,
															);
														}

														return newSettings;
													});
												}}
											/>
										))}
									</>
								) : null}
							</div>
						) : null}
						{index > 0 ? (
							<Button
								style={{ position: "absolute", top: "0", right: "0" }}
								onClick={() => handleRemoveSetting(index)}
								icon="no-alt"
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
