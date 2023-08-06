import { Dispatch, SetStateAction, useState } from "react";

export function ToggleButton({
	name,
	options,
	value: [value, setValue],
	direction = "vertical",
}: {
	name?: string;
	options: string[];
	value: [string, Dispatch<SetStateAction<string>>] | [string];
	direction?: "horizontal" | "vertical";
}) {
	const optionsIndex = options.indexOf(value);
	return (
		<>
			{name ? <p>{name}</p> : null}
			<div className="bg-appella-secondary-200 rounded-xl p-2 w-full mb-2">
				<div
					className={`relative grid grid-${
						direction === "horizontal" ? "rows" : "cols"
					}-1`}
					style={{
						[` gridTemplate${
							direction === "horizontal" ? "Columns" : "Rows"
						}`]: `repeat(${options.length}, minmax(0, 1fr))`,
					}}
				>
					<div
						className={`absolute bg-appella-primary-400 rounded-lg p-2 ${
							direction === "horizontal" ? "h" : "w"
						}-full motion-safe:transition-all origin-${
							direction === "horizontal" ? "left" : "top"
						}`}
						style={{
							[direction === "horizontal" ? "width" : "height"]: `${
								100 / options.length
							}%`,
							transform: `translate${direction === "horizontal" ? "X" : "Y"}(${
								100 * Math.max(optionsIndex, 0)
							}%) scale${direction === "horizontal" ? "X" : "Y"}(${
								optionsIndex < 0 ? 0 : 1
							})`,
						}}
					/>

					{options.map((option) => (
						<span
							className={`${
								direction === "horizontal" ? "h" : "w"
							}-full p-2 text-center z-10 block select-none ${
								value === option ? "text-white" : "text-gray-300"
							} transition-all`}
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
