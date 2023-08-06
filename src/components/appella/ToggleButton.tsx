import { Dispatch, SetStateAction, useState } from "react";

export function ToggleButton({
	name,
	options,
	value: [value, setValue],
}: {
	name?: string;
	options: string[];
	value: [string, Dispatch<SetStateAction<string>>] | [string];
}) {
	const optionsIndex = options.indexOf(value);
	return (
		<>
			{name ? <p>{name}</p> : null}
			<div className="bg-appella-secondary-200 rounded-xl p-2 w-full mb-2">
				<div className="relative grid grid-rows-1">
					<div
						className="absolute bg-appella-primary-400 rounded-lg p-2 w-full transition-transform origin-top"
						style={{
							height: `${100 / options.length}%`,
							transform: `translateY(${
								100 * Math.max(optionsIndex, 0)
							}%) scaleY(${optionsIndex < 0 ? 0 : 1})`,
							gridTemplateRows: `repeat(${options.length}, minmax(0, 1fr))`,
						}}
					/>

					{options.map((option) => (
						<span
							className={`w-full p-2 text-center z-10 block select-none ${
								value === option ? "font-semibold text-white" : "text-gray-300"
							}`}
							key={option}
						>
							{option}
						</span>
					))}
				</div>
			</div>
		</>
	);
}
