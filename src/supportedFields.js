import {
	TextControl,
	CheckboxControl,
	ToggleControl,
} from "@wordpress/components";

const supportedFields = {
	text: {
		Component: TextControl,
		label: "Text Field",
		props: {
			label: "",
			value: "",
		},
	},
	toggle: {
		Component: ToggleControl,
		label: "Toggle Field",
		props: {
			label: "",
			checked: false,
		},
	},
	checkbox: {
		Component: CheckboxControl,
		label: "Checkbox Field",
		props: {
			label: "",
			checked: false,
		},
	},
};

export default supportedFields;
