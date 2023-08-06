import { Word } from "../../types";

export function WordBox({ word }: { word: Word }) {
	return (
		<div className="p-2 bg-gradient-secondary-background border border-custompurple rounded-lg">
			<span className="font-semibold">{word.word}</span>
			{word.note ? <span className="ml-2 italic">{word.note}</span> : null}

			<div className="">
				<span className="text-[#aaaaaa]">{word.translations.join("; ")}</span>
			</div>
		</div>
	);
}
