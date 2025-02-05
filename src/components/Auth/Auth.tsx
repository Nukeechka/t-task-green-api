import { FC, useContext } from "react";
import AuthForm from "./AuthForm";
import { AppContext } from "../../store/app-context";
import { AppContextType } from "../../store/AppContextProvider";
import { getStateInstance } from "../../utils/api";

const Auth: FC = () => {
	const appContext = useContext(AppContext);
	const setDataForm = async (data: Omit<AppContextType, "authorized">) => {
		appContext.setAuthData(data);

		const result = await getStateInstance(data);

		if (result.stateInstance === "authorized") {
			appContext.setAuthorized(true);
		}
	};

	return <AuthForm onSetDataForm={setDataForm} />;
};

export default Auth;
