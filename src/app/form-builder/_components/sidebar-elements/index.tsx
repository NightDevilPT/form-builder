import { FormElement } from "@/app/form-builder/_components/types";
import { FormElementTypes } from "@/app/form-builder/_components/types/elements";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

const SideBarButtons = () => {
	return (
		<div className="w-full h-auto grid grid-cols-2 gap-3 px-3">
			{Object.keys(FormElementTypes).map((items: string) => (
				<DragableButton
					formElement={FormElementTypes[items]}
					key={FormElementTypes[items].id}
				/>
			))}
		</div>
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
			className={`w-full h-auto p-3 rounded-md border-divider border-1 place-items-center grid grid-cols-1 ${
				dragable.isDragging && "ring-2 ring-primary"
			}`}
			{...dragable.listeners}
			{...dragable.attributes}
		>
			<Icon className="w-7 h-7 text-white" />
			<span className="text-xs text-white">{label}</span>
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
			className={`w-full h-auto p-3 rounded-md border-divider border-1 bg-slate-950 place-items-center grid grid-cols-1`}
		>
			<Icon className="w-7 h-7 text-white" />
			<span className="text-sm text-white">{label}</span>
		</button>
	);
};
