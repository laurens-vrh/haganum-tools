export function SelectGroup({
	children,
	margin = true,
}: {
	children: React.ReactNode;
	margin?: boolean;
}) {
	return <div className={`flex gap-4 ${margin ? "mt-4" : ""}`}>{children}</div>;
}
