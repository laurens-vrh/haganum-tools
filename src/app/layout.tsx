import type { Metadata } from "next";
import Script from "next/script";
import { Content } from "../components/Content";
import { Footlet } from "../components/Footlet";
import { NavBar } from "../components/NavBar";
import "./globals.css";

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
		<html lang="nl" className="dark h-screen">
			<head>
				<link rel="shortcut icon" href="/img/favicon.png" type="image/x-icon" />
			</head>
			<body className="box-border bg-zinc-950 text-white h-screen md:overflow-hidden">
				<Script
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-M58C29JPP3"
				/>
				<Script
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer||[];function gtag(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config','G-M58C29JPP3',{page_path:window.location.pathname});`,
					}}
				/>
				<NavBar></NavBar>
				<Content>{children}</Content>
				<Footlet></Footlet>
			</body>
		</html>
	);
}
