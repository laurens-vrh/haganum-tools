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
