"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import * as importedBooks from "@/../public/data/woordjes/books.json";
import { Book, Word } from "@/types";
import { Columns } from "@/components/Columns";
import { WordBox } from "@/components/woordjes/WordBox";
const books: Book[] = importedBooks["default" as any] as any;

// export const metadata: Metadata = {
// 	title: "Woordjes | Haganum Tools",
// 	description:
// 		"Hier vind je de precieze vertaling van alle woordjes uit je leerboeken, en hoef je niet te hannesen met woordenlijsten of Google Translate."
// };

const booksById = {} as { [id: string]: Book };
books.forEach(async (book) => {
	booksById[book.id] = {
		...book,
		list: (await import(`@/../public/data/woordjes/lists/${book.id}.json`))
			.default,
	};
});

const replaceChars = {
	ē: "e",
	"(": "",
	")": "",
	ü: "u",
	ö: "o",
	ä: "a",
	ï: "i",
};

export default function Page() {
	const [selectedBook, setSelectedBook] = useLocalStorage("hw_book", "0");
	const [directions, setDirections] = useLocalStorage(
		"hw_directions",
		{} as {
			[book: string]: string;
		}
	);

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([] as Word[]);

	useEffect(() => {
		const term = searchTerm.toLowerCase();
		if (term === "") return setSearchResults([]);

		const list = booksById[selectedBook].list || [];

		setSearchResults(
			term === "*"
				? list
				: list.filter((w) => {
						var searchValue = w.word;
						if ((directions[selectedBook] || "0") === "0") searchValue = w.word;
						else if (directions[selectedBook] === "1")
							searchValue = w.translations.join("");

						Object.entries(replaceChars).forEach(
							([key, value]) =>
								(searchValue = searchValue.replaceAll(key, value))
						);

						return searchValue.toLowerCase().includes(term);
				  })
		);
	}, [searchTerm, directions, selectedBook]);

	return (
		<div className="md:h-[90vh] bg-inherit grid grid-cols-1 | md:grid-cols-[min-content_1fr] gap-4">
			<div className="relative p-4 bg-gradient-primary-background border-custompurple border rounded-xl | md:min-w-[min(400px,40vw)]">
				<h2 className="text-xl">Woordjes</h2>
				<p className="mt-2">
					Hier vind je de precieze vertaling van alle woordjes uit je
					leerboeken, en hoef je niet te hannesen met woordenlijsten of Google
					Translate.
				</p>

				<Columns>
					<select
						className="mt-2 w-full p-2 bg-transparent bg-gradient-primary-background  border border-custompurple rounded-lg"
						name="book-select"
						value={selectedBook}
						onChange={(e) => {
							setSelectedBook(e.currentTarget.value);
						}}
					>
						{typeof window === "undefined" ? (
							<option value="0" key="..." className="text-black">
								...
							</option>
						) : (
							books.map(({ name, id }) => (
								<option value={id} key={id} className="text-black">
									{name}
								</option>
							))
						)}
					</select>
					<select
						className="mt-2 w-full p-2 bg-transparent bg-gradient-primary-background border border-custompurple rounded-lg"
						name="direction-select"
						value={directions[selectedBook] || "0"}
						onChange={(e) => {
							setDirections({
								...directions,
								[selectedBook]: e.currentTarget.value,
							});
						}}
						onClick={(e) => {
							e.preventDefault();
							e.currentTarget.value = (
								1 - parseInt(e.currentTarget.value)
							).toString();
							setDirections({
								...directions,
								[selectedBook]: e.currentTarget.value,
							});
						}}
					>
						{typeof window === "undefined" ? (
							<option value="0" key="..." className="text-black">
								...
							</option>
						) : (
							booksById[selectedBook]?.directions.map((direction, i) => (
								<option value={i} key={i} className="text-black">
									{direction}
								</option>
							))
						)}
					</select>
				</Columns>
				<input
					className="mt-2 w-full p-2 bg-transparent bg-gradient-primary-background border border-custompurple rounded-lg"
					type="text"
					placeholder="zoeken..."
					autoComplete="off"
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
				/>
			</div>

			<div className="h-full overflow-auto">
				<div className="relative p-4 bg-gradient-primary-background border-custompurple border rounded-xl grid grid-cols-2 auto-rows-min gap-2 | lg:grid-cols-3">
					{searchResults.map((word) => (
						<WordBox word={word} />
					))}
				</div>
			</div>
		</div>
	);
}
