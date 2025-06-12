import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { Analytics } from '@vercel/analytics/react';
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<HeroUIProvider>
			<main className="text-foreground bg-background">
				<App />
				<Analytics />
			</main>
		</HeroUIProvider>
	</React.StrictMode>
);
