import { Avatar, Card } from "@chakra-ui/react";
import { FC } from "react";
import { ActiveChat } from "../Chat";

type ContactProps = {
	title: string;
	onSetActiveChatDialog: (chat: ActiveChat) => void;
};

const Contact: FC<ContactProps> = ({ title, onSetActiveChatDialog }) => {
	const chatId = title.replace(/\D/g, "") + "@c.us";
	const openDialogHandler = () => {
		onSetActiveChatDialog({ title: title, chatId: chatId });
	};
	return (
		<li>
			<Card.Root
				flexDirection="row"
				onClick={openDialogHandler}
				cursor="pointer"
			>
				<Card.Body flexDirection="row" gap="2">
					<Avatar.Root colorPalette="green">
						<Avatar.Fallback />
						<Avatar.Image src="https://bit.ly/broken-link" />
					</Avatar.Root>
					<Card.Title mt="2">{title}</Card.Title>
				</Card.Body>
			</Card.Root>
		</li>
	);
};

export default Contact;
