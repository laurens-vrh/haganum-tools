import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
	return (
		<div className="grid place-items-center h-full">
			<div>
				<p className="text-2xl mb-4">Deze pagina bestaat niet.</p>
				<Link
					className="text-xl border border-white rounded-lg p-2 block w-40 text-center mx-auto"
					href="/"
				>
					Home
				</Link>
			</div>
		</div>
	);
}
