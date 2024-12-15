import React from "react";

export type ElementsTypes = "TextField" | "NumberField" | "PasswordField";

export interface FormElementPayload {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  type?: string;
  [key: string]: string | boolean | string[] | undefined;
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
      label:label,
      ...payload,
    };
  }
}

export type FormElements = {
  [formElementId: string]: FormElement;
};
