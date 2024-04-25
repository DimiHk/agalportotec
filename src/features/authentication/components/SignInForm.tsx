import {
  CardBody,
  Heading,
  Grid,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  Flex,
  Box,
  Text,
  FormControl,
  FormErrorMessage,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthenticationRequest } from "@/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { useSubmitForm } from "@/hooks";
import { authenticationSchema } from "@/schemas";
import { authenticationService } from "@/services/authentication";
import { useAuthentication } from "@/providers/authenticationProvider";

export const SignInForm = () => {
  const [show, setShow] = useState<boolean>(false);

  const [isLoading, setisLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleShowPassword = () => setShow(!show);

  const { register, handleSubmit, errors } =
    useSubmitForm<AuthenticationRequest>(authenticationSchema);

  const toast = useToast();

  const { setSession } = useAuthentication();

  async function handleUserAuthentication(formData: AuthenticationRequest) {
    setisLoading(true);

    authenticationService
      .authenticate(formData)
      .then(({ userType }) => {
        toast({
          title: "SUCESSO",
          description:
            "A SER REDIRECIONADO PARA A PAGINA PRINCIPAL! AGUARDE UM POUCO!",
          status: "success",
        });
        setSession({ userType });
        router.push("/dashboard/clients");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "ERRO",
          description:
            "HOUVE UM ERRO AO TENTAR SE AUTENTICAR! POR FAVOR VERIFIQUE QUE INTRODUZIU OS CREDENCIAIS CORRETOS!",
          status: "error",
        });
      })
      .finally(() => setisLoading(false));
  }

  return (
    <form onSubmit={handleSubmit(handleUserAuthentication)}>
      <CardBody>
        <Heading
          fontSize={"2xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          padding={"4"}
        >
          INICIAR SESSÃO
        </Heading>

        <Grid padding={"8"} gap={4}>
          <FormControl isInvalid={!!errors.email?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              EMAIL
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.email?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <Input type={"text"} {...register("email")} />
          </FormControl>
          <FormControl isInvalid={!!errors.password?.message}>
            <FormLabel fontWeight={"semibold"} fontSize={"small"}>
              PALAVRA-PASSE
              <FormErrorMessage>
                <Text fontWeight={"semibold"} fontSize={"xs"}>
                  {errors.password?.message?.toString().toLocaleUpperCase()}
                </Text>
              </FormErrorMessage>
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                {...register("password")}
              />
              <InputRightElement width="max" padding={1}>
                <Button h="1.75rem" size="md" onClick={handleShowPassword}>
                  {show ? (
                    <Text fontSize={"xs"}>ESCONDER</Text>
                  ) : (
                    <Text fontSize={"xs"}>MOSTRAR</Text>
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Checkbox defaultChecked>
            <Text fontWeight={"semibold"} fontSize={"small"}>
              LEMBRAR-ME
            </Text>
          </Checkbox>
        </Grid>
      </CardBody>
      <Flex>
        <Box width={"full"}>
          <Button
            width={"full"}
            onClick={() => router.push("auth/reset-password")}
            borderRadius={0}
            backgroundColor={"cyan.400"}
            borderBottomLeftRadius={"base"}
            _hover={{ backgroundColor: "cyan.500" }}
          >
            <Text fontSize={"small"} fontWeight={"semibold"} color={"white"}>
              RECUPERAR PALAVRA-PASSE
            </Text>
          </Button>
        </Box>
        <Box width={"full"}>
          <Button
            width={"full"}
            borderRadius={0}
            borderBottomEndRadius={"base"}
            backgroundColor={"blue.400"}
            _hover={{ backgroundColor: "blue.500" }}
            type="submit"
          >
            <Flex justify={"center"} align={"center"} gap={2}>
              <Text fontSize={"small"} fontWeight={"semibold"} color={"white"}>
                ENTRAR
              </Text>
              {isLoading ? (
                <Spinner size={"sm"} color={"white"} />
              ) : (
                <FontAwesomeIcon icon={faArrowRight} color="white" />
              )}
            </Flex>
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
