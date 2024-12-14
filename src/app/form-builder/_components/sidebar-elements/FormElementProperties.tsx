import React from "react";
import { useFormElements } from "../design-context";
import { IoClose } from "react-icons/io5";

interface FormElementPropertiesProps {
  id: string;
}

const FormElementProperties: React.FC<FormElementPropertiesProps> = ({ id }) => {
  const { formElements, updateFormElementPayload, setSelectedElement } = useFormElements();
  const { label, placeholder, required } = formElements[id].payload;

  const commonLabelStyle = "w-full h-auto text-foreground text-sm";
  const commonInputStyle =
    "w-full rounded text-base px-3 py-1 outline-none border-none bg-foreground-100";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = event.target;
    const newValue = name === "required" ? checked : value;
    updateFormElementPayload(id, { [name]: newValue });
  };

  return (
    <div className="w-full h-auto grid grid-cols-1 gap-5">
      <div className="w-full h-auto grid grid-cols-[1fr,40px] border-b-1 border-divider pb-3">
        <h2 className="text-base text-foreground">Property</h2>
        <button
          className="w-full h-full text-red-500 hover:bg-red-500/30 hover:text-red-500 transition-all duration-300 rounded-md flex justify-center items-center cursor-pointer"
          onClick={() => setSelectedElement(null)}
        >
          <IoClose className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full h-auto grid grid-cols-1 gap-3 px-2">
        <div className="w-full h-auto space-y-1">
          <label className={commonLabelStyle}>Label</label>
          <input
            type="text"
            name="label"
            className={commonInputStyle}
            value={label}
            onChange={handleInputChange}
          />
          <div className="w-full h-auto grid grid-cols-1 text-xs text-foreground-500">
            <span>- The label of the field</span>
            <span>- It will be displayed above the field</span>
          </div>
        </div>

        <div className="w-full h-auto space-y-1">
          <label className={commonLabelStyle}>Placeholder</label>
          <input
            type="text"
            name="placeholder"
            className={commonInputStyle}
            value={placeholder}
            onChange={handleInputChange}
          />
          <div className="w-full h-auto grid grid-cols-1 text-xs text-foreground-500">
            <span>- The placeholder of the field</span>
            <span>- It will be displayed as a placeholder in the field</span>
          </div>
        </div>

        <div className="w-full h-auto grid grid-cols-[1fr,80px] gap-1">
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
              className={`w-12 h-6 border-2 rounded-full relative cursor-pointer ${
                required ? "bg-primary-500 border-primary-500" : "bg-foreground-200 border-foreground-200"
              }`}
            >
              <span
                className={`absolute top-0 ${
                  required ? "left-1/2" : "left-0"
                } w-6 h-full bg-foreground-800 rounded-full transition-all duration-200 shadow-md`}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormElementProperties;
