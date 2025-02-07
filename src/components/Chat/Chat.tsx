import { FC, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Contacts from "./Contacts/Contacts";
import DialogWindow from "./Dialog/DialogWindow";
import { Toaster } from "../ui/toaster";

export type ActiveChat = {
	title: string;
	chatId: string;
};

const Chat: FC = () => {
	const [activeChat, setActiveChat] = useState<ActiveChat>({
		title: "",
		chatId: "",
	});

	const onSetActiveChat = (chat: ActiveChat) => {
		setActiveChat(chat);
	};
	return (
		<Grid minH="100vh" templateColumns="repeat(3, 1fr)" gap="0">
			<GridItem minH="100%" colSpan={1}>
				<Contacts onSetActiveChat={onSetActiveChat} />
			</GridItem>
			<GridItem colSpan={2}>
				<DialogWindow onActiveChat={activeChat} />
			</GridItem>
			<Toaster />
		</Grid>
	);
};

export default Chat;
