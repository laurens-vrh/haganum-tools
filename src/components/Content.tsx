import { ReactNode } from "react";

export function Content({ children }: { children: ReactNode }) {
	return (
		<main className="min-h-full | md:min-h-0 md:h-[90vh] p-2">{children}</main>
	);
}
