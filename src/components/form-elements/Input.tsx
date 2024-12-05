export const TextField = ({ label }: { label: string }) => (
	<div style={{ marginBottom: "12px" }}>
		<label>{label}</label>
		<input type="text" placeholder={label} />
	</div>
);
