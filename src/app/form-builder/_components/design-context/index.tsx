import React, { createContext, useState, ReactNode, useContext } from "react";
import { ElementsTypes, FormElement, FormElements } from "../types";
import { FormElementTypes } from "../types/elements";

interface FormElementsContextType {
	formElements: FormElements;
	order: string[];
	addFormElement: (type: keyof FormElements) => void;
	updateFormElementPayload: (
		id: string,
		updatedPayload: Partial<FormElement["payload"]>
	) => void;
	removeFormElement: (id: string) => void;
	updateOrder: (newOrder: string[]) => void; // New function to update the order
}

const FormElementsContext = createContext<FormElementsContextType | undefined>(
	undefined
);

interface FormElementsProviderProps {
	children: ReactNode;
}

export const FormElementsProvider: React.FC<FormElementsProviderProps> = ({
	children,
}) => {
	const [formElements, setFormElements] = useState<FormElements>({});
	const [order, setOrder] = useState<string[]>([]);

	const addFormElement = (type: keyof FormElements):string  => {
		const element = new FormElement(
			type as ElementsTypes,
			FormElementTypes[type].sidebarElement.icon,
			FormElementTypes[type].sidebarElement.label
		);
		setFormElements((prev) => ({ ...prev, [element.id]: element }));
		return element.id;
	};

	const updateFormElementPayload = (
		id: string,
		updatedPayload: Partial<FormElement["payload"]>
	) => {
		setFormElements((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				payload: { ...prev[id].payload, ...updatedPayload },
			},
		}));
	};

	const removeFormElement = (id: string) => {
		setFormElements((prev) => {
			const newElements = { ...prev };
			delete newElements[id];
			return newElements;
		});
		setOrder((prevOrder) =>
			prevOrder.filter((elementId) => elementId !== id)
		);
	};

	// Update order function
	const updateOrder = (newOrder: string[]) => {
		setOrder(newOrder);
	};

	return (
		<FormElementsContext.Provider
			value={{
				formElements,
				order,
				addFormElement,
				updateFormElementPayload,
				removeFormElement,
				updateOrder,
			}}
		>
			{children}
		</FormElementsContext.Provider>
	);
};

export const useFormElements = (): FormElementsContextType => {
	const context = useContext(FormElementsContext);
	if (!context) {
		throw new Error(
			"useFormElements must be used within a FormElementsProvider"
		);
	}
	return context;
};