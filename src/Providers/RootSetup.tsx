import React from "react";
import { NextUiSetup } from "./NextUiSetup";

export function RootProvider({ children }: { children: React.ReactNode }) {
	return (
		<React.Fragment>
			<NextUiSetup>{children}</NextUiSetup>
		</React.Fragment>
	);
}
