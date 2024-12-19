// elements.ts

import { FormElement, FormElements } from ".";
import { MdOutlineRadioButtonChecked, MdTextFields } from "react-icons/md";
import { TbNumber123 } from "react-icons/tb";
import { TbPasswordUser } from "react-icons/tb";
import { TbCheckbox } from "react-icons/tb";
import { GoSingleSelect } from "react-icons/go";

export const FormElementTypes: FormElements = {
	TextField: new FormElement("TextField", MdTextFields, "Text Field"),
	NumberField: new FormElement("NumberField", TbNumber123, "Number Field"),
	PasswordField: new FormElement(
		"PasswordField",
		TbPasswordUser,
		"Password Field",
		{
			pattern: "*",
		}
	),
	CheckboxField: new FormElement("CheckboxField", TbCheckbox, "Check Field", {
		options: [
			{ label: "Option 1", value: "option1", key: crypto.randomUUID() },
			{ label: "Option 2", value: "option2", key: crypto.randomUUID() },
		],
	}),
	RadioField: new FormElement(
		"RadioField",
		MdOutlineRadioButtonChecked,
		"Radio Field",
		{
			options: [
				{
					label: "Option 1",
					value: "option1",
					key: crypto.randomUUID(),
				},
				{
					label: "Option 2",
					value: "option2",
					key: crypto.randomUUID(),
				},
			],
		}
	),
	SelectField: new FormElement(
		"SelectField",
		GoSingleSelect,
		"Select Field",
		{
			options: [
				{
					label: "Option 1",
					value: "option1",
					key: crypto.randomUUID(),
				},
				{
					label: "Option 2",
					value: "option2",
					key: crypto.randomUUID(),
				},
			],
		}
	),
};

export const getFieldType = (
	field: string
): "text" | "number" | "password" | "checkbox" => {
	switch (field) {
		case FormElementTypes.TextField.type:
			return "text";
		case FormElementTypes.NumberField.type:
			return "number";
		case FormElementTypes.PasswordField.type:
			return "password";
		case FormElementTypes.CheckboxField.type:
			return "checkbox";
		default:
			return 'text'; // Handle unknown fields
	}
};
