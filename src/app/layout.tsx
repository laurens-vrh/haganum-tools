import { Content } from "../components/Content";
import { Footlet } from "../components/Footlet";
import { NavBar } from "../components/NavBar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Haganum Tools",
	description:
		"Gereedschappen om het leven voor jou als haganummer makkelijker te maken.",
	manifest: "/manifest.json",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="nl" className="dark h-screen box-border">
			<head>
				<link rel="shortcut icon" href="/img/favicon.png" type="image/x-icon" />
			</head>
			<body className="bg-zinc-950 text-white h-screen md:overflow-hidden">
				<NavBar></NavBar>
				<Content>{children}</Content>
				<Footlet></Footlet>
			</body>
		</html>
	);
}
