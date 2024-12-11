import React, { useState } from "react";
import { ElementsTypes } from "../types";
import TextField from "./TextField";
import NumberField from "./NumberField";
import { FormElementTypes } from "../types/elements";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FaRegTrashAlt } from "react-icons/fa";
import PasswordField from "./PasswordField";

const RootFormDesignElement = ({
	type,
	id,
}: {
	type: ElementsTypes;
	id: string;
}) => {
	const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
	const topHalf = useDroppable({
		id: id + ":top",
		data: {
			type,
			elementId: id,
			isTopHalfDesignerElement: true,
		},
	});
	const bottomHalf = useDroppable({
		id: id + ":bottom",
		data: {
			type,
			elementId: id,
			isBottomHalfDesignerElement: true,
		},
	});

	const dragable = useDraggable({
		id: id + "-drag-handler",
		data: {
			type,
			elementId: id,
			isDesignerElement: true,
		},
	});

	return (
		<div
			className="relative w-full h-auto p-4 rounded-md border-1 border-divider overflow-hidden"
			onMouseEnter={() => setMouseIsOver(true)}
			onMouseLeave={() => setMouseIsOver(false)}
			ref={dragable.setNodeRef}
			{...dragable.listeners}
			{...dragable.attributes}
		>
			<div
				className="w-full h-1/2 rounded-full absolute top-0 left-0"
				ref={topHalf.setNodeRef}
			></div>
			{getContent(type)}
			<div
				className="w-full h-1/2 rounded-full absolute bottom-0 left-0"
				ref={bottomHalf.setNodeRef}
			></div>
			{topHalf.isOver && (
				<div className="w-full h-1 rounded-full bg-white absolute top-0 left-0"></div>
			)}
			{bottomHalf.isOver && (
				<div className="w-full h-1 rounded-full bg-white absolute bottom-0 left-0"></div>
			)}
			{mouseIsOver && (
				<div className="w-full h-full absolute left-0 top-0 bg-slate-800/20 backdrop-blur grid grid-cols-[_1fr,40px] cursor-grab">
					<span
						className={`w-full h-full flex justify-center items-center text-gray-500`}
					>
						Click or Drag and Drop to move element
					</span>
					<div className="w-full h-full bg-red-500 flex justify-center items-center cursor-pointer">
						<FaRegTrashAlt className="w-4 h-4 text-white" />
					</div>
				</div>
			)}
		</div>
	);
};

const getContent = (type: ElementsTypes) => {
	let content;
	switch (type) {
		case "TextField":
			content = <TextField formElement={FormElementTypes[type]} />;
			break;
		case "NumberField":
			content = <NumberField formElement={FormElementTypes[type]} />;
			break;
		case "PasswordField":
			content = <PasswordField formElement={FormElementTypes[type]} />;
			break;
		default:
			content = <div>Unsupported Element</div>;
	}
	return content;
};

export default RootFormDesignElement;
