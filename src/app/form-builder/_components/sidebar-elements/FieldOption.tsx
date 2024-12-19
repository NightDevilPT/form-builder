import React from 'react';
import { COMMON_STYLES, OptionTypes } from '../types';
import { TbTrash } from 'react-icons/tb'; // Assuming you're using react-icons for the trash icon

interface FieldOptionProps extends OptionTypes {
    index: number;
	type:string;
    handleOptionsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDefaultOptionChange: (index: number) => void;
    handleOptionDelete: (index: number) => void;
}

const FieldOption: React.FC<FieldOptionProps> = React.memo(({ 
    label, 
    value, 
    defaultChecked, 
    type, 
    index, 
    handleOptionsChange, 
    handleDefaultOptionChange, 
    handleOptionDelete 
}) => {
    const handleCheckboxChange = () => handleDefaultOptionChange(index);
    const handleDeleteClick = () => handleOptionDelete(index);

    return (
        <div className="w-full h-auto border-1 space-y-2 p-2 pt-0 rounded border-divider">
            <div className="w-full h-auto">
                <label className="text-xs">Label</label>
                <input
                    type="text"
                    name={`label-${index}`}
                    className={COMMON_STYLES.input}
                    value={label}
                    onChange={handleOptionsChange}
                />
            </div>
            <div className="w-full h-auto">
                <label className="text-xs">Value</label>
                <input
                    type="text"
                    name={`value-${index}`}
                    className={COMMON_STYLES.input}
                    value={value}
                    onChange={handleOptionsChange}
                />
            </div>
            <div className="grid grid-cols-[_1fr,50px]">
                <div className="w-full h-auto flex justify-start items-center gap-2">
                    <input
                        type={type === "CheckboxField" ? "checkbox" : "radio"}
                        name={type === "CheckboxField" ? `defaultChecked-${index}` : `defaultChecked`}
                        className="w-auto"
                        checked={defaultChecked || false}
                        onChange={handleCheckboxChange}
                    />
                    <label className="text-xs flex-1">Mark as select</label>
                </div>
                <button
                    className="w-full h-auto py-1 bg-red-500 rounded-md flex justify-center items-center"
                    onClick={handleDeleteClick}
                >
                    <TbTrash className="text-base text-white" />
                </button>
            </div>
        </div>
    );
});

export default FieldOption;