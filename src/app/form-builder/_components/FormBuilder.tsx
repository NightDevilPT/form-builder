"use client";

import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { PiSunBold, PiMoonStarsBold } from "react-icons/pi";
import { FormElementsProvider } from "./design-context";
import DesignMode from "./design-mode";
import { IoEye } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import PreviewMode from "./preview-mode";

const FormBuilder = () => {
	const [theme, setTheme] = useState<boolean>(false);
	const [preview, setPreview] = useState<"preview" | "code">("code");
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10, // 10px
		},
	});
	const sensors = useSensors(mouseSensor);
	useEffect(() => {
		document.documentElement.className = theme ? "light" : "dark";
	}, [theme]);

	return (
		<DndContext sensors={sensors}>
			<FormElementsProvider>
				<div className="w-full h-full grid grid-rows-[80px,1fr]">
					<div className="w-full flex justify-between items-center px-5 border-b border-divider">
						<h1 className="text-xl text-foreground">Project 1</h1>
						<div className="w-auto h-auto flex justify-center items-center gap-3">
							<div className="flex items-center gap-1 relative border-1 border-divider rounded-full overflow-hidden px-1">
								<button
									className={`w-1/2 h-7 p-1 z-10 flex justify-center items-center ${
										theme ? "text-white" : "text-gray-700"
									}`}
									onClick={() => {
										setTheme(true);
									}}
								>
									<PiSunBold />
								</button>
								<button
									className={`w-1/2 flex justify-center items-center h-7 p-1 z-10 ${
										theme ? "text-gray-700" : "text-white"
									}`}
									onClick={() => setTheme(false)}
								>
									<PiMoonStarsBold />
								</button>
								<div
									className={`w-1/2 h-full rounded-sm bg-primary absolute top-0 transition-all duration-300 ${
										theme ? "left-0" : "left-1/2"
									}`}
								></div>
							</div>

							<button
								className="px-3 py-1 rounded-md bg-primary hover:bg-primary-500 transition-all duration-300 text-white flex justify-center items-center gap-2 text-sm"
								onClick={() =>
									setPreview(
										preview === "code" ? "preview" : "code"
									)
								}
							>
								<span>
									{preview === "preview" ? "Code" : "Preview"}
								</span>
								{preview === "preview" ? <FaCode /> : <IoEye />}
							</button>
						</div>
					</div>
					<div className="w-full h-full overflow-hidden">
						{preview === "code" ? (
							<DesignMode />
						) : (
							<PreviewMode />
						)}
					</div>
				</div>
			</FormElementsProvider>
		</DndContext>
	);
};

export default FormBuilder;
