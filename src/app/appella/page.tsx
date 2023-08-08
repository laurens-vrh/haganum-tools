"use client";

import { Columns } from "@/components/Columns";
import { ToggleButton } from "@/components/appella/ToggleButton";
import { useEffect, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import { Verb } from "@/types";
import { Spinner } from "@/components/appella/Spinner";
import * as modelMetadata from "@/../public/data/appella/metadata.json";

const verbProperties = {
	modus: ["indicativus", "imperativus", "infinitivus", "coniunctivus"],
	tijd: [
		"praesens",
		"imperfectum",
		"perfectum",
		"plusquamperf.",
		"futurum",
		"futurum exactum",
		"-",
	],
	persoon: ["1e", "2e", "3e", "-"],
	getal: ["enkelvoud", "meervoud", "-"],
	genus: ["actief", "passief", "-"],
	rollen: ["1", "2", "3"],
};

export default function Page() {
	const [model, setModel] = useState<tf.LayersModel | null>(null);
	const [loading, setLoading] = useState(false);

	const [searchTerm, setSearchTerm] = useState("");
	const [modus, setModus] = useState("-");
	const [tijd, setTijd] = useState("-");
	const [persoon, setPersoon] = useState("-");
	const [getal, setGetal] = useState("-");
	const [genus, setGenus] = useState("-");
	const [rollen, setRollen] = useState("-");

	useEffect(() => {
		tf.loadLayersModel("/data/appella/model.json").then((model) => {
			setModel(model);
			predict(model, "");
		});
	}, []);

	useEffect(() => {
		var prediction = {
			modus: "-",
			tijd: "-",
			persoon: "-",
			getal: "-",
			genus: "-",
			rollen: "-",
		};

		if (model && searchTerm.length > 1) prediction = predict(model, searchTerm);

		setModus(prediction.modus);
		setTijd(prediction.tijd);
		setPersoon(prediction.persoon);
		setGetal(prediction.getal);
		setGenus(prediction.genus);
		setRollen(prediction.rollen);
		setLoading(false);
	}, [model, searchTerm]);

	return (
		<div className="bg-appella-secondary-700 w-full mx-auto rounded-3xl p-4 grid grid-rows-[min-content] gap-4 | md:w-[500px]">
			<div className="bg-appella-secondary-300 rounded-2xl p-4 grid grid-rows-[min-content] gap-4 ">
				<h2 className="text-2xl">Appella AI</h2>
				<p className="">
					Heb geen moeite meer met het benoemen van Latijnse werkwoorden! Vul
					hieronder een in, en het wordt automatisch benoemd. Let er wel op dat
					dit een kunstmatige intelligentie is, en het resultaat dus niet altijd
					klopt.
				</p>
			</div>
			<div className="bg-appella-secondary-300 rounded-2xl p-4 grid grid-rows-[min-content] gap-4 ">
				<div>
					<p className="mb-2">Werkwoord</p>
					<div className="bg-appella-secondary-200 rounded-xl py-2 px-4 w-full focus-within:outline outline-1 outline-appella-secondary-100 flex items-center">
						<input
							className="bg-transparent outline-none w-full"
							type="text"
							placeholder="typ een werkwoord"
							onChange={(e) => {
								setLoading(true);
								setSearchTerm(e.currentTarget.value);
							}}
						/>
						<div className={`ml-2 ${loading ? "opacity-100" : "opacity-0"}`}>
							<Spinner />
						</div>
					</div>
				</div>
			</div>
			<div className="bg-appella-secondary-300 rounded-2xl p-4">
				<Columns margin={false}>
					<div className="w-full">
						<ToggleButton
							name="Modus"
							options={[
								"indicativus",
								"imperativus",
								"infinitivus",
								"coniunctivus",
							]}
							value={[modus]}
						></ToggleButton>
						<ToggleButton
							name="Tijd"
							options={[
								"praesens",
								"imperfectum",
								"perfectum",
								"plusquamperf.",
								"futurum",
								"futurum exactum",
							]}
							value={[tijd]}
						></ToggleButton>
					</div>
					<div className="w-full">
						<ToggleButton
							name="Persoon"
							options={["1e", "2e", "3e"]}
							value={[persoon]}
							direction="horizontal"
						></ToggleButton>
						<ToggleButton
							name="Getal"
							options={["enkelvoud", "meervoud"]}
							value={[getal]}
						></ToggleButton>
						<ToggleButton
							name="Genus"
							options={["actief", "passief"]}
							value={[genus]}
							direction="horizontal"
						></ToggleButton>
						<ToggleButton
							name="Aanvullingen"
							options={["1", "2", "3"]}
							value={[rollen]}
							direction="horizontal"
						></ToggleButton>
					</div>
				</Columns>
			</div>
			<div className="bg-appella-secondary-300 rounded-2xl p-4">
				<p className="text-xs">
					{modelMetadata.name}_l{modelMetadata.loss.toFixed(4)}
				</p>
			</div>
		</div>
	);
}

function predict(model: tf.LayersModel, verb: string): Verb {
	const encoded = encodeVerb(verb);
	const inputTensor = tf.tensor2d([encoded]);

	const prediction = model.predict(inputTensor) as any;

	const predictions = {} as {
		[property: string]: string;
	};
	Object.keys(verbProperties).forEach((property, i) => {
		predictions[property as keyof typeof verbProperties] =
			verbProperties[property as keyof typeof verbProperties][
				prediction[i].argMax(1).dataSync()
			];
	});

	return {
		vorm: verb,
		...predictions,
	} as Verb;
}

function encodeString(str: string) {
	return str
		.split("")
		.map((char) =>
			char === " " ? 0 : char.charCodeAt(0) - "a".charCodeAt(0) + 1
		);
}

const { maxTokens, maxTokenLength } = modelMetadata;
const tokenRegex = new RegExp(modelMetadata.tokenRegex);
function encodeVerb(verb: string) {
	return padArray(
		tokenizeVerb(verb).map((token) =>
			padArray(encodeString(token || ""), maxTokenLength)
		),
		maxTokens,
		Array(maxTokenLength).fill(0)
	).flat(1);
}

function tokenizeVerb(verb: string) {
	const tokens = verb.match(tokenRegex)?.splice(1);
	console.log({ verb, tokenRegex, match: verb.match(tokenRegex) });
	if (!tokens) throw Error(`Unable to execute RegExp on string '${verb}'`);

	while (tokens[0].length > maxTokenLength) {
		const first = tokens.shift();
		if (!first) return tokens;

		const chunk = first.slice(-1 * maxTokenLength);
		const rest = first.slice(0, -1 * maxTokenLength);
		tokens.unshift(rest, chunk);
	}

	return tokens;
}
function padArray<T>(array: T[], targetLength: number, padValue: any = 0) {
	if (array.length >= targetLength) return array.slice(-1 * targetLength);

	const padding = Array(targetLength - array.length).fill(padValue);
	return [...padding, ...array] as typeof array;
}
