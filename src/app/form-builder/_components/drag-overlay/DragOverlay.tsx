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
import RootFormDesignElement from "../form-design-elements/RootFormDesignElement";

const DragOverlayWrapper = () => {
	const { addFormElement, setSelectedElement, order, updateOrder } =
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
			const activeData = active.data.current;
		  
			if (over?.id === "designer-drop-area") {
			  if (!activeData?.elementId) {
				const type = activeData?.type;
				if (type in FormElementTypes) {
				  const elementId:any = addFormElement(type);
				  order.push(elementId);
				  updateOrder(order);
				}
			  } else if (activeData?.elementId) {
				const activeId = activeData.elementId;
				const newOrder = order.filter(id => id !== activeId);
				newOrder.push(activeId);
				updateOrder(newOrder);
			  }
			} else if (over?.id && (active?.id as string)?.includes("design-btn-")) {
			  const [overId, position] = (over.id as string).split(":");
			  const elementIndex = order.findIndex(id => id === overId);
			  const type = activeData?.type;
		  
			  if (type in FormElementTypes) {
				const elementId:any = addFormElement(type);
				if (position === "top") {
				  order.splice(elementIndex, 0, elementId);
				} else {
				  order.splice(elementIndex + 1, 0, elementId);
				}
			  }
			} else if (over?.id && activeData?.elementId) {
			  const [overId, position] = (over.id as string).split(":");
			  const activeId = activeData.elementId;
			  const newOrder = order.filter(id => id !== activeId);
			  const elementIndex = newOrder.findIndex(id => id === overId);
		  
			  if (position === "top") {
				newOrder.splice(elementIndex, 0, activeId);
			  } else {
				newOrder.splice(elementIndex + 1, 0, activeId);
			  }
			  updateOrder(newOrder);
			}
		  
			setDragableItems(null);
			setSelectedElement(null);
			console.log("Drag End", event);
		  }
		  
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
		node = <RootFormDesignElement type={type} id={id} />;
	}

	return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
