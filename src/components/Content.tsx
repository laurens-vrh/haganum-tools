import { ReactNode } from "react";

export function Content({ children }: { children: ReactNode }) {
	return <main className="p-2">{children}</main>;
}
