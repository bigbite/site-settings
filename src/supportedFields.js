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
	radio: {
		Component: RadioControl,
		label: "Radio Field",
		valueProp: "selected",
		props: {
			selected: "",
			options: [{ label: "Placeholder option", value: "option1" }],
		},
	},
};

const getComponent = (field) => supportedFields[field]?.Component;

const getValueProp = (field) => supportedFields[field]?.valueProp;

const getProps = (field) => supportedFields[field]?.props;

export { getComponent, supportedFields, getValueProp, getProps };
