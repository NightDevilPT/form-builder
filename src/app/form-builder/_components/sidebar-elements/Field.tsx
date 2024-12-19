import React from "react";
import { COMMON_STYLES, FieldProps } from "../types";

export const Field: React.FC<FieldProps> = ({
	label,
	name,
	value,
	onChange,
	disabled = false,
	helpText = [],
}) => (
	<div className={COMMON_STYLES.container}>
		<label className={COMMON_STYLES.label}>{label}</label>
		<input
			type="text"
			name={name}
			className={`${COMMON_STYLES.input} ${
				disabled ? "text-foreground-400" : ""
			}`}
			value={value}
			onChange={onChange}
			disabled={disabled}
		/>
		{helpText.length > 0 && (
			<div className={COMMON_STYLES.helpText}>
				{helpText.map((text, index) => (
					<span key={index}>- {text}</span>
				))}
			</div>
		)}
	</div>
);
