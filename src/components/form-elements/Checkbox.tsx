export const Checkbox = ({ label }: { label: string }) => (
	<div style={{ marginBottom: "12px" }}>
		<label>
			<input type="checkbox" /> {label}
		</label>
	</div>
);
