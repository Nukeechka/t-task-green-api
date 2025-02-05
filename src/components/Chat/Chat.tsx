import { FC } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Contacts from "./Contacts/Contacts";
import DialogWindow from "./Dialog/DialogWindow";

const Chat: FC = () => {
	return (
		<Grid minH="100vh" templateColumns="repeat(3, 1fr)" gap="0">
			<GridItem colSpan={1}>
				<Contacts />
			</GridItem>
			<GridItem colSpan={2}>
				<DialogWindow />
			</GridItem>
		</Grid>
	);
};

export default Chat;
