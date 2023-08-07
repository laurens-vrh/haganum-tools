export function Footlet() {
	return (
		<footer className="text-m bottom-0 left-0 p-4 bg-zinc-900 w-full z-30 | md:rounded-tr-lg md:w-fit md:fixed md:translate-y-[4.5rem] md:hover:translate-y-0 md:transition-transform">
			<p className="md:text-sm">
				Heb je vragen of suggesties? Neem contact met me op!
			</p>
			<p className="text-xl text-center mt-2 mb-1">Laurens Verhaar</p>
			<ul className="w-fit mx-auto flex gap-8">
				<li>
					<a
						href="mailto:6081@leerling.haganum.nl"
						className="flex gap-2 items-center hover:underline focus:underline"
					>
						<img src="/img/icon-mail.svg" alt="" className="w-6" />
						E-mail
					</a>
				</li>
				<li>
					<a
						href="https://laurensverhaar.nl"
						target="_blank"
						className="flex gap-2 items-center hover:underline focus:underline"
					>
						<img src="/img/icon-language.svg" alt="" className="w-6" />
						Website
					</a>
				</li>
				<li>
					<a
						href="https://github.com/laurens-vrh"
						target="_blank"
						className="flex gap-2 items-center hover:underline focus:underline"
					>
						<img src="/img/icon-code.svg" alt="" className="w-6" />
						GitHub
					</a>
				</li>
			</ul>
		</footer>
	);
}
