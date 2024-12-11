"use client";

import React, { useState } from "react";
import { DragableOverlayButton } from "../sidebar-elements";
import {
	Active,
	DragOverlay,
	useDndMonitor,
	DragEndEvent,
} from "@dnd-kit/core";
import { FormElementTypes } from "../types/elements";
import { useFormElements } from "../design-context";
import { FormElement } from "../types";
import RootFormDesignElement from "../form-design-elements/RootFormDesignElement";

const DragOverlayWrapper = () => {
	const { addFormElement, formElements, order, updateOrder } =
		useFormElements();
	const [dragableItems, setDragableItems] = useState<Active | null>(null);

	// Monitor drag events
	useDndMonitor({
		onDragStart: (event) => {
			setDragableItems(event.active);
			console.log("Drag Start", event.active);
		},
		onDragCancel: () => {
			setDragableItems(null);
			console.log("Drag Canceled");
		},
		onDragEnd: (event: DragEndEvent) => {
			const { active, over } = event;

			if (
				over?.id === "designer-drop-area" &&
				active.data.current?.isDesignBtnElement
			) {
				const type = active.data.current?.type;
				if (type in FormElementTypes) {
					const elementId = addFormElement(type); // Get the element's ID
          const reorder:any = [...order,elementId]
					updateOrder(reorder);
				}
			} else if (over?.id) {
				const overData: string = over.id as string;
				const [overId, position] = overData.split(":");

				const elementIndex = order.findIndex(
					(id: string) => id === overId
				);
        console.log(active,'ACTIVEIDDD')

				if ((active?.id as string).includes("design-btn-")) {
          const type = active.data.current?.type;
          let elementId:any;
    
          if (type && type in FormElementTypes) {
            elementId = addFormElement(type); // Create new form element
          }
    
          if (elementId) {
            let updatedOrder = [...order];
            console.log(updatedOrder,'ORDER UPDATED !')
    
            if (position === "top" && elementIndex !== -1) {
              updatedOrder.splice(elementIndex, 0, elementId); // Insert before
            } else if (position === "bottom" && elementIndex !== -1) {
              updatedOrder.splice(elementIndex + 1, 0, elementId); // Insert after
            }
            console.log(updatedOrder,'ORDER UPDATED 2')
    
            updateOrder(updatedOrder); // Update the order with new element
          }
        }
			}

			setDragableItems(null);
			console.log("Drag End", event);
		},
	});

	// If there's nothing to drag, return null
	if (!dragableItems) return null;

	// Check if the current draggable is from the sidebar
	const isSidebarButtonElement =
		dragableItems.data?.current?.isDesignBtnElement;

	let node = <div>No Drag Overlay</div>;

	if (isSidebarButtonElement) {
		const type = dragableItems.data?.current?.type;

		if (type in FormElementTypes) {
			node = (
				<DragableOverlayButton
					icon={FormElementTypes[type].sidebarElement.icon}
					label={FormElementTypes[type].sidebarElement.label}
				/>
			);
		}
	}

	const isDesignerElement = dragableItems.data?.current?.isDesignerElement;
	if (isDesignerElement) {
		const id = dragableItems.data.current?.elementId;
		const type = dragableItems.data?.current?.type;
		const element = order.find(
			(formElementId: string) => formElementId === id
		);
	}

	return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
