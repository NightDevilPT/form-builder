import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDraggable, useDroppable } from "@dnd-kit/core";

import TextField from "./TextField";
import NumberField from "./NumberField";
import PasswordField from "./PasswordField";
import CheckboxField from "./CheckboxField";
import { useFormElements } from "../design-context";
import { ElementsTypes, FormElement } from "../types";
import RadioField from "./RadioField";
import SelectField from "./SelectField";

const RootFormDesignElement = ({
	type,
	id,
}: {
	type: ElementsTypes;
	id: string;
}) => {
	const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
	const {
		setSelectedElement,
		removeFormElement,
		selectedElementId,
		formElements,
	} = useFormElements();
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
		id: id + ":drag-handler",
		data: {
			type,
			elementId: id,
			isDesignerElement: true,
		},
	});

	return (
		<div
			className={`relative w-full h-auto p-4 rounded-md border-1 border-divider hover:border-foreground-500 ${
				selectedElementId === id && "border-foreground-500"
			}`}
			onMouseEnter={() => setMouseIsOver(true)}
			onMouseLeave={() => setMouseIsOver(false)}
			ref={dragable.setNodeRef}
			{...dragable.listeners}
			{...dragable.attributes}
			onClick={(e) => {
				e.stopPropagation();
				setSelectedElement(id);
			}}
		>
			<div
				className="w-full h-1/2 rounded-full absolute top-0 left-0"
				ref={topHalf.setNodeRef}
			></div>
			<GetContext type={type} formElement={formElements[id]} />
			<div
				className="w-full h-1/2 rounded-full absolute bottom-0 left-0"
				ref={bottomHalf.setNodeRef}
			></div>
			{topHalf.isOver && (
				<div className="w-full h-1 rounded-full bg-foreground absolute top-0 left-0"></div>
			)}
			{bottomHalf.isOver && (
				<div className="w-full h-1 rounded-full bg-foreground absolute bottom-0 left-0"></div>
			)}
			{mouseIsOver && (
				<div className="w-full h-full absolute left-0 top-0 backdrop-blur grid grid-cols-[_1fr,40px] cursor-grab rounded-md overflow-hidden">
					<span
						className={`w-full h-full flex justify-center items-center text-foreground-500`}
					>
						Click or Drag and Drop to move element
					</span>
					<button
						className="w-full h-full bg-red-500 flex justify-center items-center cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							console.log(id, "PAYLOD");
							removeFormElement(id as string);
						}}
					>
						<FaRegTrashAlt className="w-4 h-4 text-white" />
					</button>
				</div>
			)}
		</div>
	);
};

const GetContext = ({
	formElement,
	type,
}: {
	formElement: FormElement;
	type: ElementsTypes;
}) => {
	let content;
	switch (type) {
		case "TextField":
			content = <TextField formElement={formElement} />;
			break;
		case "NumberField":
			content = <NumberField formElement={formElement} />;
			break;
		case "PasswordField":
			content = <PasswordField formElement={formElement} />;
			break;
		case "CheckboxField":
			content = <CheckboxField formElement={formElement} />;
			break;
		case "RadioField":
			content = <RadioField formElement={formElement} />;
			break;
		case "SelectField":
			content = <SelectField formElement={formElement} />;
			break;
		default:
			content = <div>Unsupported Element</div>;
	}
	return content;
};

export default RootFormDesignElement;
