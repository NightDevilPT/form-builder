import React from "react";
import { useFormElements } from "../design-context";
import { IoClose } from "react-icons/io5";
import { getFieldType } from "../types/elements";
import { ElementsTypes, OptionTypes } from "../types";
import { LuPlus } from "react-icons/lu";
import { TbTrash } from "react-icons/tb";
import { Field } from "./Field";
import FieldOption from "./FieldOption";

interface FormElementPropertiesProps {
	id: string;
}

const FormElementProperties: React.FC<FormElementPropertiesProps> = ({
	id,
}) => {
	const { formElements, updateFormElementPayload, setSelectedElement } =
		useFormElements();
	const { label, placeholder, required, type, name, options } =
		formElements[id]?.payload;

	const commonLabelStyle = "w-full h-auto text-foreground text-sm";
	const commonInputStyle =
		"w-full rounded text-xs px-3 py-1 outline-none border-none bg-foreground-100";

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked, name } = event.target;
		const newValue = name === "required" ? checked : value;
		updateFormElementPayload(id, { [name]: newValue });
	};

	const addNewOptions = () => {
		// Determine the next index based on current options length
		const nextIndex = options?.length || 0;

		// Create a new option
		const newOption: OptionTypes = {
			label: `Option ${nextIndex + 1}`,
			value: `option_${nextIndex + 1}`,
			key: crypto.randomUUID(),
		};

		// Update form element payload
		updateFormElementPayload(id, {
			options: [...(options || []), newOption],
		});
	};

	const handleOptionDelete = (index: number) => {
		// Filter out the option at the specified index
		const updatedOptions = options?.filter((_, i) => i !== index) || [];
		updateFormElementPayload(id, { options: updatedOptions });
	};

	const handleOptionsChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target;
		const [key, indexString] = name.split("-");
		const index = parseInt(indexString, 10);

		if (!isNaN(index) && (key === "label" || key === "value")) {
			const updatedOptions = [...(options || [])];
			updatedOptions[index] = {
				...updatedOptions[index],
				[key]: value,
			};
			updateFormElementPayload(id, { options: updatedOptions });
		}
	};

	const handleDefaultOptionChange = (index: number) => {
		const updatedOptions = [...(options || [])];

		if (type === "RadioField") {
			// Reset all options if RadioField is selected
			updatedOptions.forEach((option) => (option.defaultChecked = false));
		}

		// Toggle the selected option
		updatedOptions[index].defaultChecked =
			!updatedOptions[index].defaultChecked;

		updateFormElementPayload(id, { options: updatedOptions });
	};

	return (
		<div className="w-full h-auto grid grid-cols-1 gap-5">
			<div className="w-full h-auto grid grid-cols-[1fr,40px] border-b-1 border-divider pb-3">
				<h2 className="text-base text-foreground">Property</h2>
				<button
					className="w-full h-full text-foreground-500 hover:bg-foreground-500/30 hover:text-foreground transition-all duration-300 rounded-md flex justify-center items-center cursor-pointer"
					onClick={() => setSelectedElement(null)}
				>
					<IoClose className="w-4 h-4" />
				</button>
			</div>

			<div className="w-full h-auto grid grid-cols-1 gap-3 ">
				{/* --------[ LABEL ]------- */}
				<Field
					label="Label"
					name="label"
					value={label}
					onChange={handleInputChange}
					helpText={[
						"The label of the field",
						"It will be displayed above the field",
					]}
				/>

				{/* --------[ NAME ]------- */}
				<Field
					label="Name"
					name="name"
					value={name}
					onChange={handleInputChange}
					helpText={[
						"The name of the field",
						"It will be a name of that input",
					]}
				/>

				{/* --------[ INPUT TYPE ]------- */}
				<Field
					label="Input type"
					name="type"
					value={getFieldType(type as ElementsTypes)}
					onChange={handleInputChange}
					helpText={[
						"The type of the field",
						"It will be a type of input",
					]}
					disabled
				/>

				{/* --------[ PLACEHOLDER ]------- */}
				{type !== "CheckboxField" && type !== "RadioField" && (
					<Field
						label="Placeholder"
						name="placeholder"
						value={placeholder || ""}
						onChange={handleInputChange}
						helpText={[
							"The placeholder of the field",
							"It will be displayed as a placeholder in the field",
						]}
						disabled
					/>
				)}

				{/* --------[ PASSWORD ]------- */}
				{type === "PasswordField" && (
					<Field
						label="Password Pattern"
						name="pattern"
						value={formElements[id].payload?.pattern as string}
						onChange={handleInputChange}
						helpText={[
							"The Pattern of the Password",
							"It will be displayed as a Pattern to show Password",
						]}
					/>
				)}

				{(type === "CheckboxField" || type === "RadioField") && (
					<div className="w-full h-auto space-y-1 border-1 border-divider rounded-md">
						<label className={`${commonLabelStyle} px-2`}>
							Options
						</label>
						<div className="w-full h-auto p-2 space-y-2 rounded">
							{options?.map(
								(option: OptionTypes, index: number) => (
									<FieldOption
										key={option.key} 
										label={option.label}
										value={option.value}
										defaultChecked={option.defaultChecked}
										type={type}
										index={index}
										handleOptionsChange={
											handleOptionsChange
										}
										handleDefaultOptionChange={
											handleDefaultOptionChange
										}
										handleOptionDelete={handleOptionDelete}
									/>
								)
							)}
							<button
								className="mt-2 w-full h-auto py-1 bg-foreground-500 rounded-md flex justify-center items-center gap-2 text-background text-sm hover:bg-foreground-900 transition-all duration-300"
								onClick={addNewOptions}
							>
								<LuPlus className="w-4 h-4" />
								<span>Add Options</span>
							</button>
						</div>
					</div>
				)}

				{/* --------[ REQUIRED ]------- */}
				<div className="w-full h-auto grid grid-cols-[1fr,80px] gap-1 border-1 border-divider p-2 rounded-md">
					<div className="grid grid-cols-1 gap-0">
						<label className={commonLabelStyle}>Required</label>
						<label className="text-xs text-foreground-500">
							- Marks the field as required
						</label>
					</div>
					<div className="w-full h-full flex justify-end items-center">
						<input
							id="required"
							name="required"
							type="checkbox"
							className="hidden"
							checked={required}
							onChange={handleInputChange}
						/>
						<label
							htmlFor="required"
							className={`w-12 h-6 border-2 rounded-full relative cursor-pointer p-1 ${
								required
									? "bg-primary-500 border-primary-500"
									: "bg-foreground-200 border-foreground-200"
							}`}
						>
							<span
								className={`absolute top-0 ${
									required ? "left-1/2" : "left-0"
								} w-6 h-full bg-background dark:bg-foreground-800 rounded-full transition-all duration-200 shadow-md`}
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormElementProperties;
