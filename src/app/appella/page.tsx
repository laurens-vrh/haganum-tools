"use client";

import { Columns } from "@/components/Columns";
import { ToggleButton } from "@/components/appella/ToggleButton";
import { useEffect, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import { Verb } from "@/types";
const verbProperties = {
	modus: ["indicativus", "imperativus", "infinitivus", "coniunctivus"],
	tijd: [
		"praesens",
		"imperfectum",
		"perfectum",
		"plusquamperfectum",
		"futurum",
		"futurum exactum",
		"-",
	],
	persoon: ["1e", "2e", "3e", "-"],
	getal: ["enkelvoud", "meervoud", "-"],
	genus: ["actief", "passief", "-"],
	rollen: ["1 rol", "2 rollen", "3 rollen"],
};
const maxVerbLength = 20;

export default function Page() {
	const [model, setModel] = useState<tf.LayersModel | null>(null);
	const [loading, setLoading] = useState(0);

	const [searchTerm, setSearchTerm] = useState("");
	const [modus, setModus] = useState("-");
	const [tijd, setTijd] = useState("-");
	const [persoon, setPersoon] = useState("-");
	const [genus, setGenus] = useState("-");
	const [rollen, setRollen] = useState("-");

	useEffect(() => {
		tf.loadLayersModel("/data/appella/model.json", {
			onProgress: (fractions) => {
				setLoading(fractions);
			},
		}).then((model) => {
			setModel(model);
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
		if (model && searchTerm.length > 2) prediction = predict(model, searchTerm);

		setModus(prediction.modus);
		setTijd(prediction.tijd);
		setPersoon(`${prediction.persoon} ${prediction.getal}`);
		setGenus(prediction.genus);
		setRollen(prediction.rollen);
		console.log({ modus, tijd, persoon, genus, rollen });
	}, [model, searchTerm]);

	return (
		<div className="bg-appella-secondary-700 w-full h-full mx-auto rounded-3xl p-4 grid grid-rows-[min-content] gap-4 | md:w-[450px]">
			<div className="bg-appella-secondary-300 rounded-2xl p-4 grid grid-rows-[min-content] gap-4 ">
				<div>
					<p className="mb-2">Werkwoord</p>
					<input
						className="bg-appella-secondary-200 rounded-xl py-2 px-4 w-full"
						type="text"
						placeholder="typ een werkwoord"
						onChange={(e) => {
							setSearchTerm(e.currentTarget.value);
						}}
					/>
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
								"plusquamperfectum",
								"futurum",
								"futurum exactum",
							]}
							value={[tijd]}
						></ToggleButton>
					</div>
					<div className="w-full">
						<ToggleButton
							name="Persoon"
							options={[
								"1e enkelvoud",
								"2e enkelvoud",
								"3e enkelvoud",
								"1e meervoud",
								"2e meervoud",
								"3e meervoud",
							]}
							value={[persoon]}
						></ToggleButton>
						<ToggleButton
							name="Genus"
							options={["actief", "passief"]}
							value={[genus]}
						></ToggleButton>
						<ToggleButton
							name="Aanvullingen"
							options={["1 rol", "2 rollen", "3 rollen"]}
							value={[rollen]}
						></ToggleButton>
					</div>
				</Columns>
			</div>
			<div className="bg-appella-secondary-300 rounded-2xl p-4">
				<p className="text-sm">
					modelinformatie: 70% accuraat, 514 voorbeelden (2000e,bs1)
				</p>
			</div>
		</div>
	);
}

export function predict(model: tf.LayersModel, verb: string): Verb {
	const encoded = encodeString(verb);
	const padded = padArrays([encoded], maxVerbLength)[0];
	const inputTensor = tf.tensor2d([padded]);

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
export function padArrays(
	sequences: number[][],
	maxLen: number,
	padding = "pre",
	truncating = "pre",
	value = 0
) {
	return sequences.map((seq) => {
		if (seq.length > maxLen) {
			if (truncating === "pre") {
				seq.splice(0, seq.length - maxLen);
			} else {
				seq.splice(maxLen, seq.length - maxLen);
			}
		}
		while (seq.length < maxLen) {
			if (padding === "pre") {
				seq.unshift(value);
			} else {
				seq.push(value);
			}
		}
		return seq;
	});
}
