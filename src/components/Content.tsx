import { ReactNode } from "react";

export function Content({ children }: { children: ReactNode }) {
	return (
		<main className="min-h-full | md:min-h-0 md:h-[92.5%] p-2">{children}</main>
	);
}
