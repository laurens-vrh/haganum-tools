"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { SelectGroup } from "@/components/woordjes/SelectGroup";

export const metadata: Metadata = {
	title: "Nuntia | Haganum Tools",
	description:
		"Schrijf je in, en ontvang voortaan automatisch een e-mail naar je schoolaccount zodra een nieuw cijfer op Magister staat!",
};

export default function Page() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [output, setOutput] = useState("");
	const [disabled, setDisabled] = useState(false);

	return (
		<>
			<div className="relative p-4  bg-gradient-primary-blue border-customblue border rounded-xl w-full mx-auto | md:w-[600px]">
				<h2 className="text-xl">Nuntia</h2>
				<p className="mt-2">
					Heb je geen zin meer om elke minuut te kijken of je docent het cijfer
					er al op heeft gezet? Hier is de oplossing! Schrijf je in, en ontvang
					voortaan automatisch een e-mail naar je schoolaccount zodra een nieuw
					cijfer erop staat!
				</p>

				<input
					className="mt-4 w-full p-2 text-white bg-transparent  bg-gradient-primary-blue border border-customblue rounded-lg"
					placeholder="magister gebruikersnaam"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<input
					className="mt-2 w-full p-2 text-white bg-transparent  bg-gradient-primary-blue border border-customblue rounded-lg"
					placeholder="magister wachtwoord"
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>

				<SelectGroup margin={false}>
					<button
						className="cursor-pointer disabled:opacity-30 mt-2 w-full p-2 text-white bg-gradient-primary-blue border border-customblue rounded-lg"
						disabled={disabled}
						onClick={async (e) => {
							if (!username || !password)
								return setOutput("Ongeldige gegevens.");

							setDisabled(true);
							fetch("https://laurensverhaar.nl/haganum-nuntia/api/account", {
								method: "post",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									username,
									password,
								}),
							})
								.then(async (res) => {
									setDisabled(false);
									if (res.status === 200) {
										setOutput(
											`Successvol ingeschreven, ${(await res.json()).name}!`
										);
										setUsername("");
										setPassword("");

										return;
									} else {
										const text = await res.text();
										if (text.includes("Ongeldige gegevens.")) {
											setUsername("");
											setPassword("");
										}
										return setOutput(`Er is iets misgegaan: ${text}`);
									}
								})
								.catch((error) => {
									setDisabled(false);
									setOutput(`Er is iets misgegaan: ${error}`);
								});
						}}
					>
						Inschrijven
					</button>
					<button
						className="cursor-pointer disabled:opacity-30 mt-2 w-full p-2 text-white bg-gradient-primary-blue border border-customblue rounded-lg"
						disabled={disabled}
						onClick={async (e) => {
							if (!username || !password)
								return setOutput("Ongeldige gegevens.");

							setDisabled(true);
							fetch("https://laurensverhaar.nl/haganum-nuntia/api/account", {
								method: "delete",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									username,
									password,
								}),
							})
								.then(async (res) => {
									setDisabled(false);
									if (res.status === 200) {
										setOutput(`Successvol uitgeschreven.`);
										setUsername("");
										setPassword("");

										return;
									} else
										return setOutput(
											`Er is iets misgegaan: ${await res.text()}`
										);
								})
								.catch((error) => {
									setDisabled(false);
									setOutput(`Er is iets misgegaan: ${error}`);
								});
						}}
					>
						Uitschrijven
					</button>
				</SelectGroup>

				<p>{output}</p>
			</div>
		</>
	);
}
