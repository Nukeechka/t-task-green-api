import { Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import NewContact from "./NewContact";
import Contact from "./Contact";
import { ActiveChat } from "../Chat";

type ContactsProps = {
	onSetActiveChat: (chat: ActiveChat) => void;
};

const Contacts: FC<ContactsProps> = ({ onSetActiveChat }) => {
	const [contacts, setContacts] = useState<string[]>([]);

	const onSetActiveChatHandler = (chat: ActiveChat) => {
		onSetActiveChat(chat);
	};

	const addContact = (contact: string) => {
		setContacts((value) => [...value, contact]);
	};
	const contactsList = contacts.map((contact) => {
		return (
			<Contact
				key={contact}
				title={contact}
				onSetActiveChatDialog={onSetActiveChatHandler}
			/>
		);
	});
	return (
		<Box bg="white" minH="100%">
			<Box padding="20px">
				<NewContact onAddContact={addContact} />
				<Box mt="10px">
					<ul>{contactsList}</ul>
				</Box>
			</Box>
		</Box>
	);
};

export default Contacts;
