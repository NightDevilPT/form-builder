import React from "react";

export type ElementsTypes =
	| "TextField"
	| "NumberField"
	| "PasswordField"
	| "CheckboxField"
	| "RadioField";

export interface OptionTypes {
	label: string;
	value: string;
	key:string;
	defaultChecked?:boolean;
}

export interface FormElementPayload {
	label: string;
	name: string;
	required?: boolean;
	placeholder?: string;
	options?: OptionTypes[];
	type?: string;
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
			options:payload.options ?? [
				{ label: "Option 1", value: "option1",key:crypto.randomUUID() },
			],
			...payload,
		};
	}
}

export type FormElements = {
	[formElementId: string]: FormElement;
};
