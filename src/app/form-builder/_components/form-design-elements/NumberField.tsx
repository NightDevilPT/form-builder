import React from "react";
import { FormElement } from "../types";

const NumberField = ({ formElement }: { formElement: FormElement }) => {
	const { placeholder, label } = formElement.payload;
	return (
		<div className="w-full h-auto grid grid-cols-1 gap-2">
			<div className="w-full h-auto p-0 text-sm px-1">{label}</div>
			<div className="w-full h-auto px-3 py-1 rounded-md bg-default-100 text-foreground-400 text-base">
				{placeholder}
			</div>
		</div>
	);
};

export default NumberField;
