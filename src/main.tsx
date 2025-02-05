import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import AppContextProvider from "./store/AppContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider>
			<AppContextProvider>
				<App />
			</AppContextProvider>
		</Provider>
	</StrictMode>
);
