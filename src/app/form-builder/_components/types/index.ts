import React from "react";

export type ElementsTypes =
	| "TextField"
	| "NumberField"
	| "PasswordField"
	| "CheckboxField"
	| "RadioField"
	| "SelectField";

export interface OptionTypes {
	label: string;
	value: string;
	key: string;
	defaultChecked?: boolean;
}

export interface FormElementPayload {
	label: string;
	name: string;
	required?: boolean;
	placeholder?: string;
	options?: OptionTypes[];
	type?: string;
	pattern?: string;
	isMulti?: boolean;
	[key: string]: string | boolean | string[] | OptionTypes[] | undefined;
}

export class FormElement {
	id: string;
	type: ElementsTypes;
	sidebarElement: {
		icon: React.ElementType;
		label: string;
	};
	payload: FormElementPayload;

	constructor(
		type: ElementsTypes,
		icon: React.ElementType,
		label: string,
		payload: Partial<FormElementPayload> = {}
	) {
		this.id = `${crypto.randomUUID()}`;
		this.type = type;
		this.sidebarElement = { icon, label };
		this.payload = {
			name: label.toLowerCase().replace(/\s+/g, "-"),
			required: false,
			placeholder: `Enter ${label.toLowerCase()}...`,
			type,
			label: label,
			options: payload.options ?? [
				{
					label: "Option 1",
					value: "option1",
					key: crypto.randomUUID(),
				},
			],
			pattern: "*",
			...payload,
		};
	}
}

export type FormElements = {
	[formElementId: string]: FormElement;
};

export const COMMON_STYLES = {
	label: "w-full h-auto text-foreground text-sm",
	input: "w-full rounded text-xs px-3 py-1 outline-none border-none bg-foreground-100",
	container:
		"w-full h-auto space-y-1 border-1 border-divider px-2 pb-2 rounded-md",
	helpText: "w-full h-auto grid grid-cols-1 text-xs text-foreground-500",
};

export interface FieldProps {
	label: string;
	name: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	helpText?: string[];
}
