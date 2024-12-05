// pages/index.tsx
"use client";
import { useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { Item, DraggedElement } from "@/types";
import DraggableItem from "@/components/DragableComponents";
import DroppableArea from "@/components/DropableComponents";
import SortableItem from "@/components/SortableItem";
import { ItemComponent } from "@/components/form-elements";

const items: Item[] = [
	{ id: uuidv4(), type: "TextField", content: "Text Field" },
	{ id: uuidv4(), type: "Checkbox", content: "Checkbox" },
	{ id: uuidv4(), type: "Select", content: "Select Box" },
];

export default function FormBuilder() {
	const [droppedItems, setDroppedItems] = useState<DraggedElement[]>([]);
	const [draggingItem, setDraggingItem] = useState<string | number | null>(
		null
	); // Updated state type

	// Handle drag start to set the item currently being dragged
	const handleDragStart = (event: DragStartEvent) => {
		setDraggingItem(event.active.id);
	};

	// Handle drag end (drop or reorder) logic
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setDraggingItem(null);

		if (!over || active.id === over.id) {
			return;
		}

		if (over) {
			const activeIndex = droppedItems.findIndex(
				(item) => item.id === active.id
			);
			const overIndex = droppedItems.findIndex(
				(item) => item.id === over.id
			);

			if (activeIndex !== -1 && overIndex !== -1) {
				setDroppedItems((prev) =>
					arrayMove(prev, activeIndex, overIndex)
				);
			}
		}

		if (!droppedItems.some((item) => item.id === active.id)) {
			const draggedItem = items.find((item) => item.id === active.id);
			if (draggedItem) {
				setDroppedItems((prev) => [
					...prev,
					{
						id: uuidv4(),
						type: draggedItem.type,
						content: draggedItem.content,
					},
				]);
			}
		}
	};

	// Handle form submission
	const handleSubmit = () => {
		console.log("Form submitted with the following items:");
		console.log(droppedItems); // Print all dropped items
	};

	return (
		<div className="w-full h-full">
			<h1>Drag-and-Drop Form Builder</h1>
			<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
				<div className="w-full h-full grid grid-cols-[_1fr,250px]">
					<div className="w-full h-full">
						<SortableContext
							items={droppedItems.map((item) => item.id)}
						>
							<DroppableArea id="drop-area content">
								{droppedItems.map((item) => (
									<SortableItem
										key={item.id}
										id={item.id}
										type={item.type}
										content={item.content}
									>
										<ItemComponent
											type={item.type}
											content={item.content}
										/>
									</SortableItem>
								))}
							</DroppableArea>
						</SortableContext>
					</div>
					<div className="w-full h-full flex justify-start items-start flex-col gap-3 items-stretch">
						{items.map((item) => (
							<DraggableItem
								key={item.id}
								id={item.id}
								type={item.type}
								content={item.content}
							/>
						))}
					</div>
				</div>
			</DndContext>

			<div style={{ marginTop: "20px" }}>
				<button
					onClick={handleSubmit}
					style={{ padding: "10px 20px", fontSize: "16px" }}
				>
					Submit
				</button>
			</div>
		</div>
	);
}
