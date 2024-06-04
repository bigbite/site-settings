import {
	TextControl,
	CheckboxControl,
	ToggleControl,
} from "@wordpress/components";

const supportedFields = {
	text: {
		Component: TextControl,
		label: "Text Field",
		valueProp: "value",
		props: {
			value: "",
		},
	},
	toggle: {
		Component: ToggleControl,
		label: "Toggle Field",
		valueProp: "checked",
		props: {
			checked: false,
		},
	},
	checkbox: {
		Component: CheckboxControl,
		label: "Checkbox Field",
		valueProp: "checked",
		props: {
			checked: false,
		},
	},
};

const getComponent = (field) => supportedFields[field]?.Component;

const getValueProp = (field) => supportedFields[field]?.valueProp;

export { getComponent, supportedFields, getValueProp };
