// elements.ts

import { FormElement, FormElements } from ".";
import { MdTextFields } from "react-icons/md";
import { TbNumber123 } from "react-icons/tb";
import { TbPasswordUser } from "react-icons/tb";

export const FormElementTypes: FormElements = {
  TextField: new FormElement("TextField", MdTextFields, "Text Field"),
  NumberField: new FormElement("NumberField", TbNumber123, "Number Field"),
  PasswordField: new FormElement("PasswordField", TbPasswordUser, "Password Field"),
};

// export const 