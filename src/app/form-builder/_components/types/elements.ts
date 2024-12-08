// elements.ts

import { FormElement, FormElements } from ".";
import { MdTextFields } from "react-icons/md";

export const FormElementTypes: FormElements = {
  TextField: new FormElement("TextField", MdTextFields, "Text Field"),
  NumberField: new FormElement("NumberField", MdTextFields, "Number Field"),
};
