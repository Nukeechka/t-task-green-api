import React from "react";
import { AppContextType } from "./AppContextProvider";

export const AppContext = React.createContext({
	idInstance: "",
	apiTokenInstance: "",
	authorized: false,
	setAuthData: (_data: Omit<AppContextType, "authorized">): void => {},
	setAuthorized: (_data: boolean) => {},
});
