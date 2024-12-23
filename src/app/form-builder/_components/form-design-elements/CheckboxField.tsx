import React from "react";
import { FormElement, OptionTypes } from "../types";
import {
	MdOutlineCheckBox,
	MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

const CheckboxField = ({ formElement }: { formElement: FormElement }) => {
	const { required, label, options } = formElement.payload;
	return (
		<div className="w-full h-auto grid grid-cols-1 gap-2">
			<div className="w-full h-auto p-0 text-sm px-1 space-x-1">
				<label>{label}</label>
				{required && <span className=" text-red-500">*</span>}
			</div>
			<div className="w-full h-auto flex justify-start gap-2 items-start flex-wrap">
				{options &&
					options.map((items: OptionTypes) => (
						<div
							className="w-auto h-auto px-2 gap-2 py-1 rounded border-1 border-divider flex justify-center items-center"
							key={items.label}
						>
							{items.defaultChecked ? (
								<MdOutlineCheckBox className="w-4 h-4" />
							) : (
								<MdOutlineCheckBoxOutlineBlank className="w-4 h-4" />
							)}
							<span className="text-sm">{items.label}</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default CheckboxField;
