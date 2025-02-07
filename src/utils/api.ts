import { AppContextType } from "../store/AppContextProvider";

interface NotificationBody {
	typeWebhook: string;
	instanceData: {
		idInstance: string;
		wid: string;
		typeInstance: string;
	};
	timestamp: number;
	idMessage: string;
	senderData: {
		chatId: string;
		sender: string;
		senderName: string;
		senderContactName: string;
	};
	messageData: {
		typeMessage: string;
		textMessageData: {
			textMessage: string;
		};
	};
}

interface Notification {
	receiptId: string;
	body: NotificationBody;
}
export const getStateInstance = async (
	dataUser: Omit<AppContextType, "authorized">
) => {
	try {
		const url = `${import.meta.env.VITE_API_URL}/waInstance${
			dataUser.idInstance
		}/getStateInstance/${dataUser.apiTokenInstance}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Что-то пошло не так");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const sendMessage = async (
	dataUser: Omit<AppContextType, "authorized">,
	chatId: string,
	message: string
): Promise<{ idMessage: string } | null> => {
	try {
		const url = `${import.meta.env.VITE_API_URL}/waInstance${
			dataUser.idInstance
		}/sendMessage/${dataUser.apiTokenInstance}`;
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				chatId: chatId,
				message: message,
			}),
		});
		if (!response.ok) {
			throw new Error("Ошибка при отправке сообщения");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
	return null;
};

export const getMessage = async (
	dataUser: Omit<AppContextType, "authorized">
): Promise<Notification | null> => {
	try {
		const url = `${import.meta.env.VITE_API_URL}/waInstance${
			dataUser.idInstance
		}/receiveNotification/${dataUser.apiTokenInstance}?receiveTimeout=5`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Ошибка при получении сообщения");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
	return null;
};

export const deleteNotification = async (
	dataUser: Omit<AppContextType, "authorized">,
	receiptId: string
): Promise<{ result: boolean } | null> => {
	try {
		const url = `${import.meta.env.VITE_API_URL}/waInstance${
			dataUser.idInstance
		}/deleteNotification/${dataUser.apiTokenInstance}/${receiptId}`;
		const response = await fetch(url, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Ошибка при удалении уведомления");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
	return null;
};
