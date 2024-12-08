"use client";

import React, { useState } from "react";
import { DragableOverlayButton } from "../sidebar-elements";
import { Active, DragOverlay, useDndMonitor, DragEndEvent } from "@dnd-kit/core";
import { FormElementTypes } from "../types/elements";
import { useFormElements } from "../design-context";

const DragOverlayWrapper = () => {
  const { addFormElement } = useFormElements();
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
          addFormElement(type);
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

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
