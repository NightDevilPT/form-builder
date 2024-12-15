import { FormElement } from "@/app/form-builder/_components/types";
import { FormElementTypes } from "@/app/form-builder/_components/types/elements";
import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { useFormElements } from "../design-context";
import FormElementProperties from "./FormElementProperties";

const SideBarButtons = () => {
	const { selectedElementId } = useFormElements();
	return (
		<React.Fragment>
			{!selectedElementId && (
				<div className="w-full h-full grid grid-cols-2 gap-3 px-3 place-content-start place-items-start">
					{Object.keys(FormElementTypes).map((items: string) => (
						<DragableButton
							formElement={FormElementTypes[items]}
							key={FormElementTypes[items].id}
						/>
					))}
				</div>
			)}
			{selectedElementId && (
				<div className="w-full h-full px-3 grid grid-cols-1 gap-3 place-content-start place-items-start overflow-auto">
					<FormElementProperties id={selectedElementId} />
				</div>
			)}
		</React.Fragment>
	);
};

export default SideBarButtons;

const DragableButton = ({ formElement }: { formElement: FormElement }) => {
	const { icon: Icon, label } = formElement.sidebarElement;
	const dragable = useDraggable({
		id: "design-btn-" + formElement.type,
		data: {
			isDesignBtnElement: true,
			type: formElement.type,
		},
	});
	return (
		<button
			ref={dragable.setNodeRef}
			className={`w-full h-auto p-3 rounded-md border-divider bg-background border-1 place-items-center grid grid-cols-1 hover:border-foreground-500 hover:bg-foreground-100/50 transition-all duration-300 ${
				dragable.isDragging &&
				"ring-2 ring-foreground-500 bg-foreground-100/50"
			}`}
			{...dragable.listeners}
			{...dragable.attributes}
		>
			<Icon className="w-7 h-7 text-foreground" />
			<span className="text-xs text-foreground">{label}</span>
		</button>
	);
};

interface OverlayButton {
	icon: React.ElementType;
	label: string;
}

export const DragableOverlayButton = (element: OverlayButton) => {
	const { icon: Icon, label } = element;
	return (
		<button
			className={`w-full h-auto p-3 rounded-md border-1 border-foreground dark:bg-background place-items-center grid grid-cols-1`}
		>
			<Icon className="w-7 h-7 text-foreground" />
			<span className="text-xs text-foreground">{label}</span>
		</button>
	);
};
