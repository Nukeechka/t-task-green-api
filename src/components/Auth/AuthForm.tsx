import { Button, Card, Field, Flex, Input, Stack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { AppContextType } from "../../store/AppContextProvider";

type AuthFormProps = {
	onSetDataForm: (data: Omit<AppContextType, "authorized">) => void;
};

const AuthForm: FC<AuthFormProps> = ({ onSetDataForm }) => {
	const [idInstance, setIdInstance] = useState("");
	const [apiTokenInstance, setApiTokenInstance] = useState("");

	const idInstanceInputHandler = (
		event: React.FormEvent<HTMLInputElement>
	) => {
		setIdInstance(event.currentTarget.value);
	};

	const apiTokenInstanceHandler = (
		event: React.FormEvent<HTMLInputElement>
	) => {
		setApiTokenInstance(event.currentTarget.value);
	};

	const formSubmitHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();

		onSetDataForm({ idInstance, apiTokenInstance });
	};
	return (
		<>
			<Flex minH="100vh" justify="center" align="center">
				<form onSubmit={formSubmitHandler}>
					<Card.Root>
						<Card.Header>
							<Card.Title>Авторизация</Card.Title>
							<Card.Description>
								Заполните форму ниже, чтобы войти в аккаунт
							</Card.Description>
						</Card.Header>
						<Card.Body>
							<Stack gap="4" w="full">
								<Field.Root>
									<Field.Label>Id Instance</Field.Label>
									<Input
										value={idInstance}
										onChange={idInstanceInputHandler}
									/>
								</Field.Root>

								<Field.Root>
									<Field.Label>
										Api Token Instance
									</Field.Label>
									<Input
										value={apiTokenInstance}
										onChange={apiTokenInstanceHandler}
									/>
								</Field.Root>
							</Stack>
						</Card.Body>
						<Card.Footer justifyContent="flex-end">
							<Button
								type="submit"
								variant="solid"
								bg="green.500"
							>
								Войти
							</Button>
						</Card.Footer>
					</Card.Root>
				</form>
			</Flex>
		</>
	);
};

export default AuthForm;
