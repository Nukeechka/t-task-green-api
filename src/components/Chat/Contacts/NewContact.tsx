import { Button, Field, Input, Stack } from "@chakra-ui/react";
import {
	DialogActionTrigger,
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from "../../ui/dialog";
import { FC, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { toaster } from "../../ui/toaster";

type NewContactProps = {
	onAddContact: (contact: string) => void;
};

const NewContact: FC<NewContactProps> = ({ onAddContact }) => {
	const [phoneNumber, setPhoneNumber] = useState("");

	const phoneNumberInputHandler = (
		event: React.FormEvent<HTMLInputElement>
	) => {
		setPhoneNumber(event.currentTarget.value);
	};

	const saveButtonHandler = () => {
		if (phoneNumber === "") {
			toaster.create({
				description: "Введите номер телефона",
				type: "warning",
			});
			return;
		}
		onAddContact(phoneNumber);
	};

	return (
		<DialogRoot>
			<DialogTrigger asChild>
				<Button size="lg" width="100%" variant="solid" bg="green.500">
					<RiAddLine /> Открыть чат
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Открыть/создать новый чат</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Stack gap="4" w="full">
						<Field.Root>
							<Field.Label>Номер телефона</Field.Label>
							<Input
								value={phoneNumber}
								onChange={phoneNumberInputHandler}
							/>
						</Field.Root>
					</Stack>
				</DialogBody>
				<DialogFooter>
					<DialogActionTrigger>
						<Button variant="outline">Отмена</Button>
					</DialogActionTrigger>
					<DialogActionTrigger>
						<Button bg="green.500" onClick={saveButtonHandler}>
							Сохранить
						</Button>
					</DialogActionTrigger>
				</DialogFooter>
				<DialogCloseTrigger />
			</DialogContent>
		</DialogRoot>
	);
};

export default NewContact;
