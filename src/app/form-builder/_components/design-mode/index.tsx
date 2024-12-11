import React from "react";
import { useDroppable } from "@dnd-kit/core";
import SideBarButtons from "../sidebar-elements";
import { useFormElements } from "../design-context";
import RootFormDesignElement from "../form-design-elements/RootFormDesignElement";
import DragOverlayWrapper from "../drag-overlay/DragOverlay";

const DesignMode = () => {
	const { formElements,order } = useFormElements();
	const dropArea = useDroppable({
		id: "designer-drop-area",
		data: { isDesignerDropArea: true },
	});

	return (
		<div className="w-full h-full grid grid-cols-[1fr,350px] gap-3 bg-slate-900 graph-content">
			<div className="w-full h-full overflow-y-auto p-5 flex justify-center items-center">
				<div
					ref={dropArea.setNodeRef}
					className={`w-4/5 h-full space-y-3 p-5 rounded-md bg-slate-950 ${
						dropArea.isOver ? "ring-2 ring-primary" : ""
					}`}
				>
					{/* Display message when the order is empty and the drop area is not hovered */}
          {order.length === 0 && !dropArea.isOver && (
            <span className="text-white">Drop the element</span>
          )}

          {/* Show a visual indication when the drop area is hovered, and there are items */}
          {dropArea.isOver && order.length === 0 && (
            <div className="w-full p-1">
              <div className="w-full h-[120px] rounded-md bg-primary/10"></div>
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
			<div className="w-full h-full overflow-y-auto py-4 bg-slate-950">
				<SideBarButtons />
			</div>
			<DragOverlayWrapper />
		</div>
	);
};

export default DesignMode;
