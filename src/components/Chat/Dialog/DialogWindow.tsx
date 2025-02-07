import { Avatar, Box, Button, Card, Flex, Input } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import { ActiveChat } from "../Chat";
import {
	deleteNotification,
	getMessage,
	sendMessage,
} from "../../../utils/api";
import { AppContext } from "../../../store/app-context";
import { toaster } from "../../ui/toaster";

type DialogWindowProps = {
	onActiveChat: ActiveChat;
};

type Message = {
	sender: string;
	text: string;
	messageId?: string;
};

const DialogWindow: FC<DialogWindowProps> = ({ onActiveChat }) => {
	const appContext = useContext(AppContext);
	const [messageInput, setMessageInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const messageInpuHandler = (event: React.FormEvent<HTMLInputElement>) => {
		setMessageInput(event.currentTarget.value);
	};

	const receiveMessages = async () => {
		const data = await getMessage({
			idInstance: appContext.idInstance,
			apiTokenInstance: appContext.apiTokenInstance,
		});
		if (data) {
			const receiptId = data.receiptId;
			const result = await deleteNotification(
				{
					idInstance: appContext.idInstance,
					apiTokenInstance: appContext.apiTokenInstance,
				},
				receiptId
			);
			if (result) {
				toaster.create({
					description: "Уведомление получено",
					type: "success",
				});
			}
			if (data.body.typeWebhook === "incomingMessageReceived") {
				console.log(onActiveChat.chatId);
				if (data.body.senderData.chatId === onActiveChat.chatId)
					setMessages((value) => [
						...value,
						{
							sender: data.body.senderData.sender,
							text: data.body.messageData.textMessageData
								.textMessage,
							messageId: data.body.idMessage,
						},
					]);
			}
		}
		setTimeout(receiveMessages, 7000);
	};

	const sendMessageHandler = async () => {
		const response = await sendMessage(
			{
				idInstance: appContext.idInstance,
				apiTokenInstance: appContext.apiTokenInstance,
			},
			onActiveChat.chatId,
			messageInput
		);
		setMessages((value) => [
			...value,
			{
				sender: "me",
				text: messageInput,
				messageId: response?.idMessage,
			},
		]);
		setMessageInput("");
		receiveMessages();
	};

	const renderMessages = messages.map((message) => {
		if (message.sender === "me") {
			return (
				<Flex
					justifyContent="flex-end"
					key={message.messageId}
					maxW="100%"
					margin="10px 0"
				>
					<Flex
						maxW="300px"
						justifyContent="flex-end"
						bg="teal.100"
						borderRadius="16px"
						padding="10px"
					>
						<p>{message.text}</p>
					</Flex>
				</Flex>
			);
		} else {
			return (
				<Flex
					justifyContent="flex-start"
					key={message.messageId}
					maxW="100%"
					margin="10px 0"
				>
					<Flex
						maxW="300px"
						justifyContent="flex-start"
						bg="teal.50"
						borderRadius="16px"
						padding="10px"
					>
						<p>{message.text}</p>
					</Flex>
				</Flex>
			);
		}
	});

	return (
		<Flex
			bg="green.50"
			minH="100%"
			flexDirection="column"
			justifyContent="space-between"
		>
			<Box minH="84vh">
				<Box bg="green.200">
					{onActiveChat.title !== "" && (
						<Card.Root
							variant="subtle"
							bg="gray.100"
							flexDirection="row"
						>
							<Card.Body flexDirection="row" gap="2">
								<Avatar.Root colorPalette="green">
									<Avatar.Fallback />
									<Avatar.Image src="https://bit.ly/broken-link" />
								</Avatar.Root>
								<Card.Title mt="2">
									{onActiveChat.title}
								</Card.Title>
							</Card.Body>
						</Card.Root>
					)}
				</Box>
				<Box margin="40px" padding="10px">
					{renderMessages}
				</Box>
			</Box>
			<Flex gap="10px" padding="20px" pb="10px" bg="green.200">
				<Input
					variant="subtle"
					value={messageInput}
					onChange={messageInpuHandler}
				/>
				<Button onClick={sendMessageHandler} bg="green.400">
					<RiSendPlaneLine />
				</Button>
			</Flex>
		</Flex>
	);
};

export default DialogWindow;
