import { AppContextType } from "../store/AppContextProvider";

export const getStateInstance = async (
	dataUser: Omit<AppContextType, "authorized">
) => {
	const url = `${import.meta.env.VITE_API_URL}/waInstance${
		dataUser.idInstance
	}/getStateInstance/${dataUser.apiTokenInstance}`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
};
