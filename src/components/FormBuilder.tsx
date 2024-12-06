// pages/index.tsx
"use client";

import { FormElement, FormElements, FormElementPayload } from "@/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { PiSunBold } from "react-icons/pi";
import { PiMoonStarsBold } from "react-icons/pi";

export default function FormBuilder() {
	const [theme, setTheme] = useState<boolean>(false);
	const [droppedItems, setDroppedItems] = useState<FormElement[]>([]);


	return (
		<DndContext>
			<div className="w-full h-full grid grid-rows-[80px,_1fr]">
				<div className="w-full h-full flex justify-between items-center px-5 border-b-1 border-b-gray-800">
					<h1 className={`text-xl text-white`}>Project 1</h1>
					<div className="w-auto h-auto flex justify-center items-center border-1 border-gray-800 rounded-md gap-1 px-1 relative">
						<button
							className={`w-7 h-7 rounded-md p-1 relative z-20 transition-all duration-300 ${
								theme ? "text-white" : "text-gray-700"
							}`}
							onClick={() => setTheme(true)}
						>
							<PiSunBold className="w-full h-full" />
						</button>
						<button
							className={`w-7 h-8 rounded-md p-1 relative z-20 transition-all duration-300 ${
								theme ? "text-gray-700" : "text-white"
							}`}
							onClick={() => setTheme(false)}
						>
							<PiMoonStarsBold className="w-full h-full" />
						</button>
						<span
							className={`w-7 h-6 rounded-md bg-primary-500 absolute transition-all duration-300 ${
								theme ? "left-1" : "left-9"
							}`}
						/>
					</div>
				</div>
				<div
					className={`w-full h-full grid grid-cols-[1fr,280px] gap-3`}
				>
					<div className="w-full h-full overflow-y-auto bg-gray-950"></div>
					<div className="w-full h-full overflow-y-auto"></div>
				</div>
			</div>
		</DndContext>
	);
}
