import Link from "next/link";

const links = [
	{
		path: "/",
		name: "Woordjes",
	},
	{
		path: "/appella",
		name: "Appella AI",
	},
	{
		path: "/nuntia",
		name: "Nuntia",
	},
];

export function NavBar({ active }: { active?: string }) {
	return (
		<>
			<nav className="w-full bg-zinc-900 shadow text-white">
				<div className="mx-auto p-4 flex flex-wrap justify-between items-center | lg:max-w-7xl">
					<Link href="/">
						<h1 className="w-max mr-4 text-3xl font-bold">Haganum Tools</h1>
					</Link>
					<ul className="w-fit flex gap-8">
						{links.map(({ path, name }) => (
							<li key={path}>
								<Link
									className={`${
										active === path ? "underline" : ""
									} hover:underline focus:underline`}
									href={path}
								>
									{name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</>
	);
}
