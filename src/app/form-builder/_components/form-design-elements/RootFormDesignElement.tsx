import React, { useEffect, useState } from "react";
import { ElementsTypes } from "../types";
import TextField from "./TextField";
import NumberField from "./NumberField";
import { FormElementTypes } from "../types/elements";

const RootFormDesignElement = ({ type }: { type: ElementsTypes }) => {
	const [content, setContent] = useState<React.JSX.Element>();

	useEffect(() => {
    console.log(type,'TYPETYPE')
		switch (type) {
			case "TextField":
				setContent(<TextField formElement={FormElementTypes[type]} />);
			case "NumberField":
				setContent(
					<NumberField formElement={FormElementTypes[type]} />
				);
			default:
				setContent(<div>Unsupported Element</div>);
		}
	}, [type]);

	return (
		<div className="relative w-full h-auto p-4 rounded-md border-1 border-divider">
			{/* <div className="w-full h-1/2 absolute top-0 left-0 bg-red-500"></div> */}
			{content}
			{/* <div className="w-full h-1/2 absolute bottom-0 left-0 bg-green-500"></div> */}
		</div>
	);
};

export default RootFormDesignElement;
