// elements.ts

import { FormElement, FormElements } from ".";
import { MdTextFields } from "react-icons/md";
import { TbNumber123 } from "react-icons/tb";
import { TbPasswordUser } from "react-icons/tb";

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
};

export const getFieldType = (
	field: string
): "text" | "number" | "password" | undefined => {
	switch (field) {
		case FormElementTypes.TextField.type:
			return "text";
		case FormElementTypes.NumberField.type:
			return "number";
		case FormElementTypes.PasswordField.type:
			return "password";
		default:
			return undefined; // Handle unknown fields
	}
};
