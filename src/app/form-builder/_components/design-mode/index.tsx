import React from "react";
import { useDroppable } from "@dnd-kit/core";
import SideBarButtons from "../sidebar-elements";
import { useFormElements } from "../design-context";
import RootFormDesignElement from "../form-design-elements/RootFormDesignElement";
import DragOverlayWrapper from "../drag-overlay/DragOverlay";

const DesignMode = () => {
	const { formElements, order, setSelectedElement } = useFormElements();
	const dropArea = useDroppable({
		id: "designer-drop-area",
		data: { isDesignerDropArea: true },
	});

	return (
		<div className="w-full h-full grid grid-cols-[1fr,350px] graph-content bg-background">
			<div className="w-full h-full p-5 overflow-auto flex justify-center items-start">
				<div
					ref={dropArea.setNodeRef}
					className={`w-4/5 h-auto min-h-full p-5 rounded-md bg-background space-y-3 ${
						dropArea.isOver
							? "ring-2 ring-foreground-400"
							: "ring-2 ring-foreground-200"
					}`}
					onClick={() => setSelectedElement(null)}
				>
					{/* Display message when the order is empty and the drop area is not hovered */}
					{order.length === 0 && !dropArea.isOver && (
						<span className="text-foreground w-full h-full flex justify-center items-center">
							Drop the element
						</span>
					)}

					{/* Show a visual indication when the drop area is hovered, and there are items */}
					{dropArea.isOver && order.length === 0 && (
						<div className="w-full p-1">
							<div className="w-full h-16 rounded-md bg-divider"></div>
						</div>
					)}

					{order.map((key) => (
						<RootFormDesignElement
							key={key}
							type={formElements[key].type}
							id={formElements[key].id}
						/>
					))}
				</div>
			</div>
			<div className="w-full h-full overflow-y-auto py-4 bg-background">
				<SideBarButtons />
			</div>
			<DragOverlayWrapper />
		</div>
	);
};

export default DesignMode;
