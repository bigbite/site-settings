import {
	TextControl,
	CheckboxControl,
	ToggleControl,
	RadioControl,
} from "@wordpress/components";

const supportedFields = {
	text: {
		Component: TextControl,
		label: "Text Field",
		disabled: false,
		valueProp: "value",
		props: {
			value: "",
		},
	},
	toggle: {
		Component: ToggleControl,
		disabled: false,
		label: "Toggle Field",
		valueProp: "checked",
		props: {
			checked: false,
		},
	},
	checkbox: {
		Component: CheckboxControl,
		disabled: true,
		label: "Checkbox Field",
		valueProp: "checked",
		props: {
			checked: false,
		},
	},
	radio: {
		Component: RadioControl,
		label: "Radio Field",
		disabled: false,
		valueProp: "selected",
		props: {
			selected: "",
			options: [{ label: "placeholder label", value: "placeholder" }],
		},
	},
};

const getComponent = (field) => supportedFields[field]?.Component;

const getValueProp = (field) => supportedFields[field]?.valueProp;

const getProps = (field) => supportedFields[field]?.props;

const getSelectSupportedOptions = () => [
	{
		disabled: true,
		label: "Select an field",
		value: "",
	},
	...Object.keys(supportedFields).map((key) => ({
		label: supportedFields[key].label,
		disabled: supportedFields[key].disabled,
		value: key,
	})),
];

export {
	getComponent,
	supportedFields,
	getValueProp,
	getProps,
	getSelectSupportedOptions,
};
