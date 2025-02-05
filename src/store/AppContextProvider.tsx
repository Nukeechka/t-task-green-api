import { FC, PropsWithChildren, useReducer } from "react";
import { AppContext } from "./app-context";

export type AppContextType = {
	idInstance: string;
	apiTokenInstance: string;
	authorized: boolean;
};

type ACTION_TYPE =
	| {
			type: "SET_DATA";
			data: Omit<AppContextType, "authorized">;
	  }
	| { type: "AUTH"; data: boolean };

const defaultAppState = {
	idInstance: "",
	apiTokenInstance: "",
	authorized: false,
};

const appReducer = (prevState: typeof defaultAppState, action: ACTION_TYPE) => {
	switch (action.type) {
		case "SET_DATA":
			const updatedIdInstance = action.data.idInstance;
			const updatedApiTokenInstance = action.data.apiTokenInstance;
			return {
				...prevState,
				idInstance: updatedIdInstance,
				apiTokenInstance: updatedApiTokenInstance,
			};
		case "AUTH":
			const updatedAuthorized = action.data;

			return {
				...prevState,
				authorized: updatedAuthorized,
			};
	}
	return prevState;
};

const AppContextProvider: FC<PropsWithChildren> = (props) => {
	const [appState, dispatchAction] = useReducer(appReducer, defaultAppState);

	const setAuthDataHandler = (data: Omit<AppContextType, "authorized">) => {
		dispatchAction({
			type: "SET_DATA",
			data: data,
		});
	};

	const setAuthorizedHandler = (data: boolean) => {
		dispatchAction({
			type: "AUTH",
			data: data,
		});
	};

	const appContext = {
		idInstance: appState.idInstance,
		apiTokenInstance: appState.apiTokenInstance,
		authorized: appState.authorized,
		setAuthData: setAuthDataHandler,
		setAuthorized: setAuthorizedHandler,
	};
	return (
		<AppContext.Provider value={appContext}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
