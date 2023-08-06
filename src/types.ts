// HAGANUMWOORDJES
export type Book = {
	id: string;
	name: string;
	directions: string[];
	list?: Word[];
};

export type Word = {
	id?: number;
	word: string;
	translations: string[];
	note?: string;
};
// --- HAGANUMWOORDJES

// APPELLA
export interface Verb {
	vorm: string;
	modus: "indicativus" | "imperativus" | "infinitivus" | "coniunctivus";
	tijd:
		| "praesens"
		| "imperfectum"
		| "perfectum"
		| "plusquamperfectum"
		| "futurum"
		| "futurum exactum"
		| "-";
	persoon: "1e" | "2e" | "3e" | "-";
	getal: "enkelvoud" | "meervoud" | "-";
	genus: "actief" | "passief" | "-";
	rollen: "1" | "2" | "3";
}
// --- APPELLA
