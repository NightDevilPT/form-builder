// types/index.d.ts

export type ElementsTypes = "TextField" | "PasswordField";
export type IconTypes = "TextField" | "PasswordField";

export interface FormElementPayload {
	name: string;
	required: boolean;
	placeholder: string;
	extraAttributes: Record<string, any>;
}

export type FormElement = {
	id: string;
	type: ElementsTypes;
	sidebarElement: {
		icon: IconTypes;
		label: string;
	};
};

export interface FormElementInstance {
	[formElementId: string]: FormElementPayload;
}

export type FormElements = {
	[formElementId: string]: FormElement;
};
