import { useContext } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import { AppContext } from "./store/app-context";
import Chat from "./components/Chat/Chat";

function App() {
	const appContext = useContext(AppContext);
	if (appContext.authorized) {
		return <Chat></Chat>;
	}
	return <Auth />;
}

export default App;
